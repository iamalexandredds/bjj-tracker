"use client";

import React from 'react';
import { ExternalLink, PlayCircle, Calendar, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BeltBadge } from '@/components/ui/BeltBadge'; 
import { MasteryIndicator } from '@/components/ui/MasteryIndicator';
import { TECHNIQUE_CATEGORIES, DIFFICULTY_LEVELS, TRAINING_MODES } from '@/lib/constants';
import type { Database } from '@/integrations/supabase/types';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

type Technique = Database['public']['Tables']['techniques']['Row'];
type UserTechnique = Database['public']['Tables']['user_techniques']['Row'];

interface TechniqueDetailDialogProps {
  technique: Technique | null;
  userTechnique?: UserTechnique | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
}

export function TechniqueDetailDialog({
  technique,
  userTechnique,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  canEdit = false,
}: TechniqueDetailDialogProps) {
  if (!technique) return null;

  const category = TECHNIQUE_CATEGORIES.find((c) => c.value === technique.category);
  const difficulty = DIFFICULTY_LEVELS.find((d) => d.value === technique.difficulty);
  const mode = TRAINING_MODES.find((m) => m.value === technique.mode);

  const getDifficultyColor = () => {
    switch (technique.difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return '';
    }
  };

  const getModeColor = () => {
    switch (technique.mode) {
      case 'gi': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'nogi': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'both': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return '';
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = technique.video_url ? getYouTubeEmbedUrl(technique.video_url) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 text-left">
              <DialogTitle className="text-xl font-bold text-white">{technique.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {category?.label || technique.category}
              </p>
            </div>
            <BeltBadge belt={technique.min_belt as any} size="md" />
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getDifficultyColor()}>
              {difficulty?.label || technique.difficulty}
            </Badge>
            <Badge variant="outline" className={getModeColor()}>
              {mode?.label || technique.mode}
            </Badge>
          </div>

          {technique.description && (
            <div className="space-y-2 text-left">
              <h4 className="text-sm font-medium text-white">Descrizione</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{technique.description}</p>
            </div>
          )}

          {embedUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-black border border-border">
              <iframe 
                src={embedUrl} 
                className="w-full h-full border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            </div>
          )}

          {userTechnique && (
            <>
              <Separator className="bg-border" />
              <div className="space-y-4 text-left">
                <h4 className="text-sm font-medium text-white">I tuoi progressi</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Padronanza</span>
                      <span className="text-sm font-medium text-white">{userTechnique.mastery_level}/10</span>
                    </div>
                    <MasteryIndicator level={userTechnique.mastery_level ?? 0} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Appresa il {userTechnique.learned_at ? format(new Date(userTechnique.learned_at), 'dd MMMM yyyy', { locale: it }) : 'Data non disponibile'}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {canEdit && (
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" /> Modifica
              </Button>
              <Button variant="destructive" size="icon" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}