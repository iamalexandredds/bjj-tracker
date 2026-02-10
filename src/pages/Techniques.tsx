"use client";

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Grid3X3, List, BookOpen, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { TechniqueFilters } from '@/components/techniques/TechniqueFilters';
import { TechniqueCard } from '@/components/techniques/TechniqueCard';
import { CategoryCard } from '@/components/techniques/CategoryCard';
import { TechniqueDetailDialog } from '@/components/techniques/TechniqueDetailDialog';
import { AddTechniqueDialog } from '@/components/techniques/AddTechniqueDialog';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type ViewMode = 'categories' | 'grid';

export default function Techniques() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [beltFilter, setBeltFilter] = useState('all');
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // 1. Fetch tecniche con protezione anti-crash
  const { data: techniques, isLoading: techniquesLoading } = useQuery({
    queryKey: ['techniques'],
    queryFn: async () => {
      if (!supabase?.from) return []; // Se supabase non è pronto, ritorna array vuoto
      const { data, error } = await supabase
        .from('techniques')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!supabase?.from
  });

  // 2. Conteggio tecniche per categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    techniques?.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [techniques]);

  // 3. Filtro tecniche
  const filteredTechniques = useMemo(() => {
    if (!techniques) return [];
    return techniques.filter((t) => {
      const matchesSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'all' || t.category === categoryFilter;
      const matchesDiff = difficultyFilter === 'all' || t.difficulty === difficultyFilter;
      const matchesMode = modeFilter === 'all' || t.mode === modeFilter || t.mode === 'both';
      return matchesSearch && matchesCat && matchesDiff && matchesMode;
    });
  }, [techniques, searchQuery, categoryFilter, difficultyFilter, modeFilter]);

  const handleCategoryClick = (categoryValue: string) => {
    setCategoryFilter(categoryValue);
    setViewMode('grid');
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Libreria Tecniche</h1>
            <p className="text-zinc-400">
              {techniques?.length || 0} tecniche in {TECHNIQUE_CATEGORIES.length} categorie
            </p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Aggiungi Tecnica
          </Button>
        </div>

        <TechniqueFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          modeFilter={modeFilter}
          onModeChange={setModeFilter}
          beltFilter={beltFilter}
          onBeltChange={setBeltFilter}
        />

        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList className="bg-zinc-900 border-zinc-800">
            <TabsTrigger value="categories"><List className="h-4 w-4 mr-2" /> Categorie</TabsTrigger>
            <TabsTrigger value="grid"><Grid3X3 className="h-4 w-4 mr-2" /> Griglia</TabsTrigger>
          </TabsList>
        </Tabs>

        {techniquesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 bg-zinc-900" />)}
          </div>
        ) : viewMode === 'categories' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECHNIQUE_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.value}
                label={cat.label}
                description={cat.description}
                techniqueCount={categoryCounts[cat.value] || 0}
                onClick={() => handleCategoryClick(cat.value)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTechniques.map((tech) => (
              <TechniqueCard
                key={tech.id}
                technique={tech}
                onClick={() => { setSelectedTechnique(tech); setDialogOpen(true); }}
              />
            ))}
          </div>
        )}
      </div>

      <TechniqueDetailDialog
        technique={selectedTechnique}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <AddTechniqueDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </AppLayout>
  );
}
