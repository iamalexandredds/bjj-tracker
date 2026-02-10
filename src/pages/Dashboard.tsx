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
  const profile = { full_name: "Alexandre Dias", belt: "marrone", stripes: 0 };
  
  const stats = [
    { label: "Tecniche Apprese", value: "0", sub: "su 31 categorie", icon: BookOpen, color: "text-blue-500" },
    { label: "Ore di Allenamento", value: "0", sub: "questo mese", icon: Clock, color: "text-green-500" },
    { label: "Obiettivi Attivi", value: "0", sub: "in corso", icon: Target, color: "text-orange-500" },
    { label: "Progresso Settimanale", value: "+0%", sub: "", icon: TrendingUp, color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-[#0a0a0a] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Benvenuto, {profile.full_name.split(' ')[0]}! 🥋</h1>
          <p className="text-muted-foreground">Traccia il tuo percorso nel Brazilian Jiu-Jitsu</p>
        </div>
        <div className="bg-[#3d2b1f] text-[#d48c5c] px-4 py-1 rounded-full font-bold text-sm border border-[#d48c5c]/30">
          MARRONE
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#111] border-[#222] hover:border-white/10 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs font-medium text-muted-foreground uppercase">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-[#111] border-[#222]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-blue-500" /> Nuovo Allenamento
            </CardTitle>
            <p className="text-sm text-muted-foreground">Registra una nuova sessione di training</p>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
              <Link to="/training/new"><Plus className="mr-2 h-4 w-4" /> Registra Allenamento</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-[#222]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-purple-500" /> Esplora Tecniche
            </CardTitle>
            <p className="text-sm text-muted-foreground">Sfoglia la libreria delle 31 categorie BJJ</p>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild className="w-full bg-[#1a1a1a] hover:bg-[#252525] border-none">
              <Link to="/techniques" className="flex items-center justify-center">
                Vai alla Libreria <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-[#222]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-orange-500" /> Imposta Obiettivo
            </CardTitle>
            <p className="text-sm text-muted-foreground">Crea un nuovo obiettivo da raggiungere</p>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild className="w-full bg-[#1a1a1a] hover:bg-[#252525] border-none">
              <Link to="/goals/new"><Plus className="mr-2 h-4 w-4" /> Nuovo Obiettivo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Percorso Cintura */}
      <Card className="bg-[#111] border-[#222]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-yellow-600" /> Il Tuo Percorso
          </CardTitle>
          <p className="text-sm text-muted-foreground">Progresso verso la prossima cintura</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#3d2b1f] text-[#d48c5c] px-6 py-2 rounded-md font-bold border border-[#d48c5c]/30">
              MARRONE
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progresso cintura attuale</span>
                <span className="text-white">0/4 gradi</span>
              </div>
              <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className="h-full bg-[#333] w-0" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
