import React from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

const CHAPTERS = [
  { id: 'hero', num: '00', label: 'HERO' },
  { id: 'about', num: '01', label: 'ABOUT' },
  { id: 'projects', num: '02', label: 'WORK' },
  { id: 'approach', num: '03', label: 'METHOD' },
  { id: 'skills', num: '04', label: 'SKILLS' },
  { id: 'education', num: '05', label: 'ACADEMICS' },
  { id: 'contact', num: '06', label: 'CONTACT' },
];

export const SideChapterIndicator: React.FC = () => {
  const activeId = useActiveSection(CHAPTERS.map((c) => c.id));
  const currentActive = activeId || 'hero';

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-2.5 font-mono text-[10px] select-none pointer-events-auto"
      aria-label="Chapter telemetry navigation"
    >
      <div className="text-[9px] text-[#929BA6]/60 uppercase tracking-widest pl-1 mb-1">
        TELEMETRY
      </div>
      {CHAPTERS.map((ch) => {
        const isActive = currentActive === ch.id;

        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => scrollToChapter(ch.id)}
            data-cursor-label={`GOTO ${ch.num}`}
            className="group flex items-center justify-end gap-2 text-right transition-all py-0.5 outline-none"
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Expanded hover/active label */}
            <span
              className={`text-[9px] uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'text-[#C6FF00] font-bold opacity-100 translate-x-0'
                  : 'text-[#929BA6] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
              }`}
            >
              {ch.num} // {ch.label}
            </span>

            {/* Indicator bar: turns electric lime and grows when active */}
            <span
              className={`h-4 transition-all duration-300 rounded-none ${
                isActive
                  ? 'w-1.5 bg-[#C6FF00] shadow-[0_0_10px_#C6FF00]'
                  : 'w-[2px] bg-white/20 group-hover:bg-[#C6FF00]/60 group-hover:w-1'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};
