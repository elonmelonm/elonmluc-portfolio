import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { PageView } from '../../lib/database.types';

interface PathCount {
  path: string;
  views: number;
}

export default function StatsView() {
  const [total, setTotal] = useState<number | null>(null);
  const [byPath, setByPath] = useState<PathCount[]>([]);
  const [recent, setRecent] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const [countRes, byPathRes, recentRes] = await Promise.all([
        supabase.from('page_views').select('*', { count: 'exact', head: true }),
        supabase.rpc('views_by_path'),
        supabase
          .from('page_views')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      if (countRes.error || byPathRes.error || recentRes.error) {
        setError(
          countRes.error?.message ||
            byPathRes.error?.message ||
            recentRes.error?.message ||
            'Erreur'
        );
      } else {
        setTotal(countRes.count ?? 0);
        setByPath((byPathRes.data as PathCount[]) ?? []);
        setRecent((recentRes.data as PageView[]) ?? []);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Chargement…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-secondary/10 dark:border-white/10">
        <div className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
          Visites totales
        </div>
        <div className="text-4xl font-black text-primary">{total}</div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-secondary dark:text-white mb-3">Vues par page</h3>
        <div className="rounded-2xl border border-secondary/10 dark:border-white/10 overflow-hidden">
          {byPath.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">Aucune donnée.</p>
          ) : (
            byPath.map((row) => (
              <div
                key={row.path}
                className="flex justify-between px-4 py-2.5 text-sm border-b last:border-b-0 border-secondary/10 dark:border-white/10"
              >
                <span className="text-gray-600 dark:text-gray-300">{row.path}</span>
                <span className="font-bold text-secondary dark:text-white">{row.views}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-secondary dark:text-white mb-3">20 dernières visites</h3>
        <div className="rounded-2xl border border-secondary/10 dark:border-white/10 overflow-hidden">
          {recent.map((v) => (
            <div
              key={v.id}
              className="flex justify-between px-4 py-2 text-xs border-b last:border-b-0 border-secondary/10 dark:border-white/10"
            >
              <span className="text-gray-600 dark:text-gray-300">{v.path}</span>
              <span className="text-gray-400">{new Date(v.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
