import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye, FolderGit2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioData, type ProjectDetail } from '../data/portfolioData';
import { StatioMockup } from '../components/project-mockups/StatioMockup';
import { FastBiteMockup } from '../components/project-mockups/FastBiteMockup';
import { ProjectCaseStudyModal } from '../components/ProjectCaseStudyModal';
import { Spotlight } from '../components/Spotlight';
import { Magnetic } from '../components/Magnetic';

export const FeaturedProjects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
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

                  <h3
                    className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F6F8] tracking-tight leading-snug cursor-pointer"
                    data-cursor-preview="true"
                    data-cursor-preview-title={project.title}
                    data-cursor-preview-category={project.category}
                    data-cursor-preview-number={project.number}
                  >
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
                    <Magnetic radius={45} strength={0.25}>
                      <Link
                        to={`/projects/${project.id}`}
                        data-cursor-label="VIEW CASE STUDY ↗"
                        className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 border border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.2)] group/btn"
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </Magnetic>

                    <Magnetic radius={40} strength={0.2}>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        data-cursor-label="QUICK MODAL"
                        className="px-4 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#F4F6F8] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-white/15 hover:border-[#C6FF00]/50"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6FF00]" />
                        <span>Quick Preview</span>
                      </button>
                    </Magnetic>

                    {/* Render Live / Repo buttons ONLY when URLs exist */}
                    {project.links?.repo ? (
                      <Magnetic radius={35} strength={0.2}>
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-3.5 bg-[#171D24] hover:bg-[#1f2730] text-[#F4F6F8] hover:text-[#C6FF00] border border-white/15 hover:border-[#C6FF00] font-mono text-xs uppercase transition-colors flex items-center gap-1.5"
                          title="View Repository on GitHub"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>Repo</span>
                        </a>
                      </Magnetic>
                    ) : null}

                    {/* Honest "In Development" State when URLs are absent */}
                    {!project.links?.repo && !project.links?.live && (
                      <span className="font-mono text-[10px] text-[#929BA6] border border-white/10 px-2.5 py-2.5 bg-[#11151A] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-none animate-pulse" />
                        <span>STATUS: IN PROTOTYPE (NO PUBLIC REPO)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Visual Interactive Simulation Side with 3D Parallax Tilt and Glare */}
                <div
                  className={`lg:col-span-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Spotlight
                    withTilt={true}
                    tiltMax={6}
                    className="relative group/mockup shadow-2xl overflow-hidden border border-white/15 hover:border-[#C6FF00]/60"
                  >
                    {/* Top Bar with Case Study Route Link */}
                    <div className="bg-[#11151A] text-[#F4F6F8] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono relative z-10">
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

                    <div className="relative z-10">
                      {project.mockupType === 'statio' ? (
                        <StatioMockup />
                      ) : project.mockupType === 'fastbite' ? (
                        <FastBiteMockup />
                      ) : (
                        <div className="p-6 bg-[#080A0D] text-[#F4F6F8] font-mono text-xs space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <span className="text-[#C6FF00] font-bold">PORTFOLIO WORKFLOW // REACT 19</span>
                            <span className="text-[10px] px-2 py-0.5 bg-[#171D24] text-[#C6FF00] border border-white/10">
                              ACTIVE REPO
                            </span>
                          </div>
                          <div className="p-3 bg-[#11151A] border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-[#929BA6]">
                              <span>Vite 8 HMR Engine:</span>
                              <span className="text-[#C6FF00]">ONLINE</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#929BA6]">
                              <span>WCAG AA Contrast:</span>
                              <span className="text-[#C6FF00]">VERIFIED</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-[#929BA6]">
                              <span>Data Integrity:</span>
                              <span className="text-[#C6FF00]">ZERO FABRICATED METRICS</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#929BA6] leading-relaxed">
                            Single source of truth architecture with hardware-accelerated kinetic cursors and ATS resume route.
                          </p>
                        </div>
                      )}
                    </div>
                  </Spotlight>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
