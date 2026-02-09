"use client";

import { ChevronRight } from 'lucide-react';
// Correzione percorso: card minuscolo e import esplicito
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  label: string;
  description: string;
  techniqueCount: number;
  isSelected?: boolean;
  onClick: () => void;
}

export function CategoryCard({
  label,
  description,
  techniqueCount,
  isSelected,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-300 hover:border-primary/50',
        isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'hover:shadow-sm'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-semibold text-sm truncate",
                isSelected && "text-primary"
              )}>
                {label}
              </h3>
              {techniqueCount > 0 && (
                <Badge variant="secondary" className="text-[10px] h-4 px-1 shrink-0">
                  {techniqueCount}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          <ChevronRight className={cn(
            'h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200',
            isSelected && 'text-primary rotate-90'
          )} />
        </div>
      </CardContent>
    </Card>
  );
}