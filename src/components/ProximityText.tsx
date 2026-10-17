import React, { useEffect, useRef } from 'react';

interface ProximityTextProps {
  children: string;
  className?: string;
  accentIndices?: number[];
  accentClassName?: string;
}

export const ProximityText: React.FC<ProximityTextProps> = ({
  children,
  className = '',
  accentIndices = [],
  accentClassName = 'text-[#C6FF00]',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || isReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll<HTMLSpanElement>('.prox-char');
    if (!letters.length) return;

    let rafId: number | null = null;
    let targetMouse = { x: -1000, y: -1000 };

    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const update = () => {
      letters.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(targetMouse.x - centerX, targetMouse.y - centerY);

        const radius = 100;
        if (dist < radius) {
          const power = 1 - dist / radius;
          const shiftY = -power * 4;
          const scale = 1 + power * 0.08;
          span.style.transform = `translate3d(0, ${shiftY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
          span.style.textShadow = `0 0 ${(power * 10).toFixed(1)}px rgba(198, 255, 0, ${(power * 0.6).toFixed(2)})`;
        } else {
          span.style.transform = '';
          span.style.textShadow = '';
        }
      });

      rafId = null;
    };

    const handleMouseLeave = () => {
      letters.forEach((span) => {
        span.style.transform = '';
        span.style.textShadow = '';
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const chars = children.split('');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((char, index) => {
        const isAccent = accentIndices.includes(index);
        return (
          <span
            key={index}
            className={`prox-char inline-block will-change-transform transition-transform duration-150 ${
              isAccent ? accentClassName : ''
            }`}
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};
