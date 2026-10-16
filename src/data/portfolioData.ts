/**
 * Central Portfolio Configuration & Verified Data
 * All personal information, projects, technical interests, and social links
 * are managed here in one location.
 */

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
  links?: {
    demo?: string;
    repo?: string;
    caseStudy?: string;
  };
  mockupType: 'statio' | 'fastbite';
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

export const portfolioData = {
  personal: {
    name: 'NAVADEEP',
    preferredName: 'Navadeep',
    degree: 'B.Tech in Artificial Intelligence and Machine Learning (AIML)',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad, Telangana, India',
    statusTag: 'AIML STUDENT · DEVELOPER · BUILDER',
    headline: 'BUILDING AT THE INTERSECTION OF AI & SOFTWARE.',
    subHeadline: 'AI MINDED. PRODUCT FOCUSED. ALWAYS BUILDING.',
    heroBio:
      'B.Tech AIML student at MLRIT, exploring intelligent systems and building practical software projects.',
    aboutHeadline: 'BUILDING PRACTICAL SYSTEMS AT MLRIT.',
    aboutParagraphs: [
      "I'm Navadeep, a B.Tech student studying Artificial Intelligence and Machine Learning at MLRIT, interested in building practical software projects and exploring intelligent systems.",
      'Rather than treating code as abstract syntax, I focus on how technology solves tangible friction around campus life. My work centers on creating efficient digital platforms, understanding intelligent algorithms, and applying engineering fundamentals to real problems.',
      'Whether optimizing user interactions or architecting scalable workflows, I build software that is fast, resilient, and purposeful.',
    ],
    focusAreas: [
      {
        title: 'Artificial Intelligence & ML',
        description: 'Studying core algorithms, data processing, and intelligent decision systems.',
      },
      {
        title: 'Product & Web Engineering',
        description: 'Crafting responsive, editorial user interfaces with modern React & TypeScript.',
      },
      {
        title: 'Campus Process Automation',
        description: 'Re-imagining high-friction student routines with digital verification & scheduling.',
      },
      {
        title: 'Hackathons & Rapid Building',
        description: 'Transforming napkin concepts into working prototypes under real-world constraints.',
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
        'Statio-MLR is a college-focused digital platform concept designed to simplify printing, photocopying, and stationery ordering. It brings document uploads, printing preferences, cost calculation, order tracking, scheduled collection, and QR-based pickup verification into a more organized workflow.',
      verificationNote:
        'The QR code is used strictly for pickup verification and identifying the correct order at the counter by shop staff, ensuring an orderly queue and secure handoff separate from payment processing.',
      status: 'CASE STUDY IN PROGRESS',
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
      links: {
        caseStudy: '#',
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
        'Fast Bite explores how students can order food from campus canteens, select collection slots, and verify pickup using QR codes. The concept focuses on reducing queues and making campus food ordering more convenient.',
      verificationNote:
        'Canteen staff scan the student’s unique order QR at the pickup counter to authenticate the food token, confirm order details in seconds, and prevent crowd congestion during peak lunch hours.',
      status: 'CONCEPT & PROTOTYPE',
      mockupType: 'fastbite',
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
        caseStudy: '#',
      },
    },
  ] as ProjectDetail[],

  skills: [
    {
      title: 'AI & Intelligent Systems',
      tag: '01 // INTELLIGENCE',
      description: 'Foundations of intelligent machines, algorithmic reasoning, and data transformation.',
      skills: [
        'Artificial Intelligence',
        'Machine Learning',
        'AIML Engineering Concepts',
        'Data Preprocessing',
        'Model Evaluation',
        'Algorithmic Logic',
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
        'UI/UX Implementation',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Modern HTML5 / CSS3',
        'Responsive Design',
      ],
    },
    {
      title: 'Data & Backend Concepts',
      tag: '04 // ARCHITECTURE',
      description: 'Understanding relational schema, database queries, and service communication.',
      skills: [
        'Database Fundamentals',
        'SQL Queries & Schema Design',
        'Supabase Architecture Concepts',
        'RESTful API Principles',
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
    degree: 'B.Tech in Artificial Intelligence and Machine Learning',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad, Telangana, India',
    department: 'Department of Computer Science & Engineering (AIML)',
    status: 'Undergraduate Degree in Progress',
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
      'Have a project idea, want to collaborate, or want to discuss technology? Get in touch.',
    /**
     * Social profile links. If left empty, the UI displays clear, non-clickable
     * configuration indicators rather than fabricating URLs.
     */
    email: 'navadeepjustin@gmail.com', // Active contact email
    github: 'https://github.com/navadeepjustin-create', // Active GitHub profile
    instagram: 'https://instagram.com/navdeep_.07', // Active Instagram profile
    instagramHandle: 'navdeep_.07',
    linkedin: '', // Add real LinkedIn profile URL
    location: 'Hyderabad, Telangana, India',
    institution: 'MLR Institute of Technology',
  },
};
