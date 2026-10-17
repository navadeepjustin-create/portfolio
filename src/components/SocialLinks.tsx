import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getSocialLinks, type SocialLinkItem } from '../data/socials';
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
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
                className="p-1.5 text-[#929BA6] hover:text-[#080A0D] hover:bg-[#C6FF00] border border-transparent hover:border-[#C6FF00] transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          }

          return (
            <span
              key={link.id}
              title={`${link.label} URL can be added in src/data/socials.ts`}
              className="p-1.5 text-[#929BA6]/40 opacity-40 cursor-not-allowed border border-transparent"
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
          if (!link.configured) return null;
          const Icon = iconMap[link.id];

          return (
            <div
              key={link.id}
              className="p-3 sm:p-3.5 border transition-all duration-200 flex items-center justify-between group bg-[#11151A] border-[#232B35] hover:border-[#C6FF00]/60 hover:bg-[#171D24]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 flex items-center justify-center border shrink-0 transition-colors bg-[#171D24] border-[#232B35] group-hover:border-[#C6FF00] text-[#C6FF00]">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-[#F4F6F8] block">
                    {link.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#929BA6] truncate block">
                    {link.actionText}
                  </span>
                </div>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.actionText} (opens in a new tab)`}
                data-cursor-label="OPEN ↗"
                className="p-2 bg-[#171D24] border border-[#232B35] group-hover:border-[#C6FF00] group-hover:bg-[#C6FF00] group-hover:text-[#080A0D] text-[#F4F6F8] transition-all flex items-center justify-center shrink-0"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
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
        if (!link.configured) return null;
        const Icon = iconMap[link.id];

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.actionText}
            data-cursor-label={link.actionText.toUpperCase()}
            className="p-2 border border-[#232B35] hover:border-[#C6FF00] bg-[#11151A] hover:bg-[#C6FF00] hover:text-[#080A0D] text-[#929BA6] transition-all duration-200 group"
          >
            <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>
        );
      })}
    </div>
  );
};
