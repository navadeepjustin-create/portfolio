import React, { useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  caption?: string;
  alt: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  caption,
  alt,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image lightbox preview'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Container - Stop propagation so clicking the image doesn't close */}
      <div
        className="relative max-w-5xl max-h-[90vh] bg-[#11151A] border border-white/20 p-2 sm:p-4 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
          <span className="flex items-center gap-2 text-[#C6FF00]">
            <ZoomIn className="w-4 h-4" />
            <span>LIGHTBOX INSPECTION // {alt.toUpperCase()}</span>
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1.5 bg-[#171D24] text-[#F4F6F8] hover:text-[#080A0D] hover:bg-[#C6FF00] border border-white/15 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-[#080A0D]">
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-full max-h-[70vh] object-contain border border-white/5"
          />
        </div>

        {/* Caption */}
        {caption && (
          <div className="pt-3 mt-3 border-t border-white/10 font-mono text-xs text-[#929BA6]">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
