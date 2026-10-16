import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Reveal, EASE } from './Reveal';
import { cn } from '../lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative scroll-mt-20 py-24 md:py-32', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}

export function SectionHeading({ id, index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <div className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          <span className="text-accent">{index}</span>
          <motion.span
            aria-hidden="true"
            className="h-px w-16 origin-left bg-gradient-to-r from-accent to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          id={`${id}-title`}
          className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
