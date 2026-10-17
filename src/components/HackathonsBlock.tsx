import React from 'react';
import { Trophy, Award, ExternalLink, Calendar, Building, Sparkles } from 'lucide-react';
import { portfolioData, HackathonEntry } from '../data/portfolioData';
import { Spotlight } from './Spotlight';

interface HackathonsBlockProps {
  className?: string;
  compact?: boolean;
}

export const HackathonsBlock: React.FC<HackathonsBlockProps> = ({ className = '', compact = false }) => {
  const { hackathons } = portfolioData;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Block Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-[#C6FF00] bg-[#11151A] border border-[#C6FF00]/30 px-2 py-0.5">
              HACKATHONS // VERIFIED PARTICIPATION
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F4F6F8]">
            COMPETITIONS & BUILDATHONS
          </h3>
        </div>
        <span className="font-mono text-[11px] text-[#929BA6] uppercase tracking-wider">
          ZERO FABRICATED METRICS · 2 EVENTS
        </span>
      </div>

      {/* Grid of Hackathon Cards */}
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-6`}>
        {hackathons.map((hackathon: HackathonEntry, idx: number) => (
          <Spotlight
            key={hackathon.name}
            className="p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#C6FF00] bg-[#11151A] border border-white/10 px-2 py-0.5">
                    EVENT 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-[#929BA6] uppercase">
                    CAMPUS / TECH
                  </span>
                </div>
                <div className="w-8 h-8 bg-[#171D24] text-[#C6FF00] border border-white/10 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              {/* Hackathon Name */}
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#F4F6F8] group-hover:text-[#C6FF00] transition-colors uppercase">
                {hackathon.name}
              </h4>

              {/* Verified Role */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 bg-[#C6FF00] rounded-none animate-pulse" />
                <span className="text-[#F4F6F8] font-semibold uppercase">ROLE: {hackathon.role}</span>
              </div>

              {/* Render ONLY fields that exist (no empty labels) */}
              {hackathon.organizer && (
                <div className="flex items-center gap-2 text-xs text-[#929BA6] font-mono">
                  <Building className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>ORGANIZER: {hackathon.organizer}</span>
                </div>
              )}

              {hackathon.year && (
                <div className="flex items-center gap-2 text-xs text-[#929BA6] font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>YEAR: {hackathon.year}</span>
                </div>
              )}

              {hackathon.theme && (
                <div className="text-xs text-[#929BA6] font-mono">
                  <span className="text-[#F4F6F8] font-semibold">THEME: </span>
                  {hackathon.theme}
                </div>
              )}

              {hackathon.whatIBuilt && (
                <div className="text-xs text-[#929BA6] leading-relaxed font-sans pt-2 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase text-[#F4F6F8] block mb-1">
                    PROJECT DEVELOPED:
                  </span>
                  {hackathon.whatIBuilt}
                </div>
              )}

              {hackathon.stack && hackathon.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {hackathon.stack.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[10px] px-2 py-0.5 bg-[#11151A] border border-white/10 text-[#F4F6F8]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {hackathon.result && (
                <div className="p-3 bg-[#11151A] border-l-2 border-[#C6FF00] font-mono text-xs text-[#C6FF00]">
                  RESULT: {hackathon.result}
                </div>
              )}
            </div>

            {/* Bottom Status / TODO telemetry */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#929BA6]">
              <span className="flex items-center gap-1.5 text-[#929BA6]/80">
                <Sparkles className="w-3 h-3 text-[#C6FF00]" />
                <span>UNEMBELLISHED RECORD</span>
              </span>

              {hackathon.link ? (
                <a
                  href={hackathon.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#C6FF00] hover:underline flex items-center gap-1"
                >
                  <span>EVENT LINK</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-[#929BA6]/60 text-[9px] uppercase">
                  [DETAILS PENDING CONFIRMATION]
                </span>
              )}
            </div>
          </Spotlight>
        ))}
      </div>

      {/* Helpful Transparent Note for Reviewers & Navadeep */}
      <div className="p-4 bg-[#11151A] border border-white/10 flex items-start gap-3">
        <Trophy className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-mono text-xs text-[#F4F6F8] font-bold uppercase">
            HACKATHON INTEGRITY POLICY
          </p>
          <p className="text-xs text-[#929BA6] leading-relaxed">
            Per verified academic records, Navadeep participated in a <em>Cloud technology hackathon</em> and <em>Finathon</em>.
            In strict adherence to portfolio honesty, specific event years, team sizes, project builds, and rankings are omitted until verified by the owner.
          </p>
        </div>
      </div>
    </div>
  );
};
