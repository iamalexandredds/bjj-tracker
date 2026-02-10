import { useState, useMemo } from 'react';
import { Plus, Grid3X3, List, BookOpen, Search } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ViewMode = 'categories' | 'grid';

export default function Techniques() {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [beltFilter, setBeltFilter] = useState('all');

  // Filtro logico delle categorie
  const filteredCategories = useMemo(() => {
    return TECHNIQUE_CATEGORIES.filter(cat => 
      cat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
            <p className="text-muted-foreground">
              {TECHNIQUE_CATEGORIES.length} categorie fondamentali
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Tecnica
          </Button>
        </div>

        {/* Barra di Ricerca e Filtri (Screenshot 2) */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome o descrizione..."
              className="pl-10 bg-[#111] border-[#222]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select onValueChange={setDifficultyFilter}>
              <SelectTrigger className="bg-[#111] border-[#222] text-white">
                <SelectValue placeholder="Difficoltà" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le difficoltà</SelectItem>
                <SelectItem value="base">Base</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="avanzato">Avanzato</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setModeFilter}>
              <SelectTrigger className="bg-[#111] border-[#222] text-white">
                <SelectValue placeholder="Modalità" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le modalità</SelectItem>
                <SelectItem value="gi">Gi</SelectItem>
                <SelectItem value="nogi">No-Gi</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setBeltFilter}>
              <SelectTrigger className="bg-[#111] border-[#222] text-white">
                <SelectValue placeholder="Cintura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le cinture</SelectItem>
                <SelectItem value="white">Bianca</SelectItem>
                <SelectItem value="blue">Blu</SelectItem>
                <SelectItem value="purple">Viola</SelectItem>
                <SelectItem value="brown">Marrone</SelectItem>
                <SelectItem value="black">Nera</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2 bg-[#111] p-1 rounded-md border border-[#222]">
               <Button 
                variant={viewMode === 'categories' ? 'secondary' : 'ghost'} 
                className="flex-1 h-8" 
                onClick={() => setViewMode('categories')}
              >
                <List className="h-4 w-4 mr-2" /> Categorie
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                className="flex-1 h-8" 
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4 mr-2" /> Griglia
              </Button>
            </div>
          </div>
        </div>

        {/* Lista Categorie */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card key={category.value} className="bg-[#111] border-[#222] hover:border-blue-500/50 transition-all cursor-pointer group">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-white">{category.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-tight">
                  {category.description}
                </p>
                <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  <span>0 Tecniche</span>
                  <span className="text-blue-500">Esplora →</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
