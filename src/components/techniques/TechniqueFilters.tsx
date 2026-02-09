"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TECHNIQUE_CATEGORIES, DIFFICULTY_LEVELS, TRAINING_MODES, BELT_LEVELS } from '@/lib/constants';

interface TechniqueFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (value: string) => void;
  modeFilter: string;
  onModeChange: (value: string) => void;
  beltFilter: string;
  onBeltChange: (value: string) => void;
}

export function TechniqueFilters({
  searchQuery, onSearchChange, categoryFilter, onCategoryChange,
  difficultyFilter, onDifficultyChange, modeFilter, onModeChange,
  beltFilter, onBeltChange,
}: TechniqueFiltersProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca tecniche..."
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 bg-background"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <FilterSelect label="Categoria" value={categoryFilter} onChange={onCategoryChange} options={TECHNIQUE_CATEGORIES} allLabel="Tutte le categorie" />
        <FilterSelect label="Difficoltà" value={difficultyFilter} onChange={onDifficultyChange} options={DIFFICULTY_LEVELS} allLabel="Tutte le difficoltà" />
        <FilterSelect label="Modalità" value={modeFilter} onChange={onModeChange} options={TRAINING_MODES} allLabel="Tutte le modalità" />
        <FilterSelect label="Cintura" value={beltFilter} onChange={onBeltChange} options={BELT_LEVELS} allLabel="Tutte le cinture" />
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options, allLabel }: any) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((opt: any) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
      </SelectContent>
    </Select>
  );
}