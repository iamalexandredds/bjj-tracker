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
        <div>
          <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
          <p className="text-muted-foreground">Esplora le {TECHNIQUE_CATEGORIES.length} categorie fondamentali.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="w-full bg-[#111] border-[#222] rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary"
            placeholder="Cerca per nome o descrizione..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card key={category.value} className="bg-[#111] border-[#222] hover:border-primary/50 transition-all cursor-pointer group">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg text-white">{category.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-tight mb-4">
                  {category.description}
                </p>
                <div className="flex justify-between items-center text-xs font-bold text-primary uppercase">
                  <span>0 Tecniche</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
