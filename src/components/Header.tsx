import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.skills'), href: '/skills' },
    { name: t('nav.journey'), href: '/journey' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-2.5 py-1.5 text-[0.92rem] transition-colors focus-ring ${isActive ? 'bg-indigo-soft text-ink' : 'text-muted hover:text-ink'}`;

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <nav aria-label="Principale" className="flex flex-wrap items-center justify-between gap-4 border-b border-rule py-[22px]">
        <NavLink to="/" className="font-display text-lg font-extrabold tracking-[-0.02em] rounded focus-ring">
          elonm<span className="text-indigo">.</span>luc
        </NavLink>

        <div className="hidden lg:flex gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} to={link.href} end={link.href === '/'} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}
            className="rounded-md border border-rule bg-surface px-2.5 py-[7px] font-mono text-xs text-muted focus-ring"
          >
            <span className={i18n.language === 'fr' ? 'text-ink' : ''}>FR</span>
            <span className="mx-1 text-rule">·</span>
            <span className={i18n.language === 'en' ? 'text-ink' : ''}>EN</span>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden grid size-9 place-items-center rounded-full border border-rule text-ink focus-ring"
            aria-label={isOpen ? t('nav.close_menu') : t('nav.open_menu')}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-nav" className="lg:hidden flex w-full flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} to={link.href} end={link.href === '/'} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
