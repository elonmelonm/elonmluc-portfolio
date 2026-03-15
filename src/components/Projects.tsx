import React, { useState } from 'react';
import { CircleFadingPlus, ExternalLink, Github, ChevronLeft, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

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

const projectsData = [
  {
    titleKey: "projects.items.devlab.title",
    descKey: "projects.items.devlab.desc",
    images: [devlab2025Img, meDevlav2025Img],
    technologies: ["Vue.js", "Tailwind CSS", "Framer-motion", "Pinia", "Node.js", "Mojaloop"],
    githubLink: "https://github.com/elonmelonm/devlab-2025-result",
    category: "Web"
  },
  {
    titleKey: "projects.items.hackathon.title",
    descKey: "projects.items.hackathon.desc",
    images: [hackathonIA2025Img],
    technologies: ["React.js", "Tailwind CSS", "Framer-motion", "FastApi"],
    githubLink: "https://github.com/elonmelonm/les_mentats-luxdev-hackaton-ia-2025",
    liveLink: "https://les-mentats-luxdev-hackaton-ia-2025.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.tototte.title",
    descKey: "projects.items.tototte.desc",
    images: [ftcW4Img],
    technologies: ["React.js", "Tailwind CSS", "Framer-motion", "Figma"],
    githubLink: "https://github.com/elonmelonm/ftc-w4-elonm.git",
    liveLink: "https://ftc-w4-elonm.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.monito.title",
    descKey: "projects.items.monito.desc",
    images: [ftcW3Img],
    technologies: ["React.js", "Tailwind CSS", "Framer-motion", "Figma"],
    githubLink: "https://github.com/elonmelonm/FTC-W3-ELONM.git",
    liveLink: "https://ftc-w3-elonm.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.spending.title",
    descKey: "projects.items.spending.desc",
    images: [ftcW2Img],
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/spending-management-landing-page.git",
    liveLink: "https://ftc-w2-elonm.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.saas.title",
    descKey: "projects.items.saas.desc",
    images: [ftcW1Img],
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/SaaS-Futuristic-App.git",
    liveLink: "https://ftc-w1-elonm.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.budget.title",
    descKey: "projects.items.budget.desc",
    images: [budgetManagementImg],
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MySql"],
    githubLink: "https://github.com/elonmelonm/BudgetManagement.git",
    liveLink: "https://budget-management-liard.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.task.title",
    descKey: "projects.items.task.desc",
    images: [todoAppImg],
    technologies: ["React.js", "Tailwind CSS", "Django", "PostgreSql"],
    githubLink: "https://github.com/elonmelonm/Todo-App.git",
    liveLink: "https://elonm-todo-app.vercel.app/",
    category: "Web"
  },
  {
    titleKey: "projects.items.fresh.title",
    descKey: "projects.items.fresh.desc",
    images: [freshFruitsImg],
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/fresh-fruits.git",
    liveLink: "https://fruits-selling-elm.netlify.app/",
    category: "Design"
  },
  {
    titleKey: "projects.items.elearning.title",
    descKey: "projects.items.elearning.desc",
    images: [eLearningImg],
    technologies: ["React.js", "Framer-motion"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://thecodingjourney-elm.netlify.app/",
    category: "Design"
  },
  {
    titleKey: "projects.items.smith.title",
    descKey: "projects.items.smith.desc",
    images: [smithPortfolioImg],
    technologies: ["React.js", "CSS"],
    githubLink: "https://github.com/elonmelonm/e-learning.git",
    liveLink: "https://smith-portfolio-elm.netlify.app/",
    category: "Design"
  },
  {
    titleKey: "projects.items.construction.title",
    descKey: "projects.items.construction.desc",
    images: [constructionImg],
    technologies: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/elonmelonm/construction-website.git",
    liveLink: "https://construction-site-elm.netlify.app/",
    category: "Web"
  }
];

interface Project {
  titleKey: string;
  descKey: string;
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, className = '' }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`bg-light-bg dark:bg-dark-bg rounded-xl shadow-lg overflow-hidden bg-light-bg/50 dark:bg-dark-bg/50 border border-secondary/10 backdrop-blur-sm hover:bg-secondary/5 transition-all group ${className}`}
    >
      <ProjectCarousel images={project.images} title={t(project.titleKey)} />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-secondary dark:text-white transition-colors duration-300 truncate pr-2">
            {t(project.titleKey)}
          </h3>
          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
            {project.category}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-12 text-sm transition-colors duration-300 line-clamp-2">
          {t(project.descKey)}
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
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            whileHover={{ x: 3 }}
          >
            <Github size={18} className="mr-1.5" />
            {t('projects.ui.code')}
          </motion.a>
          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              whileHover={{ x: 3 }}
            >
              <ExternalLink size={18} className="mr-1.5" />
              {t('projects.ui.live')}
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  const [showAllProjects, setShowAllProjects] = useState(false);

  const categories = [
    { id: 'All', label: t('projects.categories.all') },
    { id: 'Web', label: t('projects.categories.web') },
    { id: 'Mobile', label: t('projects.categories.mobile') },
    { id: 'Design', label: t('projects.categories.design') }
  ];

  const filteredProjects = projectsData.filter(p =>
    filter === 'All' ? true : p.category === filter
  );

  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

  const stats = [
    { label: t('projects.stats.experience'), value: "3+" },
    { label: t('projects.stats.recognition'), value: "2+" }
  ];

  return (
    <section id="projets" className="lg:mx-32 xl:mx-16 py-16 mb-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Statistics Bar */}
        {/* <motion.div
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
        </motion.div> */}

        <div className="flex flex-col justify-between items-center mb-16 gap-8">
          <div className="max-w-2xl text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-black mb-6 text-secondary dark:text-white transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {t('projects.title')}
            </motion.h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setFilter(cat.id); setShowAllProjects(false); }}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-light-bg dark:bg-dark-bg text-gray-500 border border-secondary/10 dark:border-white/10 hover:border-primary/30"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length > 3 && (
          <div className="flex justify-center mt-16">
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="inline-flex items-center px-10 py-4 bg-secondary text-white dark:bg-white dark:text-dark-bg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
              whileHover={{ y: -5 }}
            >
              {showAllProjects ? t('projects.buttons.show_less') : t('projects.buttons.view_all', { count: filteredProjects.length })}
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
            <h2 className="text-3xl md:text-5xl font-black text-secondary dark:text-white mb-4">{t('projects.workflow.title')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('projects.workflow.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: t('projects.workflow.discovery.title'), desc: t('projects.workflow.discovery.desc') },
              { step: "02", title: t('projects.workflow.strategy.title'), desc: t('projects.workflow.strategy.desc') },
              { step: "03", title: t('projects.workflow.development.title'), desc: t('projects.workflow.development.desc') },
              { step: "04", title: t('projects.workflow.deployment.title'), desc: t('projects.workflow.deployment.desc') }
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
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 relative group"
        >
          {/* Background Decorative Element */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative p-10 md:p-20 bg-light-bg/70 dark:bg-dark-bg/50 backdrop-blur-xl rounded-[3rem] border border-secondary/10 dark:border-white/10 overflow-hidden text-center">
            {/* Animated background shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h2 className="text-4xl md:text-6xl font-black text-secondary dark:text-white mb-6 tracking-tight">
              {t('projects.cta.title')}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('projects.cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="#contact"
                className="group/btn relative px-8 py-4 bg-primary text-white font-bold rounded-2xl flex items-center shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="mr-2 w-5 h-5 flex-shrink-0" />
                {t('projects.cta.button_chat')}
                <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
              </motion.a>

              {/* <motion.button
                onClick={() => setShowAllProjects(true)}
                className="px-8 py-4 bg-secondary/5 dark:bg-white/5 text-secondary dark:text-white font-bold rounded-2xl border border-secondary/10 dark:border-white/10 hover:bg-secondary/10 dark:hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('projects.cta.button_projects')}
              </motion.button> */}
            </div>
          </div>
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
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
  document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
}