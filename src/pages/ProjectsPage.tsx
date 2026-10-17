import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, FolderGit2 } from 'lucide-react';
import { portfolioData, type ProjectDetail } from '../data/portfolioData';
import { StatioMockup } from '../components/project-mockups/StatioMockup';
import { FastBiteMockup } from '../components/project-mockups/FastBiteMockup';
import { ProjectCaseStudyModal } from '../components/ProjectCaseStudyModal';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { CursorPreview } from '../components/CursorPreview';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CommandPalette } from '../components/CommandPalette';

export const ProjectsPage: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'STUDENT_WORKFLOW' | 'LOGISTICS'>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'STUDENT_WORKFLOW') return p.id === 'statio-mlr';
    if (selectedFilter === 'LOGISTICS') return p.id === 'fast-bite';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] relative">
      <ScrollProgressBar />
      <CustomCursor />
      <CursorPreview />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      <main className="pt-28 pb-20 sm:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Telemetry Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs text-[#929BA6]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#C6FF00] transition-colors">HOME</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C6FF00]">PROJECTS INDEX</span>
          </div>
          <span className="hidden sm:inline-block">2 VERIFIED SYSTEMS // MLRIT CAMPUS</span>
        </div>

        {/* Hero Title */}
        <div className="mt-12 mb-16 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#C6FF00] border border-[#C6FF00]/30 font-mono text-xs uppercase tracking-wider">
            <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
            <span>CAMPUS DIGITAL PLATFORMS & PROTOTYPES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.03em] uppercase leading-[0.95] text-[#F4F6F8]">
            ENGINEERED FOR <br />
            <span className="text-[#C6FF00]">REAL PROBLEMS.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#929BA6] max-w-2xl leading-relaxed font-sans">
            Detailed case studies of software systems designed to replace physical lines and manual friction in campus environments.
          </p>

          {/* Filter Bar */}
          <div className="pt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFilter('ALL')}
              className={`font-mono text-xs uppercase px-3.5 py-1.5 border transition-all ${
                selectedFilter === 'ALL'
                  ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-bold shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                  : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8]'
              }`}
            >
              All Systems ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('STUDENT_WORKFLOW')}
              className={`font-mono text-xs uppercase px-3.5 py-1.5 border transition-all ${
                selectedFilter === 'STUDENT_WORKFLOW'
                  ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-bold shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                  : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8]'
              }`}
            >
              Document Logistics (Statio-MLR)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('LOGISTICS')}
              className={`font-mono text-xs uppercase px-3.5 py-1.5 border transition-all ${
                selectedFilter === 'LOGISTICS'
                  ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-bold shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                  : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8]'
              }`}
            >
              Dining & Canteen (Fast Bite)
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-24">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#11151A] border border-white/10 p-6 sm:p-10 shadow-2xl relative group interactive-card hover:border-[#C6FF00]/40 transition-colors"
                data-cursor-label="VIEW CASE STUDY ↗"
              >
                {/* Information Column */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl sm:text-5xl font-black text-[#C6FF00]">
                      {project.number}
                    </span>
                    <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest border-l border-white/10 pl-3">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F6F8] tracking-tight leading-snug">
                    {project.headline}
                  </h2>

                  <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Core Features */}
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#929BA6] block">
                      KEY ARCHITECTURAL FEATURES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-center gap-2 p-2 bg-[#171D24] border border-white/5 font-mono text-xs text-[#F4F6F8]"
                        >
                          <span className="w-1.5 h-1.5 bg-[#C6FF00] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#080A0D] border border-white/10 text-[#929BA6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/projects/${project.id}`}
                      data-cursor-label="VIEW CASE STUDY ↗"
                      className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 border border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.2)] group/btn"
                    >
                      <span>VIEW FULL CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>

                    {project.links?.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3.5 bg-[#171D24] hover:bg-white/10 text-[#F4F6F8] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-white/15"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      data-cursor-label="PREVIEW"
                      className="px-4 py-3.5 bg-[#171D24] hover:bg-white/10 text-[#F4F6F8] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-white/15"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C6FF00]" />
                      <span>Interactive Preview</span>
                    </button>

                    <span className="font-mono text-[11px] text-[#929BA6] border border-white/10 px-2.5 py-1.5 bg-[#080A0D] hidden sm:inline-block">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Simulation / Mockup Visual Column */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative border border-white/15 shadow-2xl overflow-hidden">
                    <div className="bg-[#171D24] text-[#F4F6F8] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#929BA6] flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
                        <span>LIVE INTERACTIVE SIMULATION</span>
                      </span>
                      <Link
                        to={`/projects/${project.id}`}
                        data-cursor-label="STUDY ↗"
                        className="text-[#C6FF00] hover:underline flex items-center gap-1 text-[10px] uppercase font-bold"
                      >
                        <span>Deep Dive</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {project.mockupType === 'statio' ? (
                      <StatioMockup />
                    ) : project.mockupType === 'fastbite' ? (
                      <FastBiteMockup />
                    ) : (
                      <div className="p-6 bg-[#080A0D] text-[#F4F6F8] font-mono text-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10">
                          <span className="text-[#C6FF00] font-bold">PORTFOLIO RUNTIME // REACT 19</span>
                          <span className="text-[10px] px-2 py-0.5 bg-[#171D24] text-[#C6FF00] border border-white/10">
                            ACTIVE
                          </span>
                        </div>
                        <p className="text-[11px] text-[#929BA6] leading-relaxed">
                          Clean architecture, dual-layer spring cursor, and ATS-friendly resume export.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer />
    </div>
  );
};
