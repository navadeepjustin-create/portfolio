import React, { useState } from 'react';
import { Search, Layout, Code, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Approach: React.FC = () => {
  const { approach } = portfolioData;
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepIcons = [Search, Layout, Code, CheckCircle2];

  return (
    <section
      id="approach"
      className="py-20 sm:py-28 bg-[#FFFFFF] text-[#111111] border-b border-[#DADAD3] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#DADAD3] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#111111] bg-[#EBEBE6] border border-[#DADAD3] px-2 py-0.5">
                03 // WORKFLOW
              </span>
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider">
                FROM IDEA TO PRODUCT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] uppercase">
              HOW I APPROACH BUILDING.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#777777] max-w-sm leading-relaxed uppercase">
            A practical, four-step engineering process focused on eliminating guesswork and delivering functional solutions.
          </p>
        </div>

        {/* Connected Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {approach.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            const isActive = activeStep === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 sm:p-7 border transition-all duration-300 relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#111111] text-[#F5F5F0] border-[#111111] shadow-2xl -translate-y-1'
                    : 'bg-[#F9F9F8] text-[#111111] border-[#DADAD3] hover:border-[#111111]'
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#D1FF00]" />
                )}

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-inherit/20 mb-6">
                    <span
                      className={`font-mono text-2xl font-bold ${
                        isActive ? 'text-[#D1FF00]' : 'text-[#777777]'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`w-8 h-8 flex items-center justify-center border ${
                        isActive
                          ? 'border-[#333333] bg-[#1E1E1E] text-[#D1FF00]'
                          : 'border-[#DADAD3] bg-[#FFFFFF] text-[#111111]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[10px] tracking-widest uppercase block mb-1 ${
                      isActive ? 'text-[#AAAAAA]' : 'text-[#777777]'
                    }`}
                  >
                    {step.phase}
                  </span>
                  <h3
                    className={`font-display text-2xl font-bold tracking-tight mb-3 ${
                      isActive ? 'text-[#F5F5F0]' : 'text-[#111111]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed font-sans mb-6 ${
                      isActive ? 'text-[#CCCCCC]' : 'text-[#555555]'
                    }`}
                  >
                    {step.summary}
                  </p>
                </div>

                {/* Deliverables List */}
                <div
                  className={`pt-4 border-t ${
                    isActive ? 'border-[#262626]' : 'border-[#E5E5DE]'
                  } space-y-2`}
                >
                  <span
                    className={`font-mono text-[10px] tracking-wider uppercase block ${
                      isActive ? 'text-[#D1FF00]' : 'text-[#777777]'
                    }`}
                  >
                    Key Focus
                  </span>
                  {step.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs font-mono"
                    >
                      <span
                        className={`w-1 h-1 ${
                          isActive ? 'bg-[#D1FF00]' : 'bg-[#111111]'
                        }`}
                      />
                      <span
                        className={
                          isActive ? 'text-[#BBBBBB]' : 'text-[#444444]'
                        }
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
