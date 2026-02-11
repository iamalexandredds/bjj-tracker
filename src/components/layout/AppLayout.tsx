import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="pl-64 min-h-screen transition-all duration-300">
        <div className="container py-6 px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
