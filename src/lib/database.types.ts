// Types des tables Supabase (source de vérité : supabase/migrations).

export type Category = 'Web' | 'Mobile';

export interface Project {
  id: string;
  title_en: string;
  title_fr: string;
  desc_en: string;
  desc_fr: string;
  technologies: string[];
  images: string[];
  github_link: string;
  live_link: string | null;
  category: Category;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  period_en: string;
  period_fr: string;
  title_en: string;
  title_fr: string;
  company: string;
  desc_en: string;
  desc_fr: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  period: string;
  title_en: string;
  title_fr: string;
  company: string;
  desc_en: string;
  desc_fr: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title_en: string;
  title_fr: string;
  issuer: string;
  year: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PageView {
  id: number;
  path: string;
  referrer: string | null;
  created_at: string;
}

// Payloads pour la création/édition (sans les colonnes auto-générées).
export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ExperienceInput = Omit<Experience, 'id' | 'created_at' | 'updated_at'>;
export type EducationInput = Omit<Education, 'id' | 'created_at' | 'updated_at'>;
export type CertificationInput = Omit<Certification, 'id' | 'created_at' | 'updated_at'>;
