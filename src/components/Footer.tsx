import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="xl:px-36 dark:bg-dark-bg mt-10 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              Elonm
            </Link>
            <p className="text-secondary dark:text-gray-400 mt-2">
              Full Stack Web Developer crafting modern digital experiences.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/elonmelonm" target='_blank' className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/luc-elonm-akakpo/" target='_blank' className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:elonmlucakakpo@gmail.com" target='_blank' className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors duration-300">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500 transition-colors duration-300">
          <p >&copy; {new Date().getFullYear()} <Link to="/" className="hover:text-primary transition-colors">Elonm Luc Akakpo.</Link> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;