import { BookOpen, TrendingUp, Award, Clock } from 'lucide-react';

export default function Dashboard() {
  const profile = { full_name: 'Atleta', belt: 'Blue', stripes: 2 };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Header con stile Lovable */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Oss, {profile.full_name}! 🥋
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Il tuo viaggio verso la Cintura Nera continua.
          </p>
        </div>
        
        {/* Simulazione BeltBadge */}
        <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-2xl border border-primary/20">
          <div className="h-10 w-24 bg-blue-600 rounded shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center border-y-4 border-black">
            <div className="flex gap-1">
                {[...Array(profile.stripes)].map((_, i) => (
                    <div key={i} className="w-1 h-full bg-white"></div>
                ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground">Grado Attuale</p>
            <p className="font-bold">{profile.belt} Belt</p>
          </div>
        </div>
      </div>

      {/* Grid delle Statistiche */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-glow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <BookOpen size={24} />
            </div>
            <h3 className="font-bold">Tecniche</h3>
          </div>
          <div className="text-3xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-2">4 nuove questa settimana</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <Clock size={24} />
            </div>
            <h3 className="font-bold">Tempo sul mat</h3>
          </div>
          <div className="text-3xl font-bold">48h</div>
          <p className="text-xs text-muted-foreground mt-2">Media: 3 sessioni/sett</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                <Award size={24} />
            </div>
            <h3 className="font-bold">Padronanza</h3>
          </div>
          <div className="text-3xl font-bold">65%</div>
          <div className="w-full bg-secondary h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-amber-500 h-full w-[65%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
