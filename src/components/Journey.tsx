import { motion } from "framer-motion";
import { Backpack, GraduationCap } from "lucide-react";
import EducationPart from "./EducationPart";
import ExperiencePart from "./ExperiencePart";
import { useState } from "react";

export default function Experience () {
    const [toggleState, setToggleState] = useState(1);
    const [isActive, setIsActive] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
        setIsActive(index);
    }

    return (
        <section id="journey" className="lg:mx-32 lg:mr-[330px] xl:mx-16 xl:mr-64 lg:min-h-screen py-16 lg:mb-0 mb-10 md:py-20 2xl:py-20 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 dark:bg-transparent bg-gradient-to-br bg-gray-50 dark:bg-gray-800 to-blue-500/10 backdrop-blur-sm" />
            <div className="container mx-auto px-4 md:px-20 relative z-10">
                <motion.h2
                    style={{ fontFamily: 'Rammetto One' }} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-bold text-center mb-2 text-rose-700 dark:text-rose-500 transition-colors duration-300 "
                >
                    Qualification
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-xl mx-auto text-gray-500 md:text-lg lg:text-xl xl:text-sm text-center mb-10"
                >
                    My personnel Journey
                </motion.p>
                <motion.div 
                    // variants={itemVariants}
                    className="max-w-xl flex justify-center  gap-1 md:gap-8 mb-5 mx-auto"
                    >
                    <motion.button 
                        // href=""
                        className={isActive===1 ? "inline-flex items-center gap-2 px-6 py-3 bg-rose-700 dark:bg-rose-500 text-white rounded-full transition-colors duration-300" : 
                           "inline-flex items-center gap-2 px-6 py-3 border-2 border-rose-700 dark:border-rose-500 text-rose-700 dark:text-rose-500 rounded-full hover:bg-rose-700 dark:hover:bg-rose-500 dark:hover:text-white hover:text-white transition-colors duration-300" }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTab(1)}
                    >
                        <Backpack />
                        Experience
                    </motion.button>
                    <motion.button 
                        // href=""
                        className={isActive===1 ? "inline-flex items-center gap-2 px-6 py-3 border-2 border-rose-700 dark:border-rose-500 text-rose-700 dark:text-rose-500 rounded-full hover:bg-rose-700 dark:hover:bg-rose-500 dark:hover:text-white hover:text-white transition-colors duration-300" : 
                            "inline-flex items-center gap-2 px-6 py-3 bg-rose-700 dark:bg-rose-500 text-white rounded-full  hover:border-rose-600 transition-colors duration-300" }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTab(2) }
                    >
                        <GraduationCap />
                        Education
                        <motion.div
                        animate={{
                            x: [0, 5, 0],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity
                        }}
                        >
                        </motion.div>
                    </motion.button>
                    
                    </motion.div>
                <div className="mx-auto">
                    {toggleState===1 
                        ?
                            <ExperiencePart />
                        :
                            <EducationPart />
                    }
                </div>
                
            </div>
        </section>
    )
}