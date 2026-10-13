import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const linkClass = "text-muted hover:text-ink transition-colors rounded focus-ring";

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-rule py-7">
      <span className="label">
        &copy; {new Date().getFullYear()}{' '}
        <Link to="/" className={linkClass}>Elonm Luc Akakpo</Link>. {t('footer.rights')}
      </span>
      <span className="flex gap-4 text-sm">
        <a href="https://github.com/elonmelonm" target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
        <a href="https://linkedin.com/in/luc-elonm-akakpo/" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a>
        <a href="mailto:elonmlucakakpo@gmail.com" className={linkClass}>Email</a>
      </span>
    </footer>
  );
};

export default Footer;
