"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { type User } from '@supabase/supabase-js';

// Definiamo un'interfaccia per il Profilo basata sulle tue costanti
interface Profile {
  id: string;
  role: string;
  full_name?: string;
  avatar_url?: string;
  belt?: string;
}

const AuthContext = createContext<{ 
  user: User | null; 
  profile: Profile | null; 
  role: string | null; 
  isLoading: boolean; 
  signOut: () => Promise<void> 
}>({
  user: null, profile: null, role: null, isLoading: true, signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setIsLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (!error) setProfile(data);
    } catch (e) {
      console.error("Error fetching profile:", e);
    } finally {
      setIsLoading(false);
    }
  }

  const signOut = async () => { await supabase.auth.signOut(); };

  return (
    <AuthContext.Provider value={{ user, profile, role: profile?.role || 'practitioner', isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);