import { ExternalLink, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BeltBadge } from '@/components/BeltBadge';
import { MasteryIndicator } from '@/components/MasteryIndicator';
import { TECHNIQUE_CATEGORIES, DIFFICULTY_LEVELS, TRAINING_MODES } from '@/lib/constants';
import type { Tables } from '@/integrations/supabase/types';

interface TechniqueCardProps {
  technique: Tables<'techniques'>;
  userMastery?: number;
  onClick?: () => void;
}

export function TechniqueCard({ technique, userMastery, onClick }: TechniqueCardProps) {
  const category = TECHNIQUE_CATEGORIES.find((c) => c.value === technique.category);
  const difficulty = DIFFICULTY_LEVELS.find((d) => d.value === technique.difficulty);
  const mode = TRAINING_MODES.find((m) => m.value === technique.mode);

  const getDifficultyColor = () => {
    switch (technique.difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return '';
    }
  };

  const getModeColor = () => {
    switch (technique.mode) {
      case 'gi':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'nogi':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'both':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return '';
    }
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {technique.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {category?.label || technique.category}
            </p>
          </div>
          <BeltBadge belt={technique.min_belt} size="sm" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        {technique.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {technique.description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={getDifficultyColor()}>
            {difficulty?.label || technique.difficulty}
          </Badge>
          <Badge variant="outline" className={getModeColor()}>
            {mode?.label || technique.mode}
          </Badge>
        </div>

        {/* Mastery indicator if user has learned this */}
        {userMastery !== undefined && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Padronanza</span>
              <span className="text-xs font-medium">{userMastery}/10</span>
            </div>
            <MasteryIndicator level={userMastery} size="sm" showLabel={false} />
          </div>
        )}

        {/* Video link if available */}
        {technique.video_url && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-muted-foreground hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              window.open(technique.video_url!, '_blank');
            }}
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Guarda Video
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
