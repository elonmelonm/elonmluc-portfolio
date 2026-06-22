import { supabase } from './supabase';
import type {
  ProjectInput,
  ExperienceInput,
  EducationInput,
  CertificationInput,
} from './database.types';

const BUCKET = 'project-images';

// ---------- Projects ----------
export async function createProject(input: ProjectInput) {
  const { error } = await supabase.from('projects').insert(input);
  if (error) throw error;
}

export async function updateProject(id: string, input: ProjectInput) {
  const { error } = await supabase.from('projects').update(input).eq('id', id);
  if (error) throw error;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// Persiste un nouvel ordre : display_order = position (1-based) de chaque id.
export async function reorderProjects(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from('projects').update({ display_order: i + 1 }).eq('id', id)
    )
  );
}

// ---------- Experiences ----------
export async function createExperience(input: ExperienceInput) {
  const { error } = await supabase.from('experiences').insert(input);
  if (error) throw error;
}

export async function updateExperience(id: string, input: ExperienceInput) {
  const { error } = await supabase.from('experiences').update(input).eq('id', id);
  if (error) throw error;
}

export async function deleteExperience(id: string) {
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw error;
}

export async function reorderExperiences(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from('experiences').update({ display_order: i + 1 }).eq('id', id)
    )
  );
}

// ---------- Educations ----------
export async function createEducation(input: EducationInput) {
  const { error } = await supabase.from('educations').insert(input);
  if (error) throw error;
}

export async function updateEducation(id: string, input: EducationInput) {
  const { error } = await supabase.from('educations').update(input).eq('id', id);
  if (error) throw error;
}

export async function deleteEducation(id: string) {
  const { error } = await supabase.from('educations').delete().eq('id', id);
  if (error) throw error;
}

export async function reorderEducations(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from('educations').update({ display_order: i + 1 }).eq('id', id)
    )
  );
}

// ---------- Certifications ----------
export async function createCertification(input: CertificationInput) {
  const { error } = await supabase.from('certifications').insert(input);
  if (error) throw error;
}

export async function updateCertification(id: string, input: CertificationInput) {
  const { error } = await supabase.from('certifications').update(input).eq('id', id);
  if (error) throw error;
}

export async function deleteCertification(id: string) {
  const { error } = await supabase.from('certifications').delete().eq('id', id);
  if (error) throw error;
}

export async function reorderCertifications(orderedIds: string[]) {
  await Promise.all(
    orderedIds.map((id, i) =>
      supabase.from('certifications').update({ display_order: i + 1 }).eq('id', id)
    )
  );
}

// ---------- Storage : upload image projet ----------
export async function uploadProjectImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'png';
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
