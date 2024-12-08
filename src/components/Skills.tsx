import { motion } from "framer-motion";
import { skills } from "../data/skills";
import SkillCard from "./SkillCard";

export default function Skills () {
    return (
        <section id="skills" className="lg:mx-32 lg:mr-[330px] xl:mx-16 xl:mr-64 lg:min-h-screen bg-gray-50 py-16 mb-10 md:py-20 2xl:py-12 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br dark:bg-gray-800 to-blue-500/10 backdrop-blur-sm" />
            <div className="container mx-auto lg:px-4  rounded-xl py-10 px-4 md:px-20 relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white transition-colors duration-300 "
                >
                    Skills & Expertise
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-xl mx-auto text-gray-500 md:text-lg lg:text-xl xl:text-sm text-center mb-12"
                >
                    The skills, tools and technologies I am really good at
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard 
                            key={index} 
                            skill={skill}  
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}