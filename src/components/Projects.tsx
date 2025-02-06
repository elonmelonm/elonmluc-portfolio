import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

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
  }
];

const Projects = () => {
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
              <div className="p-6">
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
      </div>
    </section>
  );
};

export default Projects;