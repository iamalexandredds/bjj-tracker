import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { BookOpen, Search, ChevronRight } from 'lucide-react';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = TECHNIQUE_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 bg-[#0a0a0a] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Libreria Tecniche</h1>
          <p className="text-muted-foreground">{TECHNIQUE_CATEGORIES.length} categorie disponibili</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
          + Aggiungi Tecnica
        </Button>
      </div>

      {/* Filtri */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full bg-[#111] border-[#222] text-white pl-10"
            placeholder="Cerca tecniche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select className="bg-[#111] border-[#222] text-sm text-gray-300 p-2 rounded-md outline-none">
            <option>Tutte le difficoltà</option>
          </select>
          <select className="bg-[#111] border-[#222] text-sm text-gray-300 p-2 rounded-md outline-none">
            <option>Tutte le modalità</option>
          </select>
          <select className="bg-[#111] border-[#222] text-sm text-gray-300 p-2 rounded-md outline-none">
            <option>Tutte le cinture</option>
          </select>
          <div className="flex bg-[#111] rounded-md border border-[#222] p-1">
            <Button variant="ghost" size="sm" className="flex-1 text-[10px] bg-[#222]">CATEGORIE</Button>
            <Button variant="ghost" size="sm" className="flex-1 text-[10px]">GRIGLIA</Button>
          </div>
        </div>
      </div>

      {/* Griglia Categorie */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.value} className="bg-[#111] border-[#222] hover:border-blue-500/50 transition-all cursor-pointer group">
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
              <p className="text-sm text-muted-foreground leading-tight">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
