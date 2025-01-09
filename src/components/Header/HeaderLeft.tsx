import React, { useEffect, useState } from 'react'
import { motion} from 'framer-motion'
import ThemeToggle from '../ThemeToggle';
import { Briefcase, Compass, Home, Send, Star, User } from 'lucide-react';

const HeaderLeft = () => {
    const [activeSection, setActiveSection] = useState('home'); // État pour gérer la section active
  
    useEffect(() => {
      const handleScroll = () => {
        
        // Détection de la section active
        const sections = document.querySelectorAll('section');
        let currentSection = 'home';
  
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });
        
  
        setActiveSection(currentSection);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <motion.header
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="fixed lg:left-8 xl:left-12 my-44 h-auto p-2 rounded-full bg-slate-100 dark:bg-slate-800 backdrop-blur-sm z-50 shadow-sm hidden lg:block">
      <div className="container flex flex-col justify-center mx-auto px-2 xl:px-4 py-4 h-full">
        <nav className="flex flex-col text-gray-900 dark:text-gray-100 space-y-6">
          <a 
            href="#home" 
            aria-label="Go to Home" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Home 
              className={`size-10 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition ${activeSection === 'home' ? 'text-blue-500 dark:text-blue-500' : ''}`} 
              size={24} 
            />
            {activeSection === 'home' && <motion.div layout className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
          </a>
          <a 
            href="#about" 
            aria-label="Go to About" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <User 
              className={`size-10 text-gray-600 dark:text-gray-300 group-hover:text-green-500 transition ${activeSection === 'about' ? 'text-green-500 dark:text-green-500' : ''}`} 
              size={24} 
            />
            {activeSection === 'about' && <motion.div layout className="w-2 h-2 bg-green-500 rounded-full mt-1" />}
          </a>
          <a 
            href="#projets" 
            aria-label="Go to Projects" 
            className="flex flex-col items-center p-2 rounded-md   transition duration-300 group"
          >
            <Briefcase 
              className={`size-10 text-gray-600 dark:text-gray-300 group-hover:text-purple-500 transition ${activeSection === 'projets' ? 'text-purple-500 dark:text-purple-500' : ''}`}
              size={24} 
            />
            {activeSection === 'projets' && <motion.div layout className="w-2 h-2 bg-purple-500 rounded-full mt-1" />}
          </a>
          <a 
            href="#skills" 
            aria-label="Go to Skills" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Star 
              className={`size-10 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 transition ${activeSection === 'skills' ? 'text-yellow-500 dark:text-yellow-500' : ''}`}
              size={24} 
            />
            {activeSection === 'skills' && <motion.div layout className="w-2 h-2 bg-yellow-500 rounded-full mt-1" />}
          </a>
          <a 
            href="#journey" 
            aria-label="Go to Journey" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Compass 
              className={`size-10 text-gray-600 dark:text-gray-300 group-hover:text-teal-500 transition ${activeSection === 'journey' ? 'text-teal-500 dark:text-teal-500' : ''}`}
              size={24} 
            />
            {activeSection === 'journey' && <motion.div layout className="w-2 h-2 bg-teal-500 rounded-full mt-1" />}
          </a>
          {/* <a 
            href="#contact" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Send 
              className=" size-10 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition" 
              size={24} 
            /> */}
            {/* Contact */}
          {/* </a> */}
        </nav>
      </div>
    </div>
    <div className="fixed left-[49px] xl:left-[72px] mt-[640px] h-auto p-2 hidden lg:block">
      <ThemeToggle />
    </div>
    
  </motion.header>
  )
}

export default HeaderLeft
