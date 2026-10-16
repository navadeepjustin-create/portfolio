import { showAchievements } from './achievements';
import { showSkills } from './skills';

export interface NavItem {
  id: string;
  label: string;
}

/** Navigation and section order. Sections that are hidden never appear here. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  ...(showSkills ? [{ id: 'skills', label: 'Skills' }] : []),
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'journey', label: 'Journey' },
  ...(showAchievements ? [{ id: 'achievements', label: 'Highlights' }] : []),
  { id: 'contact', label: 'Contact' },
];

/** "01", "02"... based on the order sections are actually shown. */
export function sectionIndex(id: string): string {
  const position = NAV_ITEMS.findIndex((item) => item.id === id);
  return String(position + 1).padStart(2, '0');
}
