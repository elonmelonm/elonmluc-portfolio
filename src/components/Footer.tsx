import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="lg:hidden xl:px-36 bg-gray-900 mt-10 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Elonm</h3>
            <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">
              Créons ensemble vos projets web
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/elonmelonm" className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/elonm-luc-akakpo-73194a237/" className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:elonmlucakakpo@gmail.com" className="text-gray-400 dark:text-gray-500 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500 transition-colors duration-300">
          <p>&copy; {new Date().getFullYear()} Elonm Luc Akakpo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;