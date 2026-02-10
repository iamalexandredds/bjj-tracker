import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { Search, BookOpen, Plus } from 'lucide-react';
import { AddTechniqueDialog } from '@/components/techniques/AddTechniqueDialog';
import { Button } from '@/components/ui/button';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = TECHNIQUE_CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-blue-600">
            <Plus className="h-4 w-4 mr-2" /> Aggiungi
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 text-white"
            placeholder="Cerca categoria..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat) => (
            <div key={cat.value} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500 cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-white">{cat.label}</h3>
              </div>
              <p className="text-sm text-zinc-400">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
      <AddTechniqueDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </AppLayout>
  );
}
