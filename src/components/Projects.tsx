import React, { useState } from 'react';
import { CircleFadingPlus, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import des images locales
import budgetManagementImg from '../assets/projetsImg/budget-management.png';
import todoAppImg from '../assets/projetsImg/todoapp.png';
import freshFruitsImg from '../assets/projetsImg/freshfruits.png';
import eLearningImg from '../assets/projetsImg/e-learning.png';
import smithPortfolioImg from '../assets/projetsImg/smithportfolio.png';
import constructionImg from '../assets/projetsImg/construction.png';
import ftcW1Img from '../assets/projetsImg/ftc-w1-elonm.png';
import ftcW2Img from '../assets/projetsImg/ftc-w2-elonm.png';
import ftcW3Img from '../assets/projetsImg/ftc-w3-elonm.png';
import ftcW4Img from '../assets/projetsImg/ftc-w4-elonm.png';
import hackathonIA2025Img from '../assets/projetsImg/hackathon-ia-2025.png';
import devlab2025Img from '../assets/projetsImg/devlab-2025.png';
import meDevlav2025Img from '../assets/projetsImg/me-devlav-2025.jpg';

const projects = [
  {
    title: "DEVLAB 2025",
    description: "Hackathon 2025 : développer une solution open source de paiement en masse des pensions de retraite en intégrant les API Mojaloop",
    images: [devlab2025Img, meDevlav2025Img],
    technologies: ["Vue.js", "Tailwind CSS", "Framer-motion", "Pinia", "Node.js", "Mojaloop"],
    githubLink: "https://github.com/elonmelonm/devlab-2025-result",
    // liveLink: "https://devlab-2025-result.vercel.app/",
    category: "Web"
  },
  {
    title: "Hackathon IA 2025",
    description: "Hackathon IA 2025 : Challenge IA et données foncières : développer des solutions IA au service du foncier",
    images: [hackathonIA2025Img],
    technologies: ["React.js", "Tailwind CSS", "Framer-motion", "FastApi"],
    githubLink: "https://github.com/elonmelonm/les_mentats-luxdev-hackaton-ia-2025",
    liveLink: "https://les-mentats-luxdev-hackaton-ia-2025.vercel.app/",
    category: "Web"
  },
  {
    title: "The french tototte App",
    description: "Build The french tototte website on Figma To Code Challenge",
    images: [ftcW4Img],
    technologies: ["React.js", "Tailwind CSS", "Framer-motion", "Figma"],
    githubLink: "https://github.com/elonmelonm/ftc-w4-elonm.git",
    liveLink: "https://ftc-w4-elonm.vercel.app/",
    category: "Web"
  },
  {
    title: "Monito App",
    description: "Build a Monito App on Figma To Code Challenge",
    images: [ftcW3Img],
    technologies: ["React.js", "Tailwind CSS", "Framer-motion", "Figma"],
    githubLink: "https://github.com/elonmelonm/FTC-W3-ELONM.git",
    liveLink: "https://ftc-w3-elonm.vercel.app/",
    category: "Web"
  },
  {
    title: "Spending Management Landing Page",
    description: "Build a Spending Management Landing Page on Figma To Code Challenge",
    images: [ftcW2Img],
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/spending-management-landing-page.git",
    liveLink: "https://ftc-w2-elonm.vercel.app/",
    category: "Web"
  },
  {
    title: "SaaS Futuristic App",
    description: "Build a SaaS Futuristic App on Figma To Code Challenge",
    images: [ftcW1Img],
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/SaaS-Futuristic-App.git",
    liveLink: "https://ftc-w1-elonm.vercel.app/",
    category: "Web"
  },
  {
    title: "Budget Management App",
    description: "A budget management application to manage your wallet",
    images: [budgetManagementImg],
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MySql"],
    githubLink: "https://github.com/elonmelonm/BudgetManagement.git",
    liveLink: "https://budget-management-liard.vercel.app/",
    category: "Web"
  },
  {
    title: "Task Management App",
    description: "Task management application with collaborative features",
    images: [todoAppImg],
    technologies: ["React.js", "Tailwind CSS", "Django", "PostgreSql"],
    githubLink: "https://github.com/elonmelonm/Todo-App.git",
    liveLink: "https://elonm-todo-app.vercel.app/",
    category: "Web"
  },
  {
    title: "Fresh Fruits",
    description: "Fresh fruits selling landing page",
    images: [freshFruitsImg],
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/fresh-fruits.git",
    liveLink: "https://fruits-selling-elm.netlify.app/",
    category: "Design"
  },
  {
    title: "E-learning website",
    description: "E-learning website landing page",
    images: [eLearningImg],
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://thecodingjourney-elm.netlify.app/",
    category: "Design"
  },
  {
    title: "Smith Portfolio",
    description: "Smith portfolio",
    images: [smithPortfolioImg],
    technologies: ["React.js", "CSS"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://smith-portfolio-elm.netlify.app/",
    category: "Design"
  },
  {
    title: "Construction website",
    description: "Construction website landing page",
    images: [constructionImg],
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/construction-website.git",
    liveLink: "https://construction-site-elm.netlify.app/",
    category: "Web"
  }
];

interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  category: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export const ProjectCarousel: React.FC<{ images: string[]; title: string; height?: string }> = ({
  images,
  title,
  height = "h-48"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  React.useEffect(() => {
    let interval: any;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        nextSlide();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  if (images.length <= 1) {
    return (
      <div className={`relative overflow-hidden ${height}`}>
        <motion.img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${height} group/carousel`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - image ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="p-1.5 rounded-full bg-black/50 text-white hover:bg-primary transition-colors backdrop-blur-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="p-1.5 rounded-full bg-black/50 text-white hover:bg-primary transition-colors backdrop-blur-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-primary w-4' : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className = '' }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg overflow-hidden bg-light-bg/50 dark:bg-dark-bg/50 border border-secondary/10 backdrop-blur-sm hover:bg-secondary/5 transition-all group ${className}`}
  >
    <ProjectCarousel images={project.images} title={project.title} />
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-secondary dark:text-white transition-colors duration-300 truncate pr-2">
          {project.title}
        </h3>
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
          {project.category}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-12 text-sm transition-colors duration-300 line-clamp-2">
        {project.description}
      </p>
      <div className="relative mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white dark:bg-white/5 border border-secondary/10 dark:border-white/10 text-gray-500 dark:text-gray-400 rounded-lg text-xs transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-gray-400 text-xs">+{project.technologies.length - 3} more</span>
          )}
        </div>
      </div>
      <div className="flex gap-4 pt-2">
        <motion.a
          href={project.githubLink}
          className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          whileHover={{ x: 3 }}
        >
          <Github size={18} className="mr-1.5" />
          Code
        </motion.a>
        {project.liveLink && (
          <motion.a
            href={project.liveLink}
            className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            whileHover={{ x: 3 }}
          >
            <ExternalLink size={18} className="mr-1.5" />
            Live Demo
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [showAllProjects, setShowAllProjects] = useState(false);

  const categories = ['All', 'Web', 'Mobile', 'Design'];

  const filteredProjects = projects.filter(p =>
    filter === 'All' ? true : p.category === filter
  );

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  const stats = [
    // { label: "Completed Projects", value: "15+" },
    // { label: "Happy Clients", value: "10+" },
    { label: "Years Experience", value: "3+" },
    { label: "Recognition", value: "2+" }
  ];

  return (
    <section id="projets" className="lg:mx-32 xl:mx-16 py-16 mb-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 mb-20 p-8 bg-secondary/5 dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <motion.h2
              className="text-4xl md:text-6xl font-black mb-6 text-secondary dark:text-white transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              My Projects
            </motion.h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              A curated selection of my work across web development, mobile applications, and digital design.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setShowAllProjects(false); }}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-light-bg dark:bg-dark-bg text-gray-500 border border-secondary/10 dark:border-white/10 hover:border-primary/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-16">
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center px-10 py-4 bg-secondary text-white dark:bg-white dark:text-dark-bg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
              whileHover={{ y: -5 }}
            >
              {showAllProjects ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
              <CircleFadingPlus size={20} className={`ml-3 transition-transform ${showAllProjects ? 'rotate-45' : ''}`} />
            </motion.button>
          </div>
        )}

        {/* Workflow Section */}
        <div className="mt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-secondary dark:text-white mb-4">How I Work</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">My structured approach to bringing digital products to life, from idea to launch.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding goals, requirements, and user needs." },
              { step: "02", title: "Strategy", desc: "Planning architecture, features, and technology stack." },
              { step: "03", title: "Development", desc: "Building with clean code and regular updates." },
              { step: "04", title: "Deployment", desc: "Testing, optimization, and successful launch." }
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl font-black text-secondary dark:text-white/50 group-hover:text-primary/60 mb-4 transition-colors">{phase.step}</div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{phase.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{phase.desc}</p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
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