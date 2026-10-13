import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useProjects } from "../hooks/useProjects";
import { getLang } from "../lib/lang";
import type { Project } from "../lib/database.types";
import ProjectFeature from './ProjectFeature';
import { ProjectCarousel } from './ProjectCarousel';

const INITIAL_COUNT = 4;

const ProjectSkeleton = () => (
  <div className="grid items-center gap-[clamp(20px,4vw,56px)] md:grid-cols-[7fr_5fr]">
    <div className="aspect-[16/10] rounded bg-indigo-soft animate-pulse" />
    <div className="space-y-3">
      <div className="h-8 w-2/3 rounded bg-indigo-soft animate-pulse" />
      <div className="h-4 w-full rounded bg-indigo-soft animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-indigo-soft animate-pulse" />
    </div>
  </div>
);

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const linkClass = "inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-indigo transition-colors focus-ring";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'fr' ? project.title_fr : project.title_en}
            className="site relative max-h-[90vh] w-full max-w-2xl overflow-y-auto no-scrollbar rounded-md border border-rule bg-paper shadow-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('projects.ui.close')}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-ink/60 text-paper hover:bg-indigo transition-colors focus-ring"
            >
              <X size={18} />
            </button>

            <ProjectCarousel images={project.images} title={lang === 'fr' ? project.title_fr : project.title_en} height="aspect-[16/10]" />

            <div className="p-6 sm:p-8">
              <span className="label">{project.category}</span>
              <h3 className="mb-5 mt-1 font-display text-3xl font-extrabold tracking-[-0.03em]">
                {lang === 'fr' ? project.title_fr : project.title_en}
              </h3>

              <h4 className="label mb-2">{t('projects.ui.description')}</h4>
              <p className="mb-6 whitespace-pre-line leading-relaxed text-muted">
                {lang === 'fr' ? project.desc_fr : project.desc_en}
              </p>

              <h4 className="label mb-2">{t('projects.ui.technologies')}</h4>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
              </div>

              {(project.github_link || project.live_link) && (
                <div className="flex flex-wrap gap-5 border-t border-rule pt-5">
                  {project.github_link && (
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <Github size={16} /> {t('projects.ui.code')}
                    </a>
                  )}
                  {project.live_link && (
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <ExternalLink size={16} /> {t('projects.ui.live')}
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState('All');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'All', label: t('projects.categories.all') },
    { id: 'Web', label: t('projects.categories.web') },
    { id: 'Mobile', label: t('projects.categories.mobile') },
  ];

  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);
  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);

  const workflow = [
    { title: t('projects.workflow.discovery.title'), desc: t('projects.workflow.discovery.desc') },
    { title: t('projects.workflow.strategy.title'), desc: t('projects.workflow.strategy.desc') },
    { title: t('projects.workflow.development.title'), desc: t('projects.workflow.development.desc') },
    { title: t('projects.workflow.deployment.title'), desc: t('projects.workflow.deployment.desc') },
  ];

  return (
    <section id="projets" className="py-[clamp(40px,7vw,96px)]">
      <div className="mb-[clamp(32px,5vw,56px)] grid items-end gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
        <h1 className="page-title">{t('projects.title')}<span className="text-indigo">.</span></h1>
        <p className="lede">{t('projects.subtitle')}</p>
      </div>

      {(loading || projects.length > 0) && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={t('projects.title')}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={filter === cat.id}
              onClick={() => { setFilter(cat.id); setShowAllProjects(false); }}
              className="chip-btn"
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {error ? (
        <p className="py-16 text-muted">{error}</p>
      ) : loading ? (
        <div className="grid gap-[clamp(48px,7vw,96px)]">
          {[0, 1].map((i) => <ProjectSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid gap-[clamp(48px,7vw,96px)]">
          {displayedProjects.map((project, index) => (
            <ProjectFeature
              key={project.id}
              index={index}
              images={project.images}
              title={lang === 'fr' ? project.title_fr : project.title_en}
              desc={lang === 'fr' ? project.desc_fr : project.desc_en}
              kind={project.category}
              tags={project.technologies.slice(0, 4)}
              action={
                <div className="flex flex-wrap items-center gap-5">
                  {project.slug ? (
                    <Link to={`/projects/${project.slug}`} className="link-arrow">
                      {t('case.read')}
                    </Link>
                  ) : (
                    <button type="button" onClick={() => setSelectedProject(project)} className="link-arrow">
                      {t('projects.ui.details')}
                    </button>
                  )}
                  {project.github_link && (
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-indigo focus-ring">
                      <Github size={16} /> {t('projects.ui.code')}
                    </a>
                  )}
                  {project.live_link && (
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-indigo focus-ring">
                      <ExternalLink size={16} /> {t('projects.ui.live')}
                    </a>
                  )}
                </div>
              }
            />
          ))}
        </div>
      )}

      {!loading && !error && filteredProjects.length > INITIAL_COUNT && (
        <div className="mt-16">
          <button type="button" onClick={() => setShowAllProjects(!showAllProjects)} className="btn-ghost">
            {showAllProjects ? t('projects.buttons.show_less') : t('projects.buttons.view_all', { count: filteredProjects.length })}
          </button>
        </div>
      )}

      <div className="mt-[clamp(56px,8vw,112px)]">
        <div className="sec-head">
          <h2 className="sec-title">{t('projects.workflow.title')}</h2>
        </div>
        <p className="lede mb-10">{t('projects.workflow.subtitle')}</p>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {workflow.map((phase, i) => (
            <li key={phase.title} className="lg:px-[22px] lg:first:pl-0 lg:[&+li]:border-l lg:border-rule">
              <span className="label mb-2.5 block text-indigo">{i + 1}</span>
              <h3 className="mb-2 font-display text-xl font-semibold">{phase.title}</h3>
              <p className="text-[0.95rem] text-muted">{phase.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-[clamp(56px,8vw,112px)]">
        <div className="sec-head">
          <h2 className="sec-title">{t('projects.cta.title')}</h2>
        </div>
        <div className="grid items-end gap-6 md:grid-cols-[7fr_5fr]">
          <p className="lede">{t('projects.cta.subtitle')}</p>
          <div>
            <Link to="/contact" className="btn-primary">
              {t('projects.cta.button_chat')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
