import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { Search, BookOpen } from 'lucide-react';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (TECHNIQUE_CATEGORIES || []).filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
          <p className="text-zinc-400">Esplora le 31 categorie fondamentali</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 text-white"
            placeholder="Cerca categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat) => (
            <div key={cat.value} className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500 cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-white group-hover:text-blue-400">{cat.label}</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-tight">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
