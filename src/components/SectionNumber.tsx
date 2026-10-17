import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface SectionNumberProps {
  number: string;
  label?: string;
  className?: string;
}

export const SectionNumber: React.FC<SectionNumberProps> = ({
  number,
  label,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.15, 0.7, 0.7, 0.15]);
  const tracking = useTransform(scrollYProgress, [0, 0.5, 1], ['-0.03em', '0.04em', '-0.03em']);
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  if (prefersReducedMotion) {
    return (
      <div className={`relative select-none pointer-events-none opacity-40 ${className}`}>
        <span className="font-display text-7xl sm:text-9xl font-black text-white/10 tracking-tight leading-none block">
          {number}
        </span>
        {label && (
          <span className="font-mono text-[10px] tracking-widest text-[#929BA6] uppercase block mt-1">
            // {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div style={{ opacity, y, letterSpacing: tracking }}>
        <span className="font-display text-7xl sm:text-9xl font-black text-white/[0.08] leading-none block">
          {number}
        </span>
      </motion.div>
      {label && (
        <span className="font-mono text-[10px] tracking-widest text-[#929BA6] uppercase block mt-1">
          // {label}
        </span>
      )}
    </div>
  );
};
