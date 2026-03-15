import { Github, Linkedin, Mail, Sparkles, Code, Smartphone, Rocket, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300 pt-28 pb-32">
      {/* Social Links Sidebar - Fixed on left */}
      <div className="fixed left-8 bottom-0 z-50 hidden lg:flex flex-col items-center gap-6">
        {[
          { Icon: Github, href: "https://github.com/elonmelonm", title: "GitHub" },
          { Icon: Linkedin, href: "https://linkedin.com/in/luc-elonm-akakpo/", title: "LinkedIn" },
          { Icon: FaWhatsapp, href: "https://wa.me/22957113810", title: "WhatsApp" },
          { Icon: Mail, href: "mailto:elonmlucakakpo@gmail.com", title: "Email" }
        ].map((social, idx) => (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + idx * 0.1 }}
            whileHover={{ y: -5, color: '#0066FF' }}
            className="text-gray-400 hover:text-primary transition-colors duration-300"
            title={social.title}
          >
            <social.Icon size={20} />
          </motion.a>
        ))}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-px bg-gray-300 dark:bg-gray-700 mt-2"
        />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -70, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase tracking-wider mb-4"
          >
            <Sparkles size={16} className="mr-2" />
            {t('home.hero.available')}
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-secondary dark:text-white leading-[1.1] mb-6 tracking-tight">
              {t('home.hero.crafting')} <span className="text-primary italic">{t('home.hero.modern')}</span> <br />
              {t('home.hero.digital_experiences')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              {t('home.hero.hello')} <span className="text-primary font-bold">{t('home.hero.name')}</span>. {t('home.hero.subtitle')}
            </p>
          </motion.div>

          {/* Features / Services Icons (Typographic) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 py-8"
          >
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <Code size={20} className="text-primary" />
              <span className="font-semibold uppercase tracking-widest text-xs">{t('home.hero.specialization.web')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <Smartphone size={20} className="text-primary" />
              <span className="font-semibold uppercase tracking-widest text-xs">{t('home.hero.specialization.mobile')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
              <Rocket size={20} className="text-primary" />
              <span className="font-semibold uppercase tracking-widest text-xs">{t('home.hero.specialization.seo')}</span>
            </div>
          </motion.div>

          {/* CTA Group */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              to="/projects"
              className="group inline-flex items-center px-10 py-5 bg-primary text-white text-xl font-bold rounded-full shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            >
              {t('home.hero.see_projects')}
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-5 bg-transparent text-secondary dark:text-white border-2 border-secondary/20 dark:border-white/20 text-xl font-bold rounded-full hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-dark-bg transition-all"
            >
              {t('home.hero.lets_talk')}
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">{t('home.hero.discover')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;