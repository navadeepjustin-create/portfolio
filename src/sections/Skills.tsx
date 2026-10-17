import React, { useState } from 'react';
import { Cpu, Terminal, Globe, Database, Wrench, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SplitText } from '../components/SplitText';
import { SectionNumber } from '../components/SectionNumber';
import { SkillsMarquee } from '../components/SkillsMarquee';
import { Spotlight } from '../components/Spotlight';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const categoryIcons = [Cpu, Terminal, Globe, Database, Wrench];

  // Bento span mappings for the 5 disciplines
  const bentoSpans = [
    'lg:col-span-7', // AI / ML
    'lg:col-span-5', // Languages
    'lg:col-span-6', // Web Development
    'lg:col-span-6', // Databases & Architecture
    'lg:col-span-12', // Tools & Workflow
  ];

  const displayedIndices =
    selectedCategory === 'all'
      ? skills.map((_, i) => i)
      : [selectedCategory];

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] bg-grid-cyber border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Giant Section Number */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                04 // CAPABILITIES
              </span>
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider">
                TECHNICAL MATRIX
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase">
              <SplitText>TOOLS ARE JUST THE START.</SplitText>
            </h2>
          </div>
          <div className="flex items-end gap-6">
            <p className="font-mono text-xs text-[#929BA6] max-w-sm leading-relaxed uppercase pb-2">
              Working technologies and active technical interests according to verified experience. Zero artificial progress bars.
            </p>
            <SectionNumber number="04" label="SKILLS" className="hidden lg:block -mb-2" />
          </div>
        </div>

        {/* Dynamic Skills Marquee Strip */}
        <div className="mt-8 mb-10">
          <SkillsMarquee />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`font-mono text-xs uppercase px-3.5 py-1.5 border transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-bold shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8] hover:border-white/20'
            }`}
          >
            All Disciplines ({skills.length})
          </button>
          {skills.map((cat, idx) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => setSelectedCategory(idx)}
              className={`font-mono text-xs uppercase px-3.5 py-1.5 border transition-all ${
                selectedCategory === idx
                  ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-bold shadow-[0_0_15px_rgba(198,255,0,0.2)]'
                  : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:text-[#F4F6F8] hover:border-white/20'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Bento Grid with Mixed Tile Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {displayedIndices.map((origIdx) => {
            const category = skills[origIdx];
            const Icon = categoryIcons[origIdx % categoryIcons.length];
            const spanClass = bentoSpans[origIdx] || 'lg:col-span-6';

            return (
              <Spotlight
                key={category.title}
                className={`${spanClass} p-6 sm:p-7 flex flex-col justify-between shadow-xl group`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <span className="font-mono text-[11px] text-[#C6FF00] font-semibold tracking-wider">
                      {category.tag}
                    </span>
                    <div className="w-8 h-8 bg-[#171D24] border border-white/10 group-hover:border-[#C6FF00] flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4 text-[#C6FF00]" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#F4F6F8] mb-2 group-hover:text-[#C6FF00] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#929BA6] leading-relaxed font-sans mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] text-[#929BA6] uppercase tracking-wider block">
                    Verified Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 bg-[#171D24] border border-white/10 text-[#F4F6F8] group-hover:border-[#C6FF00]/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Spotlight>
            );
          })}
        </div>

        {/* Dynamic Infinite Skills Marquee */}
        <div className="mt-8">
          <SkillsMarquee />
        </div>

        {/* Current Learning Focus Banner */}
        <Spotlight className="mt-8 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse shrink-0" />
            <span className="text-[#929BA6] uppercase font-bold shrink-0">CURRENT LEARNING FOCUS:</span>
            <span className="text-[#F4F6F8] font-semibold">
              Deep Learning Foundations, Transformer Attention Architectures & Distributed Systems
            </span>
          </div>
          <span className="text-[10px] text-[#C6FF00] uppercase tracking-widest shrink-0 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MLRIT // CSE (AIML)</span>
          </span>
        </Spotlight>
      </div>
    </section>
  );
};
