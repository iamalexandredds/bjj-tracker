import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { BookOpen, Search, ChevronRight, ArrowLeft, Plus, Video } from 'lucide-react';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCategories = TECHNIQUE_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vista 1: Griglia delle 31 Categorie
  if (!selectedCategory) {
    return (
      <div className="space-y-6 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Libreria Tecniche</h1>
            <p className="text-muted-foreground">{TECHNIQUE_CATEGORIES.length} categorie disponibili</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="w-full bg-[#111] border-[#222] pl-10 h-12" 
            placeholder="Cerca categoria..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card 
              key={category.value} 
              className="bg-[#111] border-[#222] hover:border-blue-500/50 cursor-pointer transition-all group"
              onClick={() => setSelectedCategory(category)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg text-white">{category.label}</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Vista 2: Dettaglio Categoria (Screenshot 2 e 3)
  return (
    <div className="space-y-6 p-4 text-white">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="text-muted-foreground hover:text-white p-0">
          <ArrowLeft className="mr-2 h-4 w-4" /> Torna alle categorie
        </Button>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
              <Plus className="mr-2 h-4 w-4" /> Aggiungi Tecnica
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f0f0f] border-[#222] text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Nuova Tecnica: {selectedCategory.label}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome Tecnica *</label>
                <Input placeholder="es. Double Leg Takedown" className="bg-[#111] border-[#333]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficoltà</label>
                  <select className="w-full bg-[#111] border-[#333] p-2 rounded-md text-sm outline-none"><option>Base</option><option>Intermedio</option><option>Avanzato</option></select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modalità</label>
                  <select className="w-full bg-[#111] border-[#333] p-2 rounded-md text-sm outline-none"><option>Entrambi</option><option>Gi</option><option>No-Gi</option></select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link Video (YouTube)</label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="https://..." className="bg-[#111] border-[#333] pl-10" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Annulla</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Salva Tecnica</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h1 className="text-3xl font-bold uppercase">{selectedCategory.label}</h1>
        <p className="text-muted-foreground">{selectedCategory.description}</p>
      </div>

      {/* Stato Vuoto (Screenshot 2) */}
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#222] rounded-xl bg-[#111]/50">
        <div className="p-4 rounded-full bg-[#222] mb-4">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold">Nessuna tecnica trovata</h3>
        <p className="text-muted-foreground text-sm">Inizia aggiungendo la tua prima tecnica per questa categoria.</p>
      </div>
    </div>
  );
}
