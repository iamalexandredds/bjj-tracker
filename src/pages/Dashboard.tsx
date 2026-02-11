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

  const stats = {
    techniquesLearned: 0,
    trainingHours: 0,
    activeGoals: 0,
    weeklyProgress: 0,
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header con Badge Cintura */}
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
            <div className="animate-scale-in">
               <BeltBadge belt={profile.belt} stripes={profile.stripes} size="lg" />
            </div>
          )}
        </div>

        {/* Stats Grid con Icone Colorate */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-glow bg-card border-border hover:border-blue-500/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tecniche Apprese
              </CardTitle>
              <BookOpen className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.techniquesLearned}</div>
              <p className="text-xs text-muted-foreground">su 31 categorie disponibili</p>
            </CardContent>
          </Card>

          <Card className="card-glow bg-card border-border hover:border-green-500/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ore di Allenamento
              </CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.trainingHours}</div>
              <p className="text-xs text-muted-foreground">questo mese</p>
            </CardContent>
          </Card>

          <Card className="card-glow bg-card border-border hover:border-amber-500/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Obiettivi Attivi
              </CardTitle>
              <Target className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGoals}</div>
              <p className="text-xs text-muted-foreground">in corso</p>
            </CardContent>
          </Card>

          <Card className="card-glow bg-card border-border hover:border-sky-500/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Progresso Settimanale
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-sky-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.weeklyProgress}%</div>
              <MasteryIndicator level={stats.weeklyProgress / 10} size="sm" showLabel={false} />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Nuovo Allenamento
              </CardTitle>
              <CardDescription>Registra una nuova sessione di training</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/training/new">
                  <Plus className="mr-2 h-
