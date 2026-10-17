import React, { useState, Suspense, lazy } from 'react';
import { ArrowDown, ArrowUpRight, Terminal, FileText, Check, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import sunsetPortrait from '../assets/images/navadeep-sunset.png';
import { EASE_PRIMARY } from '../constants/motion';
import { FlashlightGrid } from '../components/FlashlightGrid';
import { ProximityText } from '../components/ProximityText';
import { Magnetic } from '../components/Magnetic';

const HeroShader = lazy(() =>
  import('../components/HeroShader').then((m) => ({ default: m.HeroShader }))
);

interface HeroProps {
  onOpenCommandPalette?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCommandPalette }) => {
  const { personal, contact } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_PRIMARY },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen pt-24 sm:pt-28 pb-12 sm:pb-20 flex flex-col justify-between bg-[#080A0D] border-b border-white/10 overflow-hidden"
    >
      {/* Dynamic Flashlight Grid brightening to electric lime under cursor */}
      <FlashlightGrid size={40} />

      {/* Lightweight animated gradient/noise WebGL shader with static CSS fallback */}
      <Suspense fallback={<div className="absolute inset-0 bg-radial-ambient pointer-events-none" />}>
        <HeroShader />
      </Suspense>

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C6FF00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#171D24]/80 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Typographic Manifesto & Technical Positioning */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Status & Location Pill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-[#929BA6] uppercase tracking-widest px-2.5 py-1 bg-[#11151A] border border-white/10">
                00 // HYDERABAD, IN [17.54°N, 78.43°E]
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#F4F6F8] border border-[#C6FF00]/30 font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(198,255,0,0.1)]">
                <span className="w-2 h-2 bg-[#C6FF00] rounded-none animate-lime-pulse" />
                <span>{personal.statusTag}</span>
              </div>
            </motion.div>

            {/* Oversized Editorial Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#C6FF00] block">
                {personal.subHeadline}
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[#F4F6F8] leading-[0.94] uppercase">
                <ProximityText>BUILDING USEFUL</ProximityText> <br />
                <ProximityText>PRODUCTS.</ProximityText> <br />
                <span className="inline-block relative">
                  <span className="relative z-10 text-[#C6FF00]">
                    <ProximityText accentClassName="text-[#C6FF00]">ENGINEERING BETTER EXPERIENCES.</ProximityText>
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-5 bg-[#C6FF00]/10 -z-0" />
                </span>
              </h1>
            </motion.div>

            {/* Authentically Formulated Introduction */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#929BA6] max-w-xl leading-relaxed font-sans font-normal border-l-2 border-[#C6FF00] pl-4"
            >
              {personal.heroBio}
            </motion.p>

            {/* Coordinated Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Magnetic radius={70} strength={0.32}>
                <Link
                  to="/projects"
                  data-cursor-label="EXPLORE ↗"
                  className="px-6 sm:px-7 py-3.5 bg-[#C6FF00] text-[#080A0D] hover:bg-[#b5e800] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 flex items-center gap-2 border border-[#C6FF00] shadow-[0_0_20px_rgba(198,255,0,0.25)] group"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Magnetic>

              <Magnetic radius={60} strength={0.25}>
                <Link
                  to="/about"
                  data-cursor-label="ABOUT ↓"
                  className="px-6 sm:px-7 py-3.5 bg-[#11151A] text-[#F4F6F8] hover:bg-[#171D24] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-200 border border-white/15 hover:border-white/30 flex items-center gap-2"
                >
                  <span>ABOUT & STORY</span>
                  <ArrowDown className="w-4 h-4 text-[#C6FF00]" />
                </Link>
              </Magnetic>

              <Magnetic radius={50} strength={0.22}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="PDF ↗"
                  className="px-4 sm:px-5 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#F4F6F8] font-mono text-xs uppercase tracking-wider font-semibold transition-all border border-white/10 hover:border-[#C6FF00]/50 flex items-center gap-2"
                  title="Download Resume (PDF)"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C6FF00]" />
                  <span>DOWNLOAD RESUME</span>
                </a>
              </Magnetic>

              <Magnetic radius={40} strength={0.2}>
                <Link
                  to="/resume"
                  data-cursor-label="VIEW"
                  className="hidden sm:inline-flex px-3.5 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#929BA6] hover:text-[#C6FF00] font-mono text-xs uppercase tracking-wider font-semibold transition-all border border-white/10 hover:border-white/25 items-center gap-1.5"
                  title="View ATS Resume Page"
                >
                  <span>/RESUME</span>
                </Link>
              </Magnetic>

              <Magnetic radius={40} strength={0.2}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  data-cursor-label={copiedEmail ? 'COPIED' : 'COPY'}
                  className="px-3.5 py-3.5 bg-[#11151A] hover:bg-[#171D24] text-[#929BA6] hover:text-[#C6FF00] font-mono text-xs uppercase tracking-wider font-semibold transition-all border border-white/10 hover:border-white/25 flex items-center gap-1.5"
                  title={`Copy email address: ${contact.email}`}
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#C6FF00]" /> : <Copy className="w-3.5 h-3.5 text-[#C6FF00]" />}
                  <span className="hidden sm:inline">{copiedEmail ? 'COPIED' : 'COPY EMAIL'}</span>
                </button>
              </Magnetic>

              {onOpenCommandPalette && (
                <Magnetic radius={50} strength={0.25}>
                  <button
                    type="button"
                    onClick={onOpenCommandPalette}
                    data-cursor-label="CMD"
                    className="hidden sm:flex px-4 py-3.5 bg-black/40 text-[#929BA6] hover:text-[#F4F6F8] font-mono text-xs items-center gap-2 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <Terminal className="w-4 h-4 text-[#C6FF00]" />
                    <span>CMD / ⌘K</span>
                  </button>
                </Magnetic>
              )}
            </motion.div>

            {/* Factual Academic & Engineering Telemetry Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-[#929BA6]"
            >
              <div>
                <span className="text-[#929BA6]/60 block text-[10px] uppercase">Institution</span>
                <span className="text-[#F4F6F8] font-semibold">{personal.institution}</span>
              </div>
              <div>
                <span className="text-[#929BA6]/60 block text-[10px] uppercase">Program</span>
                <span className="text-[#F4F6F8] font-semibold">B.Tech AIML (2022–2026)</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[#929BA6]/60 block text-[10px] uppercase">Flagship Platforms</span>
                <span className="text-[#C6FF00] font-semibold">Statio-MLR · Fast Bite</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bespoke Editorial Personal Portrait Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[400px] group interactive-card">
              {/* Subtle ambient lime glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#C6FF00]/15 via-transparent to-[#171D24]/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* High-End Portrait Frame */}
              <div className="relative bg-[#11151A] border border-white/15 group-hover:border-[#C6FF00]/60 p-3 sm:p-4 shadow-2xl transition-all duration-300">
                {/* Precision Corner Marks */}
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C6FF00]" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#C6FF00]" />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#C6FF00]" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C6FF00]" />

                {/* Top Telemetry Header Strip */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 font-mono text-[10px] text-[#929BA6]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-none animate-lime-pulse" />
                    <span className="text-[#F4F6F8] font-bold tracking-wider">NAVADEEP // PROFILE</span>
                  </div>
                  <span className="text-[#929BA6]">CSE (AIML) · MLRIT</span>
                </div>

                {/* The Photograph Container - 446:751 intrinsic aspect ratio preserves full cloud formation and foreground */}
                <div className="relative aspect-[446/751] w-full overflow-hidden bg-[#080A0D] border border-white/10">
                  <img
                    src={sunsetPortrait}
                    alt="Navadeep beneath an orange sunset sky"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Overlay Floating Technology Tags */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#080A0D]/85 backdrop-blur-md text-[#C6FF00] border border-[#C6FF00]/40">
                      React · TypeScript
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#080A0D]/85 backdrop-blur-md text-[#F4F6F8] border border-white/20">
                      Python · AI/ML
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Identity Bar (Positioned outside image container to prevent blocking the person in the photograph) */}
                <div className="mt-3 p-2.5 bg-[#080A0D] border border-white/10 flex items-center justify-between font-mono text-[11px]">
                  <div>
                    <span className="text-[#F4F6F8] font-bold block tracking-wider">NAVADEEP</span>
                    <p className="font-mono text-[9px] text-[#929BA6] uppercase tracking-wider mt-0.5">
                      B.Tech AIML Student & Full-Stack Builder
                    </p>
                  </div>
                  <span className="text-[#C6FF00] text-[10px] uppercase font-mono px-2 py-0.5 bg-[#C6FF00]/10 border border-[#C6FF00]/30 shrink-0">
                    HYDERABAD, IN
                  </span>
                </div>

                {/* Bottom Card Strip */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#929BA6]">
                  <div className="flex items-center gap-1.5 text-[#C6FF00]">
                    <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
                    <span>OPEN FOR INTERNSHIPS</span>
                  </div>
                  <span className="text-[#929BA6]">EST. 2026 GRAD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Telemetry & Subtle Scroll Cue */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#929BA6]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#C6FF00]" />
          <span>Open to internships — Class of 2026 · AIML at MLRIT</span>
        </div>
        <a
          href="#about"
          className="flex items-center gap-2 hover:text-[#C6FF00] transition-colors"
        >
          <span className="hidden sm:inline-block">SCROLL TO INSPECT PHILOSOPHY & WORK</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C6FF00] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
