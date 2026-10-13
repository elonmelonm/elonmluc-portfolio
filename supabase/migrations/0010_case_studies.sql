-- Études de cas : chaque projet a sa page (/projects/:slug) racontée en 4 chapitres.
alter table public.projects add column if not exists slug       text;
alter table public.projects add column if not exists year       text not null default '';
alter table public.projects add column if not exists role_fr    text not null default '';
alter table public.projects add column if not exists role_en    text not null default '';
alter table public.projects add column if not exists pitch_fr   text not null default '';
alter table public.projects add column if not exists pitch_en   text not null default '';
alter table public.projects add column if not exists problem_fr text not null default '';
alter table public.projects add column if not exists problem_en text not null default '';
alter table public.projects add column if not exists design_fr  text not null default '';
alter table public.projects add column if not exists design_en  text not null default '';
alter table public.projects add column if not exists build_fr   text not null default '';
alter table public.projects add column if not exists build_en   text not null default '';
alter table public.projects add column if not exists result_fr  text not null default '';
alter table public.projects add column if not exists result_en  text not null default '';

-- Slug des projets existants à partir du titre français (accents retirés, tirets),
-- suffixé par un numéro en cas de doublon.
with base as (
  select
    id,
    trim(both '-' from regexp_replace(
      lower(translate(trim(title_fr),
        'àâäáãåçéèêëíìîïñóòôöõúùûüýÿÀÂÄÁÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝ',
        'aaaaaaceeeeiiiinooooouuuuyyAAAAAACEEEEIIIINOOOOOUUUUY')),
      '[^a-z0-9]+', '-', 'g')) as s,
    display_order,
    created_at
  from public.projects
  where slug is null
),
ranked as (
  select id, s, row_number() over (partition by s order by display_order, created_at) as n
  from base
)
update public.projects p
set slug = case when r.n = 1 then r.s else r.s || '-' || r.n end
from ranked r
where p.id = r.id;

create unique index if not exists projects_slug_key on public.projects(slug);
