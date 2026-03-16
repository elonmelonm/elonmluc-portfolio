import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Layout as LayoutIcon, ArrowRight, Rocket } from 'lucide-react';
import { ProjectCarousel } from '../components/Projects';

// Reusing project images for featured section
import hackathonIA2025Img from '../assets/projetsImg/hackathon-ia-2025.png';
import devlab2025Img from '../assets/projetsImg/devlab-2025.png';
import meDevlav2025Img from '../assets/projetsImg/me-devlav-2025.jpg';
import ftcW4Img from '../assets/projetsImg/ftc-w4-elonm.png';
import ftcW3Img from '../assets/projetsImg/ftc-w3-elonm.png';
import ftcW2Img from '../assets/projetsImg/ftc-w2-elonm.png';
import ftcW1Img from '../assets/projetsImg/ftc-w1-elonm.png';

import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <Code className="text-primary" size={32} />,
            title: t('home.services.web_dev'),
            desc: t('home.services.web_dev_desc')
        },
        {
            icon: <Smartphone className="text-primary" size={32} />,
            title: t('home.services.mobile_dev'),
            desc: t('home.services.mobile_dev_desc')
        },
        {
            icon: <LayoutIcon className="text-primary" size={32} />,
            title: t('home.services.uiux'),
            desc: t('home.services.uiux_desc')
        }
    ];

    const featuredProjects = [
        {
            id: 'devlab',
            images: [devlab2025Img, meDevlav2025Img],
            tech: ["Vue.js", "Tailwind CSS", "Framer-motion", "Pinia", "Node.js", "Mojaloop"]
        },
        {
            id: 'hackathon',
            images: [hackathonIA2025Img],
            tech: ["React.js", "Tailwind", "FastAPI"]
        },
        {
            id: 'tototte',
            images: [ftcW4Img],
            tech: ["React.js", "Framer Motion"]
        }
    ];

    return (
        <div className="flex flex-col overflow-hidden">
            <Hero />

            {/* Quick Services Section */}
            <section className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col justify-between items-center mb-16 gap-8">
                        <div className="max-w-2xl text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">
                                {t('home.services.title')}
                            </h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                {t('home.services.subtitle')}
                            </p>
                        </div>
                        <Link to="/skills" className="group flex items-center text-primary font-bold text-lg">
                            {t('home.services.see_all')}
                            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10 hover:border-primary/30 transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white dark:bg-dark-bg rounded-2xl shadow-sm inline-block group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold dark:text-white mb-3">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-24 bg-secondary/5 dark:bg-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4">{t('home.featured.title')}</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t('home.featured.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {featuredProjects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-light-bg dark:bg-dark-bg rounded-3xl overflow-hidden border border-secondary/10 shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <ProjectCarousel images={project.images} title={t(`home.featured.projects.${project.id}.title`)} height="h-64" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 pointer-events-none">
                                        <div className="flex gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-2 py-1 bg-primary/20 backdrop-blur-md rounded text-[10px] text-primary font-bold">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold dark:text-white mb-2">{t(`home.featured.projects.${project.id}.title`)}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{t(`home.featured.projects.${project.id}.desc`)}</p>
                                    <Link to="/projects" className="text-primary font-bold text-sm inline-flex items-center">
                                        {t('home.featured.details')} <ArrowRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/projects" className="inline-flex items-center px-8 py-4 bg-secondary text-white dark:bg-white dark:text-dark-bg font-bold rounded-full hover:scale-105 transition-all">
                            {t('home.featured.view_all')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Home Conversion CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-5 md:p-20 rounded-[3rem] bg-light-bg dark:bg-dark-bg text-center text-white overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10 opacity-50" />

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <Rocket className="w-16 h-16 text-primary mb-8 mx-auto animate-bounce" />
                            <h2 className="text-3xl md:text-5xl text-secondary dark:text-white font-black mb-8 leading-tight">
                                {t('home.cta.title')}
                            </h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 font-light">
                                {t('home.cta.subtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link to="/contact" className="px-10 py-5 bg-primary text-white font-bold text-xl rounded-full shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    {t('home.cta.hire_me')}
                                </Link>
                                <Link to="/about" className="px-10 py-5 bg-white/5 dark:bg-white/5 border border-secondary/50 dark:border-white/10 text-secondary dark:text-white font-bold text-xl rounded-full hover:bg-white/10 transition-all">
                                    {t('home.cta.learn_more')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
