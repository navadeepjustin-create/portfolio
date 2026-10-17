import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Terminal,
  ExternalLink,
  Lightbulb,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';
import { caseStudies } from '../data/caseStudies';
import { StatioMockup } from '../components/project-mockups/StatioMockup';
import { FastBiteMockup } from '../components/project-mockups/FastBiteMockup';
import { PhoneFrame } from '../components/PhoneFrame';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Lightbox } from '../components/Lightbox';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CustomCursor } from '../components/CustomCursor';
import { CommandPalette } from '../components/CommandPalette';
import { Footer } from '../components/Footer';
import { Spotlight } from '../components/Spotlight';

export const ProjectCaseStudyPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  const project = projectId ? caseStudies[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveStep(0);
  }, [projectId]);

  // Set up intersection observers for the scrollytelling steps
  useEffect(() => {
    if (!project) return;

    const stepElements = document.querySelectorAll('[data-scrolly-step]');
    if (stepElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-scrolly-step'));
            if (!isNaN(index)) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    stepElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] flex flex-col items-center justify-center p-6 text-center">
        <CustomCursor />
        <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest mb-2">
          404 // CASE STUDY NOT FOUND
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase mb-4">
          PROJECT UNRESOLVED
        </h1>
        <p className="font-mono text-xs text-[#929BA6] max-w-md mb-8">
          The requested project case study was not found in the active portfolio catalog.
        </p>
        <Link
          to="/projects"
          className="px-6 py-3 bg-[#C6FF00] text-[#080A0D] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO PROJECTS INDEX</span>
        </Link>
      </div>
    );
  }

  const stepsList = [
    '01 // PROBLEM STATEMENT',
    '02 // RESEARCH & EVIDENCE',
    '03 // DESIGN DECISIONS',
    '04 // ARCHITECTURE DIAGRAM',
    '05 // WHAT I WOULD DO DIFFERENTLY',
    '06 // NEXT STEPS',
  ];

  // Helper to render mockup component
  const renderMockup = () => {
    if (project.mockupType === 'statio') return <StatioMockup />;
    if (project.mockupType === 'fastbite') return <FastBiteMockup />;
    return (
      <div className="p-6 bg-[#080A0D] text-[#F4F6F8] font-mono text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <span className="text-[#C6FF00]">PORTFOLIO RUNTIME</span>
          <span className="text-[#929BA6]">VITE 8 · REACT 19</span>
        </div>
        <p className="text-[#929BA6] leading-relaxed">
          Interactive developer portfolio featuring motion tokens, custom cursor with context morphing, and single source of truth data.
        </p>
        <div className="p-3 bg-[#11151A] border border-white/10 space-y-1">
          <span className="text-[10px] text-[#C6FF00] block">CI/CD PIPELINE STATUS</span>
          <span className="text-[#F4F6F8] font-bold">TYPECHECK & BUILD PASSING (100%)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber">
      <CustomCursor />
      <ScrollProgressBar />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <Lightbox
          isOpen={true}
          onClose={() => setLightboxImage(null)}
          imageSrc={lightboxImage.src}
          alt={lightboxImage.alt}
          caption={lightboxImage.caption}
        />
      )}

      {/* Sticky Case Study Top Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#080A0D]/90 backdrop-blur-md border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/projects"
            data-cursor-label="BACK ↖"
            className="group flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#F4F6F8] hover:text-[#C6FF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>ALL PROJECTS</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="font-mono text-xs text-[#929BA6]">
              {project.number} // {project.title.toUpperCase()}
            </span>
            <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-none animate-pulse" />
            <span className="font-mono text-[11px] px-2 py-0.5 bg-[#11151A] border border-white/10 text-[#C6FF00]">
              {project.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Link Button (ONLY when URL exists) */}
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#C6FF00] text-[#080A0D] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#b2e600] transition-colors flex items-center gap-1"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}

            {/* Repo Link Button (ONLY when URL exists) */}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#171D24] text-[#F4F6F8] hover:text-[#C6FF00] border border-white/10 font-mono text-xs uppercase font-semibold transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            ) : null}

            {/* In-Development Badge if no live/repo */}
            {!project.links.live && !project.links.github && (
              <span className="font-mono text-[10px] text-[#929BA6] px-2 py-1 bg-[#11151A] border border-white/10 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C6FF00]" />
                <span className="hidden sm:inline">IN DEVELOPMENT</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="p-1.5 bg-[#11151A] text-[#929BA6] hover:text-[#C6FF00] border border-white/10"
              title="Command Palette"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Case Study Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
        {/* Section 1: Hero & Metadata Telemetry Bar */}
        <section className="space-y-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#929BA6]">
              <span className="text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                PROJECT {project.number}
              </span>
              <span>//</span>
              <span className="uppercase">{project.category}</span>
              <span>//</span>
              <span className="text-[#929BA6]/60">{project.timeline}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F6F8] leading-[0.95]">
              {project.title}
            </h1>

            <p className="font-sans text-xl sm:text-2xl text-[#929BA6] max-w-4xl font-light leading-snug">
              {project.headline}
            </p>
          </div>

          {/* Factual Technical Metadata Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#11151A] border border-white/10 font-mono text-xs">
            <div>
              <span className="text-[#929BA6]/60 text-[10px] uppercase block">Platform Category</span>
              <span className="text-[#F4F6F8] font-semibold">{project.category}</span>
            </div>
            <div>
              <span className="text-[#929BA6]/60 text-[10px] uppercase block">Target Institution</span>
              <span className="text-[#F4F6F8] font-semibold">{project.institution}</span>
            </div>
            <div>
              <span className="text-[#929BA6]/60 text-[10px] uppercase block">Architectural Role</span>
              <span className="text-[#F4F6F8] font-semibold">{project.role}</span>
            </div>
            <div>
              <span className="text-[#929BA6]/60 text-[10px] uppercase block">Implementation State</span>
              <span className="text-[#C6FF00] font-semibold">{project.status}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Scrollytelling Architecture (Pinned Device on left, narrative on right) */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Pinned Device Column (Sticky on desktop, stacked on mobile) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 z-20 space-y-4">
              <div className="bg-[#11151A] px-4 py-2 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-[#929BA6]">
                  <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
                  <span>DEVICE SIMULATION</span>
                </span>
                <span className="text-[#C6FF00] uppercase text-[10px]">
                  STEP {activeStep + 1} OF {stepsList.length}
                </span>
              </div>

              {/* Phone Frame Device Container */}
              <PhoneFrame
                projectId={project.id}
                fallbackMockup={renderMockup()}
                activeStepTitle={stepsList[activeStep]}
              />

              <div className="p-3 bg-[#11151A] border border-white/10 text-center font-mono text-[10px] text-[#929BA6] hidden lg:block">
                SCROLL TO NAVIGATE CASE STUDY CHAPTERS
              </div>
            </div>

            {/* Narrative Steps Column (Swapping as user scrolls) */}
            <div className="lg:col-span-7 space-y-24">
              {/* STEP 1: The Problem Statement */}
              <div data-scrolly-step="0" className="space-y-6 pt-4">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                    01 // THE BOTTLENECK
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    CAMPUS FRICTION POINTS
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed font-sans">
                  {project.problemStatement.lead}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.problemStatement.points.map((pt, idx) => (
                    <Spotlight key={pt.title} className="p-5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-[#C6FF00] px-1.5 py-0.5 bg-[#171D24] border border-white/10">
                            0{idx + 1}
                          </span>
                          <h3 className="font-display text-sm font-bold uppercase text-[#F4F6F8]">
                            {pt.title}
                          </h3>
                        </div>
                        <p className="text-xs text-[#929BA6] leading-relaxed font-sans">
                          {pt.desc}
                        </p>
                      </div>
                    </Spotlight>
                  ))}
                </div>
              </div>

              {/* STEP 2: Research & Campus Observations (Honest placeholder block for real evidence) */}
              <div data-scrolly-step="1" className="space-y-6 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                    02 // OBSERVATION & EVIDENCE
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    CAMPUS QUALITATIVE RESEARCH
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed font-sans">
                  {project.researchEvidence.lead}
                </p>

                <div className="space-y-3">
                  {project.researchEvidence.observations.map((obs, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#11151A] border-l-2 border-[#C6FF00] border border-white/10 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#F4F6F8] leading-relaxed font-sans">
                        {obs}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Honest Placeholder Notice for Real Evidence */}
                <div className="p-4 bg-[#171D24] border border-dashed border-[#C6FF00]/40 flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-[#C6FF00] uppercase font-bold block">
                      DATA INTEGRITY NOTE // EVIDENCE HOLDER
                    </span>
                    <p className="text-xs text-[#929BA6] leading-relaxed">
                      {project.researchEvidence.placeholderNotice}
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 3: Design Decisions & Tradeoffs */}
              <div data-scrolly-step="2" className="space-y-6 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                    03 // ARCHITECTURAL TRADEOFFS
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    CORE DESIGN DECISIONS
                  </h2>
                </div>

                <div className="space-y-4">
                  {project.designDecisions.map((decision, idx) => (
                    <Spotlight key={decision.title} className="p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#C6FF00] px-2 py-0.5 bg-[#171D24] border border-white/10">
                          DECISION 0{idx + 1}
                        </span>
                        <h3 className="font-display text-base font-bold uppercase text-[#F4F6F8]">
                          {decision.title}
                        </h3>
                      </div>
                      <div className="text-xs font-mono text-[#929BA6]">
                        <strong className="text-[#F4F6F8]">RATIONALE: </strong>
                        {decision.rationale}
                      </div>
                      <div className="text-xs font-mono text-[#C6FF00] pt-2 border-t border-white/10">
                        <strong className="text-[#F4F6F8]">OUTCOME: </strong>
                        {decision.outcome}
                      </div>
                    </Spotlight>
                  ))}
                </div>
              </div>

              {/* STEP 4: Architecture Diagram (Vector SVG) */}
              <div data-scrolly-step="3" className="space-y-6 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                    04 // SYSTEM TOPOLOGY
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    ARCHITECTURE DIAGRAM
                  </h2>
                </div>

                <p className="text-sm text-[#929BA6] font-sans leading-relaxed">
                  High-level node topology illustrating client ingestion, validation engine, decoupling boundaries, and physical counter scanner synchronization.
                </p>

                <ArchitectureDiagram projectId={project.id} />
              </div>

              {/* STEP 5: What I Would Do Differently */}
              <div data-scrolly-step="4" className="space-y-6 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                    05 // CRITICAL RETROSPECTIVE
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    WHAT I WOULD DO DIFFERENTLY
                  </h2>
                </div>

                <p className="text-sm text-[#929BA6] font-sans leading-relaxed">
                  Honest self-critique on engineering decisions, assumptions, and architectural oversights identified during prototype evaluation:
                </p>

                <div className="space-y-3">
                  {project.whatIWouldDoDifferently.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#11151A] border-l-2 border-amber-400 border border-white/10 flex items-start gap-3"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-[#F4F6F8] leading-relaxed font-sans">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 6: Next Steps & Roadmap */}
              <div data-scrolly-step="5" className="space-y-6 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                    06 // FORWARD ROADMAP
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    NEXT STEPS & FUTURE EXPLORATION
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.nextSteps.map((step, idx) => (
                    <Spotlight key={idx} className="p-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-[#C6FF00] block">
                          PHASE 0{idx + 1}
                        </span>
                        <p className="text-xs text-[#F4F6F8] font-sans leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </Spotlight>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Deep Dive Features & Specs */}
        <section className="space-y-8 pt-12 border-t border-white/10">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
              07 // TECHNICAL SPECIFICATIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#F4F6F8]">
              DEEP-DIVE SYSTEM CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.deepDiveFeatures.map((feat) => (
              <Spotlight key={feat.title} className="p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-wider block mb-2">
                    {feat.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#F4F6F8] uppercase mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#929BA6] font-sans leading-relaxed mb-4">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1.5 font-mono text-[11px] text-[#929BA6]">
                  {feat.specs.map((sp) => (
                    <div key={sp} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
                      <span className="text-[#F4F6F8]">{sp}</span>
                    </div>
                  ))}
                </div>
              </Spotlight>
            ))}
          </div>
        </section>

        {/* Section 4: Tech Stack Matrix */}
        <section className="space-y-8 pt-8 border-t border-white/10">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
              08 // TECHNOLOGY RATIONALE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#F4F6F8]">
              STACK CHOICES & JUSTIFICATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.techStack.map((stack) => (
              <Spotlight key={stack.category} className="p-6 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-[#C6FF00] uppercase block mb-3">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stack.items.map((it) => (
                      <span
                        key={it}
                        className="font-mono text-xs px-2.5 py-1 bg-[#171D24] text-[#F4F6F8] border border-white/10"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#929BA6] font-sans leading-relaxed pt-4 border-t border-white/10">
                  {stack.justification}
                </p>
              </Spotlight>
            ))}
          </div>
        </section>

        {/* Section 5: Previous / Next Project Navigation */}
        <section className="pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              to={`/projects/${project.prevProject.id}`}
              className="p-6 bg-[#11151A] border border-white/10 hover:border-[#C6FF00] transition-colors group block"
            >
              <span className="font-mono text-[10px] text-[#929BA6] uppercase flex items-center gap-1 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS CASE STUDY</span>
              </span>
              <span className="font-mono text-xs text-[#C6FF00] block mb-1">
                PROJECT {project.prevProject.number}
              </span>
              <h4 className="font-display text-xl font-bold uppercase text-[#F4F6F8] group-hover:text-[#C6FF00] transition-colors">
                {project.prevProject.title}
              </h4>
            </Link>

            <Link
              to={`/projects/${project.nextProject.id}`}
              className="p-6 bg-[#11151A] border border-white/10 hover:border-[#C6FF00] transition-colors group block text-right"
            >
              <span className="font-mono text-[10px] text-[#929BA6] uppercase flex items-center justify-end gap-1 mb-2">
                <span>NEXT CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-mono text-xs text-[#C6FF00] block mb-1">
                PROJECT {project.nextProject.number}
              </span>
              <h4 className="font-display text-xl font-bold uppercase text-[#F4F6F8] group-hover:text-[#C6FF00] transition-colors">
                {project.nextProject.title}
              </h4>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
