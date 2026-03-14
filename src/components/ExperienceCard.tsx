import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import { useTranslation } from "react-i18next";

interface ExperienceCardProps {
    experience: {
        periodKey: string;
        titleKey: string;
        company: string;
        descKey: string;
    };
    index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-12 last:pb-0"
        >
            {/* Timeline line */}
            <div className="absolute left-[11px] top-1 bottom-0 w-px bg-gradient-to-b from-primary to-primary" />

            {/* Timeline dot */}
            <div className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full bg-gradient-to-br bg-primary to-primary flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 ml-6">
                <span className="text-sm font-semibold text-primary">
                    {t(experience.periodKey)}
                </span>
                <h3 className="text-xl text-gray-700 dark:text-primary/80 font-bold mt-1 mb-2">{t(experience.titleKey)}</h3>
                <h4 className="text-lg text-gray-600 dark:text-gray-400 mb-3">{experience.company}</h4>
                <p className="text-gray-600 dark:text-gray-300">{t(experience.descKey)}</p>
            </div>
        </motion.div>
    )
}