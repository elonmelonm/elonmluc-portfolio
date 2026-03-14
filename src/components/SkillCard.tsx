import { motion } from "framer-motion"
import { useTranslation } from "react-i18next";

interface SkillCardProps {
    skill: {
        icon: string;
        title: string;
        descKey: string;
        level: number;
        category: string;
    }
}

export default function SkillCard({ skill }: SkillCardProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-4 rounded-xl bg-light-bg/50 dark:bg-dark-bg/50 border border-secondary/10 backdrop-blur-sm hover:bg-secondary/5 transition-colors"
        >
            <div className="flex gap-6">
                <div className="py-4 flex items-center justify-center">
                    <img
                        className="size-16 lg:size-10 rounded-lg"
                        src={skill.icon}
                        alt={skill.title.toLowerCase()}
                    />
                </div>
                <div className="flex-1 -ml-3">
                    <h3 className="text-xl text-secondary dark:text-white font-semibold mb-2">{skill.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t(skill.descKey)}</p>
                </div>
            </div>
        </motion.div>
    )
}