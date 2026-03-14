import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Layout as LayoutIcon, ArrowRight, Rocket } from 'lucide-react';
import { ProjectCarousel } from '../components/Projects';

// Reusing project images for featured section
import hackathonIA2025Img from '../assets/projetsImg/hackathon-ia-2025.png';
import devlab2025Img from '../assets/projetsImg/devlab-2025.png';
import meDevlav2025Img from '../assets/projetsImg/me-devlav-2025.jpg';
import ftcW4Img from '../assets/projetsImg/ftc-w4-elonm.png';
import ftcW3Img from '../assets/projetsImg/ftc-w3-elonm.png';
import ftcW2Img from '../assets/projetsImg/ftc-w2-elonm.png';
import ftcW1Img from '../assets/projetsImg/ftc-w1-elonm.png';

const Home = () => {
    const services = [
        {
            icon: <Code className="text-primary" size={32} />,
            title: "Web Development",
            desc: "High-performance, modern websites."
        },
        {
            icon: <Smartphone className="text-primary" size={32} />,
            title: "Mobile Apps",
            desc: "Cross-platform React Native apps."
        },
        {
            icon: <LayoutIcon className="text-primary" size={32} />,
            title: "UI/UX Design",
            desc: "Clean & intuitive user interfaces."
        }
    ];

    const featuredProjects = [
        {
            title: "DEVLAB 2025",
            desc: "Hackathon 2025 : développer une solution open source de paiement en masse des pensions de retraite en intégrant les API Mojaloop",
            images: [devlab2025Img, meDevlav2025Img],
            tech: ["Vue.js", "Tailwind CSS", "Framer-motion", "Pinia", "Node.js", "Mojaloop"]
        },
        {
            title: "Hackathon IA 2025",
            desc: "IA solutions for land data management.",
            images: [hackathonIA2025Img],
            tech: ["React.js", "Tailwind", "FastAPI"]
        },
        {
            title: "The French Tototte",
            desc: "Modern e-commerce landing page.",
            images: [ftcW4Img],
            tech: ["React.js", "Framer Motion"]
        }
    ];

    return (
        <div className="flex flex-col overflow-hidden">
            <Hero />

            {/* Quick Services Section */}
            <section className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-6">
                                Specialized in <span className="text-primary">Modern</span> Solutions
                            </h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400">
                                Harnessing the power of the latest technologies to build software that scales and converts.
                            </p>
                        </div>
                        <Link to="/skills" className="group flex items-center text-primary font-bold text-lg">
                            See All Skills
                            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10 hover:border-primary/30 transition-all group"
                            >
                                <div className="mb-6 p-4 bg-white dark:bg-dark-bg rounded-2xl shadow-sm inline-block group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold dark:text-white mb-3">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-24 bg-secondary/5 dark:bg-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-4">Featured Work</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">A selection of my recent projects where creativity meets functionality.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {featuredProjects.map((project, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-light-bg dark:bg-dark-bg rounded-3xl overflow-hidden border border-secondary/10 shadow-xl"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <ProjectCarousel images={project.images} title={project.title} height="h-64" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 pointer-events-none">
                                        <div className="flex gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-2 py-1 bg-primary/20 backdrop-blur-md rounded text-[10px] text-primary font-bold">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold dark:text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{project.desc}</p>
                                    <Link to="/projects" className="text-primary font-bold text-sm inline-flex items-center">
                                        Details <ArrowRight size={14} className="ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/projects" className="inline-flex items-center px-8 py-4 bg-secondary text-white dark:bg-white dark:text-dark-bg font-bold rounded-full hover:scale-105 transition-all">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Home Conversion CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative p-12 md:p-20 rounded-[3rem] bg-dark-bg text-center text-white overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10 opacity-50" />

                        <div className="relative z-10 max-w-3xl mx-auto text-center">
                            <Rocket className="w-16 h-16 text-primary mb-8 mx-auto animate-bounce" />
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                                Ready to Transform Your <span className="text-primary">Digital</span> Future?
                            </h2>
                            <p className="text-xl text-gray-400 mb-12 font-light">
                                Let's unite your vision with my expertise to create something truly exceptional. High-performance, secure, and uniquely designed.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link to="/contact" className="px-10 py-5 bg-primary text-white font-bold text-xl rounded-full shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                                    Hire Me Now
                                </Link>
                                <Link to="/about" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-xl rounded-full hover:bg-white/10 transition-all">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
