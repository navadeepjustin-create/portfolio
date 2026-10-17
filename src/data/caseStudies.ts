export interface CaseStudyData {
  id: string;
  number: string;
  title: string;
  category: string;
  headline: string;
  summary: string;
  status: string;
  role: string;
  timeline: string;
  institution: string;
  location: string;
  mockupType: 'statio' | 'fastbite' | 'portfolio';
  overview: string;
  problemStatement: {
    lead: string;
    points: { title: string; desc: string }[];
  };
  researchEvidence: {
    lead: string;
    placeholderNotice: string;
    observations: string[];
  };
  designDecisions: {
    title: string;
    rationale: string;
    outcome: string;
  }[];
  solutionStatement: {
    lead: string;
    pillars: { title: string; desc: string }[];
  };
  studentWorkflow: { step: string; title: string; desc: string }[];
  adminWorkflow: { step: string; title: string; desc: string }[];
  deepDiveFeatures: {
    title: string;
    tag: string;
    desc: string;
    specs: string[];
  }[];
  techStack: {
    category: string;
    items: string[];
    justification: string;
  }[];
  challengesAndLearnings: {
    challenge: string;
    solution: string;
    takeaway: string;
  }[];
  verificationArchitecture: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  whatIWouldDoDifferently: string[];
  nextSteps: string[];
  links: {
    github?: string;
    live?: string;
  };
  prevProject: { id: string; title: string; number: string };
  nextProject: { id: string; title: string; number: string };
}

export const caseStudies: Record<string, CaseStudyData> = {
  'statio-mlr': {
    id: 'statio-mlr',
    number: '01',
    title: 'Statio-MLR',
    category: 'College Digital Xerox & Stationery Ordering System',
    headline: 'Eliminating Campus Photocopy Counter Bottlenecks with Scheduled Pickups & QR Token Verification',
    summary:
      'Statio-MLR is a campus-tailored digital document printing and stationery procurement platform designed for college environments like MLRIT. It transforms chaotic photocopy counter lines into a streamlined, scheduled digital workflow.',
    status: 'CONCEPT & PROTOTYPE',
    role: 'Lead Concept Designer & Frontend Architect',
    timeline: 'Campus Initiative · MLRIT',
    institution: 'MLR Institute of Technology, Hyderabad',
    location: 'Hyderabad, Telangana, India',
    mockupType: 'statio',
    overview:
      'In collegiate environments, exam weeks and assignment deadlines trigger severe physical congestion at on-campus stationery and photocopy centers. Students often spend significant class break intervals waiting simply to hand over a flash drive, explain paper specs, and wait for manual printing. Statio-MLR digitizes the entire pre-print phase, allowing students to submit documents from their phones, customize granular print preferences, calculate exact pricing upfront, and pick up verified printouts via a counter QR token.',
    problemStatement: {
      lead: 'Physical stationery counters suffer from severe friction points during high-stakes academic deadlines:',
      points: [
        {
          title: 'USB Flash Drive & File Transfer Delays',
          desc: 'Students queue up just to plug in thumb drives or email files to counter PCs, causing physical bottlenecks and malware vulnerability.',
        },
        {
          title: 'Print Specification Misunderstandings',
          desc: 'Verbal communication of duplex vs. simplex, page ranges, color slides, and binding choices frequently results in incorrect prints and financial waste.',
        },
        {
          title: 'Unpredictable Wait Times & Class Conflicts',
          desc: 'Students cannot forecast queue lengths, often arriving late to lab sessions or lectures while waiting for prints.',
        },
        {
          title: 'Manual Accounting Friction',
          desc: 'Counter operators must calculate arbitrary page rates on paper or calculators while simultaneously operating printing presses.',
        },
      ],
    },
    researchEvidence: {
      lead: 'Campus Observations & Qualitative Workflow Breakdown:',
      placeholderNotice:
        'Detailed quantitative survey metrics and time-motion studies will be linked here once formal pilot trials are authorized by MLRIT.',
      observations: [
        'Photocopy counter lines spike during the first 15 minutes of lunch breaks and before morning 9:00 AM lab sessions.',
        'Verbal miscommunications about duplex (double-sided) vs. single-sided prints account for frequent student-operator friction.',
        'Shop operators spend excessive time manually opening individual USB drives and checking page counts.',
      ],
    },
    designDecisions: [
      {
        title: 'Decoupling QR Token from Online Payment',
        rationale:
          'Payment gateways can experience latency or timeouts under poor campus basement coverage. Tying physical collection verification to payment handshakes causes stalled counter queues.',
        outcome:
          'The QR code serves strictly as a verified pickup token (#ST-094) for shop staff scanning, ensuring instant handoff in under 3 seconds.',
      },
      {
        title: 'Upfront Granular Spec & Cost Calculator',
        rationale:
          'Students need transparent pricing before committing to print jobs, preventing counter arguments over color vs. monochrome charges.',
        outcome:
          'Dynamic client-side estimator updates price instantly on page count, duplex, and spiral binding selection.',
      },
      {
        title: '15-Minute Staggered Collection Slot Allocation',
        rationale:
          'Allowing all students to select the same break window recreates the physical bottleneck at the counter.',
        outcome:
          'Spreads print collection across controlled time windows aligned with college timetable periods.',
      },
    ],
    solutionStatement: {
      lead: 'Statio-MLR introduces an asynchronous campus print workflow built around transparency, precision, and rapid collection:',
      pillars: [
        {
          title: 'Digital File Ingestion & Validation',
          desc: 'Students upload academic documents directly from mobile or laptop with automatic page counting and format validation.',
        },
        {
          title: 'Granular Print Spec Engine',
          desc: 'Precision toggles for monochrome/color, single/double sided, orientation, page subsets, and spiral/soft binding.',
        },
        {
          title: 'Real-Time Price Breakdown',
          desc: 'Transparent pricing algorithm computes exact costs upfront based on college store tariffs, preventing payment discrepancies.',
        },
        {
          title: 'Counter-Only QR Pickup Verification',
          desc: 'A dedicated express token scanner at the physical shop counter guarantees authenticated, queue-free pickup in under 3 seconds.',
        },
      ],
    },
    studentWorkflow: [
      {
        step: '01',
        title: 'Upload Academic Document',
        desc: 'Drag & drop lecture notes, lab records, or project PDFs with automatic page count detection.',
      },
      {
        step: '02',
        title: 'Configure Print Parameters',
        desc: 'Select Black & White or Color, simplex or duplex, and optional spiral binding with live cost preview.',
      },
      {
        step: '03',
        title: 'Schedule Collection Window',
        desc: 'Reserve a specific 15-minute pickup slot between lectures to avoid rush periods.',
      },
      {
        step: '04',
        title: 'Present Verified QR Token',
        desc: 'Show the counter-ready QR token on mobile screen for instantaneous 1-scan pickup verification.',
      },
    ],
    adminWorkflow: [
      {
        step: '01',
        title: 'Receive Spooled Print Jobs',
        desc: 'Queue organized chronologically with pre-extracted PDF specifications and binding instructions.',
      },
      {
        step: '02',
        title: 'Batch Production & Staging',
        desc: 'Staff prints and binds documents in scheduled batches before students arrive at the counter.',
      },
      {
        step: '03',
        title: 'Scan QR at Pickup Counter',
        desc: '1-scan handheld terminal validates the student order token and marks the transaction as collected.',
      },
    ],
    deepDiveFeatures: [
      {
        title: 'Client-Side Document State Estimator',
        tag: 'CORE ENGINE',
        desc: 'Analyzes document metadata to calculate precise paper tariffs without external server latency.',
        specs: [
          'Automatic page count extraction',
          'Simplex vs. Duplex paper rate formula',
          'Color ratio multiplier (₹1.50 B&W / ₹5.00 Color)',
          'Spiral binding surcharge calculator',
        ],
      },
      {
        title: 'Scheduled Slot Allocation Protocol',
        tag: 'QUEUE LOGIC',
        desc: 'Distributes student pickup traffic evenly across break periods to prevent counter congestion.',
        specs: [
          '15-minute interval distribution',
          'Timetable-synced break period slots',
          'Maximum capacity capping per slot',
          'Real-time slot availability indicators',
        ],
      },
      {
        title: 'Four-Stage Order State Lifecycle',
        tag: 'STATE MACHINE',
        desc: 'Explicit status progression ensures both students and operators maintain perfect clarity on job status.',
        specs: [
          'Phase 1: Document Uploaded & Verified',
          'Phase 2: Print In Spool / In Progress',
          'Phase 3: Ready at Pickup Counter',
          'Phase 4: Verified & Collected',
        ],
      },
    ],
    verificationArchitecture: {
      title: 'QR Token Verification Protocol',
      description:
        'A critical architectural decision in Statio-MLR is the deliberate decoupling of the QR token from payment processing. In college environments, mixing payment gateway verification with physical counter dispatch causes latency and gateway timeout failures. Statio-MLR uses the QR code exclusively as an authenticated physical pickup token (#ST-094) for counter operator scanning, ensuring instant handoff in under 3 seconds.',
      keyPoints: [
        'Decoupled from payment gateways to prevent counter connectivity stalls',
        'Single-use cryptographically signed token identifier',
        'Compatible with smartphone cameras or handheld USB barcode/QR scanners',
        'Instantly displays student ID, file title, and binding specs on shop screen',
      ],
    },
    techStack: [
      {
        category: 'Client & Interface',
        items: ['React 19', 'TypeScript', 'Tailwind CSS v4'],
        justification:
          'Ensures fast initial load times, strict type safety for print parameter calculations, and responsive ergonomics on student smartphones.',
      },
      {
        category: 'State & UI Simulation',
        items: ['Motion', 'Lucide Icons', 'Modular React Hooks'],
        justification:
          'Provides fluid micro-interactions, responsive simulation state toggles, and seamless visual transitions between workflow phases.',
      },
      {
        category: 'Verification & Formatting',
        items: ['QR Matrix Protocol', 'Dynamic PDF Metadata Specs', 'Slot Scheduling Logic'],
        justification:
          'Provides robust client-side validation for print settings, order token hashing, and error-resilient counter handoff.',
      },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Real-time state synchronization under poor campus Wi-Fi coverage',
        solution:
          'Designed an offline-resilient local token cache so students can display their pickup QR code even inside basement photocopy shops without mobile network.',
        takeaway:
          'Always design for low-connectivity physical edge environments when building campus software.',
      },
      {
        challenge: 'Counter operator ergonomics during high-volume rush periods',
        solution:
          'Streamlined operator interface into high-contrast, keyboard-navigable and 1-scan verification cards.',
        takeaway:
          'The best software considers the human worker at the counter as deeply as the end consumer.',
      },
    ],
    whatIWouldDoDifferently: [
      'Conduct formal paper-slip vs. digital token A/B tests with shop operators earlier in the design cycle.',
      'Model print spool batching on the operator side before perfecting student-facing UI aesthetics.',
      'Incorporate multi-file batch uploads into the initial prototype rather than single document submissions.',
    ],
    nextSteps: [
      'Conduct controlled on-campus pilot test with the MLRIT main stationery store.',
      'Implement real-time WebSocket connection between operator terminal and student order status tracker.',
      'Explore lightweight edge OCR to verify document page count directly in browser before upload.',
    ],
    links: {
      github: '',
      live: '',
    },
    prevProject: { id: 'portfolio-website', title: 'Developer Portfolio', number: '03' },
    nextProject: { id: 'fast-bite', title: 'Fast Bite', number: '02' },
  },

  'fast-bite': {
    id: 'fast-bite',
    number: '02',
    title: 'Fast Bite',
    category: 'Digital Campus Canteen Ordering System',
    headline: 'Queue-Free Campus Dining with Pre-Ordered Meals, Scheduled Collection & QR Token Verification',
    summary:
      'Fast Bite is a high-speed campus food pre-ordering and kitchen queue management system designed to eliminate cafeteria lunch-hour gridlock and streamline student dining.',
    status: 'CONCEPT & PROTOTYPE',
    role: 'Product Designer & Frontend Engineer',
    timeline: 'Campus Initiative · MLRIT',
    institution: 'MLR Institute of Technology, Hyderabad',
    location: 'Hyderabad, Telangana, India',
    mockupType: 'fastbite',
    overview:
      'College cafeterias face extreme demand spikes during short 45-minute lunch breaks. Hundreds of students converge simultaneously on ordering counters, resulting in chaotic physical crowds, miscommunicated orders, and delayed meal preparations. Fast Bite introduces a pre-ordering workflow where students select lunch items during preceding lecture periods, choose an allocated pickup window, and collect fresh meals instantly via counter-verified QR tokens.',
    problemStatement: {
      lead: 'Campus canteens experience concentrated demand spikes that overwhelm physical counters:',
      points: [
        {
          title: 'Lunch Rush Bottlenecks',
          desc: 'Hundreds of students rush to order in a narrow 30–45 minute window, creating massive lines and wasted break time.',
        },
        {
          title: 'Token Loss & Order Mix-ups',
          desc: 'Physical paper tokens are easily lost, damaged, or misidentified in crowded pickup queues.',
        },
        {
          title: 'Kitchen Throughput Chokepoints',
          desc: 'Kitchen staff cannot forecast demand volumes ahead of rush periods, leading to erratic prep times and cold food.',
        },
        {
          title: 'Lack of Menu Transparency',
          desc: 'Students wait in line only to discover daily specials or preferred items have already sold out.',
        },
      ],
    },
    researchEvidence: {
      lead: 'Cafeteria Flow Observations & Break Timing Patterns:',
      placeholderNotice:
        'Kitchen batch throughput data and formal student wait-time measurements will be added once real canteen integration is piloted.',
      observations: [
        'Over 70% of students converge on the main canteen counter within the first 10 minutes of the lunch bell.',
        'Paper token slips handed to cooks get smeared or misplaced during fast kitchen handoffs.',
        'Items requiring longer prep times (e.g. sandwiches, noodles) cause uneven line stagnation.',
      ],
    },
    designDecisions: [
      {
        title: 'Break-Aligned Scheduled Pickup Windows',
        rationale:
          'Unscheduled mobile orders create a second line at pickup, simply moving the crowd from cashier to counter.',
        outcome:
          'Students select 15-minute pickup slots (e.g., 12:45 PM – 1:00 PM) synced with class dismissal times.',
      },
      {
        title: 'High-Contrast Optical QR Tokens',
        rationale:
          'Cafeteria pickup counters are brightly lit or outdoor-facing; low-contrast screens fail handheld scanners.',
        outcome:
          'Designed high-contrast, bold monochromatic QR tokens with large legible order numbers (#FB-240).',
      },
      {
        title: 'Campus Meal Reward Credits',
        rationale:
          'Encourages repeat adoption and advance ordering over cash counter transactions.',
        outcome:
          'Modeled a simple, transparent reward points tier (0.5 points per ₹1 spent) redeemable on future orders.',
      },
    ],
    solutionStatement: {
      lead: 'Fast Bite eliminates cafeteria friction through asynchronous ordering, kitchen batching, and express counter dispatch:',
      pillars: [
        {
          title: 'Mobile-First Quick Order Menu',
          desc: 'Clean, category-filtered menu with live stock indicators and instant customization toggles.',
        },
        {
          title: 'Scheduled Collection Intervals',
          desc: 'Pick up slots synced with class dismissal times to distribute kitchen load evenly across the lunch hour.',
        },
        {
          title: 'Live Kitchen State Pipeline',
          desc: 'Students monitor their order status in real time (Order Placed → In Prep → Ready at Counter).',
        },
        {
          title: 'QR Token Verification at Counter',
          desc: 'Single-scan optical token authentication ensures immediate handoff with zero cash-counter delay.',
        },
      ],
    },
    studentWorkflow: [
      {
        step: '01',
        title: 'Browse Live Campus Menu',
        desc: 'Review available meals, combos, and beverages with live stock indicators from anywhere on campus.',
      },
      {
        step: '02',
        title: 'Customize Meal & Select Slot',
        desc: 'Select portion preferences and choose an express pickup window synced to your lunch break.',
      },
      {
        step: '03',
        title: 'Track Kitchen Preparation',
        desc: 'Monitor real-time progress as kitchen staff mark the meal from In Prep to Ready at Counter.',
      },
      {
        step: '04',
        title: 'Instant QR Counter Verification',
        desc: 'Approach express counter, present the digital QR token, and pick up your meal in seconds.',
      },
    ],
    adminWorkflow: [
      {
        step: '01',
        title: 'Batch Order Ingestion',
        desc: 'Orders display on kitchen terminal categorized by scheduled collection slots for optimized batch cooking.',
      },
      {
        step: '02',
        title: 'One-Tap Kitchen State Updates',
        desc: 'Staff mark items ready with single-tap kitchen display system (KDS) buttons.',
      },
      {
        step: '03',
        title: 'Counter Verification & Handoff',
        desc: 'Express counter scanner reads student QR code, displays order items, and marks meal dispensed.',
      },
    ],
    deepDiveFeatures: [
      {
        title: 'Mobile-First Quick Order Engine',
        tag: 'CLIENT UI',
        desc: 'Engineered for one-handed thumb navigation during campus walks between classroom blocks.',
        specs: [
          'High-contrast category switcher (Meals, Quick Bites, Beverages)',
          'Instant cart calculation with campus reward point estimates',
          'Dietary preference and add-on toggles (Extra Cheese, Spice Level)',
        ],
      },
      {
        title: 'Synchronized Slot Allocation',
        tag: 'THROUGHPUT',
        desc: 'Limits orders per time window to match kitchen cooking velocity and avoid bottlenecking prep lines.',
        specs: [
          '15-minute time window quotas',
          'Capacity threshold alerts for kitchen supervisors',
          'Grace-period pickup policies for students delayed by professors',
        ],
      },
      {
        title: 'Three-Stage Kitchen Queue Tracker',
        tag: 'STATUS PIPELINE',
        desc: 'Keeps students updated so they only approach the counter when their food is boxed and hot.',
        specs: [
          'State 1: Order Placed & Confirmed',
          'State 2: Kitchen Prepping (Active pulse)',
          'State 3: Ready at Counter (Pending scan)',
        ],
      },
    ],
    verificationArchitecture: {
      title: 'Counter Order Token Authentication Protocol',
      description:
        'Canteen staff scan the student’s unique order QR (#FB-240) at the designated express pickup counter. The token authenticates the food token in seconds, confirms exact ordered items on the staff screen, and eliminates queue congestion during the peak 30-minute lunch rush.',
      keyPoints: [
        'Dedicated express collection bypasses physical cashier lines entirely',
        'High-contrast QR display optimized for fast optical counter scanning',
        'Prevents fraudulent redemption and token duplication',
        'Includes counter number routing (#01, #02, #03) for crowd dispersal',
      ],
    },
    techStack: [
      {
        category: 'Client & Architecture',
        items: ['React 19', 'TypeScript', 'Tailwind CSS'],
        justification:
          'Ensures optimal mobile performance, rapid tap response, and smooth menu animations on cellular networks.',
      },
      {
        category: 'Interactive Simulation',
        items: ['Motion', 'Reactive State Hooks', 'Lucide Icons'],
        justification:
          'Powers the interactive menu customizer, live reward point calculator, and step-by-step order tracker.',
      },
      {
        category: 'Verification & Logic',
        items: ['QR Generation Logic', 'Slot Distribution Algorithm', 'Cart Engine'],
        justification:
          'Calculates real-time point rewards, controls counter tokens, and manages pickup window scheduling.',
      },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Balancing kitchen cooking speed with scheduled student arrivals',
        solution:
          'Introduced buffer thresholds and staggered 15-minute slot quotas so kitchen throughput is never exceeded.',
        takeaway:
          'Real-world software must accommodate the physical capacity constraints of kitchens and staff.',
      },
      {
        challenge: 'Campus reward token economics and student engagement',
        solution:
          'Designed a transparent 0.5 points per ₹1 spent model with immediate feedback in the checkout card.',
        takeaway:
          'Gamification is most effective when the value is immediate, clear, and tangible to the student.',
      },
    ],
    whatIWouldDoDifferently: [
      'Simulate kitchen assembly line stations before locking the order category hierarchy.',
      'Design an explicit offline fallback screen for students entering dead zones in cafeteria basements.',
      'Include customizable allergen alerts in the item selection drawer.',
    ],
    nextSteps: [
      'Validate time-to-collection improvements during mock lunch rushes with student peers.',
      'Develop real-time inventory decrementing logic for high-demand seasonal items.',
      'Explore push notification alerts when an order transitions to Ready at Counter.',
    ],
    links: {
      github: '',
      live: '',
    },
    prevProject: { id: 'statio-mlr', title: 'Statio-MLR', number: '01' },
    nextProject: { id: 'portfolio-website', title: 'Developer Portfolio', number: '03' },
  },

  'portfolio-website': {
    id: 'portfolio-website',
    number: '03',
    title: 'Personal Developer Portfolio',
    category: 'Creative Developer & Engineering Portfolio',
    headline: 'High-Performance, Accessible, Kinetic Engineering Portfolio with Zero-Fabricated Data',
    summary:
      'A personal engineering portfolio built with React 19, Vite 8, TypeScript, and Tailwind CSS v4. Engineered for 60fps animations, WCAG AA compliance, and scrollytelling project architectures.',
    status: 'ACTIVE DEVELOPMENT',
    role: 'Solo Designer & Frontend Engineer',
    timeline: '2025 · Active Repository',
    institution: 'Independent Engineering Project',
    location: 'Hyderabad, Telangana, India',
    mockupType: 'portfolio',
    overview:
      'Most student developer portfolios suffer from inflated metrics, generic templates, or unresponsive decorative animations. This portfolio was engineered from first principles with a dark obsidian canvas (#080A0D), electric lime accents (#C6FF00), custom dual-layer spring cursors, scrollytelling case studies, and single source of truth data architecture.',
    problemStatement: {
      lead: 'Developer portfolios frequently fail recruiter evaluation on several core fronts:',
      points: [
        {
          title: 'Fabricated or Unverifiable Claims',
          desc: 'Candidates often claim artificial percentage meters (e.g., "95% Python") or unverified production metrics that erode recruiter trust.',
        },
        {
          title: 'Sluggish Animations & Performance Drops',
          desc: 'Heavy 3D scenes and unoptimized re-renders drop frames on lower-power devices, harming user experience and Core Web Vitals.',
        },
        {
          title: 'Poor Mobile & Accessibility Ergonomics',
          desc: 'Decorative custom cursors and unmanaged focus traps make portfolios unnavigable on touch devices and for keyboard users.',
        },
        {
          title: 'Generic Layouts & Cookie-Cutter Templates',
          desc: 'Fails to showcase distinctive visual craft, editorial precision, or disciplined engineering philosophy.',
        },
      ],
    },
    researchEvidence: {
      lead: 'Recruiter Evaluation Criteria & Technical Auditing Standards:',
      placeholderNotice:
        'Lighthouse performance scores and automated axe-core accessibility audit reports are documented in CHANGELOG.md.',
      observations: [
        'Technical recruiters spend under 30 seconds scanning candidate projects before checking source repositories.',
        'Accessible, keyboard-navigable sites with working Cmd+K palettes immediately signal engineering seniority.',
        'Strict honesty regarding in-progress prototypes builds far higher credibility than exaggerated production claims.',
      ],
    },
    designDecisions: [
      {
        title: 'Single Source of Truth Architecture',
        rationale:
          'Scattering bio, contact, and project info across multiple files causes conflicting claims and broken links.',
        outcome:
          'Consolidated all verified details into src/data/portfolioData.ts and src/data/resume.ts.',
      },
      {
        title: 'Hardware-Accelerated Kinetic Cursor',
        rationale:
          'Laggy custom cursors feel cheap and disorienting. Smooth cursor requires rAF loops and transform-only updates.',
        outcome:
          'Dual-layer cursor (instant dot + spring ring) with context morphing; automatically disabled on touch devices.',
      },
      {
        title: 'Strict Accessibility & Reduced-Motion Respect',
        rationale:
          'Visual wow-factor must never come at the cost of excluding users with motion sensitivity or keyboard navigation.',
        outcome:
          'Full WCAG AA contrast compliance, keyboard skip link, and automatic static fallbacks under prefers-reduced-motion.',
      },
    ],
    solutionStatement: {
      lead: 'An engineered digital portfolio that balances creative atmosphere with technical rigor:',
      pillars: [
        {
          title: 'Vite 8 & React 19 Engine',
          desc: 'Instant module replacement, code-splitting, and near-zero client-side routing latency.',
        },
        {
          title: 'Tailwind CSS v4 Token Architecture',
          desc: 'Disciplined design system with sharp square corners, hairline borders, and neon telemetry accents.',
        },
        {
          title: 'Interactive Prototype Simulators',
          desc: 'Working interactive mockups allowing recruiters to test project workflows directly on the page.',
        },
        {
          title: 'ATS-Friendly Resume Spec',
          desc: 'Single-column, A4 print-styled resume route (/resume) with verifiable plaintext content and PDF export.',
        },
      ],
    },
    studentWorkflow: [
      {
        step: '01',
        title: 'Explore System Telemetry',
        desc: 'Review verified engineering background, MLRIT AIML undergraduate coursework, and verified competencies.',
      },
      {
        step: '02',
        title: 'Interact with Project Prototypes',
        desc: 'Test real document pricing and menu ordering workflows directly in responsive client simulators.',
      },
      {
        step: '03',
        title: 'Inspect Scrollytelling Case Studies',
        desc: 'Deep-dive into architectural tradeoffs, problem statements, and system topology diagrams.',
      },
      {
        step: '04',
        title: 'Verify Direct Code & Resume',
        desc: 'Audit the public GitHub repository, download verified resume, or execute commands via Cmd+K.',
      },
    ],
    adminWorkflow: [
      {
        step: '01',
        title: 'Automated CI / CD Verification',
        desc: 'GitHub Actions workflow runs TypeScript typechecks and production builds on every commit.',
      },
      {
        step: '02',
        title: 'Single-Command Data Updates',
        desc: 'Personal details, hackathon notes, and skills update globally through centralized data manifests.',
      },
      {
        step: '03',
        title: 'Edge Deployment on Vercel',
        desc: 'Global CDN distribution ensures fast asset delivery across international review teams.',
      },
    ],
    deepDiveFeatures: [
      {
        title: 'Global Keyboard Command Palette',
        tag: 'ERGONOMICS',
        desc: 'Cmd+K / Ctrl+K terminal allowing rapid keyboard navigation across projects, resume, and direct channels.',
        specs: [
          'Full keyboard focus trapping with Escape dismissal',
          'Search query fuzzy filtering',
          'Direct mailto dispatch and clipboard actions',
        ],
      },
      {
        title: 'Dual-Layer Kinetic Cursor System',
        tag: 'INTERACTION',
        desc: 'Smooth spring physics cursor with context-aware labels (EXPLORE, VIEW, PLAY, DRAG).',
        specs: [
          'Pointer fine media query gating',
          'Touch device auto-deactivation',
          'Mix-blend-mode difference headline inversion',
        ],
      },
      {
        title: 'Scrollytelling Interactive Canvas',
        tag: 'ARCHITECTURE',
        desc: 'Synchronized pinned device frame that updates stages as user scrolls through project rationale.',
        specs: [
          'IntersectionObserver step detection',
          'Inline vector SVG architecture diagrams',
          'Reduced-motion stacked vertical fallback',
        ],
      },
    ],
    verificationArchitecture: {
      title: 'Performance & Accessibility Architecture',
      description:
        'The portfolio is built with progressive enhancement: advanced WebGL shaders and spring cursors enhance the experience on high-power desktop hardware, but automatically degrade gracefully into static CSS ambient glows and native pointers on touch devices or under reduced-motion preferences.',
      keyPoints: [
        'OGL WebGL shader lazy-loaded and paused when offscreen',
        'Lenis inertia scroll hooked into requestAnimationFrame with zero layout thrash',
        'WCAG AA contrast ratios validated across dark obsidian canvas',
        'Zero external runtime bloat: minimal targeted component design',
      ],
    },
    techStack: [
      {
        category: 'Core Framework',
        items: ['Vite 8', 'React 19', 'TypeScript', 'React Router v7'],
        justification:
          'Delivers maximum development velocity, strict type safety, and instant client routing.',
      },
      {
        category: 'Motion & WebGL',
        items: ['Motion', 'Lenis', 'OGL', 'Tailwind CSS v4'],
        justification:
          'Powers fluid 60fps animations, smooth inertia scrolling, and lightweight GPU shader canvases.',
      },
      {
        category: 'Tooling & CI',
        items: ['GitHub Actions', 'Vercel Edge', 'Lucide Icons'],
        justification:
          'Automates typechecking, builds, and global edge CDN distribution with zero latency.',
      },
    ],
    challengesAndLearnings: [
      {
        challenge: 'Maintaining 60fps performance with custom cursor and WebGL shaders simultaneously',
        solution:
          'Batched all cursor updates into a single requestAnimationFrame loop using transform-only CSS properties, and capped shader DPR at 1.5.',
        takeaway:
          'Never trigger browser layout recalculations inside mousemove or scroll event handlers.',
      },
      {
        challenge: 'Designing an ATS-friendly resume alongside a futuristic visual identity',
        solution:
          'Built a dedicated /resume route with clean black-on-white A4 print styling and visible URLs, wrapped in a screen-only dark preview.',
        takeaway:
          'Never sacrifice real-world utility or recruiter readability for decorative flair.',
      },
    ],
    whatIWouldDoDifferently: [
      'Implement route-level code splitting earlier to keep main vendor chunks below 300 kB.',
      'Adopt SVG inline vector diagrams from the start rather than relying on raster graphics.',
      'Establish strict design token variables before composing any individual components.',
    ],
    nextSteps: [
      'Incorporate an in-browser ML inference playground at /lab using synthetic canteen queue models.',
      'Add skippable monogram entrance intro for first-time session visitors.',
      'Set up end-to-end automated smoke tests via Playwright and axe-core.',
    ],
    links: {
      github: 'https://github.com/navadeepjustin-create/portfolio',
      live: 'https://portfolio-one-alpha-6gy1a73x99.vercel.app',
    },
    prevProject: { id: 'fast-bite', title: 'Fast Bite', number: '02' },
    nextProject: { id: 'statio-mlr', title: 'Statio-MLR', number: '01' },
  },
};
