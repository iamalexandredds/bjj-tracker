import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Search, Plus } from 'lucide-react';
import { useState } from 'react';

const ALL_CATEGORIES = [
  { label: "Takedowns", description: "Tecniche per portare l'avversario a terra." },
  { label: "Guardia Chiusa", description: "Posizione fondamentale di controllo da sotto." },
  { label: "Guardia Aperta", description: "Tecniche di controllo a distanza con piedi e gambe." },
  { label: "Mezza Guardia", description: "Posizioni di controllo e transizione." },
  { label: "Montada (Mount)", description: "Posizione dominante da sopra." },
  { label: "Controllo Laterale", description: "Posizione di controllo a terra essenziale." },
  { label: "Ginocchio sullo Stomaco", description: "Posizione di transizione e pressione." },
  { label: "Presa della Schiena", description: "Posizione di controllo dominante strategica." },
  { label: "Passaggio di Guardia", description: "Tecniche per superare le gambe." },
  { label: "Ribaltamenti (Sweeps)", description: "Invertire la posizione dalla guardia." },
  { label: "Sottomissioni (Armlocks)", description: "Finalizzazioni a gomito e spalla." },
  { label: "Sottomissioni (Leglocks)", description: "Attacchi a caviglie, ginocchia e talloni." },
  { label: "Strangolamenti (Chokes)", description: "Interruzione del flusso sanguigno o aria." },
  { label: "Fughe e Difese", description: "Uscire da posizioni svantaggiose." },
  { label: "Tecniche Avanzate", description: "Berimbolo, Worm Guard, Truck, Matrix." },
  { label: "Grip Fighting", description: "Concetti di grip durante le lotte." },
  { label: "Transizioni", description: "Cambi di posizione e direzione." },
  { label: "Control Retention", description: "Mantenimento delle posizioni dominanti." },
  { label: "Guard Retention", description: "Hip escape, granby, inversioni difensive." },
  { label: "Standing to Ground", description: "Transizioni dalla posizione eretta." },
  { label: "De La Riva", description: "Hook attorno alla gamba per squilibrio." },
  { label: "Reverse DLR", description: "Presa rovesciata rispetto alla DLR standard." },
  { label: "Single Leg X", description: "Controllo gamba singola per sweep." },
  { label: "X-Guard", description: "Efficace per sbilanciare e ribaltare." },
  { label: "K-Guard", description: "Combinazione di hook e prese per attacchi." },
  { label: "50/50", description: "Posizione con gambe intrecciate simmetricamente." },
  { label: "Worm Guard", description: "Utilizzo del bavero per sweep e back takes." },
  { label: "Lasso Guard", description: "Controllo forte di un braccio avversario." },
  { label: "Bodylock Passing", description: "Blocco del corpo per superare le gambe." },
  { label: "Leg Pummeling", description: "Controllo spazio interno delle gambe." },
  { label: "Wrestling Scrambles", description: "Granby, switch, peek-out, turtle retention." }
];

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = ALL_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display">Libreria Tecniche</h1>
          <p className="text-muted-foreground">{ALL_CATEGORIES.length} categorie disponibili</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all">
          <Plus size={20} /> Aggiungi Tecnica
        </button>
      </div>

      {/* Barra di Ricerca stile Lovable */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          className="w-full bg-[#1A1A1A] border border-border rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none"
          placeholder="Cerca tecniche..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid Completa */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat, i) => (
          <Card key={i} className="bg-[#1A1A1A] border-border hover:border-primary/50 cursor-pointer transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">{cat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{cat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
