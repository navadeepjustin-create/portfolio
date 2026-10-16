import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { EMAIL_ADDRESS } from '../data/socials';
import { SocialLinks } from './SocialLinks';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const activeEmail = EMAIL_ADDRESS.trim() || portfolioData.contact.email.trim();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Approach', href: '#approach' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0C0C0C] text-[#F5F5F0] border-t border-[#262626] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-[#222222]">
          {/* Identity & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#D1FF00] text-[#111111] font-mono text-xs font-black flex items-center justify-center">
                ND
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-[#F5F5F0]">
                {portfolioData.personal.name}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#888888] leading-relaxed max-w-sm">
              AIML Engineering Student at MLR Institute of Technology. Building practical digital solutions, intelligent systems, and friction-free campus platforms.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#777777] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#D1FF00]" />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#777777] uppercase tracking-widest block">
              Quick Index
            </span>
            <ul className="space-y-2 font-mono text-xs text-[#AAAAAA]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-cursor-label="GO"
                    className="hover:text-[#D1FF00] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#444444]">→</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels & Email Direct */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs text-[#777777] uppercase tracking-widest block">
              Social Network & Channels
            </span>

            <SocialLinks variant="footer" />

            <div className="pt-2">
              <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider block mb-1">
                Direct Inquiries
              </span>
              {activeEmail ? (
                <a
                  href={`mailto:${activeEmail}`}
                  data-cursor-label="EMAIL ↗"
                  className="font-mono text-xs text-[#D1FF00] hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{activeEmail}</span>
                </a>
              ) : (
                <span className="font-mono text-[11px] text-[#777777]">
                  Email address configurable in src/data/socials.ts
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#666666]">
          <p>© {currentYear} Navadeep. Designed and engineered with React 19 & TypeScript.</p>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor-label="TOP ↑"
            className="group flex items-center gap-2 hover:text-[#D1FF00] transition-colors py-1 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <div className="p-1 border border-[#333333] group-hover:border-[#D1FF00] transition-colors">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
