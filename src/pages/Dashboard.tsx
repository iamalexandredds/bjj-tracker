import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BeltBadge } from '@/components/BeltBadge';
import { MasteryIndicator } from '@/components/MasteryIndicator';
import { 
  BookOpen, 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Plus,
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { profile, role } = useAuth();

  // Mock stats for now - will be replaced with real data
  const stats = {
    techniquesLearned: 0,
    trainingHours: 0,
    activeGoals: 0,
    weeklyProgress: 0,
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Benvenuto, {profile?.full_name?.split(' ')[0] || 'Praticante'}! 🥋
            </h1>
            <p className="text-muted-foreground mt-1">
              {role === 'coach' ? 'Gestisci i tuoi studenti e monitora i progressi' : 'Traccia il tuo percorso nel Brazilian Jiu-Jitsu'}
            </p>
          </div>
          {profile && (
            <BeltBadge belt={profile.belt} stripes={profile.stripes} size="lg" />
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tecniche Apprese
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.techniquesLearned}</div>
              <p className="text-xs text-muted-foreground">
                su 31 categorie disponibili
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ore di Allenamento
              </CardTitle>
              <Clock className="h-4 w-4 text-[#22c55e]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.trainingHours}</div>
              <p className="text-xs text-muted-foreground">
                questo mese
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Obiettivi Attivi
              </CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGoals}</div>
              <p className="text-xs text-muted-foreground">
                in corso
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progresso Settimanale
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.weeklyProgress}%</div>
              <MasteryIndicator level={stats.weeklyProgress / 10} size="sm" showLabel={false} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Nuovo Allenamento
              </CardTitle>
              <CardDescription>Registra una nuova sessione di training</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/training/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Registra Allenamento
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-belt-purple" />
                Esplora Tecniche
              </CardTitle>
              <CardDescription>Sfoglia la libreria delle 31 categorie BJJ</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/techniques">
                  Vai alla Libreria
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-warning" />
                Imposta Obiettivo
              </CardTitle>
              <CardDescription>Crea un nuovo obiettivo da raggiungere</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" asChild className="w-full">
                <Link to="/goals/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuovo Obiettivo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Belt Progress */}
        {profile && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-belt-gold" />
                Il Tuo Percorso
              </CardTitle>
              <CardDescription>Progresso verso la prossima cintura</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <BeltBadge belt={profile.belt} stripes={profile.stripes} />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso cintura attuale</span>
                    <span className="font-medium">{profile.stripes}/4 gradi</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-belt-purple transition-all duration-500"
                      style={{ width: `${(profile.stripes / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

