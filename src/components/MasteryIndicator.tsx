import { cn } from "@/lib/utils";

interface MasteryIndicatorProps {
  level: number;
  className?: string;
}

export const MasteryIndicator = ({ level, className }: MasteryIndicatorProps) => {
  // Crea 5 barrette, colorate in base al livello di maestria (1-5)
  return (
    <div className={cn("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={cn(
            "h-1.5 w-3 rounded-full transition-colors",
            step <= level ? "bg-blue-500" : "bg-zinc-800"
          )}
        />
      ))}
    </div>
  );
};
