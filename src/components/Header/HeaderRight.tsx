import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import image from '../../img/elonmluc2.jpg'
import { FaWhatsapp } from 'react-icons/fa';

const HeaderRight = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Détecter le défilement
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 650); // Affiche le bouton après 300px de défilement
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
            duration: 0.8,
            ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            rotate: 2,
            transition: {
            duration: 0.3
            }
        }
    };

    const borderRadiusAnimation = {
        initial: {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        },
        animate: {
            borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%", // Début
            "30% 60% 70% 40% / 50% 60% 30% 60%", // Milieu
            "60% 40% 30% 70% / 60% 30% 70% 40%", // Fin
            ],
            transition: {
            duration: 8, // Durée totale de l'animation (8 secondes)
            repeat: Infinity, // Animation en boucle
            ease: "easeInOut", // Transition fluide
            },
        },
    };

  return (
    isVisible && (
    <motion.header
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-12 my-16 h-auto p-4 xl:p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 backdrop-blur-sm z-50 shadow-sm hidden lg:block"
    >
        <motion.div 
          className="mx-auto mt-5 w-64 md:mb-0 rounded-full shadow-2xl overflow-hidden"
          variants={imageVariants}
          whileHover="hover"
          {...borderRadiusAnimation}
        >
          <img 
            src={image}
            alt="Developer workspace"
            className=""
          />
        </motion.div>
        <div className="container flex flex-col justify-center mx-auto py-4 h-full">
          <span className='p-1 rounded-xl text-2xl dark:text-white text-center my-4'>Luc Elonm Akakpo</span>
          <span className='p-1 rounded-xl text-blue-600 bg-white dark:bg-slate-500 dark:text-white text-center my-2'>Full Stack Web Developer</span>
          <div className="flex items-start space-x-4 mt-16">
            <Phone className="text-blue-600 dark:text-white mt-1 transition-colors duration-300" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Phone
              </h4>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                +229 01 57 11 38 10
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MapPin className="text-blue-600 dark:text-white mt-1 transition-colors duration-300" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Location
              </h4>
              <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                Bénin, Cotonou
              </p>
            </div>
          </div>
        </div>
        <div className="my-4 justify-center  p-2 rounded-full hidden md:flex items-center space-x-8">
          <a href="https://github.com/elonmelonm" className="p-2 rounded-full hover:bg-black text-gray-600  hover:text-white dark:text-gray-300 dark:hover:bg-white dark:hover:text-black">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/elonm-luc-akakpo-73194a237/" className="p-2 rounded-full hover:bg-blue-600 hover:text-white text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600 dark:hover:text-white">
            <Linkedin size={20} />
          </a>
          <a 
            href="https://wa.me/22957113810" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full hover:bg-green-600 hover:text-white text-gray-600 dark:text-gray-300 dark:hover:bg-green-400 dark:hover:text-black"
          >
            <FaWhatsapp size={20} />
          </a>
          <a href="mailto:elonmlucakakpo@gmail.com" className="p-2 rounded-full hover:bg-black hover:text-white text-gray-600 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black">
            <Mail size={20} />
          </a>
        </div>
        
    </motion.header>
    )
)
}

export default HeaderRight
