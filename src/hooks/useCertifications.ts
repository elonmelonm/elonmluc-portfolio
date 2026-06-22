import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Certification } from '../lib/database.types';

export function useCertifications(includeHidden = false) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase.from('certifications').select('*').order('display_order', { ascending: true });
    if (!includeHidden) query = query.eq('is_visible', true);
    const { data, error } = await query;
    if (error) setError(error.message);
    else setCertifications((data as Certification[]) ?? []);
    setLoading(false);
  }, [includeHidden]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  return { certifications, loading, error, refetch: fetchCertifications };
}
