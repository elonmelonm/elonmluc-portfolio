-- Schéma initial : projects, experiences, educations, page_views

-- ---------- projects ----------
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  title_en      text not null,
  title_fr      text not null,
  desc_en       text not null,
  desc_fr       text not null,
  technologies  text[] not null default '{}',
  images        text[] not null default '{}',
  github_link   text not null,
  live_link     text,
  category      text not null default 'Web' check (category in ('Web', 'Mobile')),
  display_order int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists projects_order_idx on public.projects(display_order);

-- ---------- experiences ----------
create table if not exists public.experiences (
  id            uuid primary key default gen_random_uuid(),
  period_en     text not null,
  period_fr     text not null,
  title_en      text not null,
  title_fr      text not null,
  company       text not null default '',
  desc_en       text not null,
  desc_fr       text not null,
  display_order int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists experiences_order_idx on public.experiences(display_order);

-- ---------- educations ----------
create table if not exists public.educations (
  id            uuid primary key default gen_random_uuid(),
  period        text not null,
  title_en      text not null,
  title_fr      text not null,
  company       text not null default '',
  desc_en       text not null,
  desc_fr       text not null,
  display_order int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists educations_order_idx on public.educations(display_order);

-- ---------- page_views ----------
create table if not exists public.page_views (
  id         bigint generated always as identity primary key,
  path       text not null,
  referrer   text,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views(created_at);
create index if not exists page_views_path_idx    on public.page_views(path);

-- ---------- trigger updated_at ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists experiences_updated_at on public.experiences;
create trigger experiences_updated_at before update on public.experiences
  for each row execute function public.set_updated_at();

drop trigger if exists educations_updated_at on public.educations;
create trigger educations_updated_at before update on public.educations
  for each row execute function public.set_updated_at();
