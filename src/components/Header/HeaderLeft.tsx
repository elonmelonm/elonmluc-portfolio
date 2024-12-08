import React from 'react'
import { motion} from 'framer-motion'
import ThemeToggle from '../ThemeToggle';
import { Briefcase, Compass, Home, Send, Star, User } from 'lucide-react';

const HeaderLeft = () => {

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
            className="flex flex-col items-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Home 
              className=" size-10 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition" 
              size={24} 
            />
            {/* Home */}
          </a>
          <a 
            href="#about" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <User 
              className=" size-10 text-gray-600 dark:text-gray-300 group-hover:text-green-500 transition" 
              size={24} 
            />
            {/* About */}
          </a>
          <a 
            href="#projets" 
            className="flex flex-col items-center p-2 rounded-md   transition duration-300 group"
          >
            <Briefcase 
              className=" size-10 text-gray-600 dark:text-gray-300 group-hover:text-purple-500 transition" 
              size={24} 
            />
            {/* Projets */}
          </a>
          <a 
            href="#skills" 
            className="flex iflex-col tems-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Star 
              className=" size-10 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 transition" 
              size={24} 
            />
            {/* Skills */}
          </a>
          <a 
            href="#journey" 
            className="flex flex-col items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 group"
          >
            <Compass 
              className=" size-10 text-gray-600 dark:text-gray-300 group-hover:text-teal-500 transition" 
              size={24} 
            />
            {/* Journey */}
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
