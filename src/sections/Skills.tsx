import React, { useState } from 'react';
import { Cpu, Terminal, Globe, Database, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  const categoryIcons = [Cpu, Terminal, Globe, Database, Wrench];

  const displayedCategories =
    selectedCategory === 'all'
      ? skills
      : [skills[selectedCategory]];

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] bg-grid-cyber border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
              TOOLS ARE JUST THE START.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#929BA6] max-w-sm leading-relaxed uppercase">
            Working technologies and active technical interests according to verified experience. Zero artificial progress bars.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-10">
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

        {/* Skills Technical Index Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {displayedCategories.map((category, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];

            return (
              <div
                key={category.title}
                className="p-6 bg-[#11151A] border border-white/10 hover:border-[#C6FF00]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span className="font-mono text-[11px] text-[#C6FF00] font-semibold">
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
                        className="font-mono text-xs px-2.5 py-1 bg-[#171D24] border border-white/10 text-[#F4F6F8] group-hover:border-white/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Learning Focus Banner */}
        <div className="mt-10 p-5 bg-[#11151A] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#C6FF00] animate-lime-pulse" />
            <span className="text-[#929BA6] uppercase">CURRENT LEARNING FOCUS:</span>
            <span className="text-[#F4F6F8] font-semibold">
              Deep Learning Foundations, Transformer Attention Architectures & Distributed Systems
            </span>
          </div>
          <span className="text-[10px] text-[#C6FF00] uppercase tracking-widest shrink-0">
            MLRIT // CSE (AIML)
          </span>
        </div>
      </div>
    </section>
  );
};
