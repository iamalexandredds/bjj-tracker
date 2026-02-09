"use client"; 

import { ReactNode } from 'react';
// FIX: Assicurati che AppSidebar usi export function AppSidebar...
import { AppSidebar } from './AppSidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar fissa a sinistra */}
      <AppSidebar />
      
      {/* Contenuto principale */}
      <main className="pl-64 min-h-screen transition-all duration-300">
        <div className="container py-6 px-8 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}