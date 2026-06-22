-- Row Level Security : la vraie frontière de sécurité (la clé anon est publique).

alter table public.projects     enable row level security;
alter table public.experiences  enable row level security;
alter table public.educations   enable row level security;
alter table public.page_views   enable row level security;

-- ---------- contenu : lecture publique, écriture authentifiée ----------
-- projects
drop policy if exists "projects_public_read"  on public.projects;
drop policy if exists "projects_auth_write"    on public.projects;
create policy "projects_public_read" on public.projects
  for select using (true);
create policy "projects_auth_write" on public.projects
  for all to authenticated using (true) with check (true);

-- experiences
drop policy if exists "experiences_public_read" on public.experiences;
drop policy if exists "experiences_auth_write"   on public.experiences;
create policy "experiences_public_read" on public.experiences
  for select using (true);
create policy "experiences_auth_write" on public.experiences
  for all to authenticated using (true) with check (true);

-- educations
drop policy if exists "educations_public_read" on public.educations;
drop policy if exists "educations_auth_write"   on public.educations;
create policy "educations_public_read" on public.educations
  for select using (true);
create policy "educations_auth_write" on public.educations
  for all to authenticated using (true) with check (true);

-- ---------- page_views : insert public, lecture authentifiée seulement ----------
drop policy if exists "page_views_public_insert" on public.page_views;
drop policy if exists "page_views_auth_read"      on public.page_views;
create policy "page_views_public_insert" on public.page_views
  for insert to anon, authenticated with check (true);
create policy "page_views_auth_read" on public.page_views
  for select to authenticated using (true);
