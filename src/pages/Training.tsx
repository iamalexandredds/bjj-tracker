import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IntensityStars } from '@/components/IntensityStars';
import { AddSessionDialog } from '@/components/training/AddSessionDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Calendar, Clock, Dumbbell, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { TRAINING_TYPES } from '@/lib/constants';
import { toast } from 'sonner';

export default function Training() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [addOpen, setAddOpen] = useState(false);
  const [editSession, setEditSession] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['training-sessions', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('training_sessions')
        .select('*, session_techniques(technique_id, techniques(name))')
        .eq('user_id', user!.id)
        .order('session_date', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const getTypeLabel = (type: string) =>
    TRAINING_TYPES.find((t) => t.value === type)?.label || type;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technique': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'sparring': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'drill': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'conditioning': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return '';
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('training_sessions').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['training-sessions'] });
      toast.success('Sessione eliminata!');
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error('Errore: ' + error.message);
    },
  });

  // Stats
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration_minutes, 0);
  const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Allenamenti</h1>
            <p className="text-muted-foreground mt-1">Registra e monitora le tue sessioni di training</p>
          </div>
          <Button onClick={() => { setEditSession(null); setAddOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Registra Allenamento
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sessioni Totali</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ore Totali</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}h</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Intensità Media</CardTitle>
              <Dumbbell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalSessions > 0
                  ? (sessions.reduce((s, x) => s + x.intensity, 0) / totalSessions).toFixed(1)
                  : '0'}/5
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions list */}
        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Caricamento...</p>
        ) : sessions.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nessun allenamento registrato</h3>
              <p className="text-muted-foreground mb-4">Inizia registrando la tua prima sessione!</p>
              <Button onClick={() => { setEditSession(null); setAddOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Registra Allenamento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <Card key={session.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium">
                        {format(new Date(session.session_date), 'dd MMMM yyyy', { locale: it })}
                      </span>
                      <Badge variant="outline" className={getTypeColor(session.training_type)}>
                        {getTypeLabel(session.training_type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration_minutes} min
                      </span>
                      <IntensityStars value={session.intensity} size="sm" readonly />
                    </div>
                    {(session as any).session_techniques?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(session as any).session_techniques.map((st: any) => (
                          <Badge key={st.technique_id} variant="outline" className="text-xs">
                            {st.techniques?.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {session.notes && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">{session.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => { setEditSession(session); setAddOpen(true); }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(session.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddSessionDialog
        open={addOpen}
        onOpenChange={(open) => { setAddOpen(open); if (!open) setEditSession(null); }}
        editSession={editSession}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminare questa sessione?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. La sessione verrà eliminata definitivamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
