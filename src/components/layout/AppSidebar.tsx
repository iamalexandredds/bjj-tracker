"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Target,
  Map,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BeltBadge } from '@/components/ui/BeltBadge';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

const practitionerNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/techniques', icon: BookOpen, label: 'Tecniche' },
  { to: '/training', icon: Calendar, label: 'Allenamenti' },
  { to: '/goals', icon: Target, label: 'Obiettivi' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
];

const coachNavItems = [
  { to: '/students', icon: Users, label: 'Studenti' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, profile, role, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    ...practitionerNavItems,
    ...(role === 'coach' ? coachNavItems : []),
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="font-semibold text-lg text-foreground">
                BJJ Tracker
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:bg-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-border p-4">
          {!collapsed && profile && (
            <div className="mb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                {profile.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {profile.full_name || user?.email}
                </p>
                <BeltBadge belt={profile.belt} stripes={profile.stripes} size="sm" />
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'default'}
              className="flex-1 text-muted-foreground hover:bg-accent justify-start"
              asChild
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                {!collapsed && <span className="ml-2">Impostazioni</span>}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}