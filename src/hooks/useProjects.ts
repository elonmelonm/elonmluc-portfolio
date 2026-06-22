import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Project } from '../lib/database.types';

export function useProjects(includeHidden = false) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    let query = supabase.from('projects').select('*').order('display_order', { ascending: true });
    if (!includeHidden) query = query.eq('is_visible', true);
    const { data, error } = await query;
    if (error) setError(error.message);
    else setProjects((data as Project[]) ?? []);
    setLoading(false);
  }, [includeHidden]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}
