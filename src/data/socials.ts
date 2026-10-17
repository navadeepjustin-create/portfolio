/**
 * Central Social Profiles and Contact Configuration
 * Verified Profiles for Navadeep
 */

export const GITHUB_URL = 'https://github.com/navadeepjustin-create';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/navadeep-justin-946366371';
export const INSTAGRAM_URL = 'https://instagram.com/navdeep_.07';
export const EMAIL_ADDRESS = 'navadeepjustin@gmail.com';

export interface SocialLinkItem {
  id: 'github' | 'linkedin' | 'instagram' | 'email';
  label: string;
  url: string;
  configured: boolean;
  actionText: string;
}

export const getSocialLinks = (): SocialLinkItem[] =>
  ([
    {
      id: 'github',
      label: 'GitHub',
      url: GITHUB_URL.trim(),
      configured: GITHUB_URL.trim().length > 0,
      actionText: 'Visit GitHub',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: LINKEDIN_URL.trim(),
      configured: LINKEDIN_URL.trim().length > 0,
      actionText: 'Connect on LinkedIn',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: INSTAGRAM_URL.trim(),
      configured: INSTAGRAM_URL.trim().length > 0,
      actionText: '@navdeep_.07',
    },
    {
      id: 'email',
      label: 'Email',
      url: EMAIL_ADDRESS.trim() ? `mailto:${EMAIL_ADDRESS.trim()}` : '',
      configured: EMAIL_ADDRESS.trim().length > 0,
      actionText: 'Email Me',
    },
  ] as SocialLinkItem[]).filter((link) => link.configured);
