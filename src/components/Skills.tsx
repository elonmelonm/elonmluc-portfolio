import { motion } from "framer-motion";
import { useState } from 'react';
import { skills } from "../data/skills";
import SkillCard from "./SkillCard";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Skills() {
    const [showAllSkills, setShowAllSkills] = useState(false);
    const visibleSkills = showAllSkills ? skills : skills.slice(0, 6);

    const toggleSkills = () => setShowAllSkills(!showAllSkills);

    return (
        <section id="skills" className="lg:mx-32 xl:mx-16 lg:min-h-screen px-4 dark:bg-transparent py-16 mb-10 md:py-20 2xl:py-12 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 to-blue-500/10 backdrop-blur-sm" />
            <div className="container mx-auto rounded-xl py-10 px-4 md:px-10 lg:px-0 relative z-10">
                <motion.h2
                    style={{ fontFamily: 'Rammetto One' }} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold text-center mb-2 text-rose-700 dark:text-rose-500 transition-colors duration-300 "
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
                    {visibleSkills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <SkillCard 
                                skill={skill}  
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-end mt-8">
                    <motion.button
                        onClick={toggleSkills}
                        className="flex items-center gap-2 px-6 py-3 bg-rose-700 dark:bg-rose-500 dark:hover:bg-transparent text-white rounded-full hover:text-rose-700 hover:border-rose-700 hover:border-2 hover:bg-white dark:hover:bg-rose-600 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showAllSkills ? 'View Less' : 'View More'}
                        <motion.div
                            animate={{ rotate: showAllSkills ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {showAllSkills ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </section>
    )
}