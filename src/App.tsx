import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import JourneyPage from './pages/JourneyPage';
import ContactPage from './pages/ContactPage';
import ScrollUp from './components/ScrollUp';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="journey" element={<JourneyPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
        <ScrollUp />
      </Router>
    </ThemeProvider>
  );
}

export default App;