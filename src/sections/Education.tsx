import React from 'react';
import { GraduationCap, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="py-20 sm:py-28 bg-[#F5F5F0] text-[#111111] bg-grid-light border-b border-[#DADAD3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#DADAD3] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#111111] bg-[#EBEBE6] border border-[#DADAD3] px-2 py-0.5">
                05 // ACADEMICS
              </span>
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider">
                FORMAL STUDY
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] uppercase">
              GROUNDED IN FUNDAMENTALS.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#777777] max-w-sm leading-relaxed uppercase">
            Rigorous undergraduate studies focused on computer science and core artificial intelligence principles.
          </p>
        </div>

        {/* Academic Card */}
        <div className="mt-12 bg-[#FFFFFF] border border-[#DADAD3] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Degree & College Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 bg-[#111111] text-[#D1FF00] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <span className="font-mono text-xs text-[#777777] uppercase tracking-wider block">
                  DEGREE PROGRAM
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
                  {education.degree}
                </h3>
              </div>

              <div className="pt-3 border-t border-[#EAEAE5] space-y-2 font-mono text-xs text-[#555555]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#111111]" />
                  <span className="font-semibold text-[#111111]">{education.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#777777]" />
                  <span>{education.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-3 py-1 bg-[#111111] text-[#D1FF00]">
                  {education.status}
                </span>
              </div>
            </div>

            {/* Coursework & Focus Areas */}
            <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-[#EAEAE5] lg:pl-10">
              <span className="font-mono text-xs text-[#777777] uppercase tracking-wider block">
                ACADEMIC FOCUS & PRINCIPLES
              </span>

              <div className="space-y-3">
                {education.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#FBFBFA] border border-[#EEEEEC] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed font-sans">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 font-mono text-[11px] text-[#777777]">
                <span>CORE FOUNDATIONS: </span>
                <span className="text-[#111111]">
                  ALGORITHMS · MACHINE LEARNING · OBJECT-ORIENTED SYSTEMS · DATA STRUCTURES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
