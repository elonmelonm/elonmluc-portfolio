import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollUp from './components/ScrollUp';

function App() {
  return (
    <ThemeProvider>
      <div className="font-poppins min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Header />
        <AnimatePresence>
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="xl:px-44" 
          >
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Journey />
            <Contact />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <ScrollUp />
      </div>
    </ThemeProvider>
  );
}

export default App;