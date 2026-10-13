import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../hooks/useProjects';
import { getLang } from '../lib/lang';
import { SITE_URL } from '../lib/seo';
import ImageSlider from '../components/ImageSlider';
import type { Project } from '../lib/database.types';

type ChapterKey = 'problem' | 'design' | 'build' | 'result';
const CHAPTERS: ChapterKey[] = ['problem', 'design', 'build', 'result'];

// Paragraphes séparés par une ligne vide dans l'admin.
const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const { projects, loading, error } = useProjects();
  const [active, setActive] = useState<ChapterKey>('problem');

  const index = projects.findIndex((p) => p.slug === slug);
  const project: Project | undefined = projects[index];
  const next = projects.length > 1 && index >= 0 ? projects[(index + 1) % projects.length] : undefined;

  const pick = (p: Project, key: string) =>
    (p as unknown as Record<string, string>)[`${key}_${lang}`] || (p as unknown as Record<string, string>)[`${key}_${lang === 'fr' ? 'en' : 'fr'}`] || '';

  const chapters = project ? CHAPTERS.filter((key) => pick(project, key)) : [];

  // Chapitre actif dans le sommaire selon le défilement.
  useEffect(() => {
    if (!chapters.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as ChapterKey)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    chapters.forEach((key) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters.join(',')]);

  if (loading) {
    return (
      <div className="py-[clamp(40px,7vw,96px)] space-y-6">
        <div className="h-16 w-2/3 rounded bg-indigo-soft animate-pulse" />
        <div className="aspect-[16/8] rounded-md bg-indigo-soft animate-pulse" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-[clamp(40px,7vw,96px)]">
        <h1 className="page-title">{t('case.not_found')}</h1>
        <Link to="/projects" className="btn-ghost mt-8">
          <ArrowLeft size={16} /> {t('case.all_projects')}
        </Link>
      </div>
    );
  }

  const title = lang === 'fr' ? project.title_fr : project.title_en;
  // L'accroche n'apparaît en haut que si elle est remplie ; la description reste en bas.
  const pitch = pick(project, 'pitch');
  const description = lang === 'fr' ? project.desc_fr : project.desc_en;
  const metaDescription = (pitch || description).slice(0, 160);
  const role = pick(project, 'role');
  const cover = project.images[0];

  const facts = [
    role && { label: t('case.role'), value: role },
    project.year && { label: t('case.year'), value: project.year },
    { label: t('case.category'), value: project.category },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="pb-[clamp(56px,8vw,96px)]">
      <Helmet>
        <title>{`${title} — Elonm Luc Akakpo`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`${SITE_URL}/projects/${project.slug}`} />
        <meta property="og:url" content={`${SITE_URL}/projects/${project.slug}`} />
        <meta property="og:title" content={`${title} — Elonm Luc Akakpo`} />
        <meta property="og:description" content={metaDescription} />
        {cover && <meta property="og:image" content={cover} />}
        <meta name="twitter:title" content={`${title} — Elonm Luc Akakpo`} />
        {cover && <meta name="twitter:image" content={cover} />}
      </Helmet>

      <Link to="/projects" className="mt-[clamp(32px,5vw,56px)] inline-flex items-center gap-2 text-muted hover:text-ink rounded focus-ring">
        <ArrowLeft size={16} /> {t('case.all_projects')}
      </Link>

      <header className="mt-6 grid items-end gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
        <div>
          <span className="label">{project.category}</span>
          <h1 className="page-title mt-1">{title}</h1>
          {pitch && <p className="mt-[22px] max-w-[40ch] text-[clamp(1.15rem,1.8vw,1.4rem)] leading-[1.45] text-muted">{pitch}</p>}
        </div>
        <dl className="border-t border-rule">
          {facts.map((fact) => (
            <div key={fact.label} className="flex justify-between gap-4 border-b border-rule py-3">
              <dt className="text-muted">{fact.label}</dt>
              <dd className="text-right font-medium">{fact.value}</dd>
            </div>
          ))}
          {(project.live_link || project.github_link) && (
            <div className="flex flex-wrap justify-end gap-5 border-b border-rule py-3">
              {project.live_link && (
                <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo rounded focus-ring">
                  {t('case.visit')} <ArrowUpRight size={16} />
                </a>
              )}
              {project.github_link && (
                <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-indigo rounded focus-ring">
                  <Github size={16} /> {t('projects.ui.code')}
                </a>
              )}
            </div>
          )}
        </dl>
      </header>

      <ImageSlider images={project.images} title={title} className="mt-[clamp(40px,6vw,72px)]" />

      {chapters.length > 0 ? (
        <div className="mt-[clamp(64px,9vw,120px)] grid gap-x-[clamp(24px,5vw,72px)] lg:grid-cols-[200px_1fr]">
          <nav aria-label={t('case.chapters')} className="sticky top-24 hidden self-start lg:flex flex-col gap-1.5">
            {chapters.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className={`flex gap-2.5 py-1 text-[0.92rem] rounded focus-ring ${active === key ? 'text-ink' : 'text-muted'}`}
              >
                <span className={`label min-w-5 ${active === key ? 'text-indigo' : ''}`}>{CHAPTERS.indexOf(key) + 1}</span>
                {t(`case.${key}`)}
              </a>
            ))}
          </nav>
          <div>
            {chapters.map((key, i) => (
              <section
                key={key}
                id={key}
                className={`scroll-mt-24 pb-[clamp(48px,7vw,88px)] ${i > 0 ? 'border-t border-rule pt-[clamp(32px,4vw,48px)]' : ''}`}
              >
                <span className="label text-indigo">{CHAPTERS.indexOf(key) + 1} · {t(`case.${key}`)}</span>
                <div className="mt-4 space-y-3.5">
                  {paragraphs(pick(project, key)).map((para, j) => (
                    <p key={j} className={j === 0 ? 'max-w-[62ch] font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug text-ink' : 'max-w-[62ch] text-muted'}>
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-[clamp(48px,7vw,88px)] mb-[clamp(56px,8vw,96px)] whitespace-pre-line text-[1.05rem] leading-relaxed text-muted">
          {description}
        </p>
      )}

      {project.technologies.length > 0 && (
        <section className="mb-[clamp(56px,8vw,96px)]">
          <div className="sec-head"><h2 className="sec-title">{t('case.stack')}</h2></div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => <span key={tech} className="tag">{tech}</span>)}
          </div>
        </section>
      )}

      {next?.slug && (
        <Link to={`/projects/${next.slug}`} className="group grid grid-cols-[1fr_auto] items-end gap-4 border-t border-ink pt-7 rounded-sm focus-ring">
          <span>
            <span className="label">{t('case.next')}</span>
            <span className="mt-1 block font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-[-0.03em] transition-colors group-hover:text-indigo">
              {lang === 'fr' ? next.title_fr : next.title_en}
            </span>
          </span>
          <ArrowRight size={40} className="text-indigo transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </article>
  );
}
