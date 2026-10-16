import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SocialLinks } from './SocialLinks';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', hash: '#about' },
    { label: 'Projects', hash: '#projects' },
    { label: 'Approach', hash: '#approach' },
    { label: 'Skills', hash: '#skills' },
    { label: 'Education', hash: '#education' },
    { label: 'Contact', hash: '#contact' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    setMobileMenuOpen(false);

    if (isHome) {
      // On home page, smooth scroll to element
      const targetElem = document.querySelector(hash);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    } else {
      // On other pages, route to home with hash
      e.preventDefault();
      navigate(`/${hash}`);
      setTimeout(() => {
        const targetElem = document.querySelector(hash);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5F5F0]/90 backdrop-blur-md border-b border-[#DADAD3] py-3.5 shadow-sm'
          : 'bg-[#F5F5F0]/60 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          data-cursor-label="HOME"
          className="group flex items-center gap-2.5 font-display text-lg sm:text-xl font-bold tracking-tight text-[#111111]"
        >
          {/* Custom Monogram Box */}
          <div className="w-8 h-8 bg-[#111111] group-hover:bg-[#D1FF00] text-[#D1FF00] group-hover:text-[#111111] border border-[#111111] flex items-center justify-center font-mono text-xs font-black transition-colors duration-200">
            ND
          </div>
          <span className="font-display font-black tracking-tighter">
            {portfolioData.personal.name}
          </span>
          <span className="font-mono text-[10px] text-[#777777] hidden md:inline-block tracking-widest uppercase pl-1.5 border-l border-[#DADAD3]">
            AIML // MLRIT
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-[#333333]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`/${link.hash}`}
              onClick={(e) => handleNavClick(e, link.hash)}
              className="hover:text-[#111111] relative py-1 transition-colors group cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D1FF00] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Right CTA & Socials */}
        <div className="hidden md:flex items-center gap-4">
          <SocialLinks variant="nav" showUnconfigured={false} />

          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            data-cursor-label="CONTACT"
            className="px-4 py-2 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center gap-1.5 border border-[#111111] shadow-sm cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          data-cursor-label="MENU"
          className="lg:hidden p-2 text-[#111111] border border-[#DADAD3] hover:border-[#111111] transition-colors bg-[#FFFFFF]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F5F0] border-b border-[#DADAD3] px-5 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-[#DADAD3] pb-2">
              <span className="font-mono text-[10px] tracking-widest text-[#777777] uppercase">
                DIRECTORY // NAVIGATION
              </span>
              <span className="font-mono text-[10px] text-[#111111] font-semibold">
                NAVADEEP PORTFOLIO
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.hash}`}
                onClick={(e) => handleNavClick(e, link.hash)}
                className="font-display text-xl font-bold text-[#111111] hover:text-[#777777] flex items-center justify-between py-1 border-b border-[#EAEAE5]"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#777777]">→</span>
              </a>
            ))}

            <div className="pt-2">
              <span className="font-mono text-[10px] tracking-widest text-[#777777] uppercase block mb-2">
                CHANNELS
              </span>
              <SocialLinks variant="footer" className="justify-start" />
            </div>

            <div className="pt-3">
              <a
                href="/#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full py-3.5 bg-[#111111] text-[#F5F5F0] hover:bg-[#D1FF00] hover:text-[#111111] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-[#111111] transition-colors"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
