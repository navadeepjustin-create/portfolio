import React from 'react';

const SKILLS_LIST = [
  { name: 'React 19', tag: 'UI / ARCH' },
  { name: 'TypeScript', tag: 'LANG' },
  { name: 'Tailwind CSS v4', tag: 'STYLING' },
  { name: 'Python', tag: 'AI / CORE' },
  { name: 'Java', tag: 'OOP / DSA' },
  { name: 'SQL & Database Design', tag: 'DBMS' },
  { name: 'Machine Learning', tag: 'AIML' },
  { name: 'Data Structures', tag: 'CORE CS' },
  { name: 'Vite', tag: 'TOOLING' },
  { name: 'Git & GitHub', tag: 'VCS' },
  { name: 'REST APIs', tag: 'NETWORKING' },
  { name: 'Linux & Shell', tag: 'SYSTEM' },
];

export const SkillsMarquee: React.FC = () => {
  // Duplicate list to achieve continuous infinite marquee loop
  const duplicated = [...SKILLS_LIST, ...SKILLS_LIST];

  return (
    <div className="relative w-full py-3 bg-[#11151A] border-y border-white/10 overflow-hidden group select-none">
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#080A0D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#080A0D] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
        {duplicated.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mx-4 px-3 py-1.5 bg-[#080A0D] border border-white/10 hover:border-[#C6FF00]/60 transition-colors"
          >
            <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-none animate-lime-pulse" />
            <span className="font-mono text-xs font-bold text-[#F4F6F8] tracking-wider uppercase whitespace-nowrap">
              {item.name}
            </span>
            <span className="font-mono text-[9px] text-[#929BA6] px-1.5 py-0.5 bg-[#171D24] border border-white/5 uppercase">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
