-- Réglages clé/valeur du site (ex: cv_url) gérables depuis l'admin.
create table if not exists public.settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

alter table public.settings enable row level security;

drop policy if exists "settings_public_read" on public.settings;
drop policy if exists "settings_auth_write"   on public.settings;
create policy "settings_public_read" on public.settings
  for select using (true);
create policy "settings_auth_write" on public.settings
  for all to authenticated using (true) with check (true);

-- Bucket public pour les documents (CV, etc.)
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true)
on conflict (id) do nothing;

drop policy if exists "documents_public_read" on storage.objects;
drop policy if exists "documents_auth_write"   on storage.objects;
create policy "documents_public_read" on storage.objects
  for select using (bucket_id = 'documents');
create policy "documents_auth_write" on storage.objects
  for all to authenticated
  using (bucket_id = 'documents')
  with check (bucket_id = 'documents');
