import type { HTMLAttributes, PointerEvent, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** A card shell with a soft highlight that follows the pointer. Pure CSS variables, no re-renders. */
export function Spotlight({ children, className, onPointerMove, ...rest }: SpotlightProps) {
  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  };
  return (
    <div
      className={cn('spotlight rounded-2xl border border-line bg-surface/70', className)}
      onPointerMove={handleMove}
      {...rest}
    >
      {children}
    </div>
  );
}
