"use client";

import { cn } from '@/lib/utils';
import type { BeltLevel } from '@/lib/constants';

interface BeltBadgeProps {
  belt: BeltLevel;
  stripes?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const beltConfig: Record<BeltLevel, { label: string; className: string }> = {
  bianca: {
    label: 'Bianca',
    className: 'bg-slate-100 text-slate-900 border border-slate-300',
  },
  blu: {
    label: 'Blu',
    className: 'bg-blue-600 text-white',
  },
  viola: {
    label: 'Viola',
    className: 'bg-purple-600 text-white',
  },
  marrone: {
    label: 'Marrone',
    className: 'bg-amber-900 text-white',
  },
  nera: {
    label: 'Nera',
    className: 'bg-slate-950 text-white border border-amber-500',
  },
};

const sizeConfig = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

export function BeltBadge({
  belt,
  stripes = 0,
  size = 'md',
  showLabel = true,
  className,
}: BeltBadgeProps) {
  // Fallback sicuro se belt non viene passata correttamente
  const config = beltConfig[belt] || beltConfig.bianca;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md font-bold uppercase tracking-tighter shadow-sm',
        config.className,
        sizeConfig[size],
        className
      )}
    >
      {showLabel && <span>{config.label}</span>}
      {stripes > 0 && (
        <div className="flex gap-0.5 ml-1 border-l pl-1 border-current/20">
          {Array.from({ length: stripes }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-3 w-1 rounded-sm',
                belt === 'bianca' ? 'bg-slate-800' : 'bg-white'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}