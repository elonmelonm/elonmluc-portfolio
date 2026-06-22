import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Experience } from '../lib/database.types';

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) setError(error.message);
    else setExperiences((data as Experience[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  return { experiences, loading, error, refetch: fetchExperiences };
}
