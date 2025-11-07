import React, { useState } from 'react';
import { CircleFadingPlus, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { LuCircleX } from 'react-icons/lu';

// Import des images locales
import budgetManagementImg from '../assets/images/budget-management.png';
import todoAppImg from '../assets/images/todoapp.png';
import freshFruitsImg from '../assets/images/freshfruits.png';
import eLearningImg from '../assets/images/e-learning.png';
import smithPortfolioImg from '../assets/images/smithportfolio.png';
import constructionImg from '../assets/images/construction.png';
const projects = [
  {
    title: "Budget Management App",
    description: "A budget management application to manage your wallet",
    image: budgetManagementImg,
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MySql"],
    githubLink: "https://github.com/elonmelonm/BudgetManagement.git",
    liveLink: "https://budget-management-liard.vercel.app/"
  },
  {
    title: "Task Management App",
    description: "Task management application with collaborative features",
    image: todoAppImg,
    technologies: ["React.js", "Tailwind CSS", "Django", "PostgreSql"],
    githubLink: "https://github.com/elonmelonm/Todo-App.git",
    liveLink: "https://elonm-todo-app.vercel.app/"
  },
  {
    title: "Fresh Fruits",
    description: "Fresh fruits selling landing page",
    image: freshFruitsImg,
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/fresh-fruits.git",
    liveLink: "https://fruits-selling-elm.netlify.app/"
  },
  {
    title: "E-learning website",
    description: "E-learning website landing page",
    image: eLearningImg,
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://thecodingjourney-elm.netlify.app/"
  },
  {
    title: "Smith Portfolio",
    description: "Smith portfolio",
    image: smithPortfolioImg,
    technologies: ["React.js", "CSS"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://smith-portfolio-elm.netlify.app/"
  },
  {
    title: "Construction website",
    description: "Construction website landing page",
    image: constructionImg,
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/construction-website.git",
    liveLink: "https://construction-site-elm.netlify.app/"
  }
];

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className = '' }) => (
  <motion.div
    key={index}
    className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors ${className}`}
  >
    <motion.img
      src={project.image}
      alt={project.title}
      className="w-full h-48 object-cover"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-rose-50 transition-colors duration-300 truncate">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-12 transition-colors duration-300 line-clamp-2">
        {project.description}
      </p>
      <div className="relative mb-4">
        <div className="flex overflow-x-auto hide-scrollbar">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              className="flex-shrink-0 px-3 py-1 bg-rose-100 dark:bg-rose-100 text-rose-700 dark:text-rose-500 rounded-full text-sm transition-colors duration-300 mx-1 cursor-pointer"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent to-white dark:to-gray-800 pointer-events-none"></div>
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
);

const Projects = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const toggleProjects = () => setShowAllProjects(!showAllProjects);

  return (
    <section id="projets" className="lg:mx-32 xl:mx-10 lg:min-h-screen bg-gray-50 dark:bg-transparent py-12 mb-10 rounded-xl dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 rounded-xl ">
        <motion.h2
          style={{ fontFamily: 'Rammetto One' }}
          className="text-4xl font-bold text-center mb-12 text-rose-700 dark:text-rose-500 transition-colors duration-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
          {showAllProjects && projects.slice(3).map((project, index) => (
            <ProjectCard
              key={index + 3}
              project={project}
              index={index + 3}
              className="animate-fadeIn"
            />
          ))}
        </div>
        <motion.div
          className="flex justify-end mt-10"
        >
          <motion.button
            onClick={toggleProjects}
            className="inline-flex items-center px-6 py-3 bg-rose-700 dark:bg-rose-500 text-white hover:text-rose-600 hover:border-2 hover:border-rose-600 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllProjects ? 'Show Less' : 'View More'}
            <motion.div
              animate={{
                rotate: showAllProjects ? 45 : 0,
                x: showAllProjects ? 0 : [0, 5, 0],
              }}
              transition={{
                duration: showAllProjects ? 0.3 : 2,
                repeat: showAllProjects ? 0 : Infinity,
                repeatType: "loop",
              }}
              className="ml-2"
            >
              {showAllProjects ? <LuCircleX size={20} /> : <CircleFadingPlus size={20} />}
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

// Add this to your global CSS or in a style tag in your component
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
  document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
}