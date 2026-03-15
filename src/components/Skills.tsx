import { motion } from "framer-motion";
import { useState } from 'react';
import { skills } from "../data/skills";
import SkillCard from "./SkillCard";
import { useTranslation } from "react-i18next";

export default function Skills() {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("Frontend");

    const categories = [
        { id: "Frontend", label: t('skills.categories.frontend') },
        { id: "Backend", label: t('skills.categories.backend') },
        { id: "Tools", label: t('skills.categories.tools') }
    ];

    const filteredSkills = skills.filter(skill => skill.category === activeCategory);

    const softSkills = [
        { title: t('skills.soft.adaptability.title'), desc: t('skills.soft.adaptability.desc') },
        { title: t('skills.soft.teamwork.title'), desc: t('skills.soft.teamwork.desc') },
        { title: t('skills.soft.problem_solving.title'), desc: t('skills.soft.problem_solving.desc') },
        { title: t('skills.soft.communication.title'), desc: t('skills.soft.communication.desc') }
    ];

    return (
        <section id="skills" className="lg:mx-32 xl:mx-16 py-20 px-4 transition-colors duration-300">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-between mb-16 gap-8">
                    <div className="flex flex-col text-center max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-black mb-6 text-secondary dark:text-white"
                        >
                            {t('skills.title').split('<0>').map((part, i) => {
                                if (part.includes('</0>')) {
                                    const [italic, rest] = part.split('</0>');
                                    return <span key={i}><span className="text-primary italic">{italic}</span>{rest}</span>;
                                }
                                return part;
                            })}
                        </motion.h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            {t('skills.subtitle')}
                        </p>
                    </div>

                    {/* Category Selector */}
                    <div className="flex gap-4 p-1 bg-secondary/5 dark:bg-white/5 rounded-2xl border border-secondary/10 dark:border-white/10">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:text-primary"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <SkillCard skill={skill} />
                        </motion.div>
                    ))}
                </div>

                {/* Soft Skills Section */}
                <div className="mb-32">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-2xl font-bold mb-12 text-center text-secondary dark:text-white uppercase tracking-[0.3em]"
                    >
                        {t('skills.soft.title')}
                    </motion.h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {softSkills.map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="h-full p-8 bg-white dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10 hover:border-primary/30 transition-colors"
                            >
                                <h4 className="text-lg font-bold text-primary mb-2">{skill.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Learning Roadmap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-10 md:p-16 bg-primary text-white rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col items-center justify-between gap-10">
                        <div className="max-w-2xl text-center">
                            <h3 className="text-3xl md:text-4xl font-black mb-4">{t('skills.learning.title')}</h3>
                            <p className="text-primary-foreground/80 font-medium">{t('skills.learning.desc')}</p>
                        </div>
                        <div className="flex flex-nowrap overflow-x-auto pb-4 sm:pb-0 sm:flex-wrap justify-start md:justify-center gap-2 md:gap-4 no-scrollbar">
                            {[
                                t('skills.learning.items.threejs'),
                                t('skills.learning.items.web3'),
                                t('skills.learning.items.cloud'),
                                t('skills.learning.items.native')
                            ].map((item, i) => (
                                <span key={i} className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl font-bold text-sm border border-white/20">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Decorative Background Icons/Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </motion.div>
            </div>
        </section>
    );
}