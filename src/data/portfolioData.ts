/**
 * Central Portfolio Configuration & Verified Data (Single Source of Truth)
 * All verified personal details, education, projects, hackathons, and contact channels.
 */

export const SITE_URL = 'https://portfolio-one-alpha-6gy1a73x99.vercel.app'; // TODO: Update to Navadeep custom domain when acquired

export interface ProjectDetail {
  id: string;
  number: string;
  title: string;
  category: string;
  fullConceptTitle?: string;
  headline: string;
  description: string;
  verificationNote?: string;
  status: 'CASE STUDY IN PROGRESS' | 'CONCEPT & PROTOTYPE' | 'ACTIVE DEVELOPMENT';
  features: string[];
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  screenshots?: string[];
  video?: string;
  architectureDiagram?: string;
  role: string;
  timeline: string;
  outcomes: string[];
  learnings: string[];
  links?: {
    demo?: string;
    repo?: string;
    live?: string;
    caseStudy?: string;
  };
  mockupType: 'statio' | 'fastbite' | 'portfolio';
}

export interface SkillCategory {
  title: string;
  tag: string;
  skills: string[];
  description: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  phase: string;
  summary: string;
  deliverables: string[];
}

export interface HackathonEntry {
  name: string;
  role: 'Participant';
  organizer?: string; // TODO: Add organizer name
  year?: string; // TODO: Add year
  theme?: string; // TODO: Add hackathon theme
  whatIBuilt?: string; // TODO: Add project description
  stack?: string[]; // TODO: Add tech stack
  result?: string; // TODO: Add result
  link?: string; // TODO: Add link
}

