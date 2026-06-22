import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Certification } from '../lib/database.types';

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) setError(error.message);
    else setCertifications((data as Certification[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  return { certifications, loading, error, refetch: fetchCertifications };
}
