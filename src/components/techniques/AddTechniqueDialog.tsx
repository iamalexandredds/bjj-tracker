import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Video } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TECHNIQUE_CATEGORIES, DIFFICULTY_LEVELS, TRAINING_MODES, BELT_LEVELS } from '@/lib/constants';
import type { Database } from '@/integrations/supabase/types';

type DifficultyLevel = Database['public']['Enums']['difficulty_level'];
type TrainingMode = Database['public']['Enums']['training_mode'];
type BeltLevel = Database['public']['Enums']['belt_level'];

const techniqueSchema = z.object({
  name: z.string().trim().min(1, 'Il nome è obbligatorio').max(100, 'Il nome deve essere massimo 100 caratteri'),
  category: z.string().min(1, 'Seleziona una categoria'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced'] as const, {
    required_error: 'Seleziona la difficoltà',
  }),
  mode: z.enum(['gi', 'nogi', 'both'] as const, {
    required_error: 'Seleziona la modalità',
  }),
  min_belt: z.enum(['bianca', 'blu', 'viola', 'marrone', 'nera'] as const, {
    required_error: 'Seleziona la cintura minima',
  }),
  description: z.string().trim().max(2000, 'La descrizione deve essere massimo 2000 caratteri').optional(),
  video_url: z.string().trim().url('Inserisci un URL valido').optional().or(z.literal('')),
});

type TechniqueFormData = z.infer<typeof techniqueSchema>;

interface AddTechniqueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTechniqueDialog({ open, onOpenChange }: AddTechniqueDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const form = useForm<TechniqueFormData>({
    resolver: zodResolver(techniqueSchema),
    defaultValues: {
      name: '',
      category: '',
      difficulty: 'beginner',
      mode: 'both',
      min_belt: 'bianca',
      description: '',
      video_url: '',
    },
  });

  const createTechnique = useMutation({
    mutationFn: async (data: TechniqueFormData) => {
      if (!user?.id) throw new Error('Utente non autenticato');

      const { error } = await supabase.from('techniques').insert({
        name: data.name,
        category: data.category,
        difficulty: data.difficulty as DifficultyLevel,
        mode: data.mode as TrainingMode,
        min_belt: data.min_belt as BeltLevel,
        description: data.description || null,
        video_url: data.video_url || null,
        created_by: user.id,
        is_global: false,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techniques'] });
      toast.success('Tecnica aggiunta con successo!');
      form.reset();
      setVideoPreview(null);
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Error creating technique:', error);
      toast.error('Errore durante la creazione della tecnica');
    },
  });

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleVideoUrlChange = (url: string) => {
    const videoId = extractYouTubeId(url);
    setVideoPreview(videoId);
  };

  const onSubmit = (data: TechniqueFormData) => {
    createTechnique.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuova Tecnica</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli della tecnica. I campi contrassegnati con * sono obbligatori.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Tecnica *</FormLabel>
                  <FormControl>
                    <Input placeholder="es. Armbar dalla Guardia Chiusa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoria */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona una categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px]">
                      {TECHNIQUE_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {field.value && TECHNIQUE_CATEGORIES.find(c => c.value === field.value)?.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficoltà e Modalità in row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Difficoltà */}
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficoltà *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona difficoltà" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DIFFICULTY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Modalità */}
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modalità *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona modalità" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TRAINING_MODES.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cintura Minima */}
            <FormField
              control={form.control}
              name="min_belt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cintura Minima Richiesta *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona cintura minima" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BELT_LEVELS.map((belt) => (
                        <SelectItem key={belt.value} value={belt.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-border"
                              style={{
                                backgroundColor:
                                  belt.color === 'white'
                                    ? '#f5f5f5'
                                    : belt.color === 'blue'
                                    ? '#3b82f6'
                                    : belt.color === 'purple'
                                    ? '#8b5cf6'
                                    : belt.color === 'brown'
                                    ? '#92400e'
                                    : '#000000',
                              }}
                            />
                            {belt.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    La cintura minima raccomandata per apprendere questa tecnica
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrizione */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrivi i passaggi chiave della tecnica, varianti, dettagli importanti..."
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Massimo 2000 caratteri
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video URL */}
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Video YouTube</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleVideoUrlChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Inserisci un link YouTube per mostrare un video dimostrativo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video Preview */}
            {videoPreview && (
              <div className="rounded-lg overflow-hidden border border-border">
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/50">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Anteprima Video</span>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoPreview}`}
                    title="Video preview"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setVideoPreview(null);
                  onOpenChange(false);
                }}
              >
                Annulla
              </Button>
              <Button type="submit" disabled={createTechnique.isPending}>
                {createTechnique.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Salva Tecnica
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
