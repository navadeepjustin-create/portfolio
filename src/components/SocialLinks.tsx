import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getSocialLinks, type SocialLinkItem } from '../data/socials';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  MailIcon,
} from './BrandIcons';

interface SocialLinksProps {
  variant?: 'nav' | 'contact' | 'footer' | 'pill';
  showUnconfigured?: boolean;
  className?: string;
}

const iconMap: Record<SocialLinkItem['id'], React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  email: MailIcon,
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'footer',
  showUnconfigured = true,
  className = '',
}) => {
  const links = getSocialLinks();

  if (variant === 'nav') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {links.map((link) => {
          const Icon = iconMap[link.id];
          if (!link.configured && !showUnconfigured) return null;

          if (link.configured) {
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.actionText}
                data-cursor-label={link.actionText.toUpperCase()}
                className="p-1.5 text-[#333333] hover:text-[#111111] hover:bg-[#D1FF00] border border-transparent hover:border-[#111111] transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          }

          return (
            <span
              key={link.id}
              title={`${link.label} URL can be added in src/data/socials.ts`}
              className="p-1.5 text-[#AAAAAA] opacity-50 cursor-not-allowed border border-transparent"
              aria-label={`${link.label} (Not configured)`}
            >
              <Icon className="w-4 h-4" />
            </span>
          );
        })}
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        {links.map((link) => {
          const Icon = iconMap[link.id];

          return (
            <div
              key={link.id}
              className={`p-3 sm:p-3.5 border transition-all duration-200 flex items-center justify-between group ${
                link.configured
                  ? 'bg-[#151515] border-[#2A2A2A] hover:border-[#D1FF00] hover:bg-[#1A1A1A]'
                  : 'bg-[#121212] border-[#222222]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 flex items-center justify-center border shrink-0 transition-colors ${
                    link.configured
                      ? 'bg-[#202020] border-[#333333] group-hover:border-[#D1FF00] text-[#D1FF00]'
                      : 'bg-[#181818] border-[#282828] text-[#666666]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-[#F5F5F0] block">
                    {link.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#777777] truncate block">
                    {link.configured ? link.actionText : 'Profile link pending configuration'}
                  </span>
                </div>
              </div>

              {link.configured ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.actionText} (opens in a new tab)`}
                  data-cursor-label="OPEN ↗"
                  className="p-2 bg-[#222222] border border-[#333333] group-hover:border-[#D1FF00] group-hover:bg-[#D1FF00] group-hover:text-[#111111] text-[#CCCCCC] transition-all flex items-center justify-center shrink-0"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#777777] px-2 py-0.5 bg-[#1C1C1C] border border-[#2B2B2B] shrink-0">
                  Pending URL
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Footer default variant
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.id];

        if (link.configured) {
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.actionText}
              data-cursor-label={link.actionText.toUpperCase()}
              className="p-2 border border-[#2B2B2B] hover:border-[#D1FF00] bg-[#161616] hover:bg-[#D1FF00] hover:text-[#111111] text-[#999999] transition-all duration-200 group"
            >
              <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          );
        }

        return (
          <span
            key={link.id}
            title={`${link.label}: Set URL in src/data/socials.ts`}
            className="p-2 border border-[#222222] bg-[#131313] text-[#555555] cursor-not-allowed opacity-60"
            aria-label={`${link.label} (Not configured yet)`}
          >
            <Icon className="w-4 h-4" />
          </span>
        );
      })}
    </div>
  );
};
