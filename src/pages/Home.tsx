import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import ProjectFeature from '../components/ProjectFeature';

import hackathonIA2025Img from '../assets/projetsImg/hackathon-ia-2025.png';
import devlab2025Img from '../assets/projetsImg/devlab-2025.png';
import meDevlav2025Img from '../assets/projetsImg/me-devlav-2025.jpg';
import ftcW4Img from '../assets/projetsImg/ftc-w4-elonm.png';

const featuredProjects = [
    { id: 'devlab', images: [devlab2025Img, meDevlav2025Img], tech: ["Vue.js", "Tailwind CSS", "Framer-motion", "Pinia", "Node.js", "Mojaloop"] },
    { id: 'hackathon', images: [hackathonIA2025Img], tech: ["React.js", "Tailwind", "FastAPI"] },
    { id: 'tototte', images: [ftcW4Img], tech: ["React.js", "Framer Motion"] },
];

const Home = () => {
    const { t } = useTranslation();

    const services = [
        { title: t('home.services.web_dev'), desc: t('home.services.web_dev_desc') },
        { title: t('home.services.mobile_dev'), desc: t('home.services.mobile_dev_desc') },
        { title: t('home.services.uiux'), desc: t('home.services.uiux_desc') },
    ];

    return (
        <div className="pb-[clamp(56px,8vw,112px)]">
            <Hero />

            <section className="mt-[clamp(56px,8vw,112px)]">
                <div className="sec-head">
                    <h2 className="sec-title">{t('home.featured.title')}</h2>
                    <Link to="/projects" className="link-arrow">{t('home.featured.view_all')}</Link>
                </div>
                <p className="lede mb-12">{t('home.featured.subtitle')}</p>
                <div className="grid gap-[clamp(48px,7vw,96px)]">
                    {featuredProjects.map((project, idx) => (
                        <ProjectFeature
                            key={project.id}
                            index={idx}
                            images={project.images}
                            title={t(`home.featured.projects.${project.id}.title`)}
                            desc={t(`home.featured.projects.${project.id}.desc`)}
                            tags={project.tech}
                            action={<Link to="/projects" className="link-arrow">{t('home.featured.details')}</Link>}
                        />
                    ))}
                </div>
            </section>

            <section className="mt-[clamp(56px,8vw,112px)]">
                <div className="sec-head">
                    <h2 className="sec-title">{t('home.services.title')}</h2>
                    <Link to="/skills" className="link-arrow">{t('home.services.see_all')}</Link>
                </div>
                <p className="lede mb-6">{t('home.services.subtitle')}</p>
                <ul>
                    {services.map((s) => (
                        <li key={s.title} className="grid items-baseline gap-1 border-b border-rule py-[22px] md:grid-cols-[1fr_1.4fr] md:gap-6">
                            <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-[-0.02em]">{s.title}</h3>
                            <p className="text-muted">{s.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-[clamp(56px,8vw,112px)]">
                <div className="sec-head">
                    <h2 className="sec-title">{t('home.cta.title')}</h2>
                </div>
                <div className="grid items-end gap-6 md:grid-cols-[7fr_5fr]">
                    <p className="lede">{t('home.cta.subtitle')}</p>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/contact" className="btn-primary">{t('home.cta.hire_me')} <ArrowRight size={16} /></Link>
                        <Link to="/about" className="btn-ghost">{t('home.cta.learn_more')}</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
