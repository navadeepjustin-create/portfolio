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
  mockupType: 'statio' | 'fastbite';
  overview: string;
  problemStatement: {
    lead: string;
    points: { title: string; desc: string }[];
  };
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
    status: 'ACTIVE DEVELOPMENT / ARCHITECTURE PROTOTYPE',
    role: 'Lead Concept Designer & Frontend Architect',
    timeline: 'Campus Initiative · MLRIT',
    institution: 'MLR Institute of Technology, Hyderabad',
    location: 'Hyderabad, Telangana, India',
    mockupType: 'statio',
    overview:
      'In collegiate environments, exam weeks and assignment deadlines trigger massive physical congestion at on-campus stationery and photocopy centers. Students wait 30-45 minutes simply to hand over a flash drive, explain paper specs, and wait for manual printing. Statio-MLR digitizes the entire pre-print phase, allowing students to submit documents from their phones, customize granular print preferences, calculate exact pricing upfront, and pick up verified printouts via a counter QR token.',
    problemStatement: {
      lead: 'Physical stationery counters suffer from severe friction points during high-stakes academic deadlines:',
      points: [
        {
          title: 'USB Flash Drive & File Transfer Delays',
          desc: 'Students queue up just to plug in thumb drives or email files to counter PCs, causing major physical bottlenecks and malware vulnerability.',
        },
        {
          title: 'Print Specification Misunderstandings',
          desc: 'Verbal communication of duplex vs. simplex, specific page ranges, color slides, and binding choices frequently results in incorrect prints and financial waste.',
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
    solutionStatement: {
      lead: 'Statio-MLR introduces an asynchronous campus print workflow built around transparency, precision, and rapid collection:',
      pillars: [
        {
          title: 'Digital File Ingestion & Validation',
          desc: 'Students upload academic documents directly from mobile or laptop with automatic page counting and format validation.',
        },
        {
          title: 'Granular Print Spec Engine',
          desc: 'Instant toggle between B&W (₹1.50/page) and Color (₹5.00/page), spiral binding options (+₹30.00), and custom page spans with live cost feedback.',
        },
        {
          title: 'Staggered Pickup Scheduling',
          desc: 'Students choose collection windows (e.g. 11:30 AM, 1:15 PM) matching break intervals to flatten queue peaks.',
        },
        {
          title: 'Counter-Only QR Identification Protocol',
          desc: 'A dedicated QR token is scanned by shop staff strictly for order matching and pickup confirmation, cleanly separating counter handoff from payment handling.',
        },
      ],
    },
    studentWorkflow: [
      {
        step: '01',
        title: 'Upload Academic Material',
        desc: 'Select PDF, lab manuals, or slide decks. The system automatically reads page metrics.',
      },
      {
        step: '02',
        title: 'Configure Print Parameters',
        desc: 'Choose B&W or Color output, select duplex/simplex, and add optional spiral or soft binding.',
      },
      {
        step: '03',
        title: 'Real-Time Cost & Slot Selection',
        desc: 'Inspect the transparent price breakdown and select a convenient campus pickup slot matching your class timetable.',
      },
      {
        step: '04',
        title: 'Token Generation & Live Tracking',
        desc: 'Receive a unique order token (e.g. #ST-094) with a live preparation badge (Uploaded → In Print → Ready).',
      },
      {
        step: '05',
        title: '3-Second Counter Pickup',
        desc: 'Present the QR token at the Xerox counter. Staff scans and delivers the pre-bundled printout instantly.',
      },
    ],
    adminWorkflow: [
      {
        step: '01',
        title: 'Central Operator Queue',
        desc: 'Shop operator dashboard displays incoming print jobs grouped by scheduled collection slot.',
      },
      {
        step: '02',
        title: 'Automated Print Spooling',
        desc: 'Documents open with pre-configured print parameters, eliminating manual driver configuration.',
      },
      {
        step: '03',
        title: 'Pre-Packaging & Slot Shelving',
        desc: 'Completed jobs are stapled/bound and placed in slot cubbies labeled with the order ID.',
      },
      {
        step: '04',
        title: 'QR Scan & Delivery Confirmation',
        desc: 'When student arrives, operator scans the QR with mobile or optical scanner to verify handoff and close the ticket.',
      },
    ],
    deepDiveFeatures: [
      {
        title: 'Document Specification & Live Pricing Engine',
        tag: 'CORE ALGORITHM',
        desc: 'Automates mathematical cost determination instantly based on document metadata and user preferences.',
        specs: [
          'Automatic page count detection',
          'Dynamic unit rate toggling (₹1.50 B&W vs ₹5.00 Color)',
          'Modular accessory calculation (spiral binding +₹30)',
          'Real-time reactive price breakdown display',
        ],
      },
      {
        title: 'Intelligent Time-Slot Reservation',
        tag: 'LOGISTICS',
        desc: 'Prevents counter rushes by distributing pickup windows across academic schedule gaps.',
        specs: [
          'Pre-set campus break interval slots (11:30 AM, 1:15 PM, 3:45 PM)',
          'Capacity constraints per window to guarantee zero queueing',
          'Buffer time calculation for complex binding tasks',
        ],
      },
      {
        title: 'Dual-State Queue Tracking System',
        tag: 'MONITORING',
        desc: 'Synchronizes order state between student phone and shop counter terminal.',
        specs: [
          'Phase 1: Uploaded & Document Verified',
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
          'Ensures lightning-fast initial load times, strict type safety for print parameter calculations, and responsive ergonomics on student smartphones.',
      },
      {
        category: 'State & UI Simulation',
        items: ['Motion (Framer)', 'Lucide Icons', 'Modular React Hooks'],
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
          'Engineered an offline-resilient local token cache so students can display their pickup QR code even inside basement photocopy shops without mobile network.',
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
    links: {
      github: '',
      live: '',
    },
    prevProject: { id: 'fast-bite', title: 'Fast Bite', number: '02' },
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
    role: 'Product Designer & Full-Stack Systems Thinker',
    timeline: 'Campus Prototype · MLRIT',
    institution: 'MLR Institute of Technology, Hyderabad',
    location: 'Hyderabad, Telangana, India',
    mockupType: 'fastbite',
    overview:
      'During college lunch breaks, hundreds of students converge simultaneously on campus cafeterias and snack kiosks. The 30-40 minute lunch break is frequently exhausted standing in cashier lines and food preparation crowds. Fast Bite transforms campus dining by allowing students to browse real-time canteen menus, schedule pickup windows synchronized with their lecture dismissal, track kitchen prep live, and retrieve meals with a quick counter QR scan.',
    problemStatement: {
      lead: 'Campus canteens face unique operational hurdles during peak midday breaks:',
      points: [
        {
          title: 'Extreme Rush Hour Clustering',
          desc: 'Hundreds of students hit the cafeteria within a 5-minute window following bell rings, overwhelming cashier counters.',
        },
        {
          title: 'Uncertain Food Preparation Times',
          desc: 'Students have no visibility into kitchen queue lengths, often ordering items that take 20 minutes to prepare when they only have 10 minutes.',
        },
        {
          title: 'Lost Paper Tokens & Order Mix-ups',
          desc: 'Paper food tokens tear, get misplaced, or get handed to the wrong customer at crowded pickup ledges.',
        },
        {
          title: 'Unpredictable Food Wastage & Stockouts',
          desc: 'Canteen kitchens struggle to anticipate demand, leading to afternoon shortages of popular items and wastage of others.',
        },
      ],
    },
    solutionStatement: {
      lead: 'Fast Bite replaces physical queues with synchronized digital pre-ordering and token verification:',
      pillars: [
        {
          title: 'Mobile Menu Browsing & Customization',
          desc: 'Students explore live menus with current dish availability, pricing, and dietary preferences on their personal devices.',
        },
        {
          title: 'Timetable-Synced Pickup Windows',
          desc: 'Pre-order during class or before break and schedule collection for specific intervals (e.g. 1:00 PM - 1:15 PM, 1:20 PM - 1:35 PM).',
        },
        {
          title: 'Live Kitchen Preparation Status',
          desc: 'Transparent progression indicators (Order Placed → Kitchen Prepping → Ready at Counter).',
        },
        {
          title: 'QR Token Counter Verification',
          desc: 'Fast verification token (#FB-240) scanned by canteen staff at the dedicated pickup window in under 2 seconds.',
        },
      ],
    },
    studentWorkflow: [
      {
        step: '01',
        title: 'Open Fast Bite Portal',
        desc: 'Access the mobile-first canteen interface to see current cafe menus and live queue indicators.',
      },
      {
        step: '02',
        title: 'Build Meal & Customize',
        desc: 'Select dishes (e.g. Paneer Tikka Roll, Artisan Cold Coffee) with instant subtotal and reward points calculation.',
      },
      {
        step: '03',
        title: 'Select Pickup Window',
        desc: 'Lock in a pickup slot (e.g. 1:20 PM - 1:35 PM) at a specific counter to bypass the cashier line entirely.',
      },
      {
        step: '04',
        title: 'Track Live Prep & Receive QR Token',
        desc: 'Monitor kitchen status in real time and obtain an authenticated QR order token.',
      },
      {
        step: '05',
        title: 'Walk-up & Collect',
        desc: 'Head to the express pickup window, display the QR token, collect fresh food, and enjoy lunch without queueing.',
      },
    ],
    adminWorkflow: [
      {
        step: '01',
        title: 'Kitchen Order Management Screen',
        desc: 'Kitchen staff see an ordered ticket queue organized by scheduled pickup window.',
      },
      {
        step: '02',
        title: 'Batch Food Preparation',
        desc: 'Cooks batch similar orders together to optimize kitchen throughput during peak demand.',
      },
      {
        step: '03',
        title: 'Status Update to "Ready"',
        desc: 'When packaged, staff click one button to trigger the student alert and move the tray to the pickup counter.',
      },
      {
        step: '04',
        title: 'Counter QR Authentication',
        desc: 'Staff scans the student QR token, validates items, hands over the tray, and closes the ticket in 2 seconds.',
      },
    ],
    deepDiveFeatures: [
      {
        title: 'Menu Customizer & Reward Points Engine',
        tag: 'STUDENT EXPERIENCE',
        desc: 'Interactive dish selection with instant reward point accrual (0.5 points per ₹1 spent) redeemable for campus meals.',
        specs: [
          'Live cart manipulation with instant pricing updates',
          'Automated reward point calculation (+points per meal)',
          'Dietary tagging and category filtering',
        ],
      },
      {
        title: 'Scheduled Collection Engine',
        tag: 'SCHEDULING LOGIC',
        desc: 'Aligns kitchen orders with college academic schedules to prevent queue congestion.',
        specs: [
          'Pre-allocated pickup slots (1:00 PM - 1:15 PM, 1:20 PM - 1:35 PM)',
          'Counter slot balancing to avoid kitchen bottlenecks',
          'Express collection lane guarantee',
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
        items: ['Motion (Framer)', 'Reactive State Hooks', 'Lucide Icons'],
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
    links: {
      github: '',
      live: '',
    },
    prevProject: { id: 'statio-mlr', title: 'Statio-MLR', number: '01' },
    nextProject: { id: 'statio-mlr', title: 'Statio-MLR', number: '01' },
  },
};
