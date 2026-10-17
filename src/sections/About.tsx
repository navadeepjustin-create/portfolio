import React from 'react';
import { Brain, Code2, Sparkles, Compass, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import studioPortrait from '../assets/images/navadeep-studio.png';

export const About: React.FC = () => {
  const { personal } = portfolioData;

  const focusIcons = [Brain, Code2, Compass, Sparkles];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] bg-grid-cyber border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
              01 // ABOUT ME
            </span>
            <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider">
              PHILOSOPHY & FOUNDATIONS
            </span>
          </div>
          <span className="font-mono text-xs text-[#929BA6] hidden sm:inline-block">
            HYDERABAD, INDIA · MLRIT CSE (AIML)
          </span>
        </div>

        {/* Asymmetrical Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-12 items-start">
          {/* Left Column: Authentic Studio Photograph & Engineering Identity */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group interactive-card">
              {/* Subtle ambient glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#C6FF00]/15 via-transparent to-[#171D24]/40 blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

              <div className="relative bg-[#11151A] border border-white/15 group-hover:border-[#C6FF00]/50 p-3 sm:p-4 shadow-2xl transition-all duration-300">
                {/* Precision Corner Crosshairs */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C6FF00]" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#C6FF00]" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#C6FF00]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C6FF00]" />

                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 font-mono text-[10px] text-[#929BA6]">
                  <span className="text-[#C6FF00] uppercase font-bold tracking-wider">STUDIO // REFLECTION</span>
                  <span>HYDERABAD, IN</span>
                </div>

                {/* Studio Photograph */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#080A0D] border border-white/10">
                  <img
                    src={studioPortrait}
                    alt="Navadeep in thoughtful profile — systems thinker and developer"
                    className="w-full h-full object-cover object-[50%_25%] grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-transparent opacity-60 pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 p-2 bg-[#11151A]/90 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#929BA6]">
                    <span className="text-[#F4F6F8] font-semibold block">APPROACH: PRODUCT & LOGIC</span>
                    <span className="text-[#929BA6] text-[9px]">Solving human friction before writing code</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#929BA6]">
                  <span>MLRIT HYDERABAD</span>
                  <span className="text-[#C6FF00]">AIML 2022–2026</span>
                </div>
              </div>
            </div>

            {/* Quick Link to Dedicated About Page */}
            <Link
              to="/about"
              data-cursor-label="BIO ↗"
              className="p-4 bg-[#11151A] hover:bg-[#171D24] border border-white/10 hover:border-[#C6FF00]/50 transition-all flex items-center justify-between group"
            >
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-wider block">
                  TECHNICAL BACKGROUND & VISION
                </span>
                <span className="font-display text-sm font-bold text-[#F4F6F8]">
                  Read Full About Story & Philosophy
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#C6FF00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Narrative, Tenets & Areas of Exploration */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase leading-[0.98]">
              {personal.aboutHeadline}
            </h2>

            <div className="w-12 h-1 bg-[#C6FF00]" />

            <div className="space-y-4 text-base sm:text-lg text-[#929BA6] leading-relaxed font-sans">
              {personal.aboutParagraphs.map((para, index) => (
                <p key={index} className="text-[#929BA6]">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Tenets Checklist */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#929BA6]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Zero fake metrics or fluff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Campus problem focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Working prototypes first</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#C6FF00] shrink-0" />
                <span>Accessible, clean design</span>
              </div>
            </div>

            {/* Exploration Matrix Cards */}
            <div className="pt-4 space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#929BA6] block">
                AREAS OF CONTINUOUS EXPLORATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {personal.focusAreas.map((area, idx) => {
                  const IconComponent = focusIcons[idx % focusIcons.length];
                  return (
                    <div
                      key={area.title}
                      className="p-4 bg-[#11151A] border border-white/10 hover:border-[#C6FF00]/50 transition-all duration-300 group shadow-lg"
                    >
                      <div className="w-8 h-8 bg-[#171D24] border border-white/10 group-hover:border-[#C6FF00] flex items-center justify-center mb-3 transition-colors">
                        <IconComponent className="w-3.5 h-3.5 text-[#C6FF00]" />
                      </div>
                      <h3 className="font-display text-sm font-semibold text-[#F4F6F8] mb-1 group-hover:text-[#C6FF00] transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-xs text-[#929BA6] leading-relaxed font-sans">
                        {area.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Credential Card */}
            <div className="p-4 sm:p-5 bg-[#11151A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest block">
                  VERIFIED ACADEMIC CREDENTIAL
                </span>
                <p className="font-display text-base font-bold text-[#F4F6F8] mt-0.5">
                  MLR Institute of Technology (MLRIT)
                </p>
                <p className="text-xs text-[#929BA6] font-mono">
                  B.Tech CSE (Artificial Intelligence & Machine Learning) · 2022–2026
                </p>
              </div>

              <div className="font-mono text-xs text-[#929BA6] px-3 py-1.5 bg-[#171D24] border border-white/10 shrink-0">
                HYDERABAD, IN
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
