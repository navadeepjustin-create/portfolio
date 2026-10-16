import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import { StatioMockup } from '../components/project-mockups/StatioMockup';
import { FastBiteMockup } from '../components/project-mockups/FastBiteMockup';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CustomCursor } from '../components/CustomCursor';
import { CommandPalette } from '../components/CommandPalette';
import { Footer } from '../components/Footer';

export const ProjectCaseStudyPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const project = projectId ? caseStudies[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

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

  const otherProjectKey = project.id === 'statio-mlr' ? 'fast-bite' : 'statio-mlr';
  const otherProject = caseStudies[otherProjectKey];

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber">
      <CustomCursor />
      <ScrollProgressBar />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Sticky Case Study Top Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#080A0D]/90 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-6 lg:px-8">
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
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="p-1.5 bg-[#11151A] text-[#929BA6] hover:text-[#C6FF00] border border-white/10"
              title="Command Palette"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <Link
              to={`/projects/${project.nextProject.id}`}
              data-cursor-label="NEXT"
              className="px-3 py-1.5 bg-[#171D24] border border-white/10 hover:border-[#C6FF00] text-[#F4F6F8] font-mono text-xs uppercase font-semibold transition-colors flex items-center gap-1"
            >
              <span className="hidden md:inline">Next Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C6FF00]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Case Study Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
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

        {/* Section 2: Executive Overview & Interactive Simulator Preview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
                00 // EXECUTIVE SUMMARY
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F4F6F8]">
                ORIGIN & PURPOSE
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed font-sans">
              {project.overview}
            </p>

            <div className="p-4 bg-[#11151A] border-l-2 border-[#C6FF00] border border-white/10 space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-[#F4F6F8] block">
                CORE SYSTEM METRIC
              </span>
              <p className="text-xs text-[#929BA6] leading-relaxed">
                Engineered to replace 30-minute campus counter queues with a &lt;3 second authenticated QR token pickup window.
              </p>
            </div>
          </div>

          {/* Interactive Simulation Frame */}
          <div className="lg:col-span-7">
            <div className="border border-white/15 shadow-2xl relative overflow-hidden group">
              <div className="bg-[#11151A] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-[#929BA6]">
                  <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
                  <span>INTERACTIVE CLIENT SIMULATION</span>
                </span>
                <span className="text-[#C6FF00] uppercase text-[10px]">CLICKABLE PROTOTYPE</span>
              </div>
              {project.mockupType === 'statio' ? <StatioMockup /> : <FastBiteMockup />}
            </div>
          </div>
        </section>

        {/* Section 3: The Problem Statement */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8 border-t border-white/10">
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
              01 // THE BOTTLENECK
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8]">
              CAMPUS PAIN POINTS
            </h2>
            <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed font-sans">
              {project.problemStatement.lead}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.problemStatement.points.map((pt, i) => (
              <div
                key={i}
                className="p-5 bg-[#11151A] border border-white/10 space-y-2 hover:border-[#C6FF00]/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#929BA6]">
                  <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
                  <span>POINT 0{i + 1}</span>
                </div>
                <h3 className="font-display text-base font-bold text-[#F4F6F8]">{pt.title}</h3>
                <p className="text-xs text-[#929BA6] leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Architectural Solution Pillars */}
        <section className="bg-[#11151A] text-[#F4F6F8] p-8 sm:p-12 border border-white/10 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="font-mono text-xs text-[#C6FF00] bg-[#171D24] border border-[#C6FF00]/30 px-2 py-0.5">
                02 // THE ARCHITECTURE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
                SYSTEM DESIGN & SOLUTION
              </h2>
            </div>
            <p className="font-mono text-xs text-[#929BA6] max-w-sm leading-relaxed uppercase">
              {project.solutionStatement.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.solutionStatement.pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-6 bg-[#171D24] border border-white/5 hover:border-[#C6FF00]/50 transition-colors space-y-3"
              >
                <span className="font-mono text-2xl font-bold text-[#C6FF00]">0{i + 1}</span>
                <h3 className="font-display text-lg font-bold text-[#F4F6F8]">{pillar.title}</h3>
                <p className="text-xs text-[#929BA6] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: End-to-End User Workflows */}
        <section className="space-y-8">
          <div className="pb-4 border-b border-white/10">
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5 uppercase tracking-widest">
              03 // OPERATIONAL WORKFLOWS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
              DUAL-SIDED PROCESS ORCHESTRATION
            </h2>
          </div>

          {/* Student Flow */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#F4F6F8]">
              <span className="w-2.5 h-2.5 bg-[#C6FF00]" />
              <span>STUDENT SELF-SERVICE JOURNEY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {project.studentWorkflow.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-[#11151A] border border-white/10 space-y-2 relative"
                >
                  <span className="font-mono text-xs font-bold text-[#C6FF00] block">
                    STEP {step.step}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#F4F6F8]">{step.title}</h4>
                  <p className="text-[11px] text-[#929BA6] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operator / Staff Flow */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#F4F6F8]">
              <span className="w-2.5 h-2.5 bg-white/20" />
              <span>COUNTER OPERATOR / STAFF JOURNEY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {project.adminWorkflow.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-[#11151A] text-[#F4F6F8] border border-white/10 space-y-2"
                >
                  <span className="font-mono text-xs font-bold text-[#929BA6] block">
                    OPERATOR {step.step}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#F4F6F8]">{step.title}</h4>
                  <p className="text-[11px] text-[#929BA6] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Verification Architecture Callout */}
        <section className="p-6 sm:p-8 bg-[#11151A] border-l-4 border-[#C6FF00] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C6FF00]">
            <ShieldCheck className="w-4 h-4 text-[#C6FF00]" />
            <span>CRITICAL ARCHITECTURAL DECISION: {project.verificationArchitecture.title}</span>
          </div>
          <p className="text-sm text-[#929BA6] leading-relaxed font-sans max-w-4xl">
            {project.verificationArchitecture.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 font-mono text-xs text-[#F4F6F8]">
            {project.verificationArchitecture.keyPoints.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF00] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Deep Dive Features Breakdown */}
        <section className="space-y-6">
          <div className="pb-4 border-b border-white/10">
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5 uppercase tracking-widest">
              04 // FEATURE DEEP DIVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
              ALGORITHMIC & FUNCTIONAL HIGHLIGHTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.deepDiveFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-6 bg-[#11151A] border border-white/10 flex flex-col justify-between hover:border-[#C6FF00]/40 transition-colors"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-wider block mb-2 font-semibold">
                    {feat.tag}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#F4F6F8] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#929BA6] leading-relaxed mb-4">{feat.desc}</p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  {feat.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-[#F4F6F8]">
                      <span className="w-1 h-1 bg-[#C6FF00]" />
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
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#11151A] text-[#F4F6F8] border border-white/10 space-y-6">
            <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
              05 // TECHNICAL MATRIX
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#F4F6F8]">
              TECHNOLOGIES EMPLOYED
            </h3>

            <div className="space-y-4">
              {project.techStack.map((stack) => (
                <div key={stack.category} className="p-4 bg-[#171D24] border border-white/5 space-y-2">
                  <span className="font-mono text-[11px] text-[#C6FF00] uppercase tracking-wider block font-semibold">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-2.5 py-1 bg-[#080A0D] border border-white/10 text-[#F4F6F8]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[#929BA6] leading-relaxed pt-1">{stack.justification}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Learnings & Engineering Takeaways */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#11151A] border border-white/10 space-y-6">
            <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest block">
              06 // ENGINEERING RETROSPECTIVE
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#F4F6F8]">
              CHALLENGES & LESSONS
            </h3>

            <div className="space-y-5">
              {project.challengesAndLearnings.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#171D24] border border-white/5 space-y-2">
                  <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-wider block font-semibold">
                    OBSTACLE 0{idx + 1}
                  </span>
                  <h4 className="font-display text-sm font-bold text-[#F4F6F8]">{item.challenge}</h4>
                  <p className="text-xs text-[#929BA6] leading-relaxed">
                    <strong className="text-[#F4F6F8]">Solution: </strong>
                    {item.solution}
                  </p>
                  <p className="text-xs text-[#C6FF00] font-mono bg-[#080A0D] p-2 border-l-2 border-[#C6FF00]">
                    <strong>Takeaway: </strong>
                    {item.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Navigation & "More Projects" */}
        <section className="pt-12 border-t border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/projects"
              data-cursor-label="ALL PROJECTS"
              className="px-6 py-3.5 bg-transparent border border-white/15 hover:border-[#C6FF00] text-[#F4F6F8] font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO ALL PROJECTS</span>
            </Link>

            <Link
              to={`/projects/${project.nextProject.id}`}
              data-cursor-label="NEXT CASE STUDY"
              className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(198,255,0,0.2)]"
            >
              <span>NEXT: {project.nextProject.title.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* More Projects Card */}
          <div className="p-8 bg-[#11151A] border border-white/10 mt-8">
            <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest block mb-1">
              CONTINUE READING
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-display text-2xl font-bold text-[#F4F6F8]">
                  PROJECT {otherProject.number}: {otherProject.title}
                </span>
                <p className="text-xs sm:text-sm text-[#929BA6] max-w-xl mt-1">
                  {otherProject.headline}
                </p>
              </div>

              <Link
                to={`/projects/${otherProject.id}`}
                data-cursor-label="EXPLORE ↗"
                className="px-5 py-3 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-2 shrink-0"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
