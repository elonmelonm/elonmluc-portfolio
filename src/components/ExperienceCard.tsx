import type { ReactNode } from "react";
import { motion } from "framer-motion"

interface ExperienceCardProps {
    experience: {
        period: string;
        title: string;
        company: string;
        desc: string;
    };
    index: number;
    current?: boolean;
}

// Une étape de la timeline : la date d'un côté de la ligne, la carte de l'autre, en alternance.
export default function ExperienceCard({ experience, index, current = false }: ExperienceCardProps) {
    const flipped = index % 2 === 1;

    return (
        <motion.li
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid gap-1.5 py-[18px] pl-9 md:grid-cols-2 md:gap-x-14 md:pl-0"
        >
            <span
                aria-hidden="true"
                className={`absolute left-[7px] top-[26px] size-3.5 -translate-x-1/2 rounded-full border-[3px] border-indigo md:left-1/2 ${current ? 'bg-indigo ring-[5px] ring-indigo-soft' : 'bg-paper'}`}
            />
            <span className={`label pt-1 ${current ? 'text-live' : ''} ${flipped ? 'md:order-2' : 'md:text-right'}`}>
                {experience.period}
            </span>
            <div className={`rounded-lg border border-rule bg-surface px-[18px] py-4 ${flipped ? 'md:order-1' : ''}`}>
                <h3 className="mb-0.5 font-display text-xl font-semibold">{experience.title}</h3>
                {experience.company && <p className="text-[0.95rem] text-muted">{experience.company}</p>}
                {experience.desc && <p className="mt-2 text-[0.95rem] text-muted">{experience.desc}</p>}
            </div>
        </motion.li>
    )
}

export function Timeline({ children }: { children: ReactNode }) {
    return (
        <ol className="relative before:absolute before:bottom-1.5 before:left-[7px] before:top-1.5 before:w-0.5 before:-translate-x-1/2 before:bg-rule md:before:left-1/2">
            {children}
        </ol>
    );
}
