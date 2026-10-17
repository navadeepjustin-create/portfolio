import React, { useEffect, useRef } from 'react';

interface FlashlightGridProps {
  className?: string;
  size?: number;
}

export const FlashlightGrid: React.FC<FlashlightGridProps> = ({
  className = '',
  size = 40,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || isReduced) return;

    const el = containerRef.current;
    if (!el) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let rafId: number | null = null;
    let isInside = false;

    const update = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      el.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
      el.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

      if (isInside || Math.abs(targetX - currentX) > 0.5) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isInside = true;
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        if (!rafId) rafId = requestAnimationFrame(update);
      } else if (isInside) {
        isInside = false;
        targetX = -1000;
        targetY = -1000;
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      targetX = -1000;
      targetY = -1000;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base subtle cyber grid */}
      <div
        className="absolute inset-0 bg-grid-cyber opacity-80"
        style={{ backgroundSize: `${size}px ${size}px` }}
      />

      {/* Bright electric-lime grid revealed dynamically by the cursor flashlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(198, 255, 0, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(198, 255, 0, 0.35) 1px, transparent 1px)',
          backgroundSize: `${size}px ${size}px`,
          maskImage:
            'radial-gradient(280px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(280px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, transparent 100%)',
        }}
      />
    </div>
  );
};
