import React, { useState } from 'react';
import { Search, Layout, Code, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';

export const Approach: React.FC = () => {
  const { approach } = portfolioData;
  const [activeStep, setActiveStep] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const stepIcons = [Search, Layout, Code, CheckCircle2];

  return (
    <section
      id="approach"
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                03 // WORKFLOW
              </span>
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider">
                FROM CONCEPT TO CODE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase">
              HOW I APPROACH BUILDING.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#929BA6] max-w-sm leading-relaxed uppercase">
            A practical four-phase engineering methodology focused on eliminating guesswork and delivering functional systems.
          </p>
        </div>

        {/* Connected Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {approach.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            const isActive = activeStep === idx;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                onClick={() => setActiveStep(idx)}
                data-cursor-label="PHASE"
                className={`cursor-pointer p-6 sm:p-7 border transition-all duration-300 relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#171D24] text-[#F4F6F8] border-[#C6FF00]/60 shadow-[0_0_25px_rgba(198,255,0,0.1)] -translate-y-1'
                    : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:border-white/25 hover:text-[#F4F6F8]'
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />
                )}

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="font-mono text-xs tracking-widest uppercase text-[#929BA6]">
                      {step.phase}
                    </span>
                    <span
                      className={`font-display text-2xl font-bold ${
                        isActive ? 'text-[#C6FF00]' : 'text-white/40'
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 border ${
                        isActive
                          ? 'bg-[#080A0D] border-[#C6FF00] text-[#C6FF00]'
                          : 'bg-[#171D24] border-white/10 text-[#929BA6]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#F4F6F8]">
                      {step.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#929BA6] leading-relaxed mb-6">
                    {step.summary}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#929BA6] block">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1.5 font-mono text-xs">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[#F4F6F8]">
                        <span className="w-1 h-1 bg-[#C6FF00] rounded-none shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Callout Strip */}
        <div className="mt-14 p-6 sm:p-8 bg-[#11151A] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest">
              GUIDING PRINCIPLE
            </span>
            <p className="font-display text-lg sm:text-xl font-bold text-[#F4F6F8]">
              "Solve the immediate physical friction first, then refine performance and aesthetics."
            </p>
          </div>
          <div className="font-mono text-xs text-[#929BA6] shrink-0 border-l border-white/10 pl-6 hidden md:block">
            AIML ENGINEERING // MLRIT
          </div>
        </div>
      </div>
    </section>
  );
};
