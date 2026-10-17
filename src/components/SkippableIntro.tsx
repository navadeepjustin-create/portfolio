import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SkippableIntroProps {
  onComplete: () => void;
}

export const SkippableIntro: React.FC<SkippableIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [coordinates, setCoordinates] = useState('00.0000° N, 00.0000° E');

  const finishIntro = () => {
    try {
      sessionStorage.setItem('nd_intro_seen', 'true');
    } catch {
      // Safe fallback if sessionStorage is restricted
    }
    setIsVisible(false);
    setTimeout(onComplete, 200);
  };

  useEffect(() => {
    // Check if user already saw intro in this session
    try {
      if (sessionStorage.getItem('nd_intro_seen') === 'true') {
        onComplete();
        setIsVisible(false);
        return;
      }
    } catch {
      // Fallback
    }

    // On mobile touch devices, skip full-screen splash to allow immediate natural scrolling
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Coordinate counter animation
    const coordInterval = setInterval(() => {
      const lat = (17 + Math.random() * 0.54).toFixed(4);
      const lon = (78 + Math.random() * 0.43).toFixed(4);
      setCoordinates(`${lat}° N, ${lon}° E`);
    }, 60);

    // Max 1.8 seconds total duration
    const timer = setTimeout(() => {
      clearInterval(coordInterval);
      setCoordinates('17.5449° N, 78.4326° E');
      finishIntro();
    }, 1800);

    // Skip on Keydown (Escape, Space, Enter)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        clearInterval(coordInterval);
        clearTimeout(timer);
        finishIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(coordInterval);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={finishIntro}
        className="fixed inset-0 z-50 bg-[#080A0D] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
        aria-label="Portfolio Introduction. Click or press Escape to skip."
      >
        {/* Subtle grid in background */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

        {/* Monogram drawing in */}
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="relative w-28 h-28 flex items-center justify-center border-2 border-[#C6FF00] p-4 bg-[#11151A] shadow-[0_0_30px_rgba(198,255,0,0.3)]">
            {/* Corner Crosshairs */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#C6FF00]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#C6FF00]" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#C6FF00]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#C6FF00]" />

            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C6FF00]">
              <motion.path
                d="M 20 80 L 20 20 L 50 80 L 50 20 M 50 20 L 70 20 C 85 20 85 50 70 50 L 50 50 M 70 50 C 85 50 85 80 70 80 L 50 80"
                fill="none"
                stroke="#C6FF00"
                strokeWidth="6"
                strokeLinecap="square"
                strokeLinejoin="miter"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>

          {/* Telemetry Coordinate Counter */}
          <div className="text-center space-y-1.5 font-mono">
            <span className="text-xs text-[#C6FF00] tracking-widest uppercase font-bold block">
              NAVADEEP // AIML & SOFTWARE
            </span>
            <div className="text-[11px] text-[#929BA6] tracking-wider">
              <span>COORDS: </span>
              <span className="text-[#F4F6F8]">{coordinates}</span>
            </div>
            <div className="text-[10px] text-[#929BA6]/60">
              MLRIT · HYDERABAD, TELANGANA, INDIA
            </div>
          </div>

          {/* Skip prompt */}
          <div className="pt-6 font-mono text-[10px] text-[#929BA6] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C6FF00] animate-pulse" />
            <span className="uppercase tracking-wider">CLICK ANYWHERE OR PRESS ESC TO SKIP</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
