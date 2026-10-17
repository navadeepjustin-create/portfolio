/**
 * Single source of truth for Navadeep's ATS-friendly Resume
 * Used by /resume route, print styling, command palette, and PDF export.
 */

import { SITE_URL } from './portfolioData';

export interface ResumeData {
  header: {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedin: {
      url: string;
      display: string;
    };
    github: {
      url: string;
      display: string;
    };
    portfolio: {
      url: string;
      display: string;
    };
  };
  summary: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    duration: string;
    bullets: string[];
  };
  projects: {
    title: string;
    tagline: string;
    technologies: string;
    status: string;
    repoUrl?: string;
    bullets: string[];
  }[];
  hackathons: {
    title: string;
    role: string;
    bullets?: string[];
  }[];
  skills: {
    category: string;
    items: string;
  }[];
}

export const resumeData: ResumeData = {
  header: {
    name: 'Navadeep',
    title: 'B.Tech (AIML) Student · Software Developer',
    location: 'Hyderabad, Telangana, India',
    email: 'navadeepjustin@gmail.com',
    linkedin: {
      url: 'https://www.linkedin.com/in/navadeep-justin-946366371',
      display: 'linkedin.com/in/navadeep-justin-946366371',
    },
    github: {
      url: 'https://github.com/navadeepjustin-create',
      display: 'github.com/navadeepjustin-create',
    },
    portfolio: {
      url: SITE_URL,
      display: SITE_URL.replace('https://', ''),
    },
  },

  summary:
    'B.Tech AIML student at MLR Institute of Technology who turns practical campus problems into carefully designed software. Front-end focused (React, Tailwind CSS) with a working base in Python, Java, SQL and machine learning fundamentals. Seeking software engineering, full-stack or applied AI/ML internships.',

  education: {
    degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad',
    duration: '2022–2026 (in progress)',
    bullets: [
      'Coursework in Artificial Intelligence, Machine Learning and Data Structures',
      'Hands-on lab work in Python, Java and SQL database design',
      'Active in campus technical initiatives, workshops and buildathons',
    ],
  },

  projects: [
    {
      title: 'Statio-MLR: Campus Digital Xerox & Stationery Ordering System',
      tagline: 'Campus document printing and stationery procurement workflow',
      technologies: 'React, TypeScript, Tailwind CSS',
      status: 'concept and interactive prototype',
      bullets: [
        'Designed a student workflow for document upload, print options (B&W or color, single or double-sided, binding) and automatic price calculation.',
        'Modeled live order status (Uploaded, Processing, Ready for Collection) and a scheduled collection slot picker to reduce photocopy-counter queues.',
        'Defined a counter-only QR pickup-verification flow for shop staff, kept separate from payment.',
        'Authored the software requirements specification (SRS) for the platform.',
      ],
    },
    {
      title: 'Fast Bite: Digital Campus Canteen Ordering System',
      tagline: 'Mobile campus food ordering and collection scheduling',
      technologies: 'React, TypeScript, Tailwind CSS',
      status: 'concept and interactive prototype',
      bullets: [
        'Designed a mobile-first ordering interface with canteen-specific menus, item availability and customization.',
        'Prototyped scheduled pickup windows aligned with lecture and break timings, with QR token verification at the counter.',
        'Modeled live kitchen status (Order Placed, In Prep, Ready at Counter) and a campus reward-points concept.',
      ],
    },
    {
      title: 'Personal Portfolio Website',
      tagline: 'High-performance interactive engineering portfolio',
      technologies: 'React 19, TypeScript, Vite, Tailwind CSS v4, Motion',
      status: 'source on GitHub',
      repoUrl: 'https://github.com/navadeepjustin-create/portfolio',
      bullets: [
        'Built a responsive multi-page site with case-study routes, interactive project simulators and a Cmd/Ctrl+K command palette.',
        'Added accessibility basics: reduced-motion support, a keyboard skip link and visible focus styles.',
      ],
    },
  ],

  hackathons: [
    {
      title: 'Cloud technology hackathon',
      role: 'Participant',
    },
    {
      title: 'Finathon',
      role: 'Participant',
    },
  ],

  skills: [
    {
      category: 'AI / ML',
      items: 'machine learning fundamentals, data preprocessing, model evaluation',
    },
    {
      category: 'Languages',
      items: 'Python, Java',
    },
    {
      category: 'Web Development',
      items: 'React, Tailwind CSS, HTML5/CSS3, responsive design',
    },
    {
      category: 'DBMS',
      items: 'database management systems, SQL and schema design, database fundamentals, REST API principles, Supabase (concepts)',
    },
    {
      category: 'Prompting',
      items: 'prompt design and iteration',
    },
    {
      category: 'Tools',
      items: 'Git and GitHub, VS Code, Vite, Linux and shell basics',
    },
    {
      category: 'Core CS',
      items: 'data structures and algorithms, object-oriented design',
    },
  ],
};
