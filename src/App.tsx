import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import { CommandPalette } from './components/CommandPalette';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Ensures cross-route and anchor navigations scroll to target smoothly
 */
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
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
 * Main Futuristic Portfolio Home View
 */
interface HomePageProps {
  onOpenCommandPalette: () => void;
}

function HomePage({ onOpenCommandPalette }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] relative">
      {/* Top Thin Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* High-Performance Custom Cursor */}
      <CustomCursor />

      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#080A0D] focus:text-[#C6FF00] font-mono text-xs uppercase border border-[#C6FF00]"
      >
        Skip to Featured Projects
      </a>

      {/* Main Navigation */}
      <Navbar onOpenCommandPalette={onOpenCommandPalette} />

      {/* Main Sections */}
      <main>
        {/* 00: Hero (Futuristic 3D Cinematic Canvas) */}
        <Hero onOpenCommandPalette={onOpenCommandPalette} />

        {/* 01: About (Technical Philosophy & Foundations) */}
        <About />

        {/* 02: Featured Projects: Statio-MLR & Fast Bite (Interactive Prototypes) */}
        <FeaturedProjects />

        {/* 03: Approach (4-Phase Engineering Methodology) */}
        <Approach />

        {/* 04: Skills (Categorized Technical Matrix) */}
        <Skills />

        {/* 05: Education: MLRIT AIML (Undergraduate Rigor) */}
        <Education />

        {/* 06: Contact Section (High-Impact Transmission) */}
        <Contact />
      </main>

      {/* Editorial Tech Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage onOpenCommandPalette={() => setCommandPaletteOpen(true)} />}
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectCaseStudyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
