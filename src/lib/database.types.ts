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
  github_link: string | null;
  live_link: string | null;
  category: Category;
  display_order: number;
  is_visible: boolean;
  // Étude de cas (page /projects/:slug). Chaînes vides = section masquée.
  slug: string | null;
  year: string;
  role_fr: string;
  role_en: string;
  pitch_fr: string;
  pitch_en: string;
  problem_fr: string;
  problem_en: string;
  design_fr: string;
  design_en: string;
  build_fr: string;
  build_en: string;
  result_fr: string;
  result_en: string;
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
  is_visible: boolean;
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
  is_visible: boolean;
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
  is_visible: boolean;
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
