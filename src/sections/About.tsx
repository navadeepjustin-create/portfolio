import React from 'react';
import { Brain, Code2, Sparkles, Compass, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

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
              BEYOND THE CODE
            </span>
          </div>
          <span className="font-mono text-xs text-[#929BA6] hidden sm:inline-block">
            HYDERABAD, INDIA · MLRIT
          </span>
        </div>

        {/* Asymmetrical Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12 items-start">
          {/* Left Column: Editorial Headline & Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase leading-[0.98]">
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
          </div>

          {/* Right Column: Focus Areas & Engineering Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#929BA6] block mb-2">
              AREAS OF CONTINUOUS EXPLORATION
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personal.focusAreas.map((area, idx) => {
                const IconComponent = focusIcons[idx % focusIcons.length];
                return (
                  <div
                    key={area.title}
                    className="p-5 bg-[#11151A] border border-white/10 hover:border-[#C6FF00]/50 transition-all duration-300 group shadow-lg"
                  >
                    <div className="w-9 h-9 bg-[#171D24] border border-white/10 group-hover:border-[#C6FF00] flex items-center justify-center mb-4 transition-colors">
                      <IconComponent className="w-4 h-4 text-[#C6FF00]" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-[#F4F6F8] mb-2 group-hover:text-[#C6FF00] transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-xs text-[#929BA6] leading-relaxed font-sans">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Academic Credential Summary Card */}
            <div className="p-5 bg-[#11151A] border border-white/10 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest block">
                  VERIFIED ACADEMIC PATH
                </span>
                <p className="font-display text-base font-bold text-[#F4F6F8] mt-0.5">
                  MLR Institute of Technology (MLRIT)
                </p>
                <p className="text-xs text-[#929BA6] font-mono">
                  B.Tech CSE (Artificial Intelligence & Machine Learning)
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
