/**
 * Site-wide settings. Start here when you want to change how the portfolio behaves.
 */
interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  availability: { show: boolean; label: string };
  showPlaceholders: boolean;
}

export const site: SiteConfig = {
  name: 'Navadeep',
  role: 'AI & ML Engineering Student',

  /** Headline under the name in the hero. */
  tagline: 'Building intelligent solutions through code.',

  /** Short introduction in the hero. */
  intro:
    "I'm a B.Tech student in Computer Science and Engineering (AI & ML). I like turning ideas into small, working software, and I'm learning how to build systems that learn from data.",

  /** Small pill above the name. Set show to false to remove it. */
  availability: {
    show: true,
    label: 'Open to internships & collaborations',
  },

  /**
   * While you are still filling in your details, empty sections show clearly marked
   * placeholders so the layout is visible. Set this to false before you publish and
   * every placeholder (and empty section) disappears.
   */
  showPlaceholders: true,
};
