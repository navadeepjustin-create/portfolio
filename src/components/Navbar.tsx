import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(1);
      if (location.pathname === '/') {
        e.preventDefault();
        const elem = document.querySelector(hash);
        elem?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      } else {
        e.preventDefault();
        navigate(`/${hash}`);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080A0D]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-[#080A0D]/60 backdrop-blur-sm py-4 sm:py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <Magnetic radius={40} strength={0.2}>
          <Link
            to="/"
            data-cursor-label="HOME"
            className="group flex items-center gap-3 text-[#F4F6F8] transition-colors"
          >
            {/* Custom Cyber Monogram */}
            <div className="w-8 h-8 bg-[#11151A] group-hover:bg-[#C6FF00] text-[#C6FF00] group-hover:text-[#080A0D] border border-white/15 group-hover:border-[#C6FF00] flex items-center justify-center font-mono text-xs font-black transition-all duration-200 shadow-sm">
              ND
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tight text-base sm:text-lg leading-none">
                {portfolioData.personal.name}
              </span>
              <span className="font-mono text-[9px] text-[#929BA6] tracking-widest uppercase mt-0.5">
                AIML // MLRIT
              </span>
            </div>
          </Link>
        </Magnetic>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#929BA6]">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/' && !location.hash
                : link.path === '/projects'
                ? location.pathname.startsWith('/projects')
                : link.path === '/about'
                ? location.pathname === '/about'
                : location.hash === '#contact';

            return (
              <Magnetic key={link.label} radius={35} strength={0.25}>
                <Link
                  to={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`relative py-1 transition-colors hover:text-[#F4F6F8] group ${
                    isActive ? 'text-[#C6FF00] font-bold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C6FF00] transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        {/* Right Actions: Command Palette Trigger & Contact Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Command Palette Trigger */}
          <Magnetic radius={35} strength={0.2}>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              data-cursor-label="CMD"
              title="Open Command Palette"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#11151A] hover:bg-[#171D24] text-[#929BA6] hover:text-[#F4F6F8] border border-white/10 hover:border-white/20 font-mono text-[11px] transition-all duration-150"
            >
              <Terminal className="w-3.5 h-3.5 text-[#C6FF00]" />
              <span className="hidden lg:inline text-[10px]">COMMANDS</span>
              <kbd className="px-1.5 py-0.5 bg-black/40 border border-white/10 text-[9px] text-[#C6FF00] font-mono">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
          </Magnetic>

          {/* Contact Action */}
          <Magnetic radius={40} strength={0.25}>
            <a
              href="/#contact"
              onClick={(e) => handleLinkClick(e, '/#contact')}
              data-cursor-label="CONNECT"
              className="px-4 py-2 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b2e600] font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center gap-1.5 border border-[#C6FF00] shadow-[0_0_15px_rgba(198,255,0,0.2)]"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Magnetic>
        </div>

        {/* Mobile Buttons */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Command Palette Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open Command Palette"
            className="p-2 bg-[#11151A] text-[#C6FF00] border border-white/10"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 text-[#F4F6F8] bg-[#11151A] border border-white/10 hover:border-[#C6FF00]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#C6FF00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#080A0D] border-b border-white/10 px-5 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-[10px] tracking-widest text-[#929BA6] uppercase">
                SYSTEM // NAVIGATION
              </span>
              <span className="font-mono text-[10px] text-[#C6FF00]">
                ACTIVE NODE
              </span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="font-display text-xl font-bold text-[#F4F6F8] hover:text-[#C6FF00] flex items-center justify-between py-1.5 border-b border-white/5 transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#929BA6]">→</span>
              </Link>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette?.();
                }}
                className="w-full py-2.5 bg-[#11151A] text-[#F4F6F8] border border-white/10 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Terminal className="w-4 h-4 text-[#C6FF00]" />
                <span>Open Command Palette ({isMac ? '⌘K' : 'Ctrl+K'})</span>
              </button>
            </div>

            <div className="pt-2">
              <a
                href="/#contact"
                onClick={(e) => handleLinkClick(e, '/#contact')}
                className="w-full py-3 bg-[#C6FF00] text-[#080A0D] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>LET'S BUILD SOMETHING</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
