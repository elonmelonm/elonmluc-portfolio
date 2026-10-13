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
        <div className="flex h-full items-start gap-4 rounded-lg border border-rule bg-surface p-[18px] transition-[border-color,transform] duration-200 hover:-translate-y-[3px] hover:border-indigo">
            {/* Fond blanc fixe : certaines icônes (Next.js, Express) sont noires */}
            <span className="grid size-[52px] flex-none place-items-center rounded-[10px] border border-rule bg-white">
                <img className="size-[30px]" src={skill.icon} alt="" aria-hidden="true" loading="lazy" />
            </span>
            <div className="min-w-0">
                <h3 className="mb-1 font-display text-lg font-semibold">{skill.title}</h3>
                <p className="text-sm leading-normal text-muted">{t(skill.descKey)}</p>
            </div>
        </div>
    )
}
