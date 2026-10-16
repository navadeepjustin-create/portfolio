import React from 'react';
import { ArrowDown, ArrowUpRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { ComputationalCore3D } from '../components/ComputationalCore3D';

interface HeroProps {
  onOpenCommandPalette?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCommandPalette }) => {
  const { personal } = portfolioData;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-20 flex flex-col justify-between bg-[#080A0D] bg-grid-cyber border-b border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C6FF00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#171D24]/80 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Manifesto & Technical Metadata */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Index & System Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest px-2.5 py-1 bg-[#11151A] border border-white/10">
                00 // HYDERABAD, IN [17.54°N, 78.43°E]
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#F4F6F8] border border-[#C6FF00]/30 font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(198,255,0,0.1)]">
                <span className="w-2 h-2 bg-[#C6FF00] rounded-none animate-lime-pulse" />
                <span>{personal.statusTag}</span>
              </div>
            </div>

            {/* Oversized Cinematic Headline */}
            <div className="space-y-3">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#C6FF00] block">
                ENGINEERING MATRIX
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[#F4F6F8] leading-[0.94] uppercase">
                BUILDING AT THE <br />
                INTERSECTION OF <br />
                <span className="inline-block relative">
                  <span className="relative z-10 text-[#C6FF00]">AI & SOFTWARE.</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-5 bg-[#C6FF00]/10 -z-0" />
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#929BA6] max-w-xl leading-relaxed font-sans font-normal border-l-2 border-[#C6FF00] pl-4">
              {personal.heroBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/projects"
                data-cursor-label="EXPLORE ↗"
                className="px-6 sm:px-8 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b5e800] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 border border-[#C6FF00] shadow-[0_0_20px_rgba(198,255,0,0.25)] group"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                to="/about"
                data-cursor-label="ABOUT ↓"
                className="px-6 sm:px-8 py-3.5 bg-[#11151A] text-[#F4F6F8] hover:bg-[#171D24] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 border border-white/15 hover:border-white/30 flex items-center gap-2"
              >
                <span>ABOUT ME</span>
                <ArrowDown className="w-4 h-4 text-[#C6FF00]" />
              </Link>

              {onOpenCommandPalette && (
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  data-cursor-label="CMD"
                  className="hidden sm:flex px-4 py-3.5 bg-black/40 text-[#929BA6] hover:text-[#F4F6F8] font-mono text-xs items-center gap-2 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <Terminal className="w-4 h-4 text-[#C6FF00]" />
                  <span>CMD / ⌘K</span>
                </button>
              )}
            </div>

            {/* Factual System Status Panel */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 font-mono text-xs text-[#929BA6]">
              <div>
                <span className="text-[#929BA6]/60 block text-[10px] uppercase">Institution</span>
                <span className="text-[#F4F6F8] font-semibold">{personal.institution}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/10" />
              <div>
                <span className="text-[#929BA6]/60 block text-[10px] uppercase">Department</span>
                <span className="text-[#F4F6F8] font-semibold">CSE (AI & Machine Learning)</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/10" />
              <div>
                <span className="text-[#929BA6]/60 block text-[10px] uppercase">Focus Architecture</span>
                <span className="text-[#C6FF00] font-semibold">Statio-MLR & Fast Bite</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature 3D Computational Core */}
          <div className="lg:col-span-5 flex justify-center">
            <ComputationalCore3D />
          </div>
        </div>
      </div>

      {/* Bottom Telemetry & Scroll Cue */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#929BA6]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#C6FF00]" />
          <span>STANDALONE ARCHITECTURE · ZERO THIRD-PARTY TRACKERS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block">SCROLL TO INSPECT ARCHITECTURE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C6FF00] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
