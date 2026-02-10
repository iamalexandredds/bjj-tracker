import { createClient } from '@supabase/supabase-js';

// Queste sono le tue chiavi specifiche
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zwwmzmoliiharftzodse.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d216bW9saWloYXJmdHpvZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzE3NDAsImV4cCI6MjA4NjMwNzc0MH0.xuvQaWUOGa25mESKXDonwneG2Tkd2f576F6lx9q4mRs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
