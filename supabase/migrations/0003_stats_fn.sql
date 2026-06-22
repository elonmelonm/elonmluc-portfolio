-- Agrégat des vues par chemin, appelable via supabase.rpc('views_by_path').
-- security invoker => respecte la RLS (réservé aux utilisateurs authentifiés).
create or replace function public.views_by_path()
returns table(path text, views bigint)
language sql security invoker as $$
  select path, count(*) as views
  from public.page_views
  group by path
  order by views desc;
$$;
