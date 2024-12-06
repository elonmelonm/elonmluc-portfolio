import React from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="xl:px-36 fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Elonm</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#Home" className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 dark:text-gray-300 dark:hover:text-black dark:hover:bg-slate-300">Home</a>
            <a href="#about" className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 dark:text-gray-300 dark:hover:text-black dark:hover:bg-slate-300">About</a>
            <a href="#projets" className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 dark:text-gray-300 dark:hover:text-black dark:hover:bg-slate-300">Projets</a>
            <a href="#skills" className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 dark:text-gray-300 dark:hover:text-black dark:hover:bg-slate-300">Skills</a>
            <a href="#journey" className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 dark:text-gray-300 dark:hover:text-black dark:hover:bg-slate-300">Journey</a>
            <a href="#contact" className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 dark:text-gray-300 dark:hover:text-black dark:hover:bg-slate-300">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <a href="https://github.com/elonmelonm" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/elonm-luc-akakpo-73194a237/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="mailto:elonmlucakakpo@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4 pb-2"
            >
              <div className="flex flex-col space-y-4">
                <a href="#Home" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
                <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a>
                <a href="#projets" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Projets</a>
                <a href="#Skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Skills</a>
                <a href="#journey" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Journey</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;