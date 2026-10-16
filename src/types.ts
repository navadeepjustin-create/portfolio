/** Shared data shapes. Every piece of editable content in the site uses one of these. */

export type LinkKind = 'email' | 'github' | 'linkedin' | 'other';

export interface ProfileLink {
  id: string;
  kind: LinkKind;
  label: string;
  /** Leave empty until you have the real URL / address. Empty links are shown as "not added yet". */
  href: string;
  /** Optional text shown next to the label (for example your handle). */
  handle?: string;
}

/* ----- Skills ----- */
export type SkillIcon = 'code' | 'globe' | 'brain' | 'database' | 'wrench' | 'cpu';
export type SkillLevel = 'Learning' | 'Comfortable' | 'Proficient';

export interface SkillItem {
  name: string;
  /** Only set a level if it is accurate. Levels are never shown otherwise. */
  level?: SkillLevel;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: SkillIcon;
  blurb: string;
  items: SkillItem[];
}

/* ----- Projects ----- */
export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  /** One or two sentences for the card. */
  summary: string;
  category: string;
  featured?: boolean;
  problem?: string;
  contribution?: string;
  stack: string[];
  features?: string[];
  /** Paths inside /public, for example "/projects/my-app-1.png". First image is the cover. */
  images?: string[];
  imageAlt?: string;
  github?: string;
  live?: string;
  /** Any extra links (demo video, write-up, paper...). */
  links?: ProjectLink[];
  /** Shown as a small label, for example "2025" or "In progress". */
  status?: string;
}

/* ----- Certificates ----- */
export interface Certificate {
  id: string;
  title: string;
  issuer?: string;
  /** Free text exactly as on the certificate, for example "March 2025". */
  date?: string;
  credentialId?: string;
  category: string;
  /** Path inside /public to the original file (image or PDF), for example "/certificates/python.pdf". */
  file: string;
  /** Optional image preview for PDFs (or a lighter thumbnail for big images). */
  preview?: string;
  /** Only add this when the issuer provides an official verification page. */
  verifyUrl?: string;
  /** Defaults to true. Set to false to hide the download button. */
  downloadable?: boolean;
  alt?: string;
}

/* ----- Timeline ----- */
export type TimelineKind =
  | 'education'
  | 'hackathon'
  | 'workshop'
  | 'event'
  | 'internship'
  | 'learning'
  | 'personal';

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  title: string;
  organisation?: string;
  /** Display text, for example "2025 - Present". */
  date?: string;
  description?: string;
}

/* ----- Achievements ----- */
export interface Achievement {
  id: string;
  title: string;
  detail?: string;
  date?: string;
  issuer?: string;
  link?: string;
}
