-- Table certifications + RLS + seed des certifs existantes.

create table if not exists public.certifications (
  id            uuid primary key default gen_random_uuid(),
  title_en      text not null,
  title_fr      text not null,
  issuer        text not null default '',
  year          text not null default '',
  display_order int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists certifications_order_idx on public.certifications(display_order);

drop trigger if exists certifications_updated_at on public.certifications;
create trigger certifications_updated_at before update on public.certifications
  for each row execute function public.set_updated_at();

-- RLS : lecture publique, écriture authentifiée
alter table public.certifications enable row level security;

drop policy if exists "certifications_public_read" on public.certifications;
drop policy if exists "certifications_auth_write"   on public.certifications;
create policy "certifications_public_read" on public.certifications
  for select using (true);
create policy "certifications_auth_write" on public.certifications
  for all to authenticated using (true) with check (true);

-- Seed des 3 certifications existantes
insert into public.certifications (title_en, title_fr, issuer, year, display_order)
values
  ('Meta Front-End Developer', 'Développeur Front-End Meta', 'Coursera / Meta', '2024', 1),
  ('Responsive Web Design', 'Design Web Réactif', 'FreeCodeCamp', '2023', 2),
  ('JavaScript Algorithms & Data Structures', 'Algorithmes & Structures de Données JavaScript', 'FreeCodeCamp', '2023', 3);
