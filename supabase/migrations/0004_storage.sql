-- Bucket public pour les images de projets + policies.
-- (Peut aussi être créé via le Dashboard Storage.)

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

drop policy if exists "project_images_public_read" on storage.objects;
drop policy if exists "project_images_auth_write"   on storage.objects;

create policy "project_images_public_read" on storage.objects
  for select using (bucket_id = 'project-images');

create policy "project_images_auth_write" on storage.objects
  for all to authenticated
  using (bucket_id = 'project-images')
  with check (bucket_id = 'project-images');
