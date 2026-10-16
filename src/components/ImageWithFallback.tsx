import { useState, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  /** Rendered when there is no image or it fails to load. */
  fallback?: ReactNode;
  eager?: boolean;
  onLoadSize?: (size: { width: number; height: number }) => void;
}

/** Lazy image that degrades gracefully when the file is missing or broken. */
export function ImageWithFallback({ src, alt, className, fallback, eager, onLoadSize }: ImageWithFallbackProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = !src || failedSrc === src;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={src ? `${alt} (image could not be loaded)` : alt}
        className={cn('flex h-full w-full flex-col items-center justify-center gap-2 text-faint', className)}
      >
        {fallback ?? (
          <>
            <ImageOff aria-hidden="true" className="h-6 w-6" />
            <span className="text-xs">Preview unavailable</span>
          </>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      onError={() => setFailedSrc(src)}
      onLoad={(e) => {
        const img = e.currentTarget;
        onLoadSize?.({ width: img.naturalWidth, height: img.naturalHeight });
      }}
    />
  );
}
