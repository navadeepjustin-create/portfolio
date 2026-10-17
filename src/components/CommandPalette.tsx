import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  FolderGit2,
  FileCode2,
  UtensilsCrossed,
  User,
  Mail,
  Copy,
  Check,
  X,
  CornerDownLeft,
  Terminal,
  FileText,
  Download,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Projects' | 'Social & Direct';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Home // System Overview',
      subtitle: 'Return to portfolio homepage and 3D computational core',
      category: 'Navigation',
      icon: Home,
      action: () => {
        navigate('/');
        onClose();
      },
      shortcut: 'H',
    },
    {
      id: 'projects',
      title: 'Project Index // All Systems',
      subtitle: 'Browse all verified campus platforms and architecture prototypes',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        navigate('/projects');
        onClose();
      },
      shortcut: 'P',
    },
    {
      id: 'statio',
      title: 'Case Study: Statio-MLR',
      subtitle: 'College digital Xerox & stationery queue management system',
      category: 'Projects',
      icon: FileCode2,
      action: () => {
        navigate('/projects/statio-mlr');
        onClose();
      },
      shortcut: 'S',
    },
    {
      id: 'fastbite',
      title: 'Case Study: Fast Bite',
      subtitle: 'Digital campus canteen ordering with QR-based verification',
      category: 'Projects',
      icon: UtensilsCrossed,
      action: () => {
        navigate('/projects/fast-bite');
        onClose();
      },
      shortcut: 'F',
    },
    {
      id: 'about',
      title: 'About // Technical Profile',
      subtitle: 'AIML student profile, education at MLRIT, categorized skills matrix',
      category: 'Navigation',
      icon: User,
      action: () => {
        navigate('/about');
        onClose();
      },
      shortcut: 'A',
    },
    {
      id: 'resume',
      title: 'Resume // ATS Document',
      subtitle: 'View clean ATS-friendly print and digital resume spec',
      category: 'Navigation',
      icon: FileText,
      action: () => {
        navigate('/resume');
        onClose();
      },
      shortcut: 'R',
    },
    {
      id: 'resume-pdf',
      title: 'Download Resume (PDF)',
      subtitle: 'Direct export file /resume.pdf',
      category: 'Navigation',
      icon: Download,
      action: () => {
        window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'github',
      title: 'GitHub Profile',
      subtitle: 'Visit https://github.com/navadeepjustin-create',
      category: 'Social & Direct',
      icon: GithubIcon,
      action: () => {
        window.open('https://github.com/navadeepjustin-create', '_blank', 'noopener,noreferrer');
        onClose();
      },
      shortcut: 'G',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'linkedin.com/in/navadeep-justin-946366371',
      category: 'Social & Direct',
      icon: LinkedinIcon,
      action: () => {
        window.open('https://www.linkedin.com/in/navadeep-justin-946366371', '_blank', 'noopener,noreferrer');
        onClose();
      },
      shortcut: 'L',
    },
    {
      id: 'instagram',
      title: 'Instagram Profile',
      subtitle: '@navdeep_.07 (instagram.com/navdeep_.07)',
      category: 'Social & Direct',
      icon: InstagramIcon,
      action: () => {
        window.open('https://instagram.com/navdeep_.07', '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'email',
      title: 'Send Direct Email',
      subtitle: 'Open client email to navadeepjustin@gmail.com',
      category: 'Social & Direct',
      icon: Mail,
      action: () => {
        window.location.href = 'mailto:navadeepjustin@gmail.com';
        onClose();
      },
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      subtitle: 'Copy navadeepjustin@gmail.com to clipboard',
      category: 'Social & Direct',
      icon: copiedEmail ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText('navadeepjustin@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 1200);
      },
      shortcut: 'C',
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Manage focus & active element restoration
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (triggerElementRef.current) {
        triggerElementRef.current.focus();
      }
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md transition-all duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#080A0D] border border-white/15 shadow-2xl rounded-none overflow-hidden transition-all text-[#F4F6F8] font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#11151A]">
          <Terminal className="w-5 h-5 text-[#C6FF00] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or navigate system..."
            className="w-full bg-transparent border-none text-sm sm:text-base text-[#F4F6F8] placeholder-[#929BA6] focus:outline-none focus:ring-0 font-mono"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#929BA6] hover:text-[#F4F6F8] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#929BA6] border border-white/10 px-2 py-0.5">
            ESC TO EXIT
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#171D24] border-l-2 border-[#C6FF00] text-[#F4F6F8]'
                      : 'hover:bg-[#11151A] text-[#929BA6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-none border ${
                        isSelected
                          ? 'bg-[#080A0D] border-[#C6FF00]/40 text-[#C6FF00]'
                          : 'bg-[#11151A] border-white/10 text-[#929BA6]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-semibold ${
                            isSelected ? 'text-[#F4F6F8]' : 'text-[#F4F6F8]/80'
                          }`}
                        >
                          {cmd.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#929BA6] px-1.5 py-0.2 bg-white/5 border border-white/5">
                          {cmd.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#929BA6] mt-0.5">{cmd.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cmd.shortcut && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-[#929BA6]">
                        {cmd.shortcut}
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-4 h-4 text-[#C6FF00]" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-[#929BA6] font-mono text-xs space-y-1">
              <p>NO SYSTEM COMMAND FOUND FOR "{query}"</p>
              <p className="text-[11px] text-[#929BA6]/60">Try searching "Statio", "Projects", or "About"</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#080A0D] border-t border-white/10 font-mono text-[11px] text-[#929BA6]">
          <div className="flex items-center gap-3">
            <span>NAVIGATE: <strong className="text-[#F4F6F8]">↑ ↓</strong></span>
            <span>SELECT: <strong className="text-[#F4F6F8]">ENTER</strong></span>
          </div>
          <span>NAVADEEP // AIML.SYS</span>
        </div>
      </div>
    </div>
  );
};
