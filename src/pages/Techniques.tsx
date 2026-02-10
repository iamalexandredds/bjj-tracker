import { useState } from 'react';
import * as Constants from '@/lib/constants'; // Import totale per sicurezza
import { Search, ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/techniques/CategoryCard';
import { AddTechniqueDialog } from '@/components/techniques/AddTechniqueDialog';

export default function Techniques() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Accesso sicuro alle costanti (evita crash se TECHNIQUE_CATEGORIES è undefined)
  const categories = Constants.TECHNIQUE_CATEGORIES || [];
  
  const filtered = categories.filter(c => 
    c.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render Dettaglio Categoria
  if (selectedCategory) {
    return (
      <div className="space-y-6 p-4 text-white animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="p-0 hover:bg-transparent text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna alle categorie
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Aggiungi Tecnica
          </Button>
        </div>
        <div>
          <h1 className="text-4xl font-bold uppercase">{selectedCategory.label}</h1>
          <p className="text-muted-foreground mt-2">{selectedCategory.description}</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
          <p className="text-muted-foreground">Nessuna tecnica ancora registrata.</p>
        </div>
        <AddTechniqueDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    );
  }

  // Render Griglia Principale
  return (
    <div className="space-y-6 p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input 
          className="bg-zinc-900 border-zinc-800 pl-10 text-white" 
          placeholder="Cerca categoria..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat) => (
          <CategoryCard 
            key={cat.value}
            label={cat.label}
            description={cat.description}
            techniqueCount={0}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>
    </div>
  );
}
