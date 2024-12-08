import React from 'react';
import { Menu, X, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { 
  Home, 
  User, 
  Briefcase, 
  Star, 
  Compass, 
  Send 
} from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import HeaderLeft from './Header/HeaderLeft';
import HeaderRight from './Header/HeaderRight';

const Header = () => {

  return (
    <>
    {/* Desktop Navbar - Caché sur mobile et tablette */}
      <HeaderLeft />
      
      <HeaderRight />
      

      {/* Mobile et Tablette Navbar - Visible sur mobile et tablette */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 md:flex-col md:justify-items-center md:top-0 left-0 right-0 lg:hidden z-50"
      >
        <div className="bg-white/90 md:rounded-full md:w-[500px] md:mt-7 dark:bg-gray-900/90 backdrop-blur-sm rounded-t-3xl shadow-lg">
          <nav className="flex justify-around py-4">
            <a href="#home" className="flex flex-col items-center">
              <Home 
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition" 
                size={24} 
              />
            </a>
            <a href="#about" className="flex flex-col items-center">
              <User 
                className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition" 
                size={24} 
              />
            </a>
            <a href="#projets" className="flex flex-col items-center">
              <Briefcase 
                className="text-gray-600 dark:text-gray-300 hover:text-purple-500 transition" 
                size={24} 
              />
            </a>
            <a href="#skills" className="flex flex-col items-center">
              <Star 
                className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition" 
                size={24} 
              />
            </a>
            <a href="#journey" className="flex flex-col items-center">
              <Compass 
                className="text-gray-600 dark:text-gray-300 hover:text-teal-500 transition" 
                size={24} 
              />
            </a>
            <a href="#contact" className="flex flex-col items-center">
              <Send 
                className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition" 
                size={24} 
              />
            </a>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Header;