import React, { useRef } from 'react';
import { X, CheckCircle2, ShieldCheck, Layers, Cpu } from 'lucide-react';
import type { ProjectDetail } from '../data/portfolioData';
import { StatioMockup } from './project-mockups/StatioMockup';
import { FastBiteMockup } from './project-mockups/FastBiteMockup';
import { useDialog } from '../hooks/useDialog';

interface ProjectCaseStudyModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(panelRef, onClose, undefined, Boolean(project));

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto overscroll-contain animate-fade-in touch-pan-y"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-4xl bg-[#11151A] text-[#F4F6F8] border border-white/10 shadow-2xl p-6 sm:p-10 my-4 sm:my-8 overflow-hidden transition-all duration-300 touch-pan-y"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6FF00]" />

        {/* Header bar */}
        <div className="flex items-start justify-between pb-6 border-b border-[#1E2630]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/30 px-2 py-0.5">
                PROJECT {project.number}
              </span>
              <span className="font-mono text-xs text-[#929BA6]">{project.category}</span>
            </div>
            <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F6F8]">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="p-2 border border-[#232B35] hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors text-[#929BA6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-8">
          {/* Headline & Overview */}
          <div className="space-y-3">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#C6FF00]">
              {project.headline}
            </h3>
            <p className="text-sm sm:text-base text-[#929BA6] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Verification Protocol Distinction Callout */}
          {project.verificationNote && (
            <div className="p-4 bg-[#11151A] border-l-4 border-[#C6FF00] space-y-1">
              <div className="flex items-center gap-2 text-[#C6FF00] font-mono text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Verification Architecture Note
              </div>
              <p className="text-xs sm:text-sm text-[#929BA6] leading-relaxed">
                {project.verificationNote}
              </p>
            </div>
          )}

          {/* Live Interactive UI Simulation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#929BA6] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#C6FF00]" /> Interactive Interface Simulation
              </span>
              <span className="font-mono text-[11px] text-[#C6FF00]">CLICKABLE CONTROLS</span>
            </div>
            <div className="border border-[#1E2630]">
              {project.mockupType === 'statio' ? <StatioMockup /> : <FastBiteMockup />}
            </div>
          </div>

          {/* Key Features Breakdown */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#929BA6] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C6FF00]" /> Core Platform Capabilities
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#11151A] border border-[#1E2630] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#F4F6F8] leading-normal">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#929BA6] block">
              Architectural Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 bg-[#171D24] border border-[#232B35] text-[#F4F6F8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#1E2630] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#929BA6]">
            <span>STATUS:</span>
            <span className="text-[#C6FF00] font-semibold">{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#929BA6]">CAMPUS PRODUCT CONCEPT</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#C6FF00] text-[#080A0D] font-bold uppercase tracking-wider hover:bg-[#b0e600] transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
