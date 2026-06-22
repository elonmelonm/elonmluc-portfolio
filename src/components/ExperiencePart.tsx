import { useTranslation } from "react-i18next";
import ExperienceCard from "./ExperienceCard";
import { useExperiences } from "../hooks/useExperiences";
import { getLang } from "../lib/lang";

export default function ExperiencePart() {
    const { i18n } = useTranslation();
    const { experiences, loading, error } = useExperiences();
    const lang = getLang(i18n.language);

    if (loading) {
        return (
            <div className="flex flex-col gap-6 max-w-xl mx-auto">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-32 rounded-xl bg-primary/5 dark:bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-gray-500 dark:text-gray-400">{error}</p>;
    }

    return (
        <div className="relative mx-auto">
            {/* Central line for large screens */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 -translate-x-1/2" />

            <div className="flex flex-col">
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={exp.id}
                        index={index}
                        experience={{
                            period: lang === 'fr' ? exp.period_fr : exp.period_en,
                            title: lang === 'fr' ? exp.title_fr : exp.title_en,
                            company: exp.company,
                            desc: lang === 'fr' ? exp.desc_fr : exp.desc_en,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
