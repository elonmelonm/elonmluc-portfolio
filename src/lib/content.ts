import { supabase } from './supabase';
import type {
  ProjectInput,
  ExperienceInput,
  EducationInput,
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
