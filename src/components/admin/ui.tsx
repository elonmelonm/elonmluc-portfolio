import React, { useState } from 'react';
import { X } from 'lucide-react';

export const inputClass =
  'w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-secondary/10 dark:border-white/10 text-secondary dark:text-white outline-none focus:border-primary/50 text-sm';

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</span>
    {children}
  </label>
);

// Saisie de tags (technologies) : taper + Entrée pour ajouter une puce.
export const TagInput: React.FC<{ value: string[]; onChange: (v: string[]) => void }> = ({
  value,
  onChange,
}) => {
  const [draft, setDraft] = useState('');

  const add = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs"
          >
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <input
        className={inputClass}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add();
          }
        }}
        placeholder="Ajouter une techno + Entrée"
      />
    </div>
  );
};
