import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="xl:px-36 dark:bg-dark-bg text-white pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
            >
              Elonm
            </Link>
            <p className="text-secondary dark:text-gray-400 mt-2">
              {t('footer.desc')}
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/elonmelonm" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/luc-elonm-akakpo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg">
              <Linkedin size={24} />
            </a>
            <a href="mailto:elonmlucakakpo@gmail.com" aria-label="Email" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
          <p >&copy; {new Date().getFullYear()} <Link to="/" className="hover:text-primary transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg">Elonm Luc Akakpo.</Link> {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;