import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Variables Supabase manquantes : définis VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local'
  );
}

// Instance partagée (singleton) importée dans toute l'app.
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
