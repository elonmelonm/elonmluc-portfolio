import React from 'react';
import { ArrowRight, Download, Files } from 'lucide-react';
import { motion } from 'framer-motion';
import image from '../img/elonmluc1.jpg';
import cv from '../cv/LUC_ELONM_AKAKPO.pdf';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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
  

  return (
    <section id="about" className="lg:mx-32 lg:mr-80 xl:mx-16 xl:mr-64 pb-16 min-h-screen flex items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2 
        style={{ fontFamily: 'Rammetto One' }} 
          className="text-4xl font-bold text-center mb-2 text-rose-700 dark:text-rose-500 transition-colors duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About me
        </motion.h2>
        <h6 className='text-sm mb-10 text-center text-gray-500'>My introduction</h6>
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex-1 lg:hidden"
            variants={imageVariants}
            whileHover="hover"
          >
            <img 
              src={image}
              alt="Developer workspace"
              className="size-2/3 mx-auto rounded-2xl shadow-2xl transform transition-transform"
            />

          </motion.div>
          <div className="flex-1">
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300"
            >
              Full Stack Developer, I'm passionate and versatile with a knack for crafting seamless digital experiences. 
              I specialize in building robust, scalable, and user-friendly applications that bridge the gap between cutting-edge technology and intuitive design.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex gap-4"
            >
              <motion.a 
                href={cv}
                download="LUC_ELONM_AKAKPO.pdf"
                className="inline-flex items-center px-6 py-3 bg-rose-700 dark:bg-rose-500 text-white hover:text-rose-600 hover:border-2 hover:border-rose-600 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download cv
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                >
                  <Files className="ml-2" size={20} />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;