import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Upload, X, GripVertical, Eye, EyeOff } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import {
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  reorderProjects,
  setVisibility,
} from '../../lib/content';
import type { Project, ProjectInput, Category } from '../../lib/database.types';
import { Field, inputClass, TagInput } from './ui';

const empty: ProjectInput = {
  title_en: '',
  title_fr: '',
  desc_en: '',
  desc_fr: '',
  technologies: [],
  images: [],
  github_link: '',
  live_link: null,
  category: 'Web',
  display_order: 0,
  is_visible: true,
};

export default function ProjectsManager() {
  const { projects, loading, error, refetch } = useProjects(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectInput>(empty);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [items, setItems] = useState<Project[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Copie locale ordonnée (réordonnable en optimiste).
  useEffect(() => {
    setItems(projects);
  }, [projects]);

  const handleDrop = async (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      return;
    }
    const reordered = [...items];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setItems(reordered);
    setDragIndex(null);
    try {
      await reorderProjects(reordered.map((p) => p.id));
      await refetch();
    } catch {
      await refetch(); // rollback depuis la source de vérité
    }
  };

  const startCreate = () => {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
    setFormError(null);
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title_en: p.title_en,
      title_fr: p.title_fr,
      desc_en: p.desc_en,
      desc_fr: p.desc_fr,
      technologies: p.technologies,
      images: p.images,
      github_link: p.github_link,
      live_link: p.live_link,
      category: p.category,
      display_order: p.display_order,
      is_visible: p.is_visible,
    });
    setOpen(true);
    setFormError(null);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadProjectImage(file));
      }
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
    } catch (e: any) {
      setFormError(e.message ?? 'Upload échoué');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      const payload = { ...form, live_link: form.live_link || null };
      if (editingId) await updateProject(editingId, payload);
      else await createProject(payload);
      setOpen(false);
      await refetch();
    } catch (e: any) {
      setFormError(e.message ?? 'Enregistrement échoué');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await deleteProject(id);
    await refetch();
  };

  const handleToggleVisibility = async (id: string, current: boolean) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, is_visible: !current } : p)));
    try {
      await setVisibility('projects', id, !current);
    } finally {
      await refetch();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-secondary dark:text-white">Projets</h2>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90"
        >
          <Plus size={16} /> Nouveau
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Chargement…</p>
      ) : (
        <>
          <p className="text-xs text-gray-400 mb-2">Glisse les projets pour changer leur ordre d'affichage.</p>
          <div className="space-y-2">
            {items.map((p, index) => (
              <div
                key={p.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => setDragIndex(null)}
                className={`flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border transition-colors ${
                  dragIndex === index
                    ? 'border-primary/50 opacity-60'
                    : 'border-secondary/10 dark:border-white/10'
                } ${!p.is_visible ? 'opacity-50' : ''}`}
              >
                <GripVertical size={16} className="text-gray-400 cursor-grab shrink-0" />
                {p.images[0] && (
                  <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-secondary dark:text-white truncate">
                    {p.title_fr}
                    {!p.is_visible && <span className="ml-2 text-[10px] uppercase text-gray-400">(masqué)</span>}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.category} · ordre {p.display_order}
                  </div>
                </div>
                <button
                  onClick={() => handleToggleVisibility(p.id, p.is_visible)}
                  className="p-2 text-gray-500 hover:text-primary"
                  title={p.is_visible ? 'Masquer du site' : 'Afficher sur le site'}
                >
                  {p.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => startEdit(p)} className="p-2 text-gray-500 hover:text-primary">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-500 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl my-8 p-6 bg-light-bg dark:bg-dark-bg rounded-2xl border border-secondary/10 dark:border-white/10 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-secondary dark:text-white">
                {editingId ? 'Éditer' : 'Nouveau'} projet
              </h3>
              <button type="button" onClick={() => setOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Titre (FR)">
                <input className={inputClass} value={form.title_fr} onChange={(e) => setForm({ ...form, title_fr: e.target.value })} required />
              </Field>
              <Field label="Titre (EN)">
                <input className={inputClass} value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required />
              </Field>
              <Field label="Description (FR)">
                <textarea className={inputClass} rows={3} value={form.desc_fr} onChange={(e) => setForm({ ...form, desc_fr: e.target.value })} required />
              </Field>
              <Field label="Description (EN)">
                <textarea className={inputClass} rows={3} value={form.desc_en} onChange={(e) => setForm({ ...form, desc_en: e.target.value })} required />
              </Field>
            </div>

            <Field label="Technologies">
              <TagInput value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Lien GitHub">
                <input className={inputClass} value={form.github_link} onChange={(e) => setForm({ ...form, github_link: e.target.value })} required />
              </Field>
              <Field label="Lien live (optionnel)">
                <input className={inputClass} value={form.live_link ?? ''} onChange={(e) => setForm({ ...form, live_link: e.target.value })} />
              </Field>
              <Field label="Catégorie">
                <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                  <option value="Web">Web</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </Field>
              <Field label="Ordre d'affichage">
                <input type="number" className={inputClass} value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} />
              </Field>
            </div>

            <Field label="Images">
              <div className="flex flex-wrap gap-2 mb-2">
                {form.images.map((url) => (
                  <div key={url} className="relative">
                    <img src={url} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, images: form.images.filter((u) => u !== url) })}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="inline-flex items-center gap-2 px-3 py-2 bg-secondary/5 dark:bg-white/5 rounded-lg text-sm cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-secondary/10">
                <Upload size={16} />
                {uploading ? 'Envoi…' : 'Ajouter des images'}
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} />
              </label>
            </Field>

            {formError && <p className="text-sm text-red-500">{formError}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-500">
                Annuler
              </button>
              <button type="submit" disabled={saving} className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-lg disabled:opacity-60">
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
