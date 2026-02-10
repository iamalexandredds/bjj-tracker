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
            <Target className="h-4 w-4 text
