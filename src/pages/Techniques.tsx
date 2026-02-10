import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { BookOpen, Search, ChevronRight, ArrowLeft, Plus } from 'lucide-react';

export default function Techniques() {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. VISTA DETTAGLIO (Screen 2 di Lovable)
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
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
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

        {/* Placeholder "Nessuna tecnica trovata" (Screen 2) */}
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-[#222] rounded-2xl bg-[#111]/30 mt-8">
          <div className="p-5 rounded-full bg-[#1a1a1a] mb-4 border border-[#333]">
            <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-semibold text-white">Nessuna tecnica trovata</h3>
          <p className="text-muted-foreground mt-2">Inizia aggiungendo la tua prima tecnica per questa categoria.</p>
        </div>
      </div>
    );
  }

  // 2. VISTA GRIGLIA PRINCIPALE (Screen 1)
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
        {TECHNIQUE_CATEGORIES.filter(c => c.label.toLowerCase().includes(searchTerm.toLowerCase())).map((category) => (
          <Card 
            key={category.value} 
            className="bg-[#111] border-[#222] hover:border-blue-500/50 cursor-pointer transition-all group active:scale-[0.98]"
            onClick={() => setSelectedCategory(category)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
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
