import { createClient } from '@supabase/supabase-js';

// Legge dai Secrets di Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Se mancano le chiavi, esporta un client "vuoto" per evitare lo schermo nero
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {} as any; 

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase: Chiavi mancanti nei Secrets. L'app potrebbe non funzionare correttamente.");
}
