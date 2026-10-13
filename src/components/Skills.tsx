import { motion } from "framer-motion";
import { skills } from "../data/skills";
import SkillCard from "./SkillCard";
import { useTranslation } from "react-i18next";

export default function Skills() {
    const { t } = useTranslation();

    const categories = [
        { id: "Frontend", label: t('skills.categories.frontend') },
        { id: "Backend", label: t('skills.categories.backend') },
        { id: "Tools", label: t('skills.categories.tools') }
    ];

    const softSkills = ['adaptability', 'teamwork', 'problem_solving', 'communication'];
    const learning = ['threejs', 'web3', 'cloud', 'native'];

    const title = t('skills.title').split('<0>').map((part, i) => {
        if (!part.includes('</0>')) return part;
        const [accent, rest] = part.split('</0>');
        return <span key={i}><span className="text-indigo">{accent}</span>{rest}</span>;
    });

    return (
        <section id="skills" className="py-[clamp(40px,7vw,96px)]">
            <div className="mb-[clamp(40px,6vw,80px)] grid items-end gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
                <h1 className="page-title">{title}<span className="text-indigo">.</span></h1>
                <p className="lede">{t('skills.subtitle')}</p>
            </div>

            <div className="space-y-[clamp(40px,6vw,64px)]">
                {categories.map((cat) => {
                    const list = skills.filter((skill) => skill.category === cat.id);
                    return (
                        <div key={cat.id}>
                            <h2 className="mb-[18px] flex items-baseline gap-3 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold tracking-[-0.02em]">
                                {cat.label} <span className="label">{list.length}</span>
                            </h2>
                            <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
                                {list.map((skill, index) => (
                                    <motion.div
                                        key={skill.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                    >
                                        <SkillCard skill={skill} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-[clamp(56px,8vw,112px)]">
                <div className="sec-head">
                    <h2 className="sec-title">{t('skills.soft.title')}</h2>
                </div>
                <div className="grid gap-x-14 gap-y-7 md:grid-cols-2">
                    {softSkills.map((id) => (
                        <div key={id}>
                            <h3 className="mb-1 font-display text-xl font-semibold">{t(`skills.soft.${id}.title`)}</h3>
                            <p className="text-muted">{t(`skills.soft.${id}.desc`)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-[clamp(56px,8vw,112px)]">
                <div className="sec-head">
                    <h2 className="sec-title">{t('skills.learning.title')}</h2>
                </div>
                <p className="lede mb-5">{t('skills.learning.desc')}</p>
                <div className="flex flex-wrap gap-2.5">
                    {learning.map((id) => <span key={id} className="tag">{t(`skills.learning.items.${id}`)}</span>)}
                </div>
            </div>
        </section>
    );
}
