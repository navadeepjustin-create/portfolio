import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { EMAIL_ADDRESS } from '../data/socials';
import { SocialLinks } from './SocialLinks';
import { AccentSwitcher } from './AccentSwitcher';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const activeEmail = EMAIL_ADDRESS.trim() || portfolioData.contact.email.trim();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'Statio-MLR', path: '/projects/statio-mlr' },
    { label: 'Fast Bite', path: '/projects/fast-bite' },
    { label: 'About', path: '/about' },
    { label: 'Lab Experiment', path: '/lab' },
    { label: 'Notes', path: '/notes' },
    { label: 'Resume', path: '/resume' },
    { label: 'Contact', path: '/#contact' },
  ];

  return (
    <footer className="bg-[#080A0D] text-[#F4F6F8] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-white/10">
          {/* Identity & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#C6FF00] text-[#080A0D] font-mono text-xs font-black flex items-center justify-center">
                ND
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-[#F4F6F8]">
                {portfolioData.personal.name}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#929BA6] leading-relaxed max-w-sm">
              AIML Engineering Student at MLR Institute of Technology. Building practical digital solutions, intelligent systems, and friction-free campus platforms.
            </p>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#929BA6] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C6FF00]" />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest block">
              Quick Index
            </span>
            <ul className="space-y-2 font-mono text-xs text-[#929BA6]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    data-cursor-label="GO"
                    className="hover:text-[#C6FF00] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-white/20">→</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels & Email Direct */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest block">
              Profiles & Channels
            </span>

            <SocialLinks variant="footer" />

            <div className="pt-2">
              <span className="font-mono text-[10px] text-[#929BA6] uppercase tracking-wider block mb-1">
                Direct Inquiries
              </span>
              {activeEmail ? (
                <a
                  href={`mailto:${activeEmail}`}
                  data-cursor-label="EMAIL ↗"
                  className="font-mono text-xs text-[#C6FF00] hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{activeEmail}</span>
                </a>
              ) : (
                <span className="font-mono text-[11px] text-[#929BA6]">
                  navadeepjustin@gmail.com
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Palette Switcher & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#929BA6]">
          <p>© {currentYear} Navadeep. Built with React 19, TypeScript & Three.js.</p>

          <div className="flex items-center gap-6">
            <AccentSwitcher />

            <button
              type="button"
              onClick={scrollToTop}
              data-cursor-label="TOP ↑"
              className="group flex items-center gap-2 hover:text-[#C6FF00] transition-colors py-1 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <div className="p-1 border border-white/10 group-hover:border-[#C6FF00] transition-colors">
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#C6FF00]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
