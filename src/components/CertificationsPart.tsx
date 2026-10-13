import { useTranslation } from "react-i18next";
import { useCertifications } from "../hooks/useCertifications";
import { getLang } from "../lib/lang";
import ExperienceCard, { Timeline } from "./ExperienceCard";

export default function CertificationsPart() {
    const { i18n } = useTranslation();
    const { certifications, loading, error } = useCertifications();
    const lang = getLang(i18n.language);

    if (loading) {
        return (
            <div className="mx-auto flex max-w-xl flex-col gap-6">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-24 rounded-lg bg-indigo-soft animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-muted">{error}</p>;
    }

    return (
        <Timeline>
            {certifications.map((cert, index) => (
                <ExperienceCard
                    key={cert.id}
                    index={index}
                    experience={{
                        period: cert.year,
                        title: lang === 'fr' ? cert.title_fr : cert.title_en,
                        company: cert.issuer,
                        desc: '',
                    }}
                />
            ))}
        </Timeline>
    );
}
