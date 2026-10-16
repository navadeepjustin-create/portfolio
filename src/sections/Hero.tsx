import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { HeroVisual } from '../components/HeroVisual';

export const Hero: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen pt-24 pb-12 sm:pb-20 flex flex-col justify-between bg-[#F5F5F0] bg-grid-light border-b border-[#DADAD3] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Manifesto */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Index & Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-widest px-2.5 py-1 bg-[#EBEBE6] border border-[#DADAD3]">
                00 // HYDERABAD, IN
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-[#F5F5F0] border border-[#111111] font-mono text-xs uppercase tracking-wider">
                <span className="w-2 h-2 bg-[#D1FF00] rounded-none animate-lime-pulse" />
                <span>{personal.statusTag}</span>
              </div>
            </div>

            {/* Oversized Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-[#111111] leading-[0.92] uppercase">
                BUILDING <br />
                WHAT’S <br />
                <span className="inline-block relative">
                  <span className="relative z-10">NEXT.</span>
                  <span className="absolute bottom-2 left-0 right-0 h-4 sm:h-6 bg-[#D1FF00] -z-0 -rotate-1" />
                </span>
              </h1>
              <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#555555] pt-2">
                {personal.subHeadline}
              </p>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#333333] max-w-xl leading-relaxed font-sans font-normal border-l-2 border-[#111111] pl-4">
              {personal.heroBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                data-cursor-label="EXPLORE ↗"
                className="px-6 sm:px-8 py-3.5 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 border border-[#111111] shadow-lg group"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#about"
                data-cursor-label="ABOUT ↓"
                className="px-6 sm:px-8 py-3.5 bg-transparent text-[#111111] hover:bg-[#FFFFFF] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 border border-[#DADAD3] hover:border-[#111111] flex items-center gap-2"
              >
                <span>MORE ABOUT ME</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Metadata Ticker */}
            <div className="pt-4 border-t border-[#DADAD3] flex flex-wrap items-center gap-6 font-mono text-xs text-[#777777]">
              <div>
                <span className="text-[#999999] block text-[10px] uppercase">Institution</span>
                <span className="text-[#111111] font-semibold">{personal.institution}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-[#DADAD3]" />
              <div>
                <span className="text-[#999999] block text-[10px] uppercase">Specialization</span>
                <span className="text-[#111111] font-semibold">Artificial Intelligence & ML</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-[#DADAD3]" />
              <div>
                <span className="text-[#999999] block text-[10px] uppercase">Direction</span>
                <span className="text-[#111111] font-semibold">Practical Product Engineering</span>
              </div>
            </div>
          </div>

          {/* Right Column: Original Generative Technology Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 pt-4 border-t border-[#DADAD3] flex items-center justify-between font-mono text-[11px] text-[#777777]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D1FF00] border border-[#111111]" />
          <span>STANDALONE ARCHITECTURE · ZERO THIRD-PARTY COOKIES</span>
        </div>
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-[#111111] transition-colors uppercase tracking-widest font-semibold"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-4 h-7 border border-[#999999] rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-[#111111] rounded-full animate-scroll-line" />
          </div>
        </a>
      </div>
    </section>
  );
};
