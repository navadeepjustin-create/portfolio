import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Terminal,
  Globe,
  Database,
  Wrench,
  CheckCircle2,
  FolderGit2,
  Mail,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, InstagramIcon } from '../components/BrandIcons';
import { portfolioData } from '../data/portfolioData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { CommandPalette } from '../components/CommandPalette';
import sunsetPortrait from '../assets/images/navadeep-sunset.png';
import studioPortrait from '../assets/images/navadeep-studio.png';
import visionPortrait from '../assets/images/navadeep-vision.png';

export const AboutPage: React.FC = () => {
  const { skills } = portfolioData;
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const categoryIcons = [Cpu, Terminal, Globe, Database, Wrench];

  const milestones = [
    {
      period: '2025 — PRESENT',
      tag: 'FLAGSHIP PLATFORMS & ADVANCED AIML',
      title: 'Full-Stack Architecture & Applied Model Development',
      institution: 'MLR Institute of Technology, Hyderabad',
      description:
        'Architecting production-ready frontend workflows for Statio-MLR and Fast Bite with React 19, TypeScript, and offline token caching. Deepening knowledge in deep learning fundamentals, transformer attention concepts, and distributed client-server systems.',
    },
    {
      period: '2024',
      tag: 'CAMPUS PROCESS AUTOMATION',
      title: 'Statio-MLR & Fast Bite Concept & Prototype Engineering',
      institution: 'Campus Hackathon Initiative · MLRIT',
      description:
        'Identified high-friction queue bottlenecks at campus photocopy counters and dining halls. Authored detailed software requirements specifications (SRS), designed interactive prototype simulators, and established the counter-only QR verification protocol.',
    },
    {
      period: '2023',
      tag: 'CORE COMPUTER SCIENCE RIGOR',
      title: 'Algorithms, Data Structures & Relational Databases',
      institution: 'Department of CSE (AIML), MLRIT',
      description:
        'Hands-on laboratory implementation in Python, Java Object-Oriented Programming, C/C++, relational SQL schema design, and algorithmic problem-solving.',
    },
    {
      period: '2022',
      tag: 'ACADEMIC COMMENCEMENT',
      title: 'Enrolled in B.Tech Computer Science & Engineering (AIML)',
      institution: 'MLR Institute of Technology, Hyderabad',
      description:
        'Commenced 4-year undergraduate engineering degree with specialized focus on Artificial Intelligence, Machine Learning, and computational mathematics.',
    },
  ];

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

        {/* Section 1: Editorial Introduction with Real Portrait */}
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
              "I'm a B.Tech AIML student and developer at MLRIT who enjoys turning practical problems into thoughtfully designed software, combining systems engineering, product thinking, and AI/ML."
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#929BA6] leading-relaxed border-l-2 border-[#C6FF00] pl-5 font-sans">
              <p>
                My passion lies at the intersection of practical software engineering and machine learning. Rather than treating code as abstract syntax, I focus on identifying tangible friction points in campus and everyday life and engineering robust, delightful digital platforms to resolve them.
              </p>
              <p>
                Through systems like <strong className="text-[#F4F6F8]">Statio-MLR</strong> (campus digital Xerox and stationery ordering) and <strong className="text-[#F4F6F8]">Fast Bite</strong> (scheduled cafeteria dining and pickup verification), I explore ergonomic client interfaces, dynamic price calculation engines, and offline-resilient QR handoff protocols.
              </p>
              <p>
                I am preparing for professional software engineering internships, full-stack opportunities, and applied AI/ML roles where I can contribute disciplined technical execution, genuine curiosity, and thoughtful product design.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                data-cursor-label="PROJECTS ↗"
                className="px-6 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 border border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.2)]"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>EXPLORE PROJECTS</span>
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

          {/* Technical Studio Portrait Card */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 bg-[#11151A] border border-white/15 shadow-2xl relative space-y-4">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C6FF00]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#C6FF00]" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#C6FF00]" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C6FF00]" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs text-[#929BA6]">
                <span className="flex items-center gap-1.5 text-[#C6FF00]">
                  <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" /> VERIFIED PROFILE
                </span>
                <span>MLRIT CSE (AIML)</span>
              </div>

              {/* Sunset Portrait */}
              <div className="relative aspect-[446/751] w-full overflow-hidden bg-[#080A0D] border border-white/10">
                <img
                  src={sunsetPortrait}
                  alt="Navadeep beneath an orange sunset sky"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-2.5 bg-[#11151A] border border-white/10 font-mono text-[11px] flex items-center justify-between">
                <div>
                  <span className="text-[#F4F6F8] font-bold block">NAVADEEP</span>
                  <span className="text-[#929BA6] text-[10px]">Hyderabad, Telangana, India</span>
                </div>
                <span className="text-[#C6FF00] text-[10px] uppercase font-mono">B.Tech AIML</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-[#929BA6] pt-2">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#929BA6]/60">INSTITUTION</span>
                  <span className="text-[#F4F6F8]">MLRIT, Hyderabad</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#929BA6]/60">PROGRAM</span>
                  <span className="text-[#F4F6F8]">B.Tech CSE (AIML)</span>
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

        {/* Section 2: Authentic Academic & Engineering Timeline */}
        <section className="space-y-8 pt-8 border-t border-white/10">
          <div>
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
              01 // MILESTONES & JOURNEY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
              ACADEMIC & BUILDING TIMELINE
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((item) => (
              <div
                key={item.period}
                className="p-6 sm:p-8 bg-[#11151A] border border-white/10 hover:border-[#C6FF00]/40 transition-colors relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C6FF00]" />
                    <span className="text-[#C6FF00] font-bold">{item.tag}</span>
                  </div>
                  <span className="text-[#929BA6] bg-[#171D24] px-2.5 py-1 border border-white/5">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F6F8]">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-[#929BA6]">{item.institution}</p>
                  <p className="font-sans text-sm sm:text-base text-[#929BA6] leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Dual-Perspective Feature (Studio & Vision Photos) */}
        <section className="space-y-8 pt-8 border-t border-white/10">
          <div>
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
              02 // PERSPECTIVE & APPROACH
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F6F8] mt-2">
              WHY I BUILD & EXPLORE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Studio Thinking Card */}
            <div className="bg-[#11151A] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080A0D] border border-white/10">
                  <img
                    src={studioPortrait}
                    alt="Navadeep seated in studio reflection"
                    className="w-full h-full object-cover object-[50%_25%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-2 left-2 font-mono text-[9px] uppercase px-2 py-0.5 bg-[#080A0D]/80 text-[#C6FF00] border border-[#C6FF00]/40">
                    DISCIPLINED CRAFT
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-[#F4F6F8]">
                  Systems Over Abstract Syntax
                </h3>
                <p className="text-sm text-[#929BA6] font-sans leading-relaxed">
                  Great software begins with observing people. Before writing a line of code for Statio-MLR or Fast Bite, I examined how students stand in lines, how counter clerks hand over printouts, and where delays actually occur. The best code eliminates real-world friction.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-[#C6FF00] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Working prototypes, zero hype</span>
              </div>
            </div>

            {/* Vision & Curiosity Card */}
            <div className="bg-[#11151A] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#080A0D] border border-white/10">
                  <img
                    src={visionPortrait}
                    alt="Navadeep gazing up at illuminated clouds at night"
                    className="w-full h-full object-cover object-[50%_75%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-2 left-2 font-mono text-[9px] uppercase px-2 py-0.5 bg-[#080A0D]/80 text-[#C6FF00] border border-[#C6FF00]/40">
                    SCALE & WONDER
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold uppercase text-[#F4F6F8]">
                  Why AI & Machine Learning?
                </h3>
                <p className="text-sm text-[#929BA6] font-sans leading-relaxed">
                  What drew me to Artificial Intelligence is the immense horizon of turning raw data into machines that can adapt and assist. I want to build systems that scale gracefully — whether managing high-volume print queues or analyzing distributed data.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-[#C6FF00] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Continuous growth & engineering curiosity</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Categorized Technical Matrix (Zero fake skill bars) */}
        <section className="space-y-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                03 // TECHNICAL INDEX
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
        </section>

        {/* Section 5: Contact & Inquiries */}
        <section id="contact" className="pt-8 border-t border-white/10">
          <div className="p-8 sm:p-12 bg-[#11151A] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest">
                START A CONVERSATION
              </span>
              <h2 className="font-display text-3xl font-black uppercase text-[#F4F6F8]">
                LET'S BUILD SOMETHING USEFUL.
              </h2>
              <p className="text-sm text-[#929BA6]">
                Seeking software engineering internships, technical collaborations, and AI/ML opportunities. Get in touch directly.
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
                <span>GitHub</span>
              </a>

              <a
                href="https://instagram.com/navdeep_.07"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-[#171D24] hover:bg-white/10 text-[#F4F6F8] font-mono text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2 border border-white/15"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>@navdeep_.07</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
