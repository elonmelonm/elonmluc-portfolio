import { Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import portrait from '../assets/elonm-luc-akakpo.png';
import { useCv } from '../hooks/useCv';
import { getLang } from '../lib/lang';

const About = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const { url: cv, downloadName } = useCv(lang);

  const facts = [
    { label: t('about.stats.experience'), value: t('about.stats.years_val') },
    { label: t('about.stats.projects'), value: t('about.stats.projects_val') },
    { label: t('about.stats.learning'), value: t('about.stats.learning_val') },
    { label: t('contact.info.location.label'), value: t('contact.info.location.val') },
  ];

  const services = ['web_dev', 'mobile_dev', 'uiux', 'cyber'];

  const reveal = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  };

  const funTitle = t('about.fun_cta.title').split('<0>').map((part, i) => {
    if (!part.includes('</0>')) return part;
    const [accent, rest] = part.split('</0>');
    return <span key={i}><span className="text-indigo">{accent}</span>{rest}</span>;
  });

  return (
    <div className="py-[clamp(40px,7vw,96px)]">
      <section id="about">
        <div className="mb-[clamp(40px,6vw,80px)] grid items-end gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
          <h1 className="page-title">{t('about.title')}<span className="text-indigo">.</span></h1>
          <div className="flex flex-wrap gap-3">
            <a href={cv} download={downloadName} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Download size={16} /> {t('about.buttons.download_cv')}
            </a>
            <Link to="/contact" className="btn-ghost">{t('about.buttons.contact_me')}</Link>
            <Link to="/projects" className="btn-ghost">{t('about.buttons.my_projects')}</Link>
          </div>
        </div>

        <div className="grid gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
          <motion.div {...reveal}>
            <p className="mb-5 font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-[1.2] tracking-[-0.02em]">
              <Trans i18nKey="about.p1">
                <b className="font-semibold text-indigo">{t('about.role')}</b>
                <b className="font-semibold text-indigo">3 years of experience</b>
              </Trans>
            </p>
            <p className="lede">{t('about.p2')}</p>
          </motion.div>

          <motion.div {...reveal} className="space-y-6">
            <img
              src={portrait}
              alt="Elonm Luc Akakpo"
              className="block aspect-[4/3] w-full rounded object-cover object-[35%_center]"
            />
            <dl className="border-t border-rule">
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 border-b border-rule py-3.5">
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="font-display text-xl font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      <section className="mt-[clamp(56px,8vw,112px)]">
        <div className="sec-head">
          <h2 className="sec-title">{t('about.what_i_do.title')}</h2>
          <span className="label">{t('about.what_i_do.subtitle')}</span>
        </div>
        <ul>
          {services.map((id) => (
            <li key={id} className="grid items-baseline gap-1 border-b border-rule py-[22px] md:grid-cols-[1fr_1.4fr] md:gap-6">
              <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-[-0.02em]">
                {t(`about.what_i_do.${id}.title`)}
              </h3>
              <p className="text-muted">{(t(`about.what_i_do.${id}.tools`, { returnObjects: true }) as string[]).join(' · ')}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-[clamp(56px,8vw,112px)]">
        <div className="sec-head">
          <h2 className="sec-title">{funTitle}</h2>
        </div>
        <div className="grid items-end gap-6 md:grid-cols-[7fr_5fr]">
          <p className="lede">{t('about.fun_cta.desc')}</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">{t('about.fun_cta.chat')} <ArrowRight size={16} /></Link>
            <Link to="/projects" className="btn-ghost">{t('about.fun_cta.work')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
