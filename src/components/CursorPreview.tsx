import React, { useEffect, useRef, useState } from 'react';

interface PreviewState {
  visible: boolean;
  title: string;
  category: string;
  number: string;
  image?: string;
}

export const CursorPreview: React.FC = () => {
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || isReduced) return;

    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX + 24;
      mousePos.current.y = e.clientY + 24;

      const target = e.target as HTMLElement | null;
      if (target) {
        const previewEl = target.closest('[data-cursor-preview]') as HTMLElement | null;
        if (previewEl) {
          const title = previewEl.getAttribute('data-cursor-preview-title') || '';
          const category = previewEl.getAttribute('data-cursor-preview-category') || 'PROJECT';
          const number = previewEl.getAttribute('data-cursor-preview-number') || '01';
          const image = previewEl.getAttribute('data-cursor-preview-image') || undefined;

          setPreview({
            visible: true,
            title,
            category,
            number,
            image,
          });
        } else {
          setPreview((prev) => (prev?.visible ? { ...prev, visible: false } : null));
        }
      }
    };

    const render = () => {
      pos.current.x += (mousePos.current.x - pos.current.x) * 0.15;
      pos.current.y += (mousePos.current.y - pos.current.y) * 0.15;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${pos.current.x.toFixed(1)}px, ${pos.current.y.toFixed(1)}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!preview || !preview.visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-[99990] hidden sm:block will-change-transform"
      aria-hidden="true"
    >
      <div className="w-56 p-2 bg-[#11151A]/95 backdrop-blur-md border border-[#C6FF00]/50 shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_20px_rgba(198,255,0,0.15)] animate-fade-in relative">
        {/* Precision corner marks */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#C6FF00]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#C6FF00]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#C6FF00]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#C6FF00]" />

        {/* Top telemetry bar */}
        <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-white/10 font-mono text-[9px] text-[#929BA6]">
          <span className="text-[#C6FF00] font-bold">{preview.number} // PREVIEW</span>
          <span className="uppercase">{preview.category}</span>
        </div>

        {/* Preview title */}
        <div className="font-display font-bold text-xs text-[#F4F6F8] leading-tight mb-1">
          {preview.title}
        </div>

        {preview.image && (
          <div className="w-full h-24 overflow-hidden border border-white/10 mt-1 bg-[#080A0D]">
            <img src={preview.image} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="mt-1 flex items-center justify-between font-mono text-[8px] text-[#929BA6] pt-1 border-t border-white/5">
          <span>INTERACTIVE PROTOTYPE</span>
          <span className="text-[#C6FF00]">CLICK TO EXPLORE ↗</span>
        </div>
      </div>
    </div>
  );
};
