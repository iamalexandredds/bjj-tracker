import { useState } from 'react';
import * as Constants from '@/lib/constants';
import { Search, ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/techniques/CategoryCard';
import { AddTechniqueDialog } from '@/components/techniques/AddTechniqueDialog';

export default function Techniques() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fallback sicuri per le costanti
  const categories = Constants.TECHNIQUE_CATEGORIES || [];

  const filtered = categories.filter(c => 
    (c.label || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vista Dettaglio
  if (selectedCategory) {
    return (
      <div className="p-4 space-y-6 text-white">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="text-zinc-400 p-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna alle categorie
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600">
            <Plus className="mr-2 h-4 w-4" /> Aggiungi Tecnica
          </Button>
        </div>
        
        <h1 className="text-4xl font-bold uppercase">{selectedCategory.label}</h1>
        
        <div className="py-20 border-2 border-dashed border-zinc-800 rounded-xl text-center text-zinc-500">
          Nessuna tecnica trovata.
        </div>

        <AddTechniqueDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    );
  }

  // Vista Griglia
  return (
    <div className="p-4 space-y-6">
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
