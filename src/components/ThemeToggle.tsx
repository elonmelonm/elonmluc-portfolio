import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('ui.theme')}
      title={t('ui.theme')}
      className="grid size-9 place-items-center rounded-full border border-rule bg-surface text-ink transition-transform duration-300 hover:-rotate-12 focus-ring"
    >
      {theme === 'light' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
