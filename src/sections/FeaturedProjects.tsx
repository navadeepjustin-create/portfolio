import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, FolderGit2 } from 'lucide-react';
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
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] bg-grid-cyber border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                02 // SELECTED WORK
              </span>
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider">
                CAMPUS DIGITAL PLATFORMS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase">
              SYSTEMS BUILT FOR IMPACT.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-mono text-xs text-[#929BA6] max-w-xs leading-relaxed uppercase">
              Practical software engineered to solve physical queue bottlenecks on campus.
            </p>
            <Link
              to="/projects"
              data-cursor-label="INDEX ↗"
              className="px-4 py-2 bg-[#11151A] hover:bg-[#171D24] text-[#C6FF00] border border-[#C6FF00]/40 font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Full Index</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
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
                {/* Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#F4F6F8] border-b-2 border-[#C6FF00] pb-1">
                      {project.number}
                    </span>
                    <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F6F8] tracking-tight leading-snug">
                    {project.headline}
                  </h3>

                  <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Core Architecture Highlights */}
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#929BA6] block">
                      ARCHITECTURAL CAPABILITIES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="font-mono text-xs text-[#F4F6F8] flex items-center gap-2 bg-[#11151A] border border-white/10 px-2.5 py-1.5"
                        >
                          <span className="w-1.5 h-1.5 bg-[#C6FF00] shrink-0" />
                          <span className="truncate">{feature}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#171D24] text-[#929BA6] border border-white/10"
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
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      data-cursor-label="QUICK MODAL"
                      className="px-4 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#F4F6F8] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-white/15 hover:border-[#C6FF00]/50"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C6FF00]" />
                      <span>Quick Preview</span>
                    </button>

                    <span className="font-mono text-[11px] text-[#929BA6] border border-white/10 px-2.5 py-1.5 bg-[#11151A] hidden sm:inline-block">
                      STATUS: <strong className="text-[#C6FF00]">{project.status}</strong>
                    </span>
                  </div>
                </div>

                {/* Visual Interactive Simulation Side */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative group/mockup">
                    {/* Electric Lime Ambient Glow on Hover */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#C6FF00]/20 to-[#171D24]/30 blur-xl opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative border border-white/15 group-hover/mockup:border-[#C6FF00]/60 shadow-2xl transition-all duration-300 transform group-hover/mockup:scale-[1.01] overflow-hidden">
                      {/* Top Bar with Case Study Route Link */}
                      <div className="bg-[#11151A] text-[#F4F6F8] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#929BA6] flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
                          <span>INTERACTIVE PREVIEW // CLICK CONTROLS</span>
                        </span>
                        <Link
                          to={`/projects/${project.id}`}
                          data-cursor-label="EXPLORE ↗"
                          className="text-[#C6FF00] hover:underline flex items-center gap-1 font-bold tracking-wider uppercase text-[10px]"
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

      {/* Interactive Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
