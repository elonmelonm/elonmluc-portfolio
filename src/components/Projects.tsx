import React, { useState } from 'react';
import { CircleFadingPlus, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { LuCircleX } from 'react-icons/lu';

const projects = [
  {
    title: "Budget Management App",
    description: "A budget management application to manage your wallet",
    image: "https://unipdjnqcpjchfeiiwrg.supabase.co/storage/v1/object/public/elonm_portefolio//budget%20management.png",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MySql"],
    githubLink: "https://github.com/elonmelonm/BudgetManagement.git",
    liveLink: "https://budget-management-liard.vercel.app/"
  },
  {
    title: "Task Management App",
    description: "Task management application with collaborative features",
    image: "https://unipdjnqcpjchfeiiwrg.supabase.co/storage/v1/object/public/elonm_portefolio//todoapp.png",
    technologies: ["React.js", "Tailwind CSS", "Django", "PostgreSql"],
    githubLink: "https://github.com/elonmelonm/Todo-App.git",
    liveLink: "https://elonm-todo-app.vercel.app/"
  },
  {
    title: "Fresh Fruit",
    description: "Fresh fruits selling landing page",
    image: "https://unipdjnqcpjchfeiiwrg.supabase.co/storage/v1/object/public/elonm_portefolio//freshfruits.png",
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/fresh-fruits.git",
    liveLink: "https://fruits-selling-elm.netlify.app/"
  },
  {
    title: "E-learning website",
    description: "E-learning website landing page",
    image: "https://unipdjnqcpjchfeiiwrg.supabase.co/storage/v1/object/public/elonm_portefolio//e-learning.png",
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://thecodingjourney-elm.netlify.app/"
  },
  {
    title: "Smith Portfolio",
    description: "Smith portfolio",
    image: "https://unipdjnqcpjchfeiiwrg.supabase.co/storage/v1/object/public/elonm_portefolio//smithportfolio.png",
    technologies: ["React.js", "CSS"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://smith-portfolio-elm.netlify.app/"
  },
  {
    title: "Construction website",
    description: "Constuction website landing page",
    image: "https://unipdjnqcpjchfeiiwrg.supabase.co/storage/v1/object/public/elonm_portefolio//construction.png",
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/construction-website.git",
    liveLink: "https://construction-site-elm.netlify.app/"
  }
];

const Modal = ({ projects, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 max-h-[90vh] overflow-y-auto  pt-10">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-6xl relative">
        <h2 className="text-3xl text-center font-bold mb-6 text-rose-700 dark:text-rose-500">Tous les projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-rose-50">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-rose-100 dark:bg-rose-100 text-rose-700 dark:text-rose-500 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.githubLink}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Github size={20} className="mr-1" />
                    Code
                  </a>
                  <a
                    href={project.liveLink}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <ExternalLink size={20} className="mr-1" />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <motion.div 
          className="flex justify-end mt-10" // Ajoutez cette div pour aligner le bouton à droite
        >
          <motion.button 
            onClick={onClose}
            className="inline-flex items-center px-6 py-3 bg-rose-700 dark:bg-rose-500 text-white hover:text-rose-600 hover:border-2 hover:border-rose-600 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fermer
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            >
              <LuCircleX className="ml-2" size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
      
    </div>
  );
};

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  const techBadgeVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="projets" className="lg:mx-32 lg:mr-80 xl:mx-16 xl:mr-64 lg:min-h-screen bg-gray-50 dark:bg-transparent py-12 mb-10 rounded-xl dark:bg-gray-800 transition-colors duration-300">
    {/* <section id="projets" className="lg:mx-32 lg:mr-80 xl:mx-16 xl:mr-64 lg:min-h-screen bg-gray-50 dark:bg-transparent py-12 mb-10 rounded-xl dark:bg-gray-800 transition-colors duration-300"> */}
      <div className="container mx-auto px-4 py-10 rounded-xl ">
        <motion.h2 
          style={{ fontFamily: 'Rammetto One' }} 
          className="text-4xl font-bold text-center mb-12 text-rose-700 dark:text-rose-500 transition-colors duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mes Projets
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-rose-50 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-rose-100 dark:bg-rose-100 text-rose-700 dark:text-rose-500 rounded-full text-sm transition-colors duration-300"
                      variants={techBadgeVariants}
                      whileHover="hover"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a 
                    href={project.githubLink}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} className="mr-1" />
                    Code
                  </motion.a>
                  <motion.a 
                    href={project.liveLink}
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={20} className="mr-1" />
                    Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="flex justify-end mt-10" // Ajoutez cette div pour aligner le bouton à droite
        >
          <motion.button 
            onClick={openModal}
            className="inline-flex items-center px-6 py-3 bg-rose-700 dark:bg-rose-500 text-white hover:text-rose-600 hover:border-2 hover:border-rose-600 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View more
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            >
              <CircleFadingPlus className="ml-2" size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
        {isModalOpen && <Modal projects={projects} onClose={closeModal} />}
      </div>
    </section>
  );
};

export default Projects;