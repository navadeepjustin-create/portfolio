import type { ProfileLink } from '../types';

/**
 * Contact and profile links.
 *
 * Paste your real details into `href`:
 *   email     -> "you@example.com"            (no "mailto:" needed)
 *   github    -> "https://github.com/your-username"
 *   linkedin  -> "https://www.linkedin.com/in/your-profile"
 *
 * Links that are still empty are shown as "not added yet" and are not clickable,
 * so nothing fake ever points anywhere. Add as many extra links as you like.
 */
export const links: ProfileLink[] = [
  { id: 'email', kind: 'email', label: 'Email', href: 'navadeepjustin@gmail.com' },
  { id: 'github', kind: 'github', label: 'GitHub', href: 'https://github.com/navadeepjustin-create' },
  { id: 'linkedin', kind: 'linkedin', label: 'LinkedIn', href: '' },
  // { id: 'leetcode', kind: 'other', label: 'LeetCode', href: 'https://leetcode.com/u/your-username' },
];

export const emailLink = links.find((l) => l.kind === 'email');
export const contactEmail = emailLink?.href.trim() ?? '';
