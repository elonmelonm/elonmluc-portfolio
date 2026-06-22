import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SESSION_KEY = 'tracked_paths';

function alreadyTracked(path: string): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const set = new Set<string>(raw ? JSON.parse(raw) : []);
    if (set.has(path)) return true;
    set.add(path);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify([...set]));
    return false;
  } catch {
    return false;
  }
}

// Enregistre une vue par chemin (dédupliqué par session). Fire-and-forget,
// jamais bloquant, erreurs silencieuses. Garde aussi la base Supabase chaude.
export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (alreadyTracked(path)) return;
    supabase
      .from('page_views')
      .insert({ path, referrer: document.referrer || null })
      .then(() => {});
  }, [location.pathname]);
}
