import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, TrendingUp, Calendar, Target, Plus } from 'lucide-react';

export default function Dashboard() {
  // Dati temporanei (per evitare il crash di useAuth)
  const profile = { full_name: 'Praticante', belt: 'brown', stripes: 0 };
  const stats = { techniquesLearned: 0, weeklyProgress: 0 };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Benvenuto, {profile.full_name}! 🥋
          </h1>
          <p className="text-muted-foreground">Traccia il tuo percorso nel Brazilian Jiu-Jitsu</p>
        </div>
        <div className="bg-[#3D2B1F] text-[#E6B17E] px-4 py-1.5 rounded-full text-sm font-bold border border-[#E6B17E]/20 uppercase">
          Cintura {profile.belt}
        </div>
      </div>

      {/* Grid Statistiche */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#121212] border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Tecniche</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.techniquesLearned}</div>
            <p className="text-[10px] text-muted-foreground mt-1">su 31 categorie</p>
          </CardContent>
        </Card>

        <Card className="bg-[#121212] border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Progresso</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.weeklyProgress}%</div>
            <p className="text-[10px] text-muted-foreground mt-1">Trend settimanale</p>
          </CardContent>
        </Card>
      </div>

      {/* Azioni Rapide (Stile Lovable Console) */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-[#121212] p-6 rounded-xl border border-border flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-blue-600/10 rounded-full"><Calendar className="text-blue-500" /></div>
          <h3 className="font-bold uppercase text-sm">Nuovo Allenamento</h3>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
            <Plus size={16} /> Registra
          </button>
        </div>

        <div className="bg-[#121212] p-6 rounded-xl border border-border flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-purple-600/10 rounded-full"><BookOpen className="text-purple-500" /></div>
          <h3 className="font-bold uppercase text-sm">Libreria</h3>
          <button className="w-full bg-[#1E1E1E] hover:bg-[#252525] text-white py-2 rounded-lg text-sm font-medium border border-border transition-colors">
            Sfoglia
          </button>
        </div>

        <div className="bg-[#121212] p-6 rounded-xl border border-border flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-amber-600/10 rounded-full"><Target className="text-amber-500" /></div>
          <h3 className="font-bold uppercase text-sm">Obiettivo</h3>
          <button className="w-full bg-[#1E1E1E] hover:bg-[#252525] text-white py-2 rounded-lg text-sm font-medium border border-border transition-colors">
            Imposta
          </button>
        </div>
      </div>
    </div>
  );
}
