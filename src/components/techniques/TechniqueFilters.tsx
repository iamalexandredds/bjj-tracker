import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  difficultyFilter,
  onDifficultyChange,
  modeFilter,
  onModeChange,
  beltFilter,
  onBeltChange,
}: TechniqueFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca tecniche..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter selects */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le categorie</SelectItem>
            {TECHNIQUE_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficultyFilter} onValueChange={onDifficultyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Difficoltà" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le difficoltà</SelectItem>
            {DIFFICULTY_LEVELS.map((diff) => (
              <SelectItem key={diff.value} value={diff.value}>
                {diff.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={modeFilter} onValueChange={onModeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Modalità" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le modalità</SelectItem>
            {TRAINING_MODES.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={beltFilter} onValueChange={onBeltChange}>
          <SelectTrigger>
            <SelectValue placeholder="Cintura min." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le cinture</SelectItem>
            {BELT_LEVELS.map((belt) => (
              <SelectItem key={belt.value} value={belt.value}>
                {belt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
