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
      className="py-20 sm:py-28 bg-[#111111] text-[#F5F5F0] bg-grid-dark border-b border-[#333333] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#2A2A2A] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#D1FF00] bg-[#D1FF00]/10 border border-[#D1FF00]/30 px-2 py-0.5">
                04 // CAPABILITIES
              </span>
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider">
                TECHNICAL FOUNDATIONS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F0] uppercase">
              TOOLS ARE JUST THE START.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#888888] max-w-sm leading-relaxed uppercase">
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
                ? 'bg-[#D1FF00] text-[#111111] border-[#D1FF00] font-bold'
                : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-[#FFFFFF]'
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
                  ? 'bg-[#D1FF00] text-[#111111] border-[#D1FF00] font-bold'
                  : 'bg-[#181818] text-[#888888] border-[#333333] hover:text-[#FFFFFF]'
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
                className="p-6 bg-[#171717] border border-[#2B2B2B] hover:border-[#D1FF00] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-5">
                    <span className="font-mono text-[11px] text-[#D1FF00]">
                      {category.tag}
                    </span>
                    <div className="w-8 h-8 bg-[#202020] border border-[#333333] group-hover:border-[#D1FF00] flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4 text-[#D1FF00]" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#F5F5F0] mb-2 group-hover:text-[#D1FF00] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#888888] leading-relaxed font-sans mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="space-y-2 pt-4 border-t border-[#222222]">
                  <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block">
                    Verified Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 bg-[#202020] border border-[#303030] text-[#E0E0E0] group-hover:border-[#404040] transition-colors"
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
      </div>
    </section>
  );
};
