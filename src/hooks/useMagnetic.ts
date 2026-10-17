import { useEffect, useRef } from 'react';

interface MagneticOptions {
  radius?: number;
  strength?: number;
  disabled?: boolean;
}

/**
 * useMagnetic Hook
 * Gently pulls an interactive element towards the cursor within a radius.
 * Automatically disabled on touch screens and prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  radius = 60,
  strength = 0.3,
  disabled = false,
}: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const isFine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || isReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isHovering = false;

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (el) {
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      // Stop loop when close to target and not hovering
      if (!isHovering && Math.abs(currentX) < 0.05 && Math.abs(currentY) < 0.05) {
        if (el) el.style.transform = '';
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius) {
        isHovering = true;
        targetX = (e.clientX - centerX) * strength;
        targetY = (e.clientY - centerY) * strength;

        if (!rafId) {
          rafId = requestAnimationFrame(updatePosition);
        }
      } else if (isHovering) {
        isHovering = false;
        targetX = 0;
        targetY = 0;
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (el) el.style.transform = '';
    };
  }, [radius, strength, disabled]);

  return ref;
}
