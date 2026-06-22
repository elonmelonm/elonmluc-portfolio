import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useExperiences } from '../../hooks/useExperiences';
import { createExperience, updateExperience, deleteExperience } from '../../lib/content';
import type { Experience, ExperienceInput } from '../../lib/database.types';
import { Field, inputClass } from './ui';

const empty: ExperienceInput = {
  period_en: '',
  period_fr: '',
  title_en: '',
  title_fr: '',
  company: '',
  desc_en: '',
  desc_fr: '',
  display_order: 0,
};

export default function ExperiencesManager() {
  const { experiences, loading, error, refetch } = useExperiences();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ExperienceInput>(empty);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const startCreate = () => {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
    setFormError(null);
  };

  const startEdit = (x: Experience) => {
    setEditingId(x.id);
    const { id, created_at, updated_at, ...rest } = x;
    setForm(rest);
    setOpen(true);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      if (editingId) await updateExperience(editingId, form);
      else await createExperience(form);
      setOpen(false);
      await refetch();
    } catch (e: any) {
      setFormError(e.message ?? 'Échec');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette expérience ?')) return;
    await deleteExperience(id);
    await refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-secondary dark:text-white">Expériences</h2>
        <button onClick={startCreate} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90">
          <Plus size={16} /> Nouvelle
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Chargement…</p>
      ) : (
        <div className="space-y-2">
          {experiences.map((x) => (
            <div key={x.id} className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border border-secondary/10 dark:border-white/10">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-secondary dark:text-white truncate">{x.title_fr}</div>
                <div className="text-xs text-gray-500">{x.company} · {x.period_fr}</div>
              </div>
              <button onClick={() => startEdit(x)} className="p-2 text-gray-500 hover:text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(x.id)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl my-8 p-6 bg-light-bg dark:bg-dark-bg rounded-2xl border border-secondary/10 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-secondary dark:text-white">{editingId ? 'Éditer' : 'Nouvelle'} expérience</h3>
              <button type="button" onClick={() => setOpen(false)}><X size={20} className="text-gray-500" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Période (FR)">
                <input className={inputClass} value={form.period_fr} onChange={(e) => setForm({ ...form, period_fr: e.target.value })} required />
              </Field>
              <Field label="Période (EN)">
                <input className={inputClass} value={form.period_en} onChange={(e) => setForm({ ...form, period_en: e.target.value })} required />
              </Field>
              <Field label="Titre (FR)">
                <input className={inputClass} value={form.title_fr} onChange={(e) => setForm({ ...form, title_fr: e.target.value })} required />
              </Field>
              <Field label="Titre (EN)">
                <input className={inputClass} value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required />
              </Field>
              <Field label="Entreprise">
                <input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </Field>
              <Field label="Ordre d'affichage">
                <input type="number" className={inputClass} value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} />
              </Field>
              <Field label="Description (FR)">
                <textarea className={inputClass} rows={3} value={form.desc_fr} onChange={(e) => setForm({ ...form, desc_fr: e.target.value })} required />
              </Field>
              <Field label="Description (EN)">
                <textarea className={inputClass} rows={3} value={form.desc_en} onChange={(e) => setForm({ ...form, desc_en: e.target.value })} required />
              </Field>
            </div>

            {formError && <p className="text-sm text-red-500">{formError}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-gray-500">Annuler</button>
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
