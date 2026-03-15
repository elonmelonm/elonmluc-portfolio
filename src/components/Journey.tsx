import { motion } from "framer-motion";
import { Backpack, GraduationCap, Rocket } from "lucide-react";
import EducationPart from "./EducationPart";
import ExperiencePart from "./ExperiencePart";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Experience() {
    const { t } = useTranslation();
    const [toggleState, setToggleState] = useState(1);
    const [isActive, setIsActive] = useState(1);

    const toggleTab = (index: number) => {
        setToggleState(index);
        setIsActive(index);
    }

    const languages = [
        { name: t('journey.communication.french'), level: t('journey.communication.advanced'), icon: "🇫🇷" },
        { name: t('journey.communication.english'), level: t('journey.communication.beginner'), icon: "🇬🇧" }
    ];

    const certifications = [
        { title: t('journey.certifications.meta'), issuer: "Coursera / Meta", year: "2024" },
        { title: t('journey.certifications.rwd'), issuer: "FreeCodeCamp", year: "2023" },
        { title: t('journey.certifications.js'), issuer: "FreeCodeCamp", year: "2023" }
    ];

    return (
        <section id="journey" className="lg:mx-32 xl:mx-16 py-20 px-4 transition-colors duration-300">
            <div className="container mx-auto">
                <div className="flex flex-col justify-between items-center mb-16 gap-8">
                    <div className="max-w-2xl text-center">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-6xl font-black mb-6 text-secondary dark:text-white"
                        >
                            {t('journey.title').split('<0>').map((part, i) => {
                                if (part.includes('</0>')) {
                                    const [italic, rest] = part.split('</0>');
                                    return <span key={i}><span className="text-primary italic">{italic}</span>{rest}</span>;
                                }
                                return part;
                            })}
                        </motion.h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            {t('journey.subtitle')}
                        </p>
                    </div>

                    {/* Tab Selectors */}
                    <div className="flex gap-2 p-1 bg-secondary/5 dark:bg-white/5 rounded-2xl border border-secondary/10 dark:border-white/10">
                        {[
                            { id: 1, icon: Backpack, label: t('journey.tabs.experience') },
                            { id: 2, icon: GraduationCap, label: t('journey.tabs.education') },
                            // { id: 3, icon: Rocket, label: t('journey.tabs.certs') }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => toggleTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${isActive === tab.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:text-primary"
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {toggleState === 1 && <ExperiencePart />}
                    {toggleState === 2 && <EducationPart />}
                    {/* {toggleState === 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {certifications.map((cert, i) => (
                                <div key={i} className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10 group hover:border-rose-600/30 transition-colors">
                                    <div className="text-xs font-bold text-primary mb-2">{cert.year}</div>
                                    <h4 className="text-lg font-bold text-secondary dark:text-white mb-2">{cert.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                                </div>
                            ))}
                        </motion.div>
                    )} */}
                </div>

                {/* Languages Section */}
                <div className="mt-40">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-2xl font-bold mb-12 text-center text-secondary dark:text-white uppercase tracking-[0.3em]"
                    >
                        {t('journey.communication.title')}
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {languages.map((lang, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-6 p-8 bg-white dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10"
                            >
                                <div className="text-4xl">{lang.icon}</div>
                                <div>
                                    <h4 className="text-xl font-bold text-secondary dark:text-white">{lang.name}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{lang.level}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
