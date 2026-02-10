import { createClient } from '@supabase/supabase-js';

// Prende i dati dai Secrets di Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica se l'URL è valido prima di creare il client
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('https://');

export const supabase = isValidUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

if (!isValidUrl) {
  console.error("Errore: Supabase URL non valido o mancante nei Secrets.");
}
