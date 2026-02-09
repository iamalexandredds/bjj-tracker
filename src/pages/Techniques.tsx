"use client";

import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { BookOpen, Search } from 'lucide-react';
import { useState } from 'react';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = TECHNIQUE_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Libreria Tecniche</h1>
          <p className="text-muted-foreground">Esplora le {TECHNIQUE_CATEGORIES.length} categorie fondamentali.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Cerca per nome o descrizione..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card key={category.value} className="hover:border-primary transition-colors cursor-pointer group">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">{category.label}</CardTitle>
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
  );
}