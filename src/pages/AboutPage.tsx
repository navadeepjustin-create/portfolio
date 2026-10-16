import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  MapPin,
  Cpu,
  Terminal,
  Globe,
  Database,
  Wrench,
  CheckCircle2,
  Radio,
  FolderGit2,
  Mail,
} from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';
import { portfolioData } from '../data/portfolioData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CommandPalette } from '../components/CommandPalette';

export const AboutPage: React.FC = () => {
  const { education, skills } = portfolioData;
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const categoryIcons = [Cpu, Terminal, Globe, Database, Wrench];

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber relative">
      <ScrollProgressBar />
      <CustomCursor />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      <main className="pt-28 pb-20 sm:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Breadcrumb & Telemetry Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs text-[#929BA6]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#C6FF00] transition-colors">HOME</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C6FF00]">ABOUT & TECHNICAL PROFILE</span>
          </div>
          <span>HYDERABAD, IN [17.54°N, 78.43°E]</span>
        </div>

        {/* Section 1: Editorial Introduction & Persona */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#C6FF00] border border-[#C6FF00]/30 font-mono text-xs uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
              <span>AIML STUDENT & SOFTWARE BUILDER</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F6F8] leading-[0.95]">
              NAVADEEP
            </h1>

            <p className="font-sans text-xl sm:text-2xl text-[#C6FF00] font-light leading-relaxed">
              "I'm Navadeep, a B.Tech student studying Artificial Intelligence and Machine Learning at MLRIT, interested in building practical software projects and exploring intelligent systems."
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#929BA6] leading-relaxed border-l-2 border-[#C6FF00] pl-5">
              <p>
                My focus centers on bridging machine learning theory and practical user experience. Rather than treating code as abstract syntax, I look for tangible friction in daily campus life and build platforms that solve it directly.
              </p>
              <p>
                Through projects like Statio-MLR (document print queue management) and Fast Bite (campus canteen scheduled ordering), I explore responsive client architectures, state modeling, and offline-resilient verification tokens.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                data-cursor-label="PROJECTS ↗"
                className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 border border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.2)]"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>EXPLORE MY WORK</span>
              </Link>

              <a
                href="#contact"
                data-cursor-label="TALK"
                className="px-6 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#F4F6F8] font-mono text-xs uppercase tracking-widest font-bold transition-all border border-white/10 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#C6FF00]" />
                <span>GET IN TOUCH</span>
              </a>
            </div>
          </div>

          {/* Technical Avatar & Engineering Badge */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-[#11151A] border border-white/10 shadow-2xl relative space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs text-[#929BA6]">
                <span className="flex items-center gap-1.5 text-[#C6FF00]">
                  <Radio className="w-3.5 h-3.5" /> VERIFIED CREDENTIALS
                </span>
                <span>NODE 01</span>
              </div>

              {/* Monogram Box / Portrait Frame */}
              <div className="relative aspect-square max-w-[320px] mx-auto bg-[#080A0D] border border-white/10 p-6 flex flex-col items-center justify-center text-center shadow-xl">
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C6FF00]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C6FF00]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C6FF00]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C6FF00]" />

                <span className="font-mono text-[10px] tracking-widest uppercase text-[#C6FF00] mb-2">
                  STUDENT DEVELOPER
                </span>
                <span className="font-display text-6xl font-black text-[#F4F6F8] tracking-tight">
                  ND
                </span>
                <span className="font-mono text-xs text-[#929BA6] tracking-wider uppercase mt-2">
                  NAVADEEP // MLRIT
                </span>
                <span className="font-mono text-[10px] text-[#929BA6]/60 mt-1">
                  B.Tech AIML · 2026
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#929BA6]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#929BA6]/60">PRIMARY BASE</span>
                  <span className="text-[#F4F6F8]">Hyderabad, India</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#929BA6]/60">INSTITUTION</span>
                  <span className="text-[#F4F6F8]">MLRIT</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#929BA6]/60">GITHUB</span>
                  <a
                    href="https://github.com/navadeepjustin-create"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#C6FF00] hover:underline"
                  >
                    navadeepjustin-create
                  </a>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#929BA6]/60">DIRECT EMAIL</span>
                  <a href="mailto:navadeepjustin@gmail.com" className="text-[#C6FF00] hover:underline">
                    navadeepjustin@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Formal Education at MLRIT */}
        <section className="space-y-8 pt-8 border-t border-white/10">
          <div>
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
              01 // FORMAL ACADEMICS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
              ACADEMIC DEGREE & RIGOR
            </h2>
          </div>

          <div className="bg-[#11151A] border border-white/10 p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="w-12 h-12 bg-[#171D24] text-[#C6FF00] border border-white/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider block">
                    DEGREE IN PROGRESS
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F6F8] tracking-tight mt-1">
                    {education.degree}
                  </h3>
                </div>
                <div className="pt-3 border-t border-white/10 space-y-2 font-mono text-xs text-[#929BA6]">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C6FF00]" />
                    <span className="text-[#F4F6F8] font-semibold">{education.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{education.location}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#929BA6] block">
                  FOCUS AREAS & LAB WORK
                </span>
                <div className="space-y-3">
                  {education.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-3 bg-[#171D24] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#F4F6F8]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Categorized Technical Matrix (Zero fake skill bars) */}
        <section className="space-y-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                02 // TECHNICAL INDEX
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
                VERIFIED COMPETENCIES
              </h2>
            </div>
            <p className="font-mono text-xs text-[#929BA6] max-w-sm uppercase">
              Categorized technical index based on verified code and projects. Zero artificial progress meters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, idx) => {
              const Icon = categoryIcons[idx % categoryIcons.length];
              return (
                <div
                  key={category.title}
                  className="p-6 bg-[#11151A] border border-white/10 hover:border-[#C6FF00]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                      <span className="font-mono text-xs text-[#C6FF00] font-semibold">
                        {category.tag}
                      </span>
                      <Icon className="w-4 h-4 text-[#929BA6]" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F4F6F8] mb-2">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#929BA6] leading-relaxed mb-6 font-sans">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 bg-[#171D24] border border-white/10 text-[#F4F6F8]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Learning Focus Callout */}
          <div className="p-6 bg-[#11151A] border-l-4 border-[#C6FF00] border border-white/10 space-y-2">
            <span className="font-mono text-xs text-[#C6FF00] font-bold uppercase tracking-wider block">
              CURRENT EXPLORATION & LEARNING OBJECTIVES
            </span>
            <p className="text-sm text-[#929BA6] leading-relaxed">
              Currently deepening understanding of Deep Learning transformer attention mechanisms, neural model inference pipelines, and scalable backend orchestration.
            </p>
          </div>
        </section>

        {/* Section 4: Contact Action */}
        <section id="contact" className="pt-8 border-t border-white/10">
          <div className="p-8 sm:p-12 bg-[#11151A] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest">
                LET'S TALK
              </span>
              <h2 className="font-display text-3xl font-black uppercase text-[#F4F6F8]">
                LET'S BUILD SOMETHING USEFUL.
              </h2>
              <p className="text-sm text-[#929BA6]">
                Have a project idea, want to collaborate, or want to discuss technology? Get in touch.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="mailto:navadeepjustin@gmail.com"
                className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(198,255,0,0.2)]"
              >
                <Mail className="w-4 h-4" />
                <span>navadeepjustin@gmail.com</span>
              </a>

              <a
                href="https://github.com/navadeepjustin-create"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-[#171D24] hover:bg-white/10 text-[#F4F6F8] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2 border border-white/15"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
