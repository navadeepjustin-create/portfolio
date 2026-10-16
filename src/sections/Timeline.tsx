import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Rocket,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Section, SectionHeading } from '../components/Section';
import { sectionIndex } from '../data/nav';
import { Reveal } from '../components/Reveal';
import { EditHint } from '../components/Placeholder';
import { timeline } from '../data/timeline';
import { site } from '../data/site';
import type { TimelineKind } from '../types';

const KINDS: Record<TimelineKind, { label: string; icon: LucideIcon }> = {
  education: { label: 'Education', icon: GraduationCap },
  hackathon: { label: 'Hackathon', icon: Rocket },
  workshop: { label: 'Workshop', icon: Wrench },
  event: { label: 'Technical event', icon: Users },
  internship: { label: 'Internship', icon: Briefcase },
  learning: { label: 'Learning milestone', icon: BookOpen },
  personal: { label: 'Personal milestone', icon: Lightbulb },
};

export function Timeline() {
  const trackRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 75%', 'end 60%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="journey">
      <SectionHeading
        id="journey"
        index={sectionIndex('journey')}
        eyebrow="Journey"
        title={
          <>
            The path so far, <span className="italic text-muted">in the order it happened.</span>
          </>
        }
        description="Education and learning milestones. Hackathons, workshops, events and internships are added here as they happen."
      />

      <div className="relative">
        <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-line-strong sm:left-[23px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-[23px]"
        />

        <ol ref={trackRef} className="space-y-10">
          {timeline.map((entry, i) => {
            const meta = KINDS[entry.kind];
            const Icon = meta.icon;
            return (
              <li key={entry.id} className="relative pl-14 sm:pl-[4.5rem]">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg text-accent sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
                <Reveal delay={Math.min(i, 3) * 0.05}>
                  <div className="rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
                    <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em]">
                      <span className="text-accent">{meta.label}</span>
                      {entry.date && <span className="text-faint">{entry.date}</span>}
                    </div>
                    <h3 className="text-lg font-medium leading-snug text-fg sm:text-xl">{entry.title}</h3>
                    {entry.organisation && <p className="mt-1 text-muted">{entry.organisation}</p>}
                    {entry.description && <p className="mt-3 leading-relaxed text-muted">{entry.description}</p>}
                  </div>
                </Reveal>
              </li>
            );
          })}

          {site.showPlaceholders && (
            <li className="relative pl-14 sm:pl-[4.5rem]">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-line-strong bg-bg text-faint sm:h-12 sm:w-12"
              >
                +
              </span>
              <Reveal>
                <EditHint file="src/data/timeline.ts">
                  Add hackathons, workshops, technical events, internships and learning milestones here, oldest to
                  newest. Only add things that really happened.
                </EditHint>
              </Reveal>
            </li>
          )}
        </ol>
      </div>
    </Section>
  );
}
