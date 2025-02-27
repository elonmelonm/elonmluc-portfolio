import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const HeroRight = () => {
    const [opacity, setOpacity] = useState(1);

    // Détecter le défilement et ajuster l'opacité
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Calcul de l'opacité en fonction du défilement
        const newOpacity = Math.max(0, 1 - scrollTop / 650);
        setOpacity(newOpacity);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

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

  return (
    <>
    {/* {isVisible && ( */}
    <motion.div
    style={{ opacity: opacity }}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-8 xl:right-12 my-16 h-auto py-5 p-3 lg:p-8 rounded-2xl bg-slate-100 dark:bg-slate-800 backdrop-blur-sm z-50 shadow-sm hidden lg:block"
    >
        <motion.h1 
            style={{ fontFamily: 'Rammetto One' }} 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-700 dark:text-white mb-6 transition-colors duration-300 flex space-x-5"
        >
            <div>
                    <span>Luc Elonm</span>  <br /> <span className='text-4xl tracking-widest'>Akakpo</span>
            </div>
            
            <motion.svg
                className="mt-5 ml-10 w-12 h-12 text-gray-800"
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [1, 5, 1]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            >
                <path
                    d="M25.4995 32.0305L31.3495 33.1555L36.1495 8.48051C36.4495 6.83051 35.3995 5.18051 33.8245 4.88051C32.1745 4.58051 30.5995 5.70551 30.2995 7.35551L25.4995 32.0305Z"
                    fill="#FFDD67"
                ></path>
                <path
                    d="M33.8996 4.88018C33.6746 4.80518 33.5246 4.80518 33.2996 4.80518C34.6496 5.33018 35.3996 6.75518 35.0996 8.25518L30.2996 32.9302L31.3496 33.1552L36.1496 8.48018C36.5246 6.75518 35.4746 5.18018 33.8996 4.88018Z"
                    fill="#EBA352"
                ></path>
                <path
                    d="M19.4995 32.7802H26.5495V5.55518C26.5495 3.53018 24.9745 1.80518 23.0245 1.80518C21.1495 1.80518 19.4995 3.45518 19.4995 5.55518V32.7802Z"
                    fill="#FFDD67"
                ></path>
                <path
                    d="M23.0995 1.80518C22.9495 1.80518 22.7245 1.80518 22.5745 1.88018C24.2995 2.18018 25.5745 3.68018 25.5745 5.55518V32.8552H26.6245V5.55518C26.6245 3.45518 25.0495 1.80518 23.0995 1.80518Z"
                    fill="#EBA352"
                ></path>
                <path
                    d="M15.7495 32.7054L21.7495 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541C9.74948 4.35541 8.77448 6.08041 9.22448 7.80541L15.7495 32.7054Z"
                    fill="#FFDD67"
                ></path>
                <path
                    d="M11.3995 3.90541L10.9495 4.13041C12.4495 4.05541 13.7995 5.03041 14.2495 6.60541L20.7745 31.4304L21.8245 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541Z"
                    fill="#EBA352"
                ></path>
                <path
                    d="M2.99937 10.355C1.57437 11.03 1.12437 12.83 1.87437 14.33L11.7744 34.055L16.7994 31.505L6.89937 11.78C6.14937 10.28 4.42437 9.68 2.99937 10.355Z"
                    fill="#FFDD67"
                ></path>
                <path
                    d="M2.99956 10.355C2.84956 10.43 2.69956 10.505 2.54956 10.655C3.82456 10.28 5.24956 10.955 5.92456 12.305L15.8246 32.03L16.7996 31.58L6.89956 11.78C6.14956 10.28 4.42456 9.68 2.99956 10.355Z"
                    fill="#EBA352"
                ></path>
                <path
                    d="M46.2744 22.2801C45.0744 19.9551 41.3244 20.1051 37.4994 24.3051C34.7994 27.2301 34.2744 28.2051 31.5744 28.1301V25.0551C31.5744 25.0551 25.7994 20.7801 14.3244 22.7301C14.3244 22.7301 7.79945 23.6301 7.79945 27.0801C7.79945 27.0801 6.67445 35.4051 8.99945 40.6551C12.4494 48.4551 30.1494 50.4801 35.6994 37.2051C36.8244 34.5801 39.0744 32.6301 41.0994 30.1551C43.4244 27.1551 47.5494 24.7551 46.2744 22.2801Z"
                    fill="#FFDD67"
                ></path>
                <path
                    d="M46.2745 22.28C46.0495 21.83 45.7495 21.53 45.3745 21.23C45.4495 21.305 45.5245 21.38 45.5245 21.53C46.7995 24.08 42.6745 26.405 40.1995 29.405C38.1745 31.88 35.9245 33.83 34.7995 36.455C29.9995 47.93 16.0495 47.93 10.1995 42.68C15.5245 48.68 30.5245 49.28 35.5495 37.205C36.6745 34.58 38.9245 32.63 40.9495 30.155C43.4245 27.155 47.5495 24.755 46.2745 22.28ZM32.3245 28.13C27.4495 26.33 18.7495 29.63 19.9495 38.405C19.9495 30.23 27.3745 28.205 31.4245 28.205C32.0245 28.13 32.3245 28.13 32.3245 28.13Z"
                    fill="#EBA352"
                ></path>
            </motion.svg>
            

        </motion.h1>
        <motion.span 
            className="text-xl text-rose-600 inline-block mb-4"
            >
            ___   Full Stack Web Developer
            </motion.span>
        <motion.p 
            variants={itemVariants}
            className="w-64 text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300"
        >
            I'm creative developer based in Benin, and I'm very passionate and dedicated to my work.
        </motion.p>
        <motion.div 
            variants={itemVariants}
            className="flex gap-4 -mt-3 md:mt-0"
        >
            <motion.a 
                href="#projets"
                className="inline-flex items-center px-5 text-xl py-3 my-4 bg-rose-600 dark:bg-rose-500 text-white hover:text-rose-500 hover:border-rose-600 hover:border-2 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                See my projects
                <motion.div
                    animate={{
                    x: [0, 5, 0],
                    }}
                    transition={{
                    duration: 1,
                    repeat: Infinity
                    }}
                >
                    <ArrowRight className="ml-2" size={15} />
                </motion.div>
            </motion.a>
        </motion.div>
        
        <div className="mt-4 justify-center  p-2 rounded-full hidden md:flex items-center space-x-8">
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
    </motion.div>
    {/* )} */}
    <div className="flex-1 lg:hidden">
        <motion.h1 
            variants={itemVariants}
            className="text-4xl ld:text-6xl font-bold text-gray-700 dark:text-white mb-6 transition-colors duration-300 flex space-x-5"
        >
            <div>
            <span>Luc Elonm</span>  <br /> <span className='text-6xl lg:text-7xl lg:tracking-widest'>Akakpo</span>
            </div>
            
            <motion.span 
                className="text-rose-600 dark:text-rose-400 inline-block"
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            >
            
            .
            </motion.span>
            <motion.svg
                className="w-12 h-12 mt-7 md:w-20 md:h-20 md:mt-5 lg:w-32 lg:h-32 text-gray-800"
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [1, 5, 1]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3
                }}
            >
            <path
                d="M25.4995 32.0305L31.3495 33.1555L36.1495 8.48051C36.4495 6.83051 35.3995 5.18051 33.8245 4.88051C32.1745 4.58051 30.5995 5.70551 30.2995 7.35551L25.4995 32.0305Z"
                fill="#FFDD67"
            ></path>
            <path
                d="M33.8996 4.88018C33.6746 4.80518 33.5246 4.80518 33.2996 4.80518C34.6496 5.33018 35.3996 6.75518 35.0996 8.25518L30.2996 32.9302L31.3496 33.1552L36.1496 8.48018C36.5246 6.75518 35.4746 5.18018 33.8996 4.88018Z"
                fill="#EBA352"
            ></path>
            <path
                d="M19.4995 32.7802H26.5495V5.55518C26.5495 3.53018 24.9745 1.80518 23.0245 1.80518C21.1495 1.80518 19.4995 3.45518 19.4995 5.55518V32.7802Z"
                fill="#FFDD67"
            ></path>
            <path
                d="M23.0995 1.80518C22.9495 1.80518 22.7245 1.80518 22.5745 1.88018C24.2995 2.18018 25.5745 3.68018 25.5745 5.55518V32.8552H26.6245V5.55518C26.6245 3.45518 25.0495 1.80518 23.0995 1.80518Z"
                fill="#EBA352"
            ></path>
            <path
                d="M15.7495 32.7054L21.7495 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541C9.74948 4.35541 8.77448 6.08041 9.22448 7.80541L15.7495 32.7054Z"
                fill="#FFDD67"
            ></path>
            <path
                d="M11.3995 3.90541L10.9495 4.13041C12.4495 4.05541 13.7995 5.03041 14.2495 6.60541L20.7745 31.4304L21.8245 31.1304L15.2245 6.30541C14.7745 4.58041 13.0495 3.53041 11.3995 3.90541Z"
                fill="#EBA352"
            ></path>
            <path
                d="M2.99937 10.355C1.57437 11.03 1.12437 12.83 1.87437 14.33L11.7744 34.055L16.7994 31.505L6.89937 11.78C6.14937 10.28 4.42437 9.68 2.99937 10.355Z"
                fill="#FFDD67"
            ></path>
            <path
                d="M2.99956 10.355C2.84956 10.43 2.69956 10.505 2.54956 10.655C3.82456 10.28 5.24956 10.955 5.92456 12.305L15.8246 32.03L16.7996 31.58L6.89956 11.78C6.14956 10.28 4.42456 9.68 2.99956 10.355Z"
                fill="#EBA352"
            ></path>
            <path
                d="M46.2744 22.2801C45.0744 19.9551 41.3244 20.1051 37.4994 24.3051C34.7994 27.2301 34.2744 28.2051 31.5744 28.1301V25.0551C31.5744 25.0551 25.7994 20.7801 14.3244 22.7301C14.3244 22.7301 7.79945 23.6301 7.79945 27.0801C7.79945 27.0801 6.67445 35.4051 8.99945 40.6551C12.4494 48.4551 30.1494 50.4801 35.6994 37.2051C36.8244 34.5801 39.0744 32.6301 41.0994 30.1551C43.4244 27.1551 47.5494 24.7551 46.2744 22.2801Z"
                fill="#FFDD67"
            ></path>
            <path
                d="M46.2745 22.28C46.0495 21.83 45.7495 21.53 45.3745 21.23C45.4495 21.305 45.5245 21.38 45.5245 21.53C46.7995 24.08 42.6745 26.405 40.1995 29.405C38.1745 31.88 35.9245 33.83 34.7995 36.455C29.9995 47.93 16.0495 47.93 10.1995 42.68C15.5245 48.68 30.5245 49.28 35.5495 37.205C36.6745 34.58 38.9245 32.63 40.9495 30.155C43.4245 27.155 47.5495 24.755 46.2745 22.28ZM32.3245 28.13C27.4495 26.33 18.7495 29.63 19.9495 38.405C19.9495 30.23 27.3745 28.205 31.4245 28.205C32.0245 28.13 32.3245 28.13 32.3245 28.13Z"
                fill="#EBA352"
            ></path>
            </motion.svg>
            

        </motion.h1>
        <motion.span 
            className="text-rose-600 text-xl lg:text-xl inline-block mb-4"
            >
            _____   Full Stack Web Developer
        </motion.span>
        <motion.p 
            variants={itemVariants}
            className="w-80 lg:w-full lg:text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300"
        >
            I'm creative developer based in New York, and I'm very passionate and dedicated to my work.
        </motion.p>
        <motion.div 
            variants={itemVariants}
            className="flex gap-4 -mt-3 md:mt-0"
        >
            <motion.a 
            href="#projets"
            className="inline-flex items-center text-sm md:text-md px-2 md:px-4 py-3 bg-rose-600 dark:bg-rose-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            See my projects
            <motion.div
                animate={{
                x: [0, 5, 0],
                }}
                transition={{
                duration: 1,
                repeat: Infinity
                }}
            >
                <ArrowRight className="ml-2" size={20} />
            </motion.div>
            </motion.a>
            <motion.a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-rose-600 text-rose-600 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Say hello
            <svg
            className='black dark:white'
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path
                d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z"
                fill="var(--container-color)"
                ></path>
                <path
                d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z"
                fill="currentColor"
                ></path>
            </svg>
            </motion.a>
        </motion.div>
    </div>
    </>
  )
}

export default HeroRight
