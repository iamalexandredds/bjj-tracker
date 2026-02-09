"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TECHNIQUE_CATEGORIES, DIFFICULTY_LEVELS, TRAINING_MODES, BELT_LEVELS } from '@/lib/constants';

const techniqueSchema = z.object({
  name: z.string().trim().min(1, 'Obbligatorio'),
  category: z.string().min(1, 'Seleziona categoria'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  mode: z.enum(['gi', 'nogi', 'both']),
  min_belt: z.enum(['bianca', 'blu', 'viola', 'marrone', 'nera']),
  description: z.string().optional().or(z.literal('')),
  video_url: z.string().trim().url('URL non valido').optional().or(z.literal('')),
});

type TechniqueFormData = z.infer<typeof techniqueSchema>;

export function AddTechniqueDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
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

  const handleVideoUrlChange = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
    setVideoPreview(match ? match[1] : null);
  };

  const createTechnique = useMutation({
    mutationFn: async (data: TechniqueFormData) => {
      if (!user?.id) throw new Error('Non autenticato');
      const { error } = await supabase.from('techniques').insert({
        name: data.name,
        category: data.category,
        difficulty: data.difficulty,
        mode: data.mode,
        min_belt: data.min_belt,
        description: data.description || null,
        video_url: data.video_url || null,
        created_by: user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techniques'] });
      toast.success('Tecnica aggiunta correttamente');
      form.reset();
      setVideoPreview(null);
      onOpenChange(false);
    },
    onError: (error: any) => toast.error(`Errore: ${error.message}`),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader><DialogTitle>Aggiungi Nuova Tecnica</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data: TechniqueFormData) => createTechnique.mutate(data))} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }: { field: any }) => (
              <FormItem><FormLabel>Nome Tecnica *</FormLabel><FormControl><Input placeholder="es. Armbar" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }: { field: any }) => (
                <FormItem><FormLabel>Categoria *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Scegli" /></SelectTrigger></FormControl>
                    <SelectContent className="max-h-[300px]">
                      {TECHNIQUE_CATEGORIES.map((c) => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="min_belt" render={({ field }: { field: any }) => (
                <FormItem><FormLabel>Cintura Minima</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {BELT_LEVELS.map((b) => (<SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }: { field: any }) => (
              <FormItem><FormLabel>Descrizione</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="video_url" render={({ field }: { field: any }) => (
              <FormItem><FormLabel>YouTube URL</FormLabel><FormControl>
                <Input {...field} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { field.onChange(e); handleVideoUrlChange(e.target.value); }} />
              </FormControl></FormItem>
            )} />
            {videoPreview && (
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe src={`https://www.youtube.com/embed/${videoPreview}`} className="w-full h-full border-0" allowFullScreen />
              </div>
            )}
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={createTechnique.isPending}>
                {createTechnique.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Salva Tecnica
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}