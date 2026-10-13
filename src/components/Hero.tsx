import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import portrait from '../assets/elonm-luc-akakpo.png';
import { useExperiences } from '../hooks/useExperiences';
import { getLang } from '../lib/lang';

const socials = [
  { Icon: Github, href: "https://github.com/elonmelonm", title: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com/in/luc-elonm-akakpo/", title: "LinkedIn" },
  { Icon: FaWhatsapp, href: "https://wa.me/22957113810", title: "WhatsApp" },
  { Icon: Mail, href: "mailto:elonmlucakakpo@gmail.com", title: "Email" },
];

// Heure locale de Cotonou, rafraîchie toutes les 30 s.
function useCotonouTime() {
  const format = () => new Date().toLocaleTimeString('fr-FR', { timeZone: 'Africa/Porto-Novo', hour: '2-digit', minute: '2-digit' });
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Hero = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const time = useCotonouTime();
  const { experiences } = useExperiences();
  const current = experiences[0];

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="py-[clamp(40px,7vw,96px)]">
      {/* Réseaux sociaux : sortent du bas vers le haut */}
      <div className="fixed left-[clamp(12px,2vw,32px)] bottom-0 z-30 hidden xl:flex flex-col items-center gap-5">
        {socials.map(({ Icon, href, title }, idx) => (
          <motion.a
            key={title}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={title}
            title={title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="text-muted hover:text-indigo transition-colors rounded focus-ring"
          >
            <Icon size={20} />
          </motion.a>
        ))}
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block h-24 w-px origin-bottom bg-rule"
        />
      </div>

      <motion.div
        className="grid items-end gap-[clamp(24px,5vw,72px)] lg:grid-cols-[7fr_5fr]"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
      >
        <div>
          <motion.p variants={item} className="label mb-7">
            {t('home.hero.location')} · <span>{time}</span>
          </motion.p>
          <motion.h1 variants={item} className="page-title">
            {t('home.hero.crafting')} <span className="text-indigo">{t('home.hero.modern')}.</span>
          </motion.h1>
          <motion.p variants={item} className="lede my-7 text-[1.12rem]">
            {t('home.hero.hello')} <b className="font-medium text-ink">{t('home.hero.name')}</b>. {t('home.hero.subtitle')}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary">
              {t('home.hero.see_projects')} <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-ghost">{t('home.hero.lets_talk')}</Link>
          </motion.div>
          {current && (
            <motion.div variants={item} className="mt-11 max-w-[520px] rounded bg-indigo-soft px-[18px] py-3.5 text-[0.95rem]">
              <strong className="block font-mono text-[0.78rem] font-medium text-indigo">{t('home.hero.now')}</strong>
              {lang === 'fr' ? current.title_fr : current.title_en}
              {current.company && ` · ${current.company}`}
            </motion.div>
          )}
        </div>

        <motion.figure variants={item} className="m-0 max-w-[420px] lg:max-w-none">
          <img
            src={portrait}
            alt="Elonm Luc Akakpo"
            className="block aspect-[4/5] w-full rounded object-cover object-[35%_center]"
          />
          <figcaption className="label mt-2.5 flex justify-between">
            <span>{t('home.hero.specialization.web')} · {t('home.hero.specialization.mobile')} · {t('home.hero.specialization.seo')}</span>
            <span>{t('about.stats.years_val')}</span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
};

export default Hero;
