import { useState } from 'react';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/techniques/CategoryCard';
import { AddTechniqueDialog } from '@/components/techniques/AddTechniqueDialog';

export default function Techniques() {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Vista Dettaglio Categoria (Screenshot 2)
  if (selectedCategory) {
    return (
      <div className="space-y-6 p-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="text-muted-foreground p-0">
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna alle categorie
          </Button>
          
          {/* Questo apre il form dello Screenshot 3 */}
          <AddTechniqueDialog defaultCategory={selectedCategory.value} />
        </div>

        <div className="mt-4">
          <h1 className="text-4xl font-bold uppercase text-white">{selectedCategory.label}</h1>
          <p className="text-muted-foreground text-lg">{selectedCategory.description}</p>
        </div>

        {/* Placeholder vuoto come da Screenshot 2 */}
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-[#222] rounded-2xl bg-[#111]/30">
          <h3 className="text-xl font-semibold text-white">Nessuna tecnica trovata</h3>
          <p className="text-muted-foreground mt-2">Inizia aggiungendo la tua prima tecnica.</p>
        </div>
      </div>
    );
  }

  // Vista Griglia (Screenshot 1)
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="bg-[#111] border-[#222] pl-10 h-12 text-white" 
          placeholder="Cerca categoria..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNIQUE_CATEGORIES.filter(c => c.label.toLowerCase().includes(searchTerm.toLowerCase())).map((category) => (
          <CategoryCard 
            key={category.value} 
            category={category} 
            onClick={() => setSelectedCategory(category)} 
          />
        ))}
      </div>
    </div>
  );
}
