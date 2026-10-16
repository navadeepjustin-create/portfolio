import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { Approach } from './sections/Approach';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';

/**
 * Ensures cross-route and anchor navigations scroll to target smoothly
 */
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow slight tick for component rendering
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

/**
 * Main Editorial Portfolio View
 */
function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#111111] selection:bg-[#D1FF00] selection:text-[#111111] relative">
      {/* Top Thin Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* High-Performance Custom Cursor */}
      <CustomCursor />

      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#111111] focus:text-[#D1FF00] font-mono text-xs uppercase"
      >
        Skip to Featured Projects
      </a>

      {/* Main Navigation */}
      <Navbar />

      {/* Main Sections with Editorial Alternating Rhythm */}
      <main>
        {/* 00: Hero (Light Editorial Canvas) */}
        <Hero />

        {/* 01: About (Deep Charcoal Immersive) */}
        <About />

        {/* 02: Featured Projects: Statio-MLR & Fast Bite (Light Editorial Canvas) */}
        <FeaturedProjects />

        {/* 03: Approach (Clean Studio Canvas) */}
        <Approach />

        {/* 04: Skills (Deep Charcoal Technical Matrix) */}
        <Skills />

        {/* 05: Education: MLRIT AIML (Light Editorial Canvas) */}
        <Education />

        {/* 06: Contact Section (Near-Black High-Impact Finish) */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:projectId" element={<ProjectCaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
