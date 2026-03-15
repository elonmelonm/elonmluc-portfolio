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
            className={`relative flex w-full mb-12 last:mb-0 ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
                }`}
        >
            {/* Mobile/Tablet Timeline line (hidden on lg) */}
            <div className="lg:hidden absolute left-[11px] top-1 bottom-[-3rem] w-px bg-primary last:hidden" />

            {/* Timeline dot - Positioned left on mobile, centered on lg */}
            <div className={`absolute top-1 w-[23px] h-[23px] rounded-full bg-primary flex items-center justify-center z-10 
                left-0 lg:left-1/2 lg:-translate-x-1/2`}
            >
                <Briefcase className="w-3 h-3 text-white" />
            </div>

            {/* Card Content - Occupies full width on mobile, ~45% on lg */}
            <div className={`w-full lg:w-[45%] bg-primary/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 
                ${index % 2 === 0
                    ? "ml-8 lg:ml-0 lg:text-right lg:pr-10"
                    : "ml-8 lg:ml-0 lg:text-left lg:pl-10"
                }`}
            >
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