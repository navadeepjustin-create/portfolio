import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  // References for high-performance direct transform manipulation
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check for fine pointer (desktop mouse) and reduced-motion preference
    const mediaFine = window.matchMedia('(pointer: fine)');
    const mediaHover = window.matchMedia('(hover: hover)');
    const mediaReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const shouldEnable = mediaFine.matches && mediaHover.matches && !mediaReducedMotion.matches;
    setIsEnabled(shouldEnable);

    if (!shouldEnable) return;

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Direct transform for the central dot to ensure 0-latency tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Contextual detection of hovered interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect text inputs
        const isInput = Boolean(
          target.closest('input, textarea, select, [contenteditable="true"]')
        );
        setIsTextInput(isInput);

        // Detect contextual label
        const labeledElem = target.closest('[data-cursor-label]') as HTMLElement | null;
        if (labeledElem) {
          setCursorLabel(labeledElem.getAttribute('data-cursor-label'));
        } else {
          setCursorLabel(null);
        }

        // Detect clickable hover
        const isClickable = Boolean(
          target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], label, .interactive-card')
        );
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics loop for the trailing ring using lerp
    const render = () => {
      // 0.2 lerp factor gives an ultra-smooth, responsive feel with zero sluggishness
      const ease = 0.2;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible && !isTextInput ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Central precise cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#C6FF00] pointer-events-none transition-transform duration-75 shadow-[0_0_8px_#C6FF00]"
        style={{ willChange: 'transform' }}
      />

      {/* Trailing smoothed ring / contextual pill */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        {cursorLabel ? (
          // Contextual Label Pill (e.g., "VIEW PROJECT ↗")
          <div className="relative -top-4 -left-1/2 translate-x-3 -translate-y-6 whitespace-nowrap px-2.5 py-1 bg-[#C6FF00] text-[#080A0D] font-mono text-[10px] font-bold tracking-widest uppercase border border-[#080A0D] shadow-2xl animate-fade-in flex items-center gap-1">
            <span>{cursorLabel}</span>
          </div>
        ) : (
          // Standard Trailing Ring with Electric-Lime highlight on hover
          <div
            className={`-ml-4 -mt-4 rounded-full border transition-all duration-200 pointer-events-none flex items-center justify-center ${
              isHovered
                ? 'w-10 h-10 -ml-5 -mt-5 border-[#C6FF00] bg-[#C6FF00]/15 scale-110 shadow-[0_0_20px_rgba(198,255,0,0.35)]'
                : 'w-8 h-8 border-white/30 bg-transparent'
            }`}
          />
        )}
      </div>
    </div>
  );
};
