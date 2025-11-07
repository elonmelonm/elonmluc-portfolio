import ExperienceCard from "./ExperienceCard";
import { experiences } from "../data/experiences";


export default function ExperiencePart () {
    return (
        <div className="mx-auto">
            {experiences.map((experience, index) => (
                <ExperienceCard key={index} experience={experience} index={index} />
            ))}
        </div>
    )
}