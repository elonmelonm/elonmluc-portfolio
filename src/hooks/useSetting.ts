import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Lit un réglage clé/valeur (ex: 'cv_url'). Lecture publique via RLS.
export function useSetting(key: string) {
  const [value, setValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSetting = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();
    setValue(data?.value ?? null);
    setLoading(false);
  }, [key]);

  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  return { value, loading, refetch: fetchSetting };
}
