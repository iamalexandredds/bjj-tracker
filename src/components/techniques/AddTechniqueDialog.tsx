"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
// AGGIUNTI GLI IMPORT MANCANTI CHE CAUSAVANO IL CRASH
import { TECHNIQUE_CATEGORIES, BELT_LEVELS } from '@/lib/constants';

const techniqueSchema = z.object({
  name: z.string().trim().min(1, 'Obbligatorio'),
  category: z.string().min(1, 'Seleziona categoria'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  mode: z.enum(['gi', 'nogi', 'both']),
  min_belt: z.enum(['bianca', 'blu', 'viola', 'marrone', 'nera']),
  description: z.string().optional().or(z.literal('')),
  video_url: z.string().trim().url('URL non valido').optional().or(z.literal('')),
});

export function AddTechniqueDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof techniqueSchema>>({
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
    mutationFn: async (data: z.infer<typeof techniqueSchema>) => {
      if (!user?.id) throw new Error('Devi essere autenticato');
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
      onOpenChange(false);
    },
    onError: (error: any) => toast.error(`Errore: ${error.message}`),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader><DialogTitle>Aggiungi Nuova Tecnica</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => createTechnique.mutate(data))} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Tecnica *</FormLabel>
                <FormControl><Input placeholder="es. Armbar" {...field} className="bg-zinc-900 border-zinc-800" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue placeholder="Scegli" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {TECHNIQUE_CATEGORIES.map((c) => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="min_belt" render={({ field }) => (
                <FormItem>
                  <FormLabel>Cintura Minima</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {BELT_LEVELS.map((b) => (<SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Descrizione</FormLabel><FormControl><Textarea {...field} className="bg-zinc-900 border-zinc-800" /></FormControl></FormItem>
            )} />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={createTechnique.isPending}>
              {createTechnique.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Salva Tecnica
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
