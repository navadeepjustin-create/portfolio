import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, X } from 'lucide-react';
import { EASE } from './Reveal';
import { Button } from './Button';
import { GithubIcon } from './BrandIcons';
import { ImageWithFallback } from './ImageWithFallback';
import { ProjectCover } from './ProjectCover';
import { useDialog } from '../hooks/useDialog';
import { cn, isSet } from '../lib/utils';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{title}</h4>
      {children}
    </section>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  useDialog(panelRef, onClose, closeRef);

  const images = project.images ?? [];
  const titleId = `project-${project.id}-title`;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="thin-scroll relative max-h-[94svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line-strong bg-surface shadow-2xl outline-none sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/80 text-fg backdrop-blur transition-colors hover:border-accent"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="group/cover">
          {images.length > 0 ? (
            <div className="aspect-[16/9] w-full overflow-hidden bg-surface-2">
              <ImageWithFallback
                key={images[activeImage]}
                src={images[activeImage]}
                alt={project.imageAlt ?? `${project.name} screenshot ${activeImage + 1}`}
                className="h-full w-full object-contain"
                eager
              />
            </div>
          ) : (
            <ProjectCover project={project} className="aspect-[16/7] w-full" hoverSwap={false} />
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pt-4 sm:px-10" role="group" aria-label="Project screenshots">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Show screenshot ${i + 1}`}
                aria-pressed={i === activeImage}
                className={cn(
                  'h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition',
                  i === activeImage ? 'border-accent' : 'border-line opacity-70 hover:opacity-100',
                )}
              >
                <ImageWithFallback src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-8 px-6 pb-8 pt-6 sm:px-10 sm:pb-10">
          <header>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {project.category}
              {project.status ? ` · ${project.status}` : ''}
            </p>
            <h3 id={titleId} className="font-serif text-4xl leading-tight text-fg sm:text-5xl">
              {project.name}
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{project.summary}</p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {project.problem && (
              <Block title="The problem">
                <p className="leading-relaxed text-fg/90">{project.problem}</p>
              </Block>
            )}
            {project.contribution && (
              <Block title="My contribution">
                <p className="leading-relaxed text-fg/90">{project.contribution}</p>
              </Block>
            )}
          </div>

          {project.features && project.features.length > 0 && (
            <Block title="Key features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-fg/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.stack.length > 0 && (
            <Block title="Built with">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-fg">
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <div className="flex flex-wrap gap-3 border-t border-line pt-6">
            {isSet(project.github) && (
              <Button href={project.github} variant="secondary" icon={<GithubIcon className="h-4 w-4" />}>
                Source code
              </Button>
            )}
            {isSet(project.live) && (
              <Button href={project.live} variant="primary" arrow>
                Live preview
              </Button>
            )}
            {project.links?.filter((l) => isSet(l.href)).map((link) => (
              <Button key={link.href} href={link.href} variant="secondary" icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}>
                {link.label}
              </Button>
            ))}
            {!isSet(project.github) && !isSet(project.live) && (
              <p className="text-sm text-faint">Links for this project haven't been added yet.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
