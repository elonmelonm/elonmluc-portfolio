import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Star,
  Compass,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Skills', href: '/skills', icon: Star },
  { name: 'Journey', href: '/journey', icon: Compass },
  { name: 'Contact', href: '/contact', icon: Send },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'py-3 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-lg border-b border-primary/10'
          : 'py-6 bg-transparent border-b border-transparent'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <NavLink
            to="/"
            className="text-2xl font-black tracking-tighter text-primary group flex items-center gap-1"
          >
            Elonm
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-bold transition-all rounded-xl ${isActive
                  ? 'text-primary'
                  : 'text-secondary dark:text-gray-400 hover:text-primary hover:bg-primary/5'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="ml-4 pl-4 border-l border-secondary/20">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 text-secondary dark:text-gray-300 hover:bg-primary/10 rounded-xl transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full h-screen bg-white dark:bg-dark-bg border-b border-secondary/10 shadow-2xl"
          >
            <div className="flex flex-col space-y-2 p-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all ${isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-secondary dark:text-gray-300 hover:bg-primary/5'
                    }`
                  }
                >
                  <link.icon size={20} />
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
