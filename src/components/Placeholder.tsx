import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

/** Small label that clearly marks content as not-yet-real. */
export function PlaceholderBadge({ className, children = 'Placeholder' }: { className?: string; children?: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-dashed border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A dashed hint box that points to the file where real content goes. */
export function EditHint({ file, children, className }: { file: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-dashed border-line-strong bg-white/[0.015] p-6 text-sm leading-relaxed text-muted',
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <PlaceholderBadge />
        <code className="font-mono text-xs text-faint">{file}</code>
      </div>
      {children}
    </div>
  );
}
