import { cn } from "@/lib/utils";

export function MasteryIndicator({ 
  level, 
  size = 'md' 
}: { 
  level: number; 
  size?: 'sm' | 'md' 
}) {
  // Calcola la percentuale (assicurandosi che sia tra 0 e 100)
  const percentage = Math.round(Math.min(Math.max(level * 10, 0), 100));
  
  return (
    <div className="w-full space-y-1">
      <div className={cn(
        "w-full bg-secondary rounded-full overflow-hidden", 
        size === 'sm' ? 'h-1.5' : 'h-2.5'
      )}>
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}