"use client";

import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BeltBadge } from '@/components/ui/BeltBadge';
import { MasteryIndicator } from '../components/ui/MasteryIndicator';
import { BookOpen, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { profile, role } = useAuth();
  const stats = { techniquesLearned: 0, weeklyProgress: 0 };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Benvenuto, {profile?.full_name?.split(' ')[0] || 'Praticante'}! 🥋
            </h1>
            <p className="text-muted-foreground mt-1">
              {role === 'coach' ? 'Gestione Studenti' : 'Traccia il tuo percorso BJJ'}
            </p>
          </div>
          {profile && <BeltBadge belt={profile.belt} stripes={profile.stripes} size="lg" />}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tecniche</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.techniquesLearned}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Progresso</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.weeklyProgress}%</div>
              <MasteryIndicator level={stats.weeklyProgress} size="sm" />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}