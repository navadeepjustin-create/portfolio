/**
 * Central Social Profiles and Contact Configuration
 * Update these URLs with your real profiles.
 * If a URL is empty, the UI displays an elegant configuration indicator
 * and never generates a broken link.
 */

export const GITHUB_URL = 'https://github.com/navadeepjustin-create';
export const INSTAGRAM_URL = '';
export const FACEBOOK_URL = '';
export const LINKEDIN_URL = '';
export const EMAIL_ADDRESS = 'navadeepjustin@gmail.com';

export interface SocialLinkItem {
  id: 'github' | 'instagram' | 'facebook' | 'linkedin' | 'email';
  label: string;
  url: string;
  configured: boolean;
  actionText: string;
}

export const getSocialLinks = (): SocialLinkItem[] => [
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
    actionText: 'Follow on Instagram',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: FACEBOOK_URL.trim(),
    configured: FACEBOOK_URL.trim().length > 0,
    actionText: 'Find me on Facebook',
  },
  {
    id: 'email',
    label: 'Email',
    url: EMAIL_ADDRESS.trim() ? `mailto:${EMAIL_ADDRESS.trim()}` : '',
    configured: EMAIL_ADDRESS.trim().length > 0,
    actionText: 'Email Me',
  },
];
