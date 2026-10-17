import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { EASE_PRIMARY } from '../constants/motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname, prefersReducedMotion]);

  return (
    <>
      {/* High-Impact Electric Lime Route Wipe Bar */}
      <AnimatePresence mode="wait">
        {isTransitioning && !prefersReducedMotion && (
          <motion.div
            key={location.pathname}
            className="fixed top-0 left-0 right-0 h-[3px] bg-[#C6FF00] z-[999998] shadow-[0_0_15px_#C6FF00] pointer-events-none"
            initial={{ scaleX: 0, transformOrigin: '0% 50%' }}
            animate={{ scaleX: 1, transformOrigin: '0% 50%' }}
            exit={{ scaleX: 0, transformOrigin: '100% 50%' }}
            transition={{ duration: 0.4, ease: EASE_PRIMARY }}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={location.pathname}
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
        transition={{ duration: 0.28, ease: EASE_PRIMARY }}
      >
        {children}
      </motion.div>
    </>
  );
};
