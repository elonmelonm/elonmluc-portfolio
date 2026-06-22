import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, GripVertical } from 'lucide-react';
import { useEducations } from '../../hooks/useEducations';
import { createEducation, updateEducation, deleteEducation, reorderEducations } from '../../lib/content';
import type { Education, EducationInput } from '../../lib/database.types';
import { Field, inputClass } from './ui';

const empty: EducationInput = {
  period: '',
  title_en: '',
  title_fr: '',
  company: '',
  desc_en: '',
  desc_fr: '',
  display_order: 0,
};

export default function EducationsManager() {
  const { educations, loading, error, refetch } = useEducations();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EducationInput>(empty);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [items, setItems] = useState<Education[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    setItems(educations);
  }, [educations]);

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
      await reorderEducations(reordered.map((x) => x.id));
      await refetch();
    } catch {
      await refetch();
    }
  };

  const startCreate = () => {
    setEditingId(null);
    setForm(empty);
    setOpen(true);
    setFormError(null);
  };

  const startEdit = (x: Education) => {
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
      if (editingId) await updateEducation(editingId, form);
      else await createEducation(form);
      setOpen(false);
      await refetch();
    } catch (e: any) {
      setFormError(e.message ?? 'Échec');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette formation ?')) return;
    await deleteEducation(id);
    await refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-secondary dark:text-white">Éducation</h2>
        <button onClick={startCreate} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90">
          <Plus size={16} /> Nouvelle
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Chargement…</p>
      ) : (
        <>
          <p className="text-xs text-gray-400 mb-2">Glisse les formations pour changer leur ordre d'affichage.</p>
          <div className="space-y-2">
            {items.map((x, index) => (
              <div
                key={x.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => setDragIndex(null)}
                className={`flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border transition-colors ${
                  dragIndex === index ? 'border-primary/50 opacity-60' : 'border-secondary/10 dark:border-white/10'
                }`}
              >
                <GripVertical size={16} className="text-gray-400 cursor-grab shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-secondary dark:text-white truncate">{x.title_fr}</div>
                  <div className="text-xs text-gray-500">{x.company} · {x.period}</div>
                </div>
                <button onClick={() => startEdit(x)} className="p-2 text-gray-500 hover:text-primary"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(x.id)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl my-8 p-6 bg-light-bg dark:bg-dark-bg rounded-2xl border border-secondary/10 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-secondary dark:text-white">{editingId ? 'Éditer' : 'Nouvelle'} formation</h3>
              <button type="button" onClick={() => setOpen(false)}><X size={20} className="text-gray-500" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Période">
                <input className={inputClass} value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} required />
              </Field>
              <Field label="Établissement">
                <input className={inputClass} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </Field>
              <Field label="Titre (FR)">
                <input className={inputClass} value={form.title_fr} onChange={(e) => setForm({ ...form, title_fr: e.target.value })} required />
              </Field>
              <Field label="Titre (EN)">
                <input className={inputClass} value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} required />
              </Field>
              <Field label="Ordre d'affichage">
                <input type="number" className={inputClass} value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })} />
              </Field>
              <div />
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
