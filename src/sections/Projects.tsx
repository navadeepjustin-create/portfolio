import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, FolderOpen } from 'lucide-react';
import { Section, SectionHeading } from '../components/Section';
import { sectionIndex } from '../data/nav';
import { Reveal, EASE } from '../components/Reveal';
import { Spotlight } from '../components/Spotlight';
import { EditHint, PlaceholderBadge } from '../components/Placeholder';
import { ProjectCover } from '../components/ProjectCover';
import { ProjectModal } from '../components/ProjectModal';
import { GithubIcon } from '../components/BrandIcons';
import { projects } from '../data/projects';
import { site } from '../data/site';
import { cn, isSet } from '../lib/utils';
import type { Project } from '../types';

function TechTags({ stack, limit = 4 }: { stack: string[]; limit?: number }) {
  const shown = stack.slice(0, limit);
  const extra = stack.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
      {shown.map((t) => (
        <li key={t} className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted">
          {t}
        </li>
      ))}
      {extra > 0 && <li className="px-1 py-1 font-mono text-[11px] text-faint">+{extra}</li>}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const linkClass =
    'inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-accent/60 hover:text-fg';
  return (
    <div className="flex flex-wrap items-center gap-2">
      {isSet(project.github) && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GithubIcon className="h-4 w-4" />
          Code<span className="sr-only"> for {project.name} on GitHub</span>
        </a>
      )}
      {isSet(project.live) && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Live<span className="sr-only"> preview of {project.name}</span>
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Spotlight className="overflow-hidden p-0">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open details for ${project.name}`}
          className="group/cover block min-h-64 text-left"
        >
          <ProjectCover project={project} className="h-full min-h-64 w-full lg:aspect-auto" eager />
        </button>
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Featured · {project.category}
              {project.status ? ` · ${project.status}` : ''}
            </p>
            <h3 className="font-serif text-3xl leading-tight text-fg sm:text-4xl">{project.name}</h3>
            <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
            <div className="mt-5">
              <TechTags stack={project.stack} limit={6} />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Read the case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Spotlight>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Spotlight className="flex h-full flex-col overflow-hidden p-0 transition-colors duration-300 hover:border-line-strong">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.name}`}
        className="group/cover block text-left"
      >
        <ProjectCover project={project} className="aspect-[16/10] w-full" />
      </button>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {project.category}
            {project.status ? ` · ${project.status}` : ''}
          </p>
          <h3 className="font-serif text-2xl leading-tight text-fg">
            <button type="button" onClick={onOpen} className="link-underline text-left">
              {project.name}
            </button>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.summary}</p>
        </div>
        <TechTags stack={project.stack} />
        <div className="mt-auto pt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Spotlight>
  );
}

/** Shown when no project has been added yet. A ghost of the real layout, clearly marked. */
function EmptyProjects() {
  return (
    <Reveal>
      <div className="rounded-3xl border border-dashed border-line-strong bg-white/[0.015] p-6 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div
            className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-line-strong bg-[radial-gradient(circle_at_30%_20%,rgba(124,134,255,0.12),transparent_60%)]"
            aria-hidden="true"
          >
            <FolderOpen className="h-10 w-10 text-faint" />
          </div>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <PlaceholderBadge>{site.showPlaceholders ? 'Placeholder' : 'Coming soon'}</PlaceholderBadge>
            </div>
            <h3 className="font-serif text-3xl leading-tight text-fg sm:text-4xl">Projects are on the way.</h3>
            <p className="mt-4 leading-relaxed text-muted">
              This space is reserved for hands-on work: what each project is, the problem it tackles, what I built, the
              stack behind it, and links to the code and a live demo.
            </p>
            {site.showPlaceholders && (
              <EditHint file="src/data/projects.ts" className="mt-6">
                Add a project object to the <code className="font-mono text-fg">projects</code> array (a ready-to-copy
                template is in that file). The featured layout, cards, filters and detail view appear automatically.
              </EditHint>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => p !== featured);
  const selected = projects.find((p) => p.id === openId) ?? null;

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index={sectionIndex('projects')}
        eyebrow="Projects"
        title={
          <>
            Things I've built, <span className="italic text-muted">and what I learned building them.</span>
          </>
        }
        description="Practical projects with the problem, my part in them, and the stack behind each one."
      />

      {projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <>
          {categories.length > 2 && (
            <Reveal className="mb-8">
              <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={filter === category}
                    onClick={() => setFilter(category)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm transition-colors',
                      filter === category
                        ? 'border-accent bg-accent/15 text-fg'
                        : 'border-line text-muted hover:border-line-strong hover:text-fg',
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          <div className="space-y-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {featured && (
                <motion.div
                  key={featured.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <FeaturedProject project={featured} onOpen={() => setOpenId(featured.id)} />
                </motion.div>
              )}
            </AnimatePresence>

            {rest.length > 0 && (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {rest.map((project) => (
                    <motion.li
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <ProjectCard project={project} onOpen={() => setOpenId(project.id)} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </>
      )}

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </Section>
  );
}
