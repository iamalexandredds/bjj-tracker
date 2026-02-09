import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp } from 'lucide-react';

// Simuliamo i dati per ora, così l'app non crasha se il login non è pronto
const stats = { techniquesLearned: 12, weeklyProgress: 65 };
const profile = { full_name: 'Atleta', belt: 'blue', stripes: 2 };

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display">
            Benvenuto, {profile.full_name}! 🥋
          </h1>
          <p className="text-muted-foreground mt-1">
            Traccia il tuo percorso BJJ
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card border-border shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Tecniche Apprese
            </CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.techniquesLearned}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-glow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Padronanza Settimanale
            </CardTitle>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Padronanza Settimanale
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{stats.weeklyProgress}%</div>
            <div className="w-full bg-secondary h-2 rounded-full mt-4 overflow-hidden">
                <div 
                    className="bg-primary h-full transition-all duration-500" 
                    style={{ width: `${stats.weeklyProgress}%` }}
                />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
