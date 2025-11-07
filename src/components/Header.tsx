import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Star, 
  Compass, 
  Send 
} from 'lucide-react';
import { motion } from 'framer-motion';
import HeaderLeft from './Header/HeaderLeft';
import HeaderRight from './Header/HeaderRight';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [showTopNavbar, setShowTopNavbar] = useState(false); // État pour gérer quelle navbar afficher
  const [activeSection, setActiveSection] = useState('home'); // État pour gérer la section active

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Position verticale actuelle
      const pageHeight = document.body.offsetHeight; // Hauteur totale de la page

      // Calcul des 3/4 de la hauteur totale de la page
      const threeQuarterHeight = (pageHeight * 3) / 4;

      // Met à jour l'état en fonction de la position de défilement
      setShowTopNavbar(scrollY >= threeQuarterHeight);

      // Détection de la section active
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Marge pour détecter l'entrée
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavbarContent = () => (
    <div className="bg-white/90 md:rounded-full md:w-[500px] md:mt-7 dark:bg-gray-900/90 backdrop-blur-sm rounded-t-3xl shadow-lg">
      <nav className="flex justify-around py-4">
        <a href="#home" className="flex flex-col items-center">
          <Home 
            className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 transition ${activeSection === 'home' ? 'text-blue-500 dark:text-blue-500' : ''}`} 
            size={24} 
          />
          {activeSection === 'home' && <motion.div layout className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
        </a>
        <a href="#about" className="flex flex-col items-center">
          <User 
            className={`text-gray-600 dark:text-gray-300 hover:text-green-500 transition ${activeSection === 'about' ? 'text-green-500 dark:text-green-500' : ''}`} 
            size={24} 
          />
          {activeSection === 'about' && <motion.div layout className="w-2 h-2 bg-green-500 rounded-full mt-1" />}
        </a>
        <a href="#projets" className="flex flex-col items-center">
          <Briefcase 
            className={`text-gray-600 dark:text-gray-300 hover:text-purple-500 transition ${activeSection === 'projets' ? 'text-purple-500 dark:text-purple-500' : ''}`} 
            size={24} 
          />
          {activeSection === 'projets' && <motion.div layout className="w-2 h-2 bg-purple-500 rounded-full mt-1" />}
        </a>
        <a href="#skills" className="flex flex-col items-center">
          <Star 
            className={`text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition ${activeSection === 'skills' ? 'text-yellow-500 dark:text-yellow-500' : ''}`} 
            size={24} 
          />
          {activeSection === 'skills' && <motion.div layout className="w-2 h-2 bg-yellow-500 rounded-full mt-1" />}
        </a>
        <a href="#journey" className="flex flex-col items-center">
          <Compass 
            className={`text-gray-600 dark:text-gray-300 hover:text-teal-500 transition ${activeSection === 'journey' ? 'text-teal-500 dark:text-teal-500' : ''}`} 
            size={24} 
          />
          {activeSection === 'journey' && <motion.div layout className="w-2 h-2 bg-teal-500 rounded-full mt-1" />}
        </a>
        <a href="#contact" className="flex flex-col items-center">
          <Send 
            className={`text-gray-600 dark:text-gray-300 hover:text-red-500 transition ${activeSection === 'contact' ? 'text-red-500 dark:text-red-500' : ''}`} 
            size={24} 
          />
          {activeSection === 'contact' && <motion.div layout className="w-2 h-2 bg-red-500 rounded-full mt-1" />}
        </a>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <HeaderLeft />
      {/* <HeaderRight /> */}

      {/* Navbar en haut (visible si showTopNavbar est vrai) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTopNavbar ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`md:flex md:justify-center lg:hidden fixed top-0 left-0 right-0 z-50 ${showTopNavbar ? 'block' : 'hidden'}`}
      >
        <NavbarContent />
      </motion.div>

      {/* Navbar en bas (visible si showTopNavbar est faux) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: !showTopNavbar ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`md:flex md:justify-center lg:hidden fixed bottom-0 left-0 right-0 z-50 ${!showTopNavbar ? 'block' : 'hidden'}`}
      >
        <NavbarContent />
      </motion.div>
      <div className={`fixed   h-auto p-2 block lg:hidden z-50 ${showTopNavbar ? 'right-5 bottom-3 md:right-8 md:top-9' : 'right-5 mt-3 md:bottom-3'}`}>
        <ThemeToggle />
      </div>
    </>
  );
};

export default Header;
