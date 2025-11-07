import React from 'react'
import { motion } from 'framer-motion'
import image from '../../img/elonmluc2.jpg'

const HeroLeft = () => {
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
    <motion.div 
        className="mx-auto -mb-3 xl:w-8/12 lg:w-9/12 md:mb-0 rounded-full shadow-2xl overflow-hidden"
        variants={imageVariants}
        whileHover="hover"
        {...borderRadiusAnimation}
        >
        
        <img 
            src={image}
            alt="Developer workspace"
            className="w-[100%] h-[100%] object-cover"
        />
        

    </motion.div>
  )
}

export default HeroLeft
