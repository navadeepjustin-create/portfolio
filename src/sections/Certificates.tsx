import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, Maximize2, Search } from 'lucide-react';
import { Section, SectionHeading } from '../components/Section';
import { sectionIndex } from '../data/nav';
import { Reveal, EASE } from '../components/Reveal';
import { Spotlight } from '../components/Spotlight';
import { EditHint, PlaceholderBadge } from '../components/Placeholder';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CertificateViewer } from '../components/CertificateViewer';
import { certificates } from '../data/certificates';
import { site } from '../data/site';
import { cn, isPdf, isSet } from '../lib/utils';
import type { Certificate } from '../types';

/** Search only appears once the archive is big enough to need it. */
const SEARCH_THRESHOLD = 8;
/** Category filters appear when there is more than one category and enough items. */
const FILTER_THRESHOLD = 4;

function PdfTile() {
  return (
    <div className="flex flex-col items-center gap-2 text-faint">
      <FileText className="h-10 w-10" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-widest">PDF document</span>
    </div>
  );
}

function CertificateCard({ cert, onOpen }: { cert: Certificate; onOpen: () => void }) {
  const previewSrc = cert.preview ?? (isPdf(cert.file) ? undefined : cert.file);
  const meta = [cert.issuer, cert.date].filter(isSet).join(' · ');

  return (
    <Spotlight className="h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <button type="button" onClick={onOpen} className="group block h-full w-full text-left" aria-label={`View certificate: ${cert.title}`}>
        <div className="relative flex aspect-[4/3] items-center justify-center bg-surface-2 p-4">
          <ImageWithFallback
            src={previewSrc}
            alt={cert.alt ?? `${cert.title} certificate`}
            fallback={<PdfTile />}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-bg/80 text-fg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <div className="border-t border-line p-5">
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{cert.category}</p>
          <h3 className="text-base font-medium leading-snug text-fg">{cert.title}</h3>
          {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
          {cert.credentialId && <p className="mt-2 font-mono text-xs text-faint">ID: {cert.credentialId}</p>}
        </div>
      </button>
    </Spotlight>
  );
}

function EmptyArchive() {
  return (
    <Reveal>
      <div className="rounded-3xl border border-dashed border-line-strong bg-white/[0.015] p-6 sm:p-10">
        <div className="grid gap-4 sm:grid-cols-3" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <div
              key={n}
              className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-line-strong bg-white/[0.02]"
            >
              <FileText className="h-8 w-8 text-faint" />
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-xl">
          <PlaceholderBadge>{site.showPlaceholders ? 'Placeholder' : 'Coming soon'}</PlaceholderBadge>
          <h3 className="mt-4 font-serif text-3xl leading-tight text-fg">The archive is empty for now.</h3>
          <p className="mt-3 leading-relaxed text-muted">
            Original certificates will appear here as a gallery. Each one opens in a full-size viewer with zoom, download
            and, when the issuer provides one, a verification link.
          </p>
          {site.showPlaceholders && (
            <EditHint file="src/data/certificates.ts" className="mt-6">
              Copy your certificate files (PNG, JPG, WebP or PDF) into <code className="font-mono text-fg">public/certificates</code>,
              then add one entry per file in that data file.
            </EditHint>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export function Certificates() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(certificates.map((c) => c.category)))], []);
  const showFilters = categories.length > 2 && certificates.length >= FILTER_THRESHOLD;
  const showSearch = certificates.length > SEARCH_THRESHOLD;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates.filter((c) => {
      if (category !== 'All' && c.category !== category) return false;
      if (!q) return true;
      return [c.title, c.issuer, c.category, c.credentialId, c.date].filter(isSet).some((v) => v.toLowerCase().includes(q));
    });
  }, [category, query]);

  const resetFilters = () => {
    setCategory('All');
    setQuery('');
  };

  return (
    <Section id="certificates">
      <SectionHeading
        id="certificates"
        index={sectionIndex('certificates')}
        eyebrow="Certificates"
        title={
          <>
            A digital archive, <span className="italic text-muted">kept in the original.</span>
          </>
        }
        description="Every document here is the original certificate, never a recreation. Open one to read it at full size."
      />

      {certificates.length === 0 ? (
        <EmptyArchive />
      ) : (
        <>
          {(showFilters || showSearch) && (
            <Reveal className="mb-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {showFilters ? (
                  <div role="group" aria-label="Filter certificates by category" className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={category === c}
                        onClick={() => setCategory(c)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm transition-colors',
                          category === c
                            ? 'border-accent bg-accent/15 text-fg'
                            : 'border-line text-muted hover:border-line-strong hover:text-fg',
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span />
                )}
                {showSearch && (
                  <label className="relative block w-full sm:w-72">
                    <span className="sr-only">Search certificates</span>
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden="true" />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search title, issuer, ID…"
                      className="h-11 w-full rounded-full border border-line bg-white/[0.03] pl-11 pr-4 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none"
                    />
                  </label>
                )}
              </div>
            </Reveal>
          )}

          <p className="mb-5 font-mono text-xs text-faint" aria-live="polite">
            {visible.length === certificates.length
              ? `${certificates.length} ${certificates.length === 1 ? 'document' : 'documents'}`
              : `Showing ${visible.length} of ${certificates.length}`}
          </p>

          {visible.length === 0 ? (
            <div className="rounded-2xl border border-line bg-surface/50 p-10 text-center">
              <p className="text-fg">No certificates match your search.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-full border border-line-strong px-5 py-2 text-sm text-fg transition-colors hover:border-accent"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((cert, i) => (
                  <motion.li
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 5) * 0.04 }}
                  >
                    <CertificateCard cert={cert} onOpen={() => setOpenIndex(i)} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </>
      )}

      <AnimatePresence>
        {openIndex !== null && visible[openIndex] && (
          <CertificateViewer
            key="certificate-viewer"
            items={visible}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
