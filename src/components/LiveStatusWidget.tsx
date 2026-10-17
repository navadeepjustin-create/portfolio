import React, { useState, useEffect } from 'react';
import { Clock, GitCommit } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import latestCommit from '../data/latestCommit.json';

interface LiveStatusWidgetProps {
  className?: string;
  compact?: boolean;
}

export const LiveStatusWidget: React.FC<LiveStatusWidgetProps> = ({ className = '', compact = false }) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTimeString(`${formatter.format(now)} IST`);
      } catch {
        setTimeString('14:30:00 IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const commit = latestCommit as {
    hash?: string;
    message?: string;
    date?: string;
    available?: boolean;
  };

  return (
    <div
      className={`p-4 bg-[#0D1117] border border-white/10 font-mono text-xs text-[#929BA6] shadow-xl relative overflow-hidden select-none ${className}`}
    >
      {/* Corner crosshairs */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#C6FF00]" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#C6FF00]" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#C6FF00]" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#C6FF00]" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Local Hyderabad Time */}
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#C6FF00]" />
          <span className="text-[#929BA6] text-[11px] uppercase">HYD:</span>
          <span className="text-[#F4F6F8] font-bold tracking-wider">{timeString || '14:30:00 IST'}</span>
          <span className="text-[10px] text-[#929BA6]/60 hidden sm:inline">[17.54°N, 78.43°E]</span>
        </div>

        {/* Currently Building Indicator */}
        {portfolioData.personal.currentlyBuilding && (
          <div className="flex items-center gap-2 max-w-md truncate">
            <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-none animate-pulse shrink-0" />
            <span className="text-[#929BA6] text-[11px] uppercase shrink-0">BUILDING:</span>
            <span className="text-[#F4F6F8] truncate font-medium">
              {portfolioData.personal.currentlyBuilding}
            </span>
          </div>
        )}

        {/* Latest Public GitHub Commit */}
        {commit && commit.available && commit.hash && (
          <div className="flex items-center gap-2">
            <GitCommit className="w-3.5 h-3.5 text-[#C6FF00] shrink-0" />
            <span className="text-[#929BA6] text-[11px] uppercase">COMMIT:</span>
            <a
              href={`https://github.com/navadeepjustin-create/portfolio/commit/${commit.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6FF00] hover:underline font-bold"
              title={commit.message || 'Latest commit'}
            >
              #{commit.hash}
            </a>
            {commit.message && !compact && (
              <span className="text-[#929BA6] text-[11px] truncate max-w-[200px] hidden xl:inline">
                "{commit.message}"
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
