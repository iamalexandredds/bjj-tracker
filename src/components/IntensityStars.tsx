import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IntensityStarsProps {
  value: number; // 1-5
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function IntensityStars({
  value,
  onChange,
  readonly = false,
  size = 'md',
  className,
}: IntensityStarsProps) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={cn(
            'transition-colors duration-200',
            !readonly && 'hover:scale-110 cursor-pointer',
            readonly && 'cursor-default'
          )}
        >
          <Star
            className={cn(
              sizeConfig[size],
              star <= value
                ? 'fill-amber-400 text-amber-400'
                : 'fill-transparent text-muted-foreground/30'
            )}
          />
        </button>
      ))}
    </div>
  );
}
