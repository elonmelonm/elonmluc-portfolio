-- Deux versions de CV (FR/EN). Migre l'éventuel cv_url existant vers cv_url_fr.
insert into public.settings (key, value)
select 'cv_url_fr', value from public.settings where key = 'cv_url'
on conflict (key) do update set value = excluded.value;

delete from public.settings where key = 'cv_url';
