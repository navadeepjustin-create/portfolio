import { cn } from '../lib/utils';
import { ImageWithFallback } from './ImageWithFallback';
import type { Project } from '../types';

interface ProjectCoverProps {
  project: Project;
  className?: string;
  /** Cross-fade to the second screenshot on hover when there is one. */
  hoverSwap?: boolean;
  eager?: boolean;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

/** Screenshot area for a project, with a tasteful tile when no image has been supplied. */
export function ProjectCover({ project, className, hoverSwap = true, eager }: ProjectCoverProps) {
  const [first, second] = project.images ?? [];
  const alt = project.imageAlt ?? `${project.name} preview`;

  const tile = (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(124,134,255,0.28),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(77,181,255,0.18),transparent_55%)]">
      <span className="font-serif text-6xl italic text-fg/80">{initials(project.name)}</span>
    </div>
  );

  return (
    <div className={cn('relative overflow-hidden bg-surface-2', className)}>
      {first ? (
        <>
          <ImageWithFallback
            src={first}
            alt={alt}
            eager={eager}
            fallback={tile}
            className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover/cover:scale-[1.04]"
          />
          {hoverSwap && second && (
            <ImageWithFallback
              src={second}
              alt=""
              fallback={<span />}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 group-hover/cover:opacity-100"
            />
          )}
        </>
      ) : (
        tile
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" aria-hidden="true" />
    </div>
  );
}
