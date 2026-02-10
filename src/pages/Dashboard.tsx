import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BeltBadge } from '@/components/ui/BeltBadge';
import { MasteryIndicator } from '@/components/ui/MasteryIndicator';
import { 
  BookOpen, 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  Plus,
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // DATI TEMPORANEI PER EVITARE CRASH (Bypass useAuth)
  const profile = { full_name: "Atleta BJJ", belt: "brown", stripes: 2 };
  const role = "user";

  const stats = {
    techniquesLearned: 12,
    trainingHours: 45,
    activeGoals: 3,
    weeklyProgress: 65,
  };

  return (
    <div className="space-y-8 animate-fade-in p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Benvenuto, {profile.full_name.split(' ')[0]}! 🥋
          </h1>
          <p className="text-muted-foreground mt-1">
            Traccia il tuo percorso nel Brazilian Jiu-Jitsu
          </p>
        </div>
        <BeltBadge belt={profile.belt} stripes={profile.stripes} size="lg" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Tecniche</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.techniquesLearned}</div>
            <p className="text-xs text-muted-foreground mt-1">su 31 categorie</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Ore</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.trainingHours}</div>
            <p className="text-xs text-muted-foreground mt-1">questo mese</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Obiettivi</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeGoals}</div>
            <p className="text-xs text-muted-foreground mt-1">attivi ora</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Progresso</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.weeklyProgress}%</div>
            <div className="mt-2">
              <MasteryIndicator level={stats.weeklyProgress} size="sm" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold">
              <Calendar className="h-5 w-5 text-primary" /> Nuovo Allenamento
            </CardTitle>
            <p className="text-sm text-muted-foreground">Registra una nuova sessione di training</p>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary hover:opacity-90 transition-opacity">
              <Link to="/training/new">
                <Plus className="mr-2 h-4 w-4" /> Registra Allenamento
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold">
              <BookOpen className="h-5 w-5 text-purple-500" /> Esplora Tecniche
            </CardTitle>
            <p className="text-sm text-muted-foreground">Sfoglia la libreria delle 31 categorie BJJ</p>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild className="w-full">
              <Link to="/techniques">
                Vai alla Libreria <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-bold">
              <Target className="h-5 w-5 text-orange-500" /> Imposta Obiettivo
            </CardTitle>
            <p className="text-sm text-muted-foreground">Crea un nuovo obiettivo da raggiungere</p>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild className="w-full">
              <Link to="/goals/new">
                <Plus className="mr-2 h-4 w-4" /> Nuovo Obiettivo
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Belt Progress */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bold">
            <TrendingUp className="h-5 w-5 text-yellow-600" /> Il Tuo Percorso
          </CardTitle>
          <p className="text-sm text-muted-foreground">Progresso verso la prossima cintura</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <BeltBadge belt={profile.belt} stripes={profile.stripes} />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progresso cintura attuale</span>
                <span className="font-medium">{profile.stripes}/4 gradi</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(profile.stripes / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
