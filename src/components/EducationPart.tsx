import { useTranslation } from "react-i18next";
import ExperienceCard from "./ExperienceCard";
import { useEducations } from "../hooks/useEducations";
import { getLang } from "../lib/lang";

export default function EducationPart() {
    const { i18n } = useTranslation();
    const { educations, loading, error } = useEducations();
    const lang = getLang(i18n.language);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 max-w-xl mx-auto">
                {[0, 1].map((i) => (
                    <div key={i} className="h-32 rounded-xl bg-primary/5 dark:bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-gray-500 dark:text-gray-400">{error}</p>;
    }

    return (
        <div className="mx-auto">
            {educations.map((edu, index) => (
                <ExperienceCard
                    key={edu.id}
                    index={index}
                    experience={{
                        period: edu.period,
                        title: lang === 'fr' ? edu.title_fr : edu.title_en,
                        company: edu.company,
                        desc: lang === 'fr' ? edu.desc_fr : edu.desc_en,
                    }}
                />
            ))}
        </div>
    )
}
