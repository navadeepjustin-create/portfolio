import type { SkillGroup } from '../types';
import { site } from './site';

/**
 * Skills. Add only technologies you have confirmed you know.
 * Groups with no items show editable placeholders (see site.showPlaceholders).
 *
 * Example:
 *   items: [{ name: 'Java' }, { name: 'Python', level: 'Comfortable' }]
 *
 * `level` is optional and only appears if you set it. There are no percentages.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'code',
    blurb: 'The languages I write programs in.',
    items: [],
  },
  {
    id: 'web',
    title: 'Web Development',
    icon: 'globe',
    blurb: 'Building for the browser.',
    items: [],
  },
  {
    id: 'ai-ml',
    title: 'AI and Machine Learning',
    icon: 'brain',
    blurb: 'Libraries, models and methods.',
    items: [],
  },
  {
    id: 'data',
    title: 'Databases and Backend',
    icon: 'database',
    blurb: 'Storing data and serving it.',
    items: [],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: 'wrench',
    blurb: 'Everyday tooling and workflow.',
    items: [],
  },
  {
    id: 'cs',
    title: 'Core Computer Science',
    icon: 'cpu',
    blurb: 'The fundamentals underneath it all.',
    items: [],
  },
];

/** The Skills section is hidden once placeholders are off and no skill has been added. */
export const showSkills = skillGroups.some((g) => g.items.length > 0) || site.showPlaceholders;
