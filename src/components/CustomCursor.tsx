import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'hover' | 'label' | 'drag' | 'play' | 'text' | 'difference';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // DOM node references for 0-latency direct transform manipulation
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const ringScale = useRef(1);
  const targetScale = useRef(1);
  const rafId = useRef<number | null>(null);
  const rippleCounter = useRef(0);

  useEffect(() => {
    const mediaFine = window.matchMedia('(pointer: fine)');
    const mediaHover = window.matchMedia('(hover: hover)');
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const isPointerFine = mediaFine.matches && mediaHover.matches;
    setIsEnabled(isPointerFine);
    setIsReducedMotion(mediaReduced.matches);

    if (!isPointerFine) return;

    document.documentElement.classList.add('custom-cursor-active');

    // 1. Single global pointer listener
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant 0-latency transform for central dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Contextual element detection
      const target = e.target as HTMLElement | null;
      if (target) {
        // Native cursor preservation for text inputs
        const isInput = Boolean(
          target.closest('input:not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"]')
        );
        setIsTextInput(isInput);

        // Labeled elements: data-cursor-label
        const labeledElem = target.closest('[data-cursor-label]') as HTMLElement | null;
        const dragElem = target.closest('[data-cursor-drag], [draggable="true"]') as HTMLElement | null;
        const playElem = target.closest('video, [data-cursor-play]') as HTMLElement | null;
        const heroText = target.closest('h1, .hero-headline') as HTMLElement | null;
        const bodyText = target.closest('p, article, .text-body') as HTMLElement | null;
        const clickable = target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], label, .interactive-card'
        );

        if (labeledElem) {
          setCursorMode('label');
          setCursorLabel(labeledElem.getAttribute('data-cursor-label'));
          targetScale.current = 1.0;
        } else if (dragElem) {
          setCursorMode('drag');
          setCursorLabel('DRAG');
          targetScale.current = 1.2;
        } else if (playElem) {
          setCursorMode('play');
          setCursorLabel('PLAY');
          targetScale.current = 1.3;
        } else if (heroText) {
          setCursorMode('difference');
          setCursorLabel(null);
          targetScale.current = 2.2;
        } else if (clickable) {
          setCursorMode('hover');
          setCursorLabel(null);
          targetScale.current = 1.35;
        } else if (bodyText) {
          setCursorMode('text');
          setCursorLabel(null);
          targetScale.current = 0.6;
        } else {
          setCursorMode('default');
          setCursorLabel(null);
          targetScale.current = 1.0;
        }
      }
    };

    // 2. Click feedback: short electric-lime pulse/ripple
    const handlePointerDown = (e: PointerEvent) => {
      if (mediaReduced.matches) return;
      const id = ++rippleCounter.current;
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 3. Smooth spring-lerp animation loop for the trailing ring
    const render = () => {
      if (!mediaReduced.matches) {
        const ease = 0.22;
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;
        ringScale.current += (targetScale.current - ringScale.current) * 0.2;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${ringScale.current.toFixed(3)})`;
        }
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[999999] overflow-hidden transition-opacity duration-200 ${
        isVisible && !isTextInput ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Click ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-[#C6FF00] bg-[#C6FF00]/20 pointer-events-none animate-ping"
          style={{
            transform: `translate3d(${ripple.x}px, ${ripple.y}px, 0)`,
          }}
        />
      ))}

      {/* Central precise instant lime dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-none bg-[#C6FF00] pointer-events-none shadow-[0_0_8px_#C6FF00]"
        style={{ willChange: 'transform' }}
      />

      {/* Trailing smoothed ring / contextual pill (disabled under reduced motion) */}
      {!isReducedMotion && (
        <div
          ref={ringRef}
          className={`fixed top-0 left-0 pointer-events-none transition-colors duration-150 ${
            cursorMode === 'difference' ? 'mix-blend-difference' : ''
          }`}
          style={{ willChange: 'transform' }}
        >
          {cursorLabel ? (
            // Contextual Label Pill (e.g., "EXPLORE ↗", "DRAG", "PLAY")
            <div className="relative -top-4 -left-1/2 translate-x-3 -translate-y-7 whitespace-nowrap px-2 py-0.5 bg-[#C6FF00] text-[#080A0D] font-mono text-[9px] font-bold tracking-widest uppercase border border-[#080A0D] shadow-[0_0_15px_rgba(198,255,0,0.4)] animate-fade-in flex items-center gap-1">
              <span>{cursorLabel}</span>
            </div>
          ) : cursorMode === 'difference' ? (
            // Inverting ring over large hero typography
            <div className="-ml-5 -mt-5 w-10 h-10 rounded-full bg-white/90" />
          ) : (
            // Standard or hover ring
            <div
              className={`-ml-4 -mt-4 rounded-full border pointer-events-none transition-all duration-200 flex items-center justify-center ${
                cursorMode === 'hover'
                  ? 'w-8 h-8 border-[#C6FF00] bg-[#C6FF00]/15 shadow-[0_0_20px_rgba(198,255,0,0.3)]'
                  : cursorMode === 'text'
                  ? 'w-4 h-4 -ml-2 -mt-2 border-[#C6FF00]/50 bg-transparent'
                  : 'w-8 h-8 border-white/30 bg-transparent'
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};
