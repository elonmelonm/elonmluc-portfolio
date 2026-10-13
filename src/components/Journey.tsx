import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EducationPart from "./EducationPart";
import ExperiencePart from "./ExperiencePart";
import CertificationsPart from "./CertificationsPart";
import { useExperiences } from "../hooks/useExperiences";
import { useEducations } from "../hooks/useEducations";
import { useCertifications } from "../hooks/useCertifications";

export default function Experience() {
    const { t } = useTranslation();
    const { experiences } = useExperiences();
    const { educations } = useEducations();
    const { certifications } = useCertifications();
    const [toggleState, setToggleState] = useState(0);

    // Onglets dont la section a du contenu uniquement.
    const tabs = [
        experiences.length > 0 && { id: 1, label: t('journey.tabs.experience') },
        educations.length > 0 && { id: 2, label: t('journey.tabs.education') },
        certifications.length > 0 && { id: 3, label: t('journey.tabs.certs') },
    ].filter(Boolean) as { id: number; label: string }[];

    // Sélectionne le premier onglet disponible si l'actif n'existe pas/plus.
    useEffect(() => {
        if (tabs.length > 0 && !tabs.some((tab) => tab.id === toggleState)) {
            setToggleState(tabs[0].id);
        }
    }, [tabs, toggleState]);

    const languages = [
        { name: t('journey.communication.french'), level: t('journey.communication.advanced') },
        { name: t('journey.communication.english'), level: t('journey.communication.beginner') }
    ];

    const title = t('journey.title').split('<0>').map((part, i) => {
        if (!part.includes('</0>')) return part;
        const [accent, rest] = part.split('</0>');
        return <span key={i}><span className="text-indigo">{accent}</span>{rest}</span>;
    });

    return (
        <section id="journey" className="py-[clamp(40px,7vw,96px)]">
            <div className="mb-[clamp(40px,6vw,80px)] grid items-end gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
                <h1 className="page-title">{title}<span className="text-indigo">.</span></h1>
                <p className="lede">{t('journey.subtitle')}</p>
            </div>

            {tabs.length > 0 && (
                <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label={t('nav.journey')}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            aria-pressed={toggleState === tab.id}
                            onClick={() => setToggleState(tab.id)}
                            className="chip-btn"
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="min-h-[300px]">
                {toggleState === 1 && <ExperiencePart />}
                {toggleState === 2 && <EducationPart />}
                {toggleState === 3 && <CertificationsPart />}
            </div>

            <div className="mt-[clamp(56px,8vw,112px)]">
                <div className="sec-head">
                    <h2 className="sec-title">{t('journey.communication.title')}</h2>
                </div>
                <dl className="max-w-[520px] border-t border-rule">
                    {languages.map((lang) => (
                        <div key={lang.name} className="flex justify-between gap-4 border-b border-rule py-3.5">
                            <dt className="text-muted">{lang.name}</dt>
                            <dd className="font-display text-xl font-semibold">{lang.level}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
