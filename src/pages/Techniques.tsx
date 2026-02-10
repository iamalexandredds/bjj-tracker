import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Grid3X3, List, BookOpen } from 'lucide-react';
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
import type { Tables } from '@/integrations/supabase/types';

type ViewMode = 'categories' | 'grid';

export default function Techniques() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [beltFilter, setBeltFilter] = useState('all');
  const [selectedTechnique, setSelectedTechnique] = useState<Tables<'techniques'> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Fetch all techniques
  const { data: techniques, isLoading: techniquesLoading } = useQuery({
    queryKey: ['techniques'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('techniques')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch user's learned techniques
  const { data: userTechniques } = useQuery({
    queryKey: ['user-techniques', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('user_techniques')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Create a map of technique_id -> user_technique for quick lookup
  const userTechniqueMap = useMemo(() => {
    const map = new Map<string, Tables<'user_techniques'>>();
    userTechniques?.forEach((ut) => {
      map.set(ut.technique_id, ut);
    });
    return map;
  }, [userTechniques]);

  // Count techniques per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    techniques?.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [techniques]);

  // Filter techniques
  const filteredTechniques = useMemo(() => {
    if (!techniques) return [];

    return techniques.filter((technique) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          technique.name.toLowerCase().includes(query) ||
          technique.description?.toLowerCase().includes(query) ||
          technique.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && technique.category !== categoryFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== 'all' && technique.difficulty !== difficultyFilter) {
        return false;
      }

      // Mode filter
      if (modeFilter !== 'all' && technique.mode !== modeFilter && technique.mode !== 'both') {
        return false;
      }

      // Belt filter
      if (beltFilter !== 'all') {
        const beltOrder = ['bianca', 'blu', 'viola', 'marrone', 'nera'];
        const techBeltIndex = beltOrder.indexOf(technique.min_belt);
        const filterBeltIndex = beltOrder.indexOf(beltFilter);
        if (techBeltIndex > filterBeltIndex) return false;
      }

      return true;
    });
  }, [techniques, searchQuery, categoryFilter, difficultyFilter, modeFilter, beltFilter]);

  const handleTechniqueClick = (technique: Tables<'techniques'>) => {
    setSelectedTechnique(technique);
    setDialogOpen(true);
  };

  const handleCategoryClick = (categoryValue: string) => {
    setCategoryFilter(categoryValue);
    setViewMode('grid');
  };

  const selectedUserTechnique = selectedTechnique 
    ? userTechniqueMap.get(selectedTechnique.id) 
    : null;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Libreria Tecniche</h1>
            <p className="text-muted-foreground">
              {techniques?.length || 0} tecniche disponibili in {TECHNIQUE_CATEGORIES.length} categorie
            </p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Tecnica
          </Button>
        </div>

        {/* Filters */}
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

        {/* View mode toggle */}
        <div className="flex items-center justify-between">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList>
              <TabsTrigger value="categories" className="gap-2">
                <List className="h-4 w-4" />
                Categorie
              </TabsTrigger>
              <TabsTrigger value="grid" className="gap-2">
                <Grid3X3 className="h-4 w-4" />
                Griglia
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {viewMode === 'grid' && (
            <p className="text-sm text-muted-foreground">
              {filteredTechniques.length} risultati
            </p>
          )}
        </div>

        {/* Content */}
        {techniquesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : viewMode === 'categories' ? (
          /* Categories view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECHNIQUE_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.value}
                label={category.label}
                description={category.description}
                techniqueCount={categoryCounts[category.value] || 0}
                isSelected={categoryFilter === category.value}
                onClick={() => handleCategoryClick(category.value)}
              />
            ))}
          </div>
        ) : (
          /* Grid view */
          <>
            {filteredTechniques.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nessuna tecnica trovata</h3>
                <p className="text-muted-foreground mb-4">
                  Prova a modificare i filtri o aggiungi nuove tecniche
                </p>
                <Button onClick={() => setAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi Tecnica
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTechniques.map((technique) => (
                  <TechniqueCard
                    key={technique.id}
                    technique={technique}
                    userMastery={userTechniqueMap.get(technique.id)?.mastery_level}
                    onClick={() => handleTechniqueClick(technique)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Dialog */}
      <TechniqueDetailDialog
        technique={selectedTechnique}
        userTechnique={selectedUserTechnique}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        canEdit={selectedTechnique?.created_by === user?.id}
      />

      {/* Add Technique Dialog */}
      <AddTechniqueDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
    </AppLayout>
  );
}
