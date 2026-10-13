import { useTranslation } from "react-i18next";
import ExperienceCard, { Timeline } from "./ExperienceCard";
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
                    <div key={i} className="h-32 rounded-xl bg-indigo-soft animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-muted">{error}</p>;
    }

    return (
        <Timeline>
            {experiences.map((exp, index) => (
                <ExperienceCard
                    key={exp.id}
                    index={index}
                    current={index === 0}
                    experience={{
                        period: lang === 'fr' ? exp.period_fr : exp.period_en,
                        title: lang === 'fr' ? exp.title_fr : exp.title_en,
                        company: exp.company,
                        desc: lang === 'fr' ? exp.desc_fr : exp.desc_en,
                    }}
                />
            ))}
        </Timeline>
    )
}
