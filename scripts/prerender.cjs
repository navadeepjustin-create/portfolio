const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_HTML = path.join(DIST_DIR, 'index.html');
const SITE_URL = 'https://portfolio-one-alpha-6gy1a73x99.vercel.app';

const ROUTES = [
  {
    path: '/projects',
    title: 'Projects // Campus Platforms & Architecture Prototypes — Navadeep',
    description: 'Explore interactive prototypes and architecture specifications for campus platforms Statio-MLR, Fast Bite, and client-side systems.',
  },
  {
    path: '/projects/statio-mlr',
    title: 'Statio-MLR: Campus Xerox & Stationery System // Case Study — Navadeep',
    description: 'Deep-dive into the student print workflow, decoupled QR pickup tokens, and counter queue elimination system at MLRIT.',
  },
  {
    path: '/projects/fast-bite',
    title: 'Fast Bite: Digital Campus Canteen Ordering // Case Study — Navadeep',
    description: 'Mobile-first campus cafeteria queue scheduling, scheduled pickup windows, and token verification workflow.',
  },
  {
    path: '/about',
    title: 'About // Technical Foundations & Philosophy — Navadeep',
    description: 'Undergraduate engineering journey in CSE (AI & ML) at MLRIT Hyderabad, technical philosophy, and verified hackathons.',
  },
  {
    path: '/resume',
    title: 'Resume // ATS Single-Column Engineering Specification — Navadeep',
    description: 'Clean, single-column, ATS-friendly curriculum vitae for software engineering and applied AI/ML internship roles.',
  },
  {
    path: '/lab',
    title: 'Lab // In-Browser Client-Side ML Playground — Navadeep',
    description: 'Real-time feedforward neural inference estimating canteen wait times in pure client-side TypeScript with zero API calls.',
  },
  {
    path: '/notes',
    title: 'Engineering Notes // Architectural Field Logs — Navadeep',
    description: 'Technical reflections on decoupling QR tokens, client-side inference latency, and designing physical human workflows.',
  },
];

function prerender() {
  if (!fs.existsSync(BASE_HTML)) {
    console.error('Base index.html not found in dist. Run vite build first.');
    process.exit(1);
  }

  const baseHtmlContent = fs.readFileSync(BASE_HTML, 'utf-8');

  for (const route of ROUTES) {
    const routeDir = path.join(DIST_DIR, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    let prerendered = baseHtmlContent;

    // Replace Title
    prerendered = prerendered.replace(
      /<title>.*?<\/title>/,
      `<title>${route.title}</title>`
    );

    // Replace Description
    prerendered = prerendered.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace Canonical
    prerendered = prerendered.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
      `<link rel="canonical" href="${SITE_URL}${route.path}" />`
    );

    // Replace OpenGraph Title & Description
    prerendered = prerendered.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
      `<meta property="og:title" content="${route.title}" />`
    );
    prerendered = prerendered.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
      `<meta property="og:description" content="${route.description}" />`
    );
    prerendered = prerendered.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
      `<meta property="og:url" content="${SITE_URL}${route.path}" />`
    );

    // Replace Twitter Title & Description
    prerendered = prerendered.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    prerendered = prerendered.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    const outPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(outPath, prerendered, 'utf-8');
    console.log(`Prerendered HTML: ${outPath} (${prerendered.length} bytes)`);
  }
}

prerender();
