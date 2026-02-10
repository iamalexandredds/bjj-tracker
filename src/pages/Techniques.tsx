import { useState } from 'react';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { Search, ArrowLeft, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/techniques/CategoryCard';
import { AddTechniqueDialog } from '@/components/techniques/AddTechniqueDialog';

export default function Techniques() {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Vista 2: Dettaglio Categoria (Screenshot 2)
  if (selectedCategory) {
    return (
      <div className="space-y-6 p-4 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCategory(null)} 
            className="text-muted-foreground hover:text-white p-0"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna alle categorie
          </Button>
          
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            <Plus className="mr-2 h-4 w-4" /> Aggiungi Tecnica
          </Button>
        </div>

        <div className="mt-4">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-white">
            {selectedCategory.label}
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            {selectedCategory.description}
          </p>
        </div>

        {/* Placeholder Stato Vuoto (Screenshot 2) */}
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-[#222] rounded-2xl bg-[#111]/30 mt-8">
          <h3 className="text-xl font-semibold text-white">Nessuna tecnica trovata</h3>
          <p className="text-muted-foreground mt-2">Inizia aggiungendo la tua prima tecnica per questa categoria.</p>
        </div>

        {/* Il Dialog vero e proprio che hai su VSC */}
        <AddTechniqueDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
        />
      </div>
    );
  }

  // Vista 1: Griglia (Screenshot 1)
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
        <p className="text-muted-foreground">{TECHNIQUE_CATEGORIES.length} categorie</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="w-full bg-[#111] border-[#222] pl-10 h-12 text-white" 
          placeholder="Cerca categoria..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNIQUE_CATEGORIES.filter(c => 
          c.label.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((category) => (
          <CategoryCard 
            key={category.value}
            label={category.label}
            description={category.description}
            techniqueCount={0}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}
