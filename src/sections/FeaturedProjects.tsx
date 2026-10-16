import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Eye } from 'lucide-react';
import { portfolioData, type ProjectDetail } from '../data/portfolioData';
import { StatioMockup } from '../components/project-mockups/StatioMockup';
import { FastBiteMockup } from '../components/project-mockups/FastBiteMockup';
import { ProjectCaseStudyModal } from '../components/ProjectCaseStudyModal';

export const FeaturedProjects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 bg-[#F5F5F0] text-[#111111] bg-grid-light border-b border-[#DADAD3] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#DADAD3] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#111111] bg-[#E5E5DE] border border-[#DADAD3] px-2 py-0.5">
                02 // SELECTED WORK
              </span>
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider">
                CAMPUS DIGITAL PLATFORMS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] uppercase">
              SYSTEMS BUILT FOR IMPACT.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#777777] max-w-xs leading-relaxed uppercase">
            Practical concepts engineered to solve queue friction and manual bottlenecks on campus.
          </p>
        </div>

        {/* Projects List with Alternating Asymmetrical Layouts */}
        <div className="mt-16 space-y-28">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group interactive-card"
                data-cursor-label="VIEW CASE STUDY ↗"
              >
                {/* Content Column (Alternating) */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#111111] border-b-2 border-[#D1FF00] pb-1">
                      {project.number}
                    </span>
                    <span className="font-mono text-xs text-[#777777] uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <Link
                      to={`/projects/${project.id}`}
                      data-cursor-label="READ STUDY ↗"
                      className="group/title inline-block"
                    >
                      <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight uppercase flex items-center gap-2">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-6 h-6 text-[#777777] group-hover/title:text-[#111111] group-hover/title:translate-x-1 group-hover/title:-translate-y-1 transition-all" />
                      </h3>
                      <span className="block h-[2px] w-0 bg-[#D1FF00] group-hover/title:w-full transition-all duration-300" />
                    </Link>
                    <p className="font-mono text-xs text-[#555555] font-semibold uppercase tracking-wider mt-1.5">
                      {project.headline}
                    </p>
                  </div>

                  <p className="text-base text-[#333333] leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Verification Notice */}
                  {project.verificationNote && (
                    <div className="p-3.5 bg-[#FFFFFF] border-l-4 border-[#111111] border border-[#DADAD3] flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#555555] leading-relaxed font-mono">
                        <span className="font-semibold text-[#111111]">Verification Protocol: </span>
                        {project.verificationNote}
                      </p>
                    </div>
                  )}

                  {/* Feature Highlights */}
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] text-[#777777] uppercase tracking-wider block">
                      Core Functional Highlights
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 4).map((f, i) => (
                        <span
                          key={i}
                          className="font-mono text-[11px] px-2.5 py-1 bg-[#FFFFFF] border border-[#DADAD3] text-[#333333] flex items-center gap-1.5 transition-colors group-hover:border-[#AAAAAA]"
                        >
                          <span className="w-1.5 h-1.5 bg-[#111111]" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#EAEAEA] text-[#555555]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons: Dedicated Case Study Route + Quick Modal Preview */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/projects/${project.id}`}
                      data-cursor-label="VIEW CASE STUDY ↗"
                      className="px-6 py-3.5 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 border border-[#111111] shadow-md group/btn"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      data-cursor-label="QUICK MODAL"
                      className="px-4 py-3.5 bg-[#FFFFFF] hover:bg-[#F0F0EB] text-[#111111] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-[#DADAD3] hover:border-[#111111]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#777777]" />
                      <span>Quick Preview</span>
                    </button>

                    <span className="font-mono text-[11px] text-[#777777] border border-[#DADAD3] px-2.5 py-1.5 bg-[#FFFFFF] hidden sm:inline-block">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Visual Interactive Simulation Side with Smooth Hover Parallax/Scale */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative group/mockup">
                    {/* Electric Lime Ambient Glow on Hover */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#D1FF00]/30 to-[#111111]/10 blur-xl opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative border border-[#DADAD3] group-hover/mockup:border-[#111111] shadow-xl group-hover/mockup:shadow-2xl transition-all duration-300 transform group-hover/mockup:scale-[1.01]">
                      {/* Top Bar with Case Study Route Link */}
                      <div className="bg-[#1C1C1C] text-[#F5F5F0] px-4 py-2 border-b border-[#333333] flex items-center justify-between text-xs font-mono">
                        <span className="text-[#888888] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#D1FF00] animate-pulse" />
                          <span>INTERACTIVE PREVIEW // CLICK CONTROLS</span>
                        </span>
                        <Link
                          to={`/projects/${project.id}`}
                          data-cursor-label="EXPLORE ↗"
                          className="text-[#D1FF00] hover:underline flex items-center gap-1 font-bold tracking-wider uppercase text-[10px]"
                        >
                          <span>Full Study</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {project.mockupType === 'statio' ? (
                        <StatioMockup />
                      ) : (
                        <FastBiteMockup />
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Quick Case Study Modal for Instant In-Page Previews */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
