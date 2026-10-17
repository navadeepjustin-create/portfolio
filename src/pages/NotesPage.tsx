import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Tag, Clock, Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notesData, NotePost } from '../data/notes';
import { CustomCursor } from '../components/CustomCursor';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Spotlight } from '../components/Spotlight';
import { CommandPalette } from '../components/CommandPalette';

export const NotesPage: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(notesData[0]?.slug || null);

  // Extract unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    notesData.forEach((note) => note.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    if (selectedTag === 'All') return notesData;
    return notesData.filter((note) => note.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F4F6F8] selection:bg-[#C6FF00] selection:text-[#080A0D] bg-grid-cyber">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
        {/* Navigation & Telemetry Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 font-mono text-xs text-[#929BA6]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#C6FF00] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>HOME</span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#C6FF00]">07 // ENGINEERING NOTES</span>
          </div>
          <span className="font-mono text-[11px] text-[#929BA6] hidden sm:inline-block">
            AUTHENTIC ARCHITECTURAL LOGS
          </span>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11151A] text-[#C6FF00] border border-[#C6FF00]/30 font-mono text-xs uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>DISPATCHES & FIELD NOTES</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F4F6F8] leading-[0.95]">
            ENGINEERING LOGBOOK
          </h1>

          <p className="font-sans text-lg sm:text-xl text-[#929BA6] max-w-2xl font-light leading-relaxed">
            Technical reflections, architectural choices, and systems lessons learned while designing campus platforms and client-side machine learning interfaces.
          </p>
        </div>

        {/* Tag Filter Strip */}
        <div className="flex flex-wrap items-center gap-2 pt-2 pb-4 border-b border-white/10">
          <span className="font-mono text-xs text-[#929BA6] uppercase flex items-center gap-1.5 mr-2">
            <Tag className="w-3.5 h-3.5 text-[#C6FF00]" />
            <span>TAGS:</span>
          </span>
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 font-mono text-xs transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#C6FF00] text-[#080A0D] border-[#C6FF00] font-bold shadow-[0_0_12px_rgba(198,255,0,0.25)]'
                    : 'bg-[#11151A] text-[#929BA6] border-white/10 hover:border-white/25 hover:text-[#F4F6F8]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Articles List */}
        <div className="space-y-8">
          {filteredNotes.map((post: NotePost) => {
            const isExpanded = expandedSlug === post.slug;
            return (
              <Spotlight
                key={post.slug}
                className="p-6 sm:p-8 space-y-6 transition-all duration-300"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#929BA6] pb-3 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[#F4F6F8]">
                      <Calendar className="w-3.5 h-3.5 text-[#C6FF00]" />
                      <span>{post.date}</span>
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#929BA6]" />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#171D24] text-[#C6FF00] border border-[#C6FF00]/20 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F4F6F8]">
                    {post.title}
                  </h2>
                  <p className="font-sans text-[#929BA6] leading-relaxed text-sm sm:text-base">
                    {post.summary}
                  </p>
                </div>

                {/* Expandable Read / Collapse Section */}
                {isExpanded ? (
                  <div className="space-y-4 pt-4 border-t border-white/10 font-sans text-sm sm:text-base text-[#D0D7DE] leading-relaxed">
                    {post.content.map((paragraph, idx) => (
                      <p key={idx} className="border-l-2 border-[#C6FF00]/60 pl-4 py-1">
                        {paragraph}
                      </p>
                    ))}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setExpandedSlug(null)}
                        className="font-mono text-xs uppercase text-[#C6FF00] hover:underline"
                      >
                        ↑ Collapse entry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setExpandedSlug(post.slug)}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase px-4 py-2 bg-[#171D24] hover:bg-[#1f2630] text-[#C6FF00] border border-[#C6FF00]/30 transition-colors"
                    >
                      <span>Read full entry</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </Spotlight>
            );
          })}
        </div>

        {/* Prompt to discuss on GitHub/Email */}
        <div className="p-6 bg-[#11151A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#C6FF00] font-bold uppercase block">HAVE THOUGHTS ON THESE ARCHITECTURES?</span>
            <p className="text-[#929BA6] font-sans">
              Always open to discussing systems design, campus product roadmaps, or distributed workflows.
            </p>
          </div>
          <Link
            to="/#contact"
            className="px-4 py-2.5 bg-[#C6FF00] text-[#080A0D] font-bold uppercase tracking-wider hover:bg-[#b5e800] transition-colors shrink-0"
          >
            TRANSMIT THOUGHTS ↗
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
