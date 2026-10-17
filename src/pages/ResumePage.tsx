import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, Printer } from 'lucide-react';
import { resumeData } from '../data/resume';
import { CustomCursor } from '../components/CustomCursor';

export const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D]">
      <CustomCursor />

      {/* Screen-Only Control Header (Hidden when printing) */}
      <header className="print:hidden sticky top-0 z-40 bg-[#080A0D]/90 backdrop-blur-md border-b border-white/10 py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#929BA6] hover:text-[#C6FF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#929BA6] hidden sm:inline">
              ATS-FRIENDLY A4 PRINT SPEC
            </span>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#171D24] text-[#F4F6F8] hover:text-[#C6FF00] border border-white/10 font-mono text-xs uppercase font-semibold transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <a
              href="/resume.pdf"
              download="Navadeep_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 bg-[#C6FF00] text-[#080A0D] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#b2e600] transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Resume Canvas Container */}
      <main className="py-8 sm:py-12 px-4 sm:px-6 print:p-0 print:m-0 flex justify-center">
        {/* The ATS Clean White A4 Paper Sheet */}
        <article className="w-full max-w-[800px] bg-white text-[#111827] shadow-2xl p-8 sm:p-14 print:p-0 print:shadow-none print:max-w-full font-sans leading-relaxed selection:bg-yellow-200 selection:text-black">
          {/* Header */}
          <header className="border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-1">
              {resumeData.header.name}
            </h1>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {resumeData.header.title}
            </p>
            <p className="text-xs text-gray-600 space-x-2">
              <span>{resumeData.header.location}</span>
              <span>·</span>
              <a
                href={`mailto:${resumeData.header.email}`}
                className="text-black underline print:no-underline"
              >
                {resumeData.header.email}
              </a>
              <span>·</span>
              <a
                href={resumeData.header.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="text-black underline print:no-underline"
              >
                {resumeData.header.linkedin.display}
              </a>
              <span>·</span>
              <a
                href={resumeData.header.github.url}
                target="_blank"
                rel="noreferrer"
                className="text-black underline print:no-underline"
              >
                {resumeData.header.github.display}
              </a>
              <span>·</span>
              <a
                href={resumeData.header.portfolio.url}
                target="_blank"
                rel="noreferrer"
                className="text-black underline print:no-underline"
              >
                {resumeData.header.portfolio.display}
              </a>
            </p>
          </header>

          {/* Professional Summary */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-xs text-gray-800 leading-normal">
              {resumeData.summary}
            </p>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-bold text-black">
                {resumeData.education.degree}
              </span>
              <span className="text-xs text-gray-600">
                {resumeData.education.duration}
              </span>
            </div>
            <div className="text-xs text-gray-700 italic mb-2">
              {resumeData.education.institution}, {resumeData.education.location}
            </div>
            <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-gray-800">
              {resumeData.education.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1 mb-3">
              Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex flex-wrap justify-between items-baseline mb-0.5">
                    <span className="text-xs font-bold text-black">
                      {proj.title}
                    </span>
                    <span className="text-xs text-gray-600 italic">
                      {proj.technologies} ({proj.status})
                    </span>
                  </div>
                  {proj.repoUrl && (
                    <div className="text-[11px] text-gray-600 mb-1">
                      Repository:{' '}
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {proj.repoUrl}
                      </a>
                    </div>
                  )}
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-gray-800">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Hackathons */}
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1 mb-2">
              Hackathons
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-gray-800">
              {resumeData.hackathons.map((hack, idx) => (
                <li key={idx}>
                  <strong className="text-black">{hack.role}</strong>, {hack.title}.
                </li>
              ))}
            </ul>
          </section>

          {/* Technical Skills */}
          <section className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-gray-200 pb-1 mb-2">
              Skills
            </h2>
            <div className="space-y-1 text-xs text-gray-800">
              {resumeData.skills.map((skill, idx) => (
                <div key={idx} className="flex">
                  <span className="font-bold text-black w-36 shrink-0">
                    {skill.category}:
                  </span>
                  <span>{skill.items}</span>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
