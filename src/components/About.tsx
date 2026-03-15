import { Files, Briefcase, MessageSquare, Award, Star, BookOpen, Code, Smartphone, ShieldCheck, Layout as LayoutIcon, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import shootMe from '../assets/ShootMe.png';
import cv from '../cv/cv_LUC_ELONM_AKAKPO.pdf';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      rotate: 2,
      transition: {
        duration: 0.3
      }
    }
  };

  const stats = [
    { icon: <Award className="text-primary" size={24} />, label: t('about.stats.experience'), value: t('about.stats.years_val') },
    { icon: <Star className="text-primary" size={24} />, label: t('about.stats.projects'), value: t('about.stats.projects_val') },
    { icon: <BookOpen className="text-primary" size={24} />, label: t('about.stats.learning'), value: t('about.stats.learning_val') }
  ];

  const services = [
    {
      id: 'web_dev',
      icon: <Code size={32} />,
      title: t('about.what_i_do.web_dev.title'),
    },
    {
      id: 'mobile_dev',
      icon: <Smartphone size={32} />,
      title: t('about.what_i_do.mobile_dev.title'),
    },
    {
      id: 'uiux',
      icon: <LayoutIcon size={32} />,
      title: t('about.what_i_do.uiux.title'),
    },
    {
      id: 'cyber',
      icon: <ShieldCheck size={32} />,
      title: t('about.what_i_do.cyber.title'),
    }
  ];

  return (
    <div className="flex flex-col gap-24 py-16">
      {/* Introduction Section */}
      <section id="about" className="lg:mx-32 xl:mx-20 min-h-screen flex items-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Photo Section */}
            <motion.div
              className="flex-1 w-full max-w-md"
              variants={imageVariants}
              whileHover="hover"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
                <img
                  src={shootMe}
                  alt="Luc Elonm Akakpo"
                  className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-dark-bg transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Text Section */}
            <div className="flex-1 text-center xl:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {t('about.title')}
                </h2>
                <span className="text-gray-500 dark:text-gray-400 text-lg">{t('about.intro')}</span>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10 flex flex-col items-center xl:items-start group hover:bg-primary/5 transition-all">
                    {stat.icon}
                    <h3 className="font-bold text-lg dark:text-white mt-2">{stat.value}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-light"
              >
                <Trans i18nKey="about.p1">
                  I am a <span className="text-primary font-semibold">Full Stack Developer</span> with over <span className="text-primary font-bold">3 years of experience</span> in building high-quality digital products.
                </Trans>
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed"
              >
                {t('about.p2')}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center xl:justify-start gap-4 mb-10"
              >
                <motion.a
                  href={cv}
                  download="LUC_ELONM_AKAKPO.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all text-sm md:text-base"
                  whileTap={{ scale: 0.95 }}
                >
                  {t('about.buttons.download_cv')}
                  <Files className="ml-2" size={18} />
                </motion.a>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-3 bg-transparent text-primary font-bold rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all text-sm md:text-base"
                  >
                    {t('about.buttons.contact_me')}
                    <MessageSquare className="ml-2" size={18} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/projects"
                    className="inline-flex items-center px-8 py-3 bg-secondary/10 dark:bg-white/10 text-secondary dark:text-white font-bold rounded-full border border-secondary/20 dark:border-white/20 hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-dark-bg transition-all text-sm md:text-base"
                  >
                    {t('about.buttons.my_projects')}
                    <Briefcase className="ml-2" size={18} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="lg:mx-32 xl:mx-20 py-16 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {t('about.what_i_do.title')}
            </h2>
            <span className="text-gray-500 dark:text-gray-400 text-lg">{t('about.what_i_do.subtitle')}</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-dark-bg shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-secondary dark:text-white group-hover:text-primary transition-colors h-14 line-clamp-2">
                  {service.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(t(`about.what_i_do.${service.id}.tools`, { returnObjects: true }) as string[]).map((tool, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground text-[10px] font-bold rounded-lg border border-primary/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Contact CTA Section */}
      <section className="lg:mx-32 xl:mx-20 py-24 px-4 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary via-primary/90 to-blue-600 text-center text-white shadow-2xl shadow-primary/30 group"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center mb-8"
              >
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                  <Rocket className="w-12 h-12 text-white animate-bounce" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
              >
                {t('about.fun_cta.title').split('<0>').map((part, i) => {
                  if (part.includes('</0>')) {
                    const [italic, rest] = part.split('</0>');
                    return <span key={i}><span className="text-yellow-300">{italic}</span>{rest}</span>;
                  }
                  return part;
                })}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
              >
                {t('about.fun_cta.desc')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-6"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-10 py-5 bg-white text-primary font-bold text-xl rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  {t('about.fun_cta.chat')}
                  <MessageSquare className="ml-3 group-hover:rotate-12 transition-transform" />
                </Link>

                <Link
                  to="/projects"
                  className="group inline-flex items-center px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold text-xl rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  {t('about.fun_cta.work')}
                  <Sparkles className="ml-3 group-hover:animate-pulse" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;