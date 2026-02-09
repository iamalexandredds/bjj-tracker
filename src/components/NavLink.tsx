import Link from 'next/link';
import { cn } from '@/lib/utils';

export function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        active ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent"
      )}
    >
      {children}
    </Link>
  );
}