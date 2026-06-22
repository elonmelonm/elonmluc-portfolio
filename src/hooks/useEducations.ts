import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Education } from '../lib/database.types';

export function useEducations() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEducations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) setError(error.message);
    else setEducations((data as Education[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  return { educations, loading, error, refetch: fetchEducations };
}
