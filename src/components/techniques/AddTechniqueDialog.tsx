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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TECHNIQUE_CATEGORIES, BELT_LEVELS, DIFFICULTY_LEVELS, TRAINING_MODES } from '@/lib/constants';

const techniqueSchema = z.object({
  name: z.string().min(1, 'Nome obbligatorio'),
  category: z.string().min(1, 'Categoria obbligatoria'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  mode: z.enum(['gi', 'nogi', 'both']),
  min_belt: z.enum(['bianca', 'blu', 'viola', 'marrone', 'nera']),
  description: z.string().optional(),
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
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof techniqueSchema>) => {
      const { error } = await supabase.from('techniques').insert({
        name: data.name,
        category: data.category,
        difficulty: data.difficulty,
        mode: data.mode,
        min_belt: data.min_belt,
        description: data.description,
        created_by: user?.id,
        is_global: false
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['techniques'] });
      toast.success('Tecnica salvata con successo!');
      onOpenChange(false);
      form.reset();
    },
    onError: (err: any) => toast.error(`Errore: ${err.message}`)
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-zinc-950 border-zinc-800 text-white overflow-y-auto max-h-[90vh]">
        <DialogHeader><DialogTitle>Nuova Tecnica</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} className="bg-zinc-900 border-zinc-800" /></FormControl><FormMessage /></FormItem>
            )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem><FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue placeholder="Scegli" /></SelectTrigger></FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {TECHNIQUE_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="min_belt" render={({ field }) => (
                <FormItem><FormLabel>Cintura Minima</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {BELT_LEVELS.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="difficulty" render={({ field }) => (
                <FormItem><FormLabel>Difficoltà</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {DIFFICULTY_LEVELS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="mode" render={({ field }) => (
                <FormItem><FormLabel>Modalità</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                      {TRAINING_MODES.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Descrizione</FormLabel><FormControl><Textarea {...field} className="bg-zinc-900 border-zinc-800" /></FormControl></FormItem>
            )} />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" disabled={mutation.isPending}>
              {mutation.isPending ? <Loader2 className="animate-spin" /> : 'Salva Tecnica'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
