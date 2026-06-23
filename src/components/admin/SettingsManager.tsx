import React, { useState } from 'react';
import { Upload, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useSetting } from '../../hooks/useSetting';
import { uploadCv, setSetting } from '../../lib/content';

function CvSlot({ lang, label }: { lang: 'fr' | 'en'; label: string }) {
  const { value: cvUrl, refetch } = useSetting(`cv_url_${lang}`);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Le CV doit être un fichier PDF.');
      return;
    }
    setUploading(true);
    setError(null);
    setDone(false);
    try {
      const url = await uploadCv(file, lang);
      await setSetting(`cv_url_${lang}`, url);
      await refetch();
      setDone(true);
    } catch (err: any) {
      setError(err.message ?? "Échec de l'upload");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="p-5 bg-white dark:bg-white/5 rounded-xl border border-secondary/10 dark:border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="text-primary shrink-0" size={20} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-secondary dark:text-white">{label}</div>
          {cvUrl ? (
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Voir le CV en ligne <ExternalLink size={12} />
            </a>
          ) : (
            <div className="text-xs text-gray-400">Aucun CV uploadé pour cette langue.</div>
          )}
        </div>
      </div>

      <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg cursor-pointer hover:bg-primary/90">
        <Upload size={16} />
        {uploading ? 'Upload en cours…' : 'Choisir un PDF'}
        <input type="file" accept="application/pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>

      {done && (
        <div className="flex items-center gap-1.5 mt-3 text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 size={16} /> CV mis à jour.
        </div>
      )}
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function SettingsManager() {
  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-bold text-secondary dark:text-white mb-1">CV</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Mets en ligne ton CV (PDF) en français et en anglais. Le bouton « Télécharger CV » du site utilise automatiquement la version correspondant à la langue affichée.
      </p>

      <div className="space-y-4">
        <CvSlot lang="fr" label="CV — Français" />
        <CvSlot lang="en" label="CV — Anglais" />
      </div>
    </div>
  );
}
