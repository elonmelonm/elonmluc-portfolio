import ExperienceCard from "./ExperienceCard";
import { experiences } from "../data/experiences";


export default function ExperiencePart() {
    return (
        <div className="relative mx-auto">
            {/* Central line for large screens */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50 -translate-x-1/2" />

            <div className="flex flex-col">
                {experiences.map((experience, index) => (
                    <ExperienceCard key={index} experience={experience} index={index} />
                ))}
            </div>
        </div>
    )
}