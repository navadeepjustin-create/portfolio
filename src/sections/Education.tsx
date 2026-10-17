import React from 'react';
import { GraduationCap, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { SplitText } from '../components/SplitText';
import { SectionNumber } from '../components/SectionNumber';
import { Spotlight } from '../components/Spotlight';

export const Education: React.FC = () => {
  const { education } = portfolioData;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="py-20 sm:py-28 bg-[#080A0D] text-[#F4F6F8] bg-grid-cyber border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
                05 // ACADEMICS
              </span>
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider">
                FORMAL ENGINEERING
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4F6F8] uppercase">
              <SplitText>GROUNDED IN FUNDAMENTALS.</SplitText>
            </h2>
          </div>
          <div className="flex items-end gap-6">
            <p className="font-mono text-xs text-[#929BA6] max-w-sm leading-relaxed uppercase pb-2">
              Rigorous undergraduate studies focused on computer science and core artificial intelligence principles.
            </p>
            <SectionNumber number="05" label="ACADEMICS" className="hidden lg:block -mb-2" />
          </div>
        </div>

        {/* Academic Card with Spotlight Glow */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-12"
        >
          <Spotlight className="p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
          {/* Subtle corner crosshairs */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#C6FF00]" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#C6FF00]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#C6FF00]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#C6FF00]" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Degree & College Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-12 h-12 bg-[#171D24] text-[#C6FF00] border border-white/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <span className="font-mono text-xs text-[#929BA6] uppercase tracking-wider block">
                  DEGREE PROGRAM
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F6F8] tracking-tight mt-1">
                  {education.degree}
                </h3>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 font-mono text-xs text-[#929BA6]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#C6FF00]" />
                  <span className="font-semibold text-[#F4F6F8]">{education.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#929BA6]" />
                  <span>{education.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#C6FF00]">
                  <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-none animate-pulse" />
                  <span>{education.status}</span>
                </div>
              </div>
            </div>

            {/* Coursework & Campus Highlights */}
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#929BA6] block">
                ACADEMIC FOUNDATIONS & COURSEWORK
              </span>

              <div className="space-y-3">
                {education.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 p-3 bg-[#171D24] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#F4F6F8] leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Spotlight>
        </motion.div>
      </div>
    </section>
  );
};
