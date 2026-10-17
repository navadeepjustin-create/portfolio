import { useEffect, useState, lazy, Suspense } from 'react';
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
import { CursorPreview } from './components/CursorPreview';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CommandPalette } from './components/CommandPalette';
import { SmoothScroll } from './components/SmoothScroll';
import { PageTransition } from './components/PageTransition';
import { SideChapterIndicator } from './components/SideChapterIndicator';
import { SkippableIntro } from './components/SkippableIntro';
import { SEOHead } from './components/SEOHead';
import { Analytics } from './components/Analytics';
import { useDocumentTitleVisibility } from './hooks/useDocumentTitleVisibility';

// Route-level code splitting: keep secondary routes off the critical entry path
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const ProjectCaseStudyPage = lazy(() => import('./pages/ProjectCaseStudyPage').then((m) => ({ default: m.ProjectCaseStudyPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ResumePage = lazy(() => import('./pages/ResumePage').then((m) => ({ default: m.ResumePage })));
const LabPage = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })));
const NotesPage = lazy(() => import('./pages/NotesPage').then((m) => ({ default: m.NotesPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

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
    } else {
      window.scrollTo(0, 0);
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
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] relative">
      {/* 1.8s Skippable ND Monogram Intro with Coordinate Telemetry */}
      {!introFinished && <SkippableIntro onComplete={() => setIntroFinished(true)} />}

      {/* Top Thin Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* High-Performance Custom Cursor */}
      <CustomCursor />

      {/* Floating Project Preview on Cursor Hover */}
      <CursorPreview />

      {/* Fixed Side Chapter Telemetry Indicator (00-06) */}
      <SideChapterIndicator />

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

  // Updates tab title when inactive to keep connection warm
  useDocumentTitleVisibility();

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
    <SmoothScroll>
      <BrowserRouter>
        {/* Dynamic Per-Route SEO Metadata & OpenGraph Sync */}
        <SEOHead />
        {/* Privacy-friendly analytics behind VITE_ANALYTICS_ENABLED flag */}
        <Analytics />
        {/* Film-grain texture and soft edge vignette */}
        <div className="film-grain" aria-hidden="true" />
        <div className="edge-vignette" aria-hidden="true" />
        <ScrollToHashElement />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
        <PageTransition>
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenCommandPalette={() => setCommandPaletteOpen(true)} />}
            />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <ProjectsPage />
                </Suspense>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <ProjectCaseStudyPage />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="/resume"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <ResumePage />
                </Suspense>
              }
            />
            <Route
              path="/lab"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <LabPage />
                </Suspense>
              }
            />
            <Route
              path="/notes"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <NotesPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div className="min-h-screen bg-[#080A0D]" />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </SmoothScroll>
  );
}
