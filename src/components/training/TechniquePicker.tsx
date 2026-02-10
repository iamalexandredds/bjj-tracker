import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Search } from 'lucide-react';
import { TECHNIQUE_CATEGORIES } from '@/lib/constants';
import { IntensityStars } from '@/components/IntensityStars';

export interface SelectedTechnique {
  technique_id: string;
  name: string;
  rating: number | null;
  notes: string | null;
}

interface TechniquePickerProps {
  selected: SelectedTechnique[];
  onChange: (selected: SelectedTechnique[]) => void;
}

export function TechniquePicker({ selected, onChange }: TechniquePickerProps) {
  const [search, setSearch] = useState('');

  const { data: techniques = [] } = useQuery({
    queryKey: ['techniques-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('techniques')
        .select('id, name, category')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const getCategoryLabel = (cat: string) =>
    TECHNIQUE_CATEGORIES.find((c) => c.value === cat)?.label || cat;

  const filtered = techniques.filter(
    (t) =>
      !selected.some((s) => s.technique_id === t.id) &&
      t.name.toLowerCase().includes(search.toLowerCase())
  );

  const addTechnique = (t: { id: string; name: string }) => {
    onChange([...selected, { technique_id: t.id, name: t.name, rating: null, notes: null }]);
  };

  const removeTechnique = (id: string) => {
    onChange(selected.filter((s) => s.technique_id !== id));
  };

  const updateRating = (id: string, rating: number) => {
    onChange(selected.map((s) => s.technique_id === id ? { ...s, rating } : s));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Tecniche praticate</label>

      {/* Selected techniques */}
      {selected.length > 0 && (
        <div className="space-y-2">
          {selected.map((s) => (
            <div
              key={s.technique_id}
              className="flex items-center justify-between gap-2 rounded-md border px-3 py-2"
            >
              <span className="text-sm font-medium truncate">{s.name}</span>
              <div className="flex items-center gap-2">
                <IntensityStars
                  value={s.rating ?? 0}
                  onChange={(v) => updateRating(s.technique_id, v)}
                  size="sm"
                />
                <button
                  type="button"
                  onClick={() => removeTechnique(s.technique_id)}
                  className="rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search & add */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca tecnica..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {search.length > 0 && (
        <ScrollArea className="h-40 border rounded-md">
          <div className="p-2 space-y-1">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nessuna tecnica trovata</p>
            ) : (
              filtered.slice(0, 20).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { addTechnique(t); setSearch(''); }}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-sm text-left"
                >
                  <span>{t.name}</span>
                  <span className="text-xs text-muted-foreground">{getCategoryLabel(t.category)}</span>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
