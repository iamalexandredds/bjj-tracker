"use client";

import { LayoutDashboard, BookOpen, Trophy, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tecniche', href: '/techniques', icon: BookOpen },
  { name: 'Obiettivi', href: '/goals', icon: Trophy },
  { name: 'Impostazioni', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-zinc-950 border-r border-zinc-800 z-50">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs">BJJ</div>
            BJJ TRACKER
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-600/10 text-blue-500" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-zinc-400 hover:text-red-400 transition-colors text-sm">
            <LogOut className="h-5 w-5" />
            Esci
          </button>
        </div>
      </div>
    </aside>
  );
}
