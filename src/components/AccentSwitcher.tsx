import React, { useState, useEffect } from 'react';

export type AccentColor = 'lime' | 'cyan' | 'orange';

interface AccentConfig {
  id: AccentColor;
  label: string;
  hex: string;
  glow: string;
}

export const ACCENTS: AccentConfig[] = [
  { id: 'lime', label: 'Electric Lime', hex: '#C6FF00', glow: 'rgba(198,255,0,0.35)' },
  { id: 'cyan', label: 'Cyber Cyan', hex: '#00F0FF', glow: 'rgba(0,240,255,0.35)' },
  { id: 'orange', label: 'Solar Orange', hex: '#FF8800', glow: 'rgba(255,136,0,0.35)' },
];

export const AccentSwitcher: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [currentAccent, setCurrentAccent] = useState<AccentColor>('lime');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nd_portfolio_accent') as AccentColor;
      if (saved && ['lime', 'cyan', 'orange'].includes(saved)) {
        applyAccent(saved);
      }
    } catch {
      // Storage restricted fallback
    }
  }, []);

  const applyAccent = (accent: AccentColor) => {
    setCurrentAccent(accent);
    const config = ACCENTS.find((a) => a.id === accent);
    if (!config) return;

    try {
      localStorage.setItem('nd_portfolio_accent', accent);
      document.documentElement.style.setProperty('--accent-primary', config.hex);
      document.documentElement.style.setProperty('--accent-glow', config.glow);
      document.documentElement.setAttribute('data-accent', accent);
    } catch {
      // Storage error fallback
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 bg-[#11151A] border border-white/10 ${className}`}
      role="group"
      aria-label="Color Accent Switcher"
    >
      <span className="font-mono text-[9px] text-[#929BA6] uppercase px-1 hidden sm:inline">
        PALETTE:
      </span>
      {ACCENTS.map((accent) => {
        const isSelected = currentAccent === accent.id;
        return (
          <button
            key={accent.id}
            type="button"
            onClick={() => applyAccent(accent.id)}
            title={`Switch to ${accent.label}`}
            className={`w-4 h-4 rounded-none transition-all duration-200 border ${
              isSelected
                ? 'scale-110 border-white shadow-[0_0_8px_var(--accent-glow)]'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            style={{ backgroundColor: accent.hex }}
            aria-pressed={isSelected}
          />
        );
      })}
    </div>
  );
};
