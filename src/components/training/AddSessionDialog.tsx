import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { TRAINING_TYPES } from '@/lib/constants';
import { IntensityStars } from '@/components/IntensityStars';
import { TechniquePicker, SelectedTechnique } from './TechniquePicker';

const sessionSchema = z.object({
  session_date: z.string().min(1, 'La data è obbligatoria'),
  duration_minutes: z.coerce.number().min(1, 'Minimo 1 minuto').max(600, 'Massimo 600 minuti'),
  training_type: z.enum(['technique', 'sparring', 'drill', 'conditioning']),
  intensity: z.number().min(1).max(5),
  notes: z.string().optional(),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

interface SessionToEdit {
  id: string;
  session_date: string;
  duration_minutes: number;
  training_type: 'technique' | 'sparring' | 'drill' | 'conditioning';
  intensity: number;
  notes: string | null;
}

interface AddSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editSession?: SessionToEdit | null;
}

export function AddSessionDialog({ open, onOpenChange, editSession }: AddSessionDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedTechniques, setSelectedTechniques] = React.useState<SelectedTechnique[]>([]);

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      session_date: new Date().toISOString().split('T')[0],
      duration_minutes: 60,
      training_type: 'technique',
      intensity: 3,
      notes: '',
    },
  });

  // Load existing session techniques when editing
  const { data: existingTechniques } = useQuery({
    queryKey: ['session-techniques', editSession?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('session_techniques')
        .select('technique_id, rating, notes, techniques(name)')
        .eq('session_id', editSession!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!editSession?.id && open,
  });

  // Reset form when editSession changes
  React.useEffect(() => {
    if (editSession) {
      form.reset({
        session_date: editSession.session_date,
        duration_minutes: editSession.duration_minutes,
        training_type: editSession.training_type,
        intensity: editSession.intensity,
        notes: editSession.notes || '',
      });
    } else {
      form.reset({
        session_date: new Date().toISOString().split('T')[0],
        duration_minutes: 60,
        training_type: 'technique',
        intensity: 3,
        notes: '',
      });
      setSelectedTechniques([]);
    }
  }, [editSession, form]);

  // Populate selected techniques when loaded
  React.useEffect(() => {
    if (existingTechniques) {
      setSelectedTechniques(
        existingTechniques.map((st: any) => ({
          technique_id: st.technique_id,
          name: st.techniques?.name || '',
          rating: st.rating,
          notes: st.notes,
        }))
      );
    }
  }, [existingTechniques]);

  const mutation = useMutation({
    mutationFn: async (values: SessionFormValues) => {
      let sessionId: string;

      if (editSession) {
        const { error } = await supabase.from('training_sessions')
          .update({
            session_date: values.session_date,
            duration_minutes: values.duration_minutes,
            training_type: values.training_type,
            intensity: values.intensity,
            notes: values.notes || null,
          })
          .eq('id', editSession.id);
        if (error) throw error;
        sessionId = editSession.id;

        // Delete old session_techniques and re-insert
        await supabase.from('session_techniques').delete().eq('session_id', sessionId);
      } else {
        const { data, error } = await supabase.from('training_sessions').insert({
          user_id: user!.id,
          session_date: values.session_date,
          duration_minutes: values.duration_minutes,
          training_type: values.training_type,
          intensity: values.intensity,
          notes: values.notes || null,
        }).select('id').single();
        if (error) throw error;
        sessionId = data.id;
      }

      // Insert session_techniques
      if (selectedTechniques.length > 0) {
        const { error: stError } = await supabase.from('session_techniques').insert(
          selectedTechniques.map((st) => ({
            session_id: sessionId,
            technique_id: st.technique_id,
            rating: st.rating,
            notes: st.notes,
          }))
        );
        if (stError) throw stError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-sessions'] });
      toast.success(editSession ? 'Sessione aggiornata!' : 'Sessione registrata!');
      form.reset();
      setSelectedTechniques([]);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error('Errore nel salvataggio: ' + error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editSession ? 'Modifica Allenamento' : 'Registra Allenamento'}</DialogTitle>
          <DialogDescription>{editSession ? 'Modifica i dettagli della sessione' : 'Inserisci i dettagli della sessione di training'}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))} className="space-y-4">
            <FormField
              control={form.control}
              name="session_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="training_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo di allenamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRAINING_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration_minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durata (minuti)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={600} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intensità: {field.value}/5</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={([v]) => field.onChange(v)}
                    />
                  </FormControl>
                  <div className="pt-1">
                    <IntensityStars value={field.value} readonly />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technique Picker */}
            <TechniquePicker selected={selectedTechniques} onChange={setSelectedTechniques} />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (opzionale)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cosa hai lavorato oggi?"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Salvataggio...' : editSession ? 'Salva Modifiche' : 'Registra Sessione'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
