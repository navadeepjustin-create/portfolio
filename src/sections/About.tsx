import React from 'react';
import { Brain, Code2, Sparkles, Compass, CheckCircle, ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import studioPortrait from '../assets/images/navadeep-studio.png';
import { SplitText } from '../components/SplitText';
import { SectionNumber } from '../components/SectionNumber';
import { Spotlight } from '../components/Spotlight';
import { Magnetic } from '../components/Magnetic';

export const About: React.FC = () => {
  const { personal } = portfolioData;
  const focusIcons = [Brain, Code2, Compass, Sparkles];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] bg-grid-cyber border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Giant Section Number */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                01 // ABOUT ME
              </span>
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider">
                PHILOSOPHY & FOUNDATIONS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase">
              <SplitText>LOGIC BEFORE CODE.</SplitText>
            </h2>
          </div>

          <div className="flex items-end gap-6">
            <span className="font-mono text-xs text-[#929BA6] hidden sm:flex items-center gap-1.5 pb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" /> HYDERABAD, INDIA · MLRIT CSE (AIML)
            </span>
            <SectionNumber number="01" label="ABOUT" className="hidden lg:block -mb-2" />
          </div>
        </div>

        {/* Bento Grid Layout with Mixed Tile Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-12 items-stretch">
          {/* Tile 1: Portrait & Studio Telemetry (Span 5 cols) */}
          <Spotlight className="md:col-span-5 p-4 sm:p-5 flex flex-col justify-between shadow-2xl group">
            <div>
              {/* Precision corner marks */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[10px] text-[#929BA6]">
                <span className="text-[#C6FF00] uppercase font-bold tracking-wider">PROFILE // PERSPECTIVE</span>
                <span>HYDERABAD, IN</span>
              </div>

              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#080A0D] border border-white/10">
                <img
                  src={studioPortrait}
                  alt="Navadeep — systems thinker and developer"
                  className="w-full h-full object-cover object-[50%_25%] grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-transparent opacity-65 pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#11151A]/90 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#929BA6]">
                  <span className="text-[#F4F6F8] font-semibold block">APPROACH: PRODUCT & LOGIC</span>
                  <span className="text-[#929BA6] text-[9px]">Solving campus bottlenecks through thoughtful architecture</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#929BA6]">
              <span>MLRIT CSE (AIML)</span>
              <span className="text-[#C6FF00]">EST. 2026 GRAD</span>
            </div>
          </Spotlight>

          {/* Tile 2: Mission Manifesto (Span 7 cols) */}
          <Spotlight className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
                <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest font-semibold">
                  DEVELOPER MANIFESTO
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F4F6F8] leading-tight">
                {personal.aboutHeadline}
              </h3>

              <div className="space-y-3.5 text-sm sm:text-base text-[#929BA6] leading-relaxed font-sans pt-1">
                {personal.aboutParagraphs.map((para, index) => (
                  <p key={index} className="text-[#929BA6]">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Core Tenets Checklist */}
            <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#929BA6]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Zero fabricated metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Campus bottleneck focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Working prototypes first</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Sharp, accessible design</span>
              </div>
            </div>
          </Spotlight>

          {/* Tile 3: Academic Rigor Credential (Span 6 cols) */}
          <Spotlight className="md:col-span-6 p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest block">
                  UNDERGRADUATE EDUCATION
                </span>
                <GraduationCap className="w-4 h-4 text-[#C6FF00]" />
              </div>

              <h4 className="font-display text-lg font-bold text-[#F4F6F8]">
                MLR Institute of Technology (MLRIT)
              </h4>
              <p className="font-mono text-xs text-[#929BA6]">
                B.Tech in Computer Science & Engineering (AI & ML) · 2022–2026
              </p>
              <p className="text-xs text-[#929BA6] font-sans pt-2 leading-relaxed">
                Coursework in Machine Learning, Artificial Intelligence, Data Structures & Algorithms, Java, and Database Management Systems.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#929BA6]">
              <span>STATUS: IN PROGRESS</span>
              <span className="text-[#C6FF00]">HYDERABAD, INDIA</span>
            </div>
          </Spotlight>

          {/* Tile 4: Deep Story & Philosophy Navigation (Span 6 cols) */}
          <Spotlight className="md:col-span-6 p-6 shadow-xl flex flex-col justify-between group">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest block">
                BACKGROUND & TIMELINE
              </span>
              <h4 className="font-display text-lg font-bold text-[#F4F6F8] group-hover:text-[#C6FF00] transition-colors">
                Explore Full Engineering Story & Timeline
              </h4>
              <p className="text-xs text-[#929BA6] font-sans leading-relaxed">
                Read how building prototypes for physical lines evolved into a focused software engineering and AI/ML development practice.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#929BA6] uppercase">
                DETAILED ESSAY & MILESTONES
              </span>
              <Magnetic radius={35} strength={0.3}>
                <Link
                  to="/about"
                  data-cursor-label="ABOUT STORY ↗"
                  className="px-3.5 py-1.5 bg-[#C6FF00] text-[#080A0D] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(198,255,0,0.25)] hover:bg-[#b2e600] transition-colors"
                >
                  <span>Read Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </Magnetic>
            </div>
          </Spotlight>

          {/* Tile 5: 4 Focus Areas (Span 12 cols) */}
          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {personal.focusAreas.map((area, idx) => {
              const IconComponent = focusIcons[idx % focusIcons.length];
              return (
                <Spotlight
                  key={area.title}
                  className="p-5 shadow-lg group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 bg-[#171D24] border border-white/10 group-hover:border-[#C6FF00] flex items-center justify-center mb-3 transition-colors">
                      <IconComponent className="w-3.5 h-3.5 text-[#C6FF00]" />
                    </div>
                    <h4 className="font-display text-sm font-semibold text-[#F4F6F8] mb-1 group-hover:text-[#C6FF00] transition-colors">
                      {area.title}
                    </h4>
                    <p className="text-xs text-[#929BA6] leading-relaxed font-sans">
                      {area.description}
                    </p>
                  </div>
                </Spotlight>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
