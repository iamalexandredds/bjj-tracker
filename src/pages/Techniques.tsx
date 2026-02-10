import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppLayout } from '@/components/layout/AppLayout';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { BookOpen, Search, ChevronRight } from 'lucide-react';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = TECHNIQUE_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
            <p className="text-muted-foreground">{TECHNIQUE_CATEGORIES.length} categorie</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            + Aggiungi
          </Button>
        </div>

        {/* Barra di Ricerca e Filtri Visivi (senza logica di navigazione) */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full bg-[#111] border-[#222] text-white"
              placeholder="Cerca tecniche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-[#111] border border-[#222] p-2 rounded text-xs text-gray-400">Tutte le difficoltà</div>
            <div className="bg-[#111] border border-[#222] p-2 rounded text-xs text-gray-400">Tutte le modalità</div>
            <div className="bg-[#111] border border-[#222] p-2 rounded text-xs text-gray-400">Tutte le cinture</div>
            <div className="flex bg-[#111] border border-[#222] p-1 rounded">
              <div className="flex-1 bg-[#222] text-[10px] flex items-center justify-center rounded">CATEGORIE</div>
              <div className="flex-1 text-[10px] flex items-center justify-center">GRIGLIA</div>
            </div>
          </div>
        </div>

        {/* Griglia Categorie */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card key={category.value} className="bg-[#111] border-[#222] transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg text-white">{category.label}</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-tight">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
