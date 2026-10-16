import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { EASE } from './Reveal';
import { useDialog } from '../hooks/useDialog';
import { cn, isPdf, isSet } from '../lib/utils';
import type { Certificate } from '../types';

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

interface CertificateViewerProps {
  items: Certificate[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const toolButton =
  'inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm text-fg transition-colors hover:border-accent/60 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-transparent';

export function CertificateViewer({ items, index, onClose, onNavigate }: CertificateViewerProps) {
  const cert = items[index];
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [zoomIndex, setZoomIndex] = useState(ZOOM_STEPS.indexOf(1));
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });
  const [failed, setFailed] = useState(false);

  useDialog(panelRef, onClose, closeRef);

  const pdf = isPdf(cert.file);
  const zoom = ZOOM_STEPS[zoomIndex];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  // Reset the view whenever another certificate is shown.
  useEffect(() => {
    setZoomIndex(ZOOM_STEPS.indexOf(1));
    setNatural(null);
    setFailed(false);
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, [cert.id]);

  // Track the available space so "100%" always means "fits the screen".
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const zoomIn = useCallback(() => setZoomIndex((i) => Math.min(i + 1, ZOOM_STEPS.length - 1)), []);
  const zoomOut = useCallback(() => setZoomIndex((i) => Math.max(i - 1, 0)), []);
  const reset = useCallback(() => setZoomIndex(ZOOM_STEPS.indexOf(1)), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === 'ArrowLeft' && hasPrev) onNavigate(index - 1);
      else if (event.key === 'ArrowRight' && hasNext) onNavigate(index + 1);
      else if (!pdf && (event.key === '+' || event.key === '=')) zoomIn();
      else if (!pdf && (event.key === '-' || event.key === '_')) zoomOut();
      else if (!pdf && event.key === '0') reset();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [hasPrev, hasNext, index, onNavigate, pdf, zoomIn, zoomOut, reset]);

  // Size of the image at 100%: as large as possible while still fitting inside the stage.
  const fit = natural && stage.w > 0 && stage.h > 0 ? Math.min((stage.w - 32) / natural.w, (stage.h - 32) / natural.h, 1.5) : null;
  const imageWidth = natural && fit ? Math.round(natural.w * fit * zoom) : undefined;

  const titleId = `cert-${cert.id}-title`;
  const downloadable = cert.downloadable !== false;
  const meta = [cert.issuer, cert.date].filter(isSet).join(' · ');

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
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
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden border-line-strong bg-surface outline-none sm:h-[92svh] sm:rounded-3xl sm:border"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {cert.category} · {index + 1} of {items.length}
            </p>
            <h3 id={titleId} className="mt-1 truncate font-serif text-2xl leading-tight text-fg sm:text-3xl">
              {cert.title}
            </h3>
            {(meta || cert.credentialId) && (
              <p className="mt-1 text-sm text-muted">
                {meta}
                {cert.credentialId && (
                  <>
                    {meta && ' · '}
                    <span className="font-mono text-xs">Credential ID: {cert.credentialId}</span>
                  </>
                )}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate viewer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3 sm:px-7">
          {!pdf ? (
            <div className="flex items-center gap-1.5" role="group" aria-label="Zoom">
              <button type="button" className={toolButton} onClick={zoomOut} disabled={zoomIndex === 0} aria-label="Zoom out">
                <ZoomOut className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-14 text-center font-mono text-xs text-muted" aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                className={toolButton}
                onClick={zoomIn}
                disabled={zoomIndex === ZOOM_STEPS.length - 1}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" className={toolButton} onClick={reset} aria-label="Reset zoom to fit">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-faint">PDF: use the viewer's own controls to zoom.</p>
          )}

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {isSet(cert.verifyUrl) && (
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className={cn(toolButton, 'border-accent/50 text-fg')}>
                <BadgeCheck className="h-4 w-4 text-accent-2" aria-hidden="true" />
                Verify Credential
              </a>
            )}
            <a href={cert.file} target="_blank" rel="noopener noreferrer" className={toolButton}>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {pdf ? 'View PDF' : 'Open Original'}
            </a>
            {downloadable && (
              <a href={cert.file} download className={toolButton}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </a>
            )}
          </div>
        </div>

        {/* Stage */}
        <div ref={stageRef} className="thin-scroll relative flex min-h-0 flex-1 overflow-auto bg-bg/60 p-4">
          {failed ? (
            <div className="m-auto max-w-sm text-center">
              <FileText className="mx-auto mb-4 h-10 w-10 text-faint" aria-hidden="true" />
              <p className="text-fg">This file couldn't be displayed.</p>
              <p className="mt-2 text-sm text-muted">It may be missing or in a format your browser can't show. Try opening the original.</p>
              <a href={cert.file} target="_blank" rel="noopener noreferrer" className={cn(toolButton, 'mt-5')}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Open Original
              </a>
            </div>
          ) : pdf ? (
            <object data={`${cert.file}#view=FitH`} type="application/pdf" aria-label={`${cert.title} (PDF)`} className="h-full min-h-[60svh] w-full rounded-lg bg-white">
              <div className="m-auto flex max-w-sm flex-col items-center p-6 text-center text-bg">
                <FileText className="mb-3 h-10 w-10" aria-hidden="true" />
                <p>Your browser can't show this PDF inline.</p>
                <a href={cert.file} target="_blank" rel="noopener noreferrer" className="mt-3 underline">
                  Open the PDF in a new tab
                </a>
              </div>
            </object>
          ) : (
            <img
              key={cert.id}
              src={cert.file}
              alt={cert.alt ?? `${cert.title} certificate${cert.issuer ? `, issued by ${cert.issuer}` : ''}`}
              draggable={false}
              onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
              onError={() => setFailed(true)}
              style={imageWidth ? { width: imageWidth } : undefined}
              className={cn(
                'm-auto h-auto max-w-none shrink-0 rounded-md bg-white shadow-2xl transition-[width] duration-200 ease-out',
                !imageWidth && 'max-h-full max-w-full',
              )}
            />
          )}
        </div>

        {/* Prev / next */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate(index - 1)}
              disabled={!hasPrev}
              aria-label="Previous certificate"
              className={cn(toolButton, 'absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 bg-bg/80 backdrop-blur')}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
              disabled={!hasNext}
              aria-label="Next certificate"
              className={cn(toolButton, 'absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 bg-bg/80 backdrop-blur')}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
