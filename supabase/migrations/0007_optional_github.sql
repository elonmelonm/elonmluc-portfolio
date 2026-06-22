-- Le lien GitHub devient optionnel (certains projets ont un repo privé).
alter table public.projects alter column github_link drop not null;
