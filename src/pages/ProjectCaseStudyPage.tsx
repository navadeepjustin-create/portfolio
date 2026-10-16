import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import { StatioMockup } from '../components/project-mockups/StatioMockup';
import { FastBiteMockup } from '../components/project-mockups/FastBiteMockup';
import { GithubIcon } from '../components/BrandIcons';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CustomCursor } from '../components/CustomCursor';

export const ProjectCaseStudyPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const project = projectId ? caseStudies[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5F0] text-[#111111] flex flex-col items-center justify-center p-6 text-center">
        <CustomCursor />
        <span className="font-mono text-xs text-[#777777] uppercase tracking-widest mb-2">
          404 // CASE STUDY NOT FOUND
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase mb-4">
          PROJECT UNRESOLVED
        </h1>
        <p className="font-mono text-xs text-[#555555] max-w-md mb-8">
          The requested project case study was not found in the active portfolio catalog.
        </p>
        <Link
          to="/#projects"
          className="px-6 py-3 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO PORTFOLIO</span>
        </Link>
      </div>
    );
  }

  const otherProjectKey = project.id === 'statio-mlr' ? 'fast-bite' : 'statio-mlr';
  const otherProject = caseStudies[otherProjectKey];

  const hasGithub = Boolean(project.links.github && project.links.github.trim());
  const hasLive = Boolean(project.links.live && project.links.live.trim());

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#111111] selection:bg-[#D1FF00] selection:text-[#111111] bg-grid-light">
      <CustomCursor />
      <ScrollProgressBar />

      {/* Sticky Case Study Top Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#F5F5F0]/95 backdrop-blur-md border-b border-[#DADAD3] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/#projects"
            data-cursor-label="BACK ↖"
            className="group flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#111111] hover:text-[#555555] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PROJECTS</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <span className="font-mono text-xs text-[#777777]">
              {project.number} // {project.title.toUpperCase()}
            </span>
            <span className="w-1.5 h-1.5 bg-[#D1FF00] rounded-none" />
            <span className="font-mono text-[11px] px-2 py-0.5 bg-[#111111] text-[#D1FF00]">
              CASE STUDY
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasLive ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#D1FF00] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#bce600] transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="font-mono text-[10px] text-[#777777] border border-[#DADAD3] px-2.5 py-1 bg-[#FFFFFF] hidden md:inline-block">
                LIVE DEMO SIMULATED BELOW
              </span>
            )}

            {hasGithub && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source repository"
                className="p-1.5 border border-[#DADAD3] hover:border-[#111111] transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[#111111]" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Case Study Article Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
        {/* Section 1: Editorial Project Hero */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-4xl sm:text-5xl font-black text-[#111111] border-b-4 border-[#D1FF00] pb-1">
              PROJECT {project.number}
            </span>
            <span className="font-mono text-xs text-[#777777] uppercase tracking-widest px-2.5 py-1 bg-[#E8E8E2] border border-[#DADAD3]">
              {project.category}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 bg-[#111111] text-[#D1FF00] font-semibold">
              {project.status}
            </span>
          </div>

          <div className="space-y-4 max-w-5xl">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-[-0.035em] text-[#111111] leading-[0.95]">
              {project.title}
            </h1>
            <p className="font-mono text-sm sm:text-base font-semibold uppercase tracking-wider text-[#444444] border-l-2 border-[#111111] pl-4">
              {project.headline}
            </p>
          </div>

          <p className="text-base sm:text-xl text-[#333333] leading-relaxed max-w-4xl font-sans">
            {project.overview}
          </p>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#FFFFFF] border border-[#DADAD3] font-mono text-xs">
            <div>
              <span className="text-[#888888] block text-[10px] uppercase tracking-wider">
                My Role
              </span>
              <span className="text-[#111111] font-semibold">{project.role}</span>
            </div>
            <div>
              <span className="text-[#888888] block text-[10px] uppercase tracking-wider">
                Campus Context
              </span>
              <span className="text-[#111111] font-semibold">{project.institution}</span>
            </div>
            <div>
              <span className="text-[#888888] block text-[10px] uppercase tracking-wider">
                Target Environment
              </span>
              <span className="text-[#111111] font-semibold">Undergraduate Campus</span>
            </div>
            <div>
              <span className="text-[#888888] block text-[10px] uppercase tracking-wider">
                Timeline & Scope
              </span>
              <span className="text-[#111111] font-semibold">{project.timeline}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Working Simulation */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DADAD3] gap-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#111111]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-bold">
                LIVE INTERACTIVE INTERFACE SIMULATION
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#777777]">
              Fully functional client simulation — click controls below to test calculations & tokens
            </span>
          </div>

          <div className="border border-[#DADAD3] shadow-2xl bg-[#111111] p-1">
            {project.mockupType === 'statio' ? <StatioMockup /> : <FastBiteMockup />}
          </div>
        </section>

        {/* Section 3: Problem Statement */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-[#D1FF00] bg-[#111111] px-2.5 py-1 uppercase tracking-widest inline-block">
              01 // THE CHALLENGE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111]">
              CAMPUS BOTTLENECK ANALYSIS
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-sans">
              {project.problemStatement.lead}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.problemStatement.points.map((pt, i) => (
              <div
                key={i}
                className="p-5 bg-[#FFFFFF] border border-[#DADAD3] space-y-2 hover:border-[#111111] transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
                  <span className="w-1.5 h-1.5 bg-[#111111]" />
                  <span>POINT 0{i + 1}</span>
                </div>
                <h3 className="font-display text-base font-bold text-[#111111]">{pt.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: The Solution & Architectural Pillars */}
        <section className="bg-[#111111] text-[#F5F5F0] p-8 sm:p-12 border border-[#333333] space-y-8 bg-grid-dark">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#2A2A2A] gap-4">
            <div>
              <span className="font-mono text-xs text-[#D1FF00] bg-[#D1FF00]/10 border border-[#D1FF00]/30 px-2 py-0.5">
                02 // THE ARCHITECTURE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F5F5F0] mt-2">
                SYSTEM DESIGN & SOLUTION
              </h2>
            </div>
            <p className="font-mono text-xs text-[#AAAAAA] max-w-sm leading-relaxed uppercase">
              {project.solutionStatement.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.solutionStatement.pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-6 bg-[#181818] border border-[#2E2E2E] hover:border-[#D1FF00] transition-colors space-y-3"
              >
                <span className="font-mono text-2xl font-bold text-[#D1FF00]">0{i + 1}</span>
                <h3 className="font-display text-lg font-bold text-[#F5F5F0]">{pillar.title}</h3>
                <p className="text-xs text-[#AAAAAA] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: End-to-End User Workflows (Student & Staff) */}
        <section className="space-y-8">
          <div className="pb-4 border-b border-[#DADAD3]">
            <span className="font-mono text-xs text-[#111111] bg-[#E8E8E2] border border-[#DADAD3] px-2 py-0.5 uppercase tracking-widest">
              03 // OPERATIONAL WORKFLOWS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mt-2">
              DUAL-SIDED PROCESS ORCHESTRATION
            </h2>
          </div>

          {/* Student Flow */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#111111]" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                STUDENT SELF-SERVICE JOURNEY
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {project.studentWorkflow.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-[#FFFFFF] border border-[#DADAD3] space-y-2 relative"
                >
                  <span className="font-mono text-xs font-bold text-[#777777] block">
                    STEP {step.step}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#111111]">{step.title}</h4>
                  <p className="text-[11px] text-[#555555] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operator / Staff Flow */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#D1FF00] border border-[#111111]" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
                COUNTER OPERATOR / STAFF JOURNEY
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {project.adminWorkflow.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-[#141414] text-[#F5F5F0] border border-[#2E2E2E] space-y-2"
                >
                  <span className="font-mono text-xs font-bold text-[#D1FF00] block">
                    OPERATOR {step.step}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#F5F5F0]">{step.title}</h4>
                  <p className="text-[11px] text-[#AAAAAA] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Verification Architecture Callout */}
        <section className="p-6 sm:p-8 bg-[#FFFFFF] border-l-4 border-[#111111] border border-[#DADAD3] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
            <ShieldCheck className="w-4 h-4 text-[#111111]" />
            <span>CRITICAL ARCHITECTURAL DECISION: {project.verificationArchitecture.title}</span>
          </div>
          <p className="text-sm text-[#333333] leading-relaxed font-sans max-w-4xl">
            {project.verificationArchitecture.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 font-mono text-xs text-[#555555]">
            {project.verificationArchitecture.keyPoints.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Deep Dive Features Breakdown */}
        <section className="space-y-6">
          <div className="pb-4 border-b border-[#DADAD3]">
            <span className="font-mono text-xs text-[#111111] bg-[#E8E8E2] border border-[#DADAD3] px-2 py-0.5 uppercase tracking-widest">
              04 // FEATURE DEEP DIVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mt-2">
              ALGORITHMIC & FUNCTIONAL HIGHLIGHTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.deepDiveFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-6 bg-[#FFFFFF] border border-[#DADAD3] flex flex-col justify-between hover:border-[#111111] transition-colors"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block mb-2">
                    {feat.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#111111] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed mb-4">{feat.desc}</p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-[#EAEAE5]">
                  {feat.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-[#333333]">
                      <span className="w-1 h-1 bg-[#111111]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Technology Stack & Engineering Challenges */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tech Stack */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#111111] text-[#F5F5F0] border border-[#333333] space-y-6">
            <span className="font-mono text-xs text-[#D1FF00] uppercase tracking-widest block">
              05 // TECHNICAL MATRIX
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F0]">
              TECHNOLOGIES EMPLOYED
            </h3>

            <div className="space-y-4">
              {project.techStack.map((stack) => (
                <div key={stack.category} className="p-4 bg-[#181818] border border-[#2B2B2B] space-y-2">
                  <span className="font-mono text-[11px] text-[#D1FF00] uppercase tracking-wider block">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-2.5 py-1 bg-[#222222] border border-[#383838] text-[#F5F5F0]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#999999] leading-relaxed pt-1">{stack.justification}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learnings & Engineering Takeaways */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#FFFFFF] border border-[#DADAD3] space-y-6">
            <span className="font-mono text-xs text-[#777777] uppercase tracking-widest block">
              06 // ENGINEERING RETROSPECTIVE
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#111111]">
              CHALLENGES & LESSONS
            </h3>

            <div className="space-y-5">
              {project.challengesAndLearnings.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#F8F8F6] border border-[#E8E8E2] space-y-2">
                  <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block">
                    OBSTACLE 0{idx + 1}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#111111]">{item.challenge}</h4>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    <strong className="text-[#111111]">Solution: </strong>
                    {item.solution}
                  </p>
                  <p className="text-xs text-[#111111] font-mono bg-[#EFEFEA] p-2 border-l-2 border-[#111111]">
                    <strong>Takeaway: </strong>
                    {item.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Navigation & "More Projects" */}
        <section className="pt-12 border-t border-[#DADAD3] space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/#projects"
              data-cursor-label="ALL PROJECTS"
              className="px-6 py-3.5 bg-transparent border border-[#DADAD3] hover:border-[#111111] text-[#111111] font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO ALL PROJECTS</span>
            </Link>

            <Link
              to={`/projects/${project.nextProject.id}`}
              data-cursor-label="NEXT CASE STUDY"
              className="px-6 py-3.5 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2 shadow-lg"
            >
              <span>NEXT: {project.nextProject.title.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* More Projects Card */}
          <div className="p-8 bg-[#FFFFFF] border border-[#DADAD3] mt-8">
            <span className="font-mono text-[10px] text-[#777777] uppercase tracking-widest block mb-1">
              CONTINUE READING
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-display text-2xl font-bold text-[#111111]">
                  PROJECT {otherProject.number}: {otherProject.title}
                </span>
                <p className="text-xs sm:text-sm text-[#555555] max-w-xl mt-1">
                  {otherProject.headline}
                </p>
              </div>

              <Link
                to={`/projects/${otherProject.id}`}
                data-cursor-label="EXPLORE ↗"
                className="px-5 py-3 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 shrink-0"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Footer */}
      <footer className="border-t border-[#DADAD3] bg-[#111111] text-[#F5F5F0] py-10 px-4 sm:px-6 lg:px-8 font-mono text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-base font-bold text-[#F5F5F0]">NAVADEEP</span>
            <span className="text-[#444444]">/</span>
            <span className="text-[#888888]">B.TECH AIML · MLRIT HYDERABAD</span>
          </div>

          <div className="flex items-center gap-6 text-[#777777]">
            <Link to="/#projects" className="hover:text-[#D1FF00] transition-colors">
              PROJECTS
            </Link>
            <Link to="/#contact" className="hover:text-[#D1FF00] transition-colors">
              CONTACT
            </Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
