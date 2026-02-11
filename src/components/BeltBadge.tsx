import { cn } from "@/lib/utils";

interface BeltBadgeProps {
  belt: string;
  className?: string;
}

export const BeltBadge = ({ belt, className }: BeltBadgeProps) => {
  const colors: Record<string, string> = {
    white: "bg-zinc-100 text-black",
    blue: "bg-blue-600 text-white",
    purple: "bg-purple-700 text-white",
    brown: "bg-amber-900 text-white",
    black: "bg-zinc-900 text-white border border-zinc-700",
  };

  return (
    <span className={cn(
      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
      colors[belt.toLowerCase()] || "bg-zinc-500 text-white",
      className
    )}>
      {belt}
    </span>
  );
};
