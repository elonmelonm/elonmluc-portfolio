-- Visibilité par élément : permet de masquer un contenu sans le supprimer.
alter table public.projects       add column if not exists is_visible boolean not null default true;
alter table public.experiences    add column if not exists is_visible boolean not null default true;
alter table public.educations     add column if not exists is_visible boolean not null default true;
alter table public.certifications add column if not exists is_visible boolean not null default true;