export const portfolioData = {
  personal: {
    name: 'NAVADEEP',
    preferredName: 'Navadeep',
    degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad, Telangana, India',
    statusTag: 'AIML STUDENT · DEVELOPER · BUILDER',
    headline: 'BUILDING USEFUL PRODUCTS. ENGINEERING BETTER EXPERIENCES.',
    subHeadline: 'SOFTWARE ENGINEERING · APPLIED AI/ML · PRODUCT THINKING',
    heroBio:
      "I'm a B.Tech AIML student and developer at MLRIT who turns practical problems into thoughtfully designed software, combining frontend engineering, product thinking, and applied AI/ML fundamentals.",
    aboutHeadline: 'TURNING PRACTICAL PROBLEMS INTO THOUGHTFUL SOFTWARE.',
    aboutParagraphs: [
      "I'm Navadeep, a B.Tech student in Computer Science & Engineering (Artificial Intelligence and Machine Learning) at MLR Institute of Technology (MLRIT), Hyderabad. I build practical, reliable software and explore intelligent data-driven systems.",
      'Rather than treating code as abstract syntax or chasing superficial buzzwords, I focus on solving tangible friction in everyday environments. From eliminating campus photocopy queues with Statio-MLR to streamlining cafeteria lunch rushes with Fast Bite, I design systems around real human routines and physical constraints.',
      'My technical foundation spans frontend engineering with modern React and TypeScript, core computer science fundamentals (Data Structures, OOP, Relational Databases), and foundational machine learning (data preprocessing, decision logic, and model evaluation).',
    ],
    focusAreas: [
      {
        title: 'Artificial Intelligence & ML',
        description: 'Studying core algorithms, data processing, and intelligent decision systems.',
      },
      {
        title: 'Product & Web Engineering',
        description: 'Crafting responsive, accessible user interfaces with modern React 19 & TypeScript.',
      },
      {
        title: 'Campus Process Automation',
        description: 'Re-imagining high-friction student routines with digital verification & scheduling.',
      },
      {
        title: 'Hackathons & Rapid Building',
        description: 'Transforming real friction into working prototypes under constrained timelines.',
      },
    ],
  },

  projects: [
    {
      id: 'statio-mlr',
      number: '01',
      title: 'Statio-MLR',
      category: 'College Digital Xerox & Stationery Ordering System',
      headline: 'Campus Document Printing & Stationery Workflow',
      description:
        'Statio-MLR is a college-focused digital platform concept and interactive prototype designed to simplify printing, photocopying, and stationery ordering. It brings document uploads, printing preferences, cost calculation, order tracking, scheduled collection, and QR-based pickup verification into a more organized workflow.',
      verificationNote:
        'The QR code is used strictly for pickup verification and identifying the correct order at the counter by shop staff, ensuring an orderly queue and secure handoff separate from payment processing.',
      status: 'CONCEPT & PROTOTYPE',
      mockupType: 'statio',
      features: [
        'Digital document submission with multi-format support (PDF, DOCX, slides)',
        'Granular print configuration (B&W / Color, single/double sided, binding options)',
        'Real-time automatic price calculation based on selected pages & specifications',
        'Live order status tracking (Uploaded → Processing → Ready for Collection)',
        'Scheduled collection time-slot picker to prevent campus photocopy counter bottlenecks',
        'Staff-facing QR scanner for instant order identification and pickup verification',
        'Coordinated workflows for both student self-service and stationery shop staff',
      ],
      techStack: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'QR Verification Protocol',
        'Document State Management',
        'UI/UX Architecture',
      ],
      role: 'Lead Concept Designer & Frontend Architect',
      timeline: 'Campus Initiative · MLRIT',
      video: '/projects/statio-mlr.webm',
      screenshots: [],
      architectureDiagram: 'Client SPA -> Document Estimator -> QR Token Crypto -> Counter Scanner',
      outcomes: [
        'Designed student document upload and print configuration workflow with live price calculation',
        'Modeled scheduled collection time-slot picker to prevent campus counter bottlenecks',
        'Authored the Software Requirements Specification (SRS) mapping campus physical workflows',
      ],
      learnings: [
        'Decoupling physical pickup tokens from online payment eliminates counter connectivity delays',
        'Clear paper rate transparency prevents disputes between students and store operators',
      ],
      links: {
        caseStudy: '/projects/statio-mlr',
      },
    },
    {
      id: 'fast-bite',
      number: '02',
      title: 'Fast Bite',
      category: 'Digital Campus Canteen Ordering System',
      fullConceptTitle:
        'FAST BITE: A DIGITAL CAMPUS CANTEEN ORDER MANAGEMENT SYSTEM WITH SCHEDULED PICKUP, QR-BASED ORDER VERIFICATION AND CAMPUS REWARD MANAGEMENT.',
      headline: 'Queue-Free Campus Dining with Scheduled Pickup & QR Verification',
      description:
        'Fast Bite is a concept and interactive prototype exploring how students can order food from campus canteens, select collection slots, and verify pickup using QR codes. The concept focuses on reducing queues and making campus food ordering more convenient.',
      verificationNote:
        'Canteen staff scan the student’s unique order QR at the pickup counter to authenticate the food token, confirm order details in seconds, and prevent crowd congestion during peak lunch hours.',
      status: 'CONCEPT & PROTOTYPE',
      mockupType: 'fastbite',
      role: 'Product Designer & Frontend Engineer',
      timeline: 'Campus Initiative · MLRIT',
      video: '/projects/fast-bite.webm',
      screenshots: [],
      architectureDiagram: 'Mobile Client -> Menu Engine -> Batch Scheduler -> Kitchen Terminal -> Counter Verifier',
      outcomes: [
        'Designed mobile-first ordering interface with canteen menus, live stock, and customization',
        'Prototyped break-aligned pickup windows with counter QR token verification',
        'Modeled live kitchen status transitions (Order Placed → In Prep → Ready at Counter)',
      ],
      learnings: [
        'Kitchen throughput limits require slot quotas so meal prep remains hot and on schedule',
        'Express pickup counters must have high-contrast optical tokens for rapid barcode scanning',
      ],
      features: [
        'Student-oriented mobile food ordering interface designed for rapid navigation',
        'Cafe-specific live menus with item availability and customization',
        'Scheduled pickup windows coordinated with college lecture and break schedules',
        'QR-based order token verification for rapid counter handoff',
        'Live kitchen preparation status (Order Placed → In Prep → Ready at Counter)',
        'Campus reward points and loyalty management concept for student meals',
      ],
      techStack: [
        'React',
        'TypeScript',
        'Modern CSS / Tailwind',
        'Slot Scheduling Engine',
        'QR Verification Logic',
        'Mobile-First Layout',
      ],
      links: {
        caseStudy: '/projects/fast-bite',
      },
    },
    {
      id: 'portfolio-website',
      number: '03',
      title: 'Personal Developer Portfolio',
      category: 'Creative Developer & Engineering Portfolio',
      headline: 'Interactive, Accessible, High-Performance Developer Portfolio',
      description:
        'A high-performance personal developer portfolio built with React 19, Vite 8, TypeScript, and Tailwind CSS v4. Features interactive project simulators, case-study routes, a global command palette (Cmd+K), keyboard accessibility, and prefers-reduced-motion compliance.',
      status: 'ACTIVE DEVELOPMENT',
      mockupType: 'portfolio',
      role: 'Solo Designer & Frontend Engineer',
      timeline: '2025 · Active Repository',
      liveUrl: 'https://portfolio-one-alpha-6gy1a73x99.vercel.app',
      repoUrl: 'https://github.com/navadeepjustin-create/portfolio',
      video: '/projects/portfolio-website.webm',
      screenshots: [],
      architectureDiagram: 'Vite 8 + React 19 -> Tailwind CSS v4 Tokens -> Motion/React & Lenis -> Vercel Edge',
      outcomes: [
        'Built responsive multi-page site with case-study routes and interactive project simulators',
        'Added accessibility basics: reduced-motion support, keyboard skip link, and visible focus styles',
        'Engineered ATS-friendly resume route with single source of truth data architecture',
      ],
      learnings: [
        'Hardware-accelerated transforms and rAF batching prevent animation frame drops',
        'Strict honesty and zero fabricated data build higher recruiter trust than exaggerated claims',
      ],
      features: [
        'Vite 8 + React 19 + TypeScript architecture with zero client-side routing latency',
        'Interactive case study routes and mobile-first device simulators',
        'Global command palette with keyboard navigation (Cmd+K / Ctrl+K)',
        'Full accessibility compliance (WCAG AA, skip link, prefers-reduced-motion)',
        'Tailwind CSS v4 design token system with precision square-edge aesthetic',
      ],
      techStack: [
        'React 19',
        'TypeScript',
        'Vite 8',
        'Tailwind CSS v4',
        'Motion',
        'Three.js',
      ],
      links: {
        caseStudy: '/projects/portfolio-website',
        repo: 'https://github.com/navadeepjustin-create/portfolio',
        live: 'https://portfolio-one-alpha-6gy1a73x99.vercel.app',
      },
    },
  ] as ProjectDetail[],

  hackathons: [
    {
      name: 'Cloud technology hackathon',
      role: 'Participant',
    },
    {
      name: 'Finathon',
      role: 'Participant',
    },
  ] as HackathonEntry[],

  skills: [
    {
      title: 'AI & Machine Learning',
      tag: '01 // INTELLIGENCE',
      description: 'Foundations of intelligent machines, algorithmic reasoning, and data transformation.',
      skills: [
        'Machine Learning Fundamentals',
        'Data Preprocessing',
        'Model Evaluation',
        'Algorithmic Logic',
        'Prompt Iteration & Design',
      ],
    },
    {
      title: 'Programming Languages',
      tag: '02 // CORE CODE',
      description: 'Strong foundation in object-oriented paradigms and analytical programming.',
      skills: [
        'Python',
        'Java',
        'C / C++',
        'Object-Oriented Design',
        'Data Structures & Algorithms',
      ],
    },
    {
      title: 'Web & Product Development',
      tag: '03 // EXPERIENCE',
      description: 'Creating high-performance digital interfaces with attention to ergonomics and speed.',
      skills: [
        'Frontend Development',
        'React 19',
        'TypeScript',
        'Tailwind CSS v4',
        'HTML5 / CSS3',
        'Responsive Design',
      ],
    },
    {
      title: 'DBMS & Backend Concepts',
      tag: '04 // ARCHITECTURE',
      description: 'Understanding relational schema, database queries, and service communication.',
      skills: [
        'Database Management Systems',
        'SQL & Schema Design',
        'REST API Principles',
        'Supabase (Concepts)',
        'Client-Server Models',
      ],
    },
    {
      title: 'Tools & Development Workflow',
      tag: '05 // WORKFLOW',
      description: 'Modern developer toolchain for version control, building, and deployment.',
      skills: [
        'Git & GitHub',
        'VS Code',
        'Vite',
        'Linux / Shell Basics',
        'Component Architecture',
      ],
    },
  ] as SkillCategory[],

  approach: [
    {
      number: '01',
      phase: 'PHASE 01',
      title: 'DISCOVER',
      summary: 'Understand the problem and identify genuine user friction through campus observation.',
      deliverables: [
        'User pain-point mapping',
        'Campus workflow breakdown',
        'Core requirement scoping',
      ],
    },
    {
      number: '02',
      phase: 'PHASE 02',
      title: 'DESIGN',
      summary: 'Plan the experience, user journeys, verification protocols, and high-fidelity interface.',
      deliverables: [
        'Information architecture',
        'Interactive wireframes',
        'Design system & component specs',
      ],
    },
    {
      number: '03',
      phase: 'PHASE 03',
      title: 'BUILD',
      summary: 'Implement modular, clean frontend code and connect state logic with robust verification mechanisms.',
      deliverables: [
        'Clean TypeScript implementation',
        'Responsive layout engineering',
        'State & interaction management',
      ],
    },
    {
      number: '04',
      phase: 'PHASE 04',
      title: 'REFINE',
      summary: 'Test, debug, optimize performance, evaluate edge cases, and prepare for production deployment.',
      deliverables: [
        'Cross-device accessibility checks',
        'Performance optimization',
        'Continuous feedback iteration',
      ],
    },
  ] as ApproachStep[],

  education: {
    degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad, Telangana, India',
    department: 'Department of Computer Science & Engineering (AIML)',
    status: '2022 – 2026 (In Progress)',
    highlights: [
      'Specialized coursework in Artificial Intelligence, Machine Learning, and Data Structures',
      'Hands-on laboratory implementation in Python, Java, and Database Systems',
      'Active participation in campus technical initiatives, workshops, and buildathons',
      'Focus on applying engineering theory directly to practical software solutions',
    ],
  },

  contact: {
    headline: "LET'S BUILD SOMETHING USEFUL.",
    subtext:
      'Have an internship opportunity, project collaboration, or want to discuss technology? Get in touch.',
    email: 'navadeepjustin@gmail.com',
    github: 'https://github.com/navadeepjustin-create',
    linkedin: 'https://www.linkedin.com/in/navadeep-justin-946366371',
    instagram: 'https://instagram.com/navdeep_.07',
    instagramHandle: 'navdeep_.07',
    location: 'Hyderabad, Telangana, India',
    institution: 'MLR Institute of Technology (MLRIT)',
    siteUrl: SITE_URL,
  },
};
