const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'resume.pdf');

if (fs.existsSync(targetPath)) {
  console.log('public/resume.pdf already exists. Preserving.');
  process.exit(0);
}

// Minimal valid PDF-1.4 generator with Helvetica font
function createTextPdf() {
  const lines = [
    'NAVADEEP',
    'B.Tech (AIML) Student - Software Developer | Hyderabad, Telangana, India',
    'navadeepjustin@gmail.com | linkedin.com/in/navadeep-justin-946366371 | github.com/navadeepjustin-create',
    'Portfolio: https://portfolio-one-alpha-6gy1a73x99.vercel.app',
    '--------------------------------------------------------------------------------------------------',
    'SUMMARY',
    'B.Tech AIML student at MLR Institute of Technology who turns practical campus problems into carefully',
    'designed software. Front-end focused (React, Tailwind CSS) with a working base in Python, Java, SQL',
    'and machine learning fundamentals. Seeking software engineering, full-stack or applied AI/ML internships.',
    '',
    'EDUCATION',
    'B.Tech in Computer Science & Engineering (AI & ML), MLRIT, Hyderabad (2022 - 2026, in progress)',
    '* Coursework in Artificial Intelligence, Machine Learning and Data Structures',
    '* Hands-on lab work in Python, Java and SQL database design',
    '* Active in campus technical initiatives, workshops and buildathons',
    '',
    'PROJECTS',
    'Statio-MLR: Campus Digital Xerox & Stationery Ordering System (React, TypeScript, Tailwind CSS)',
    '* Designed student workflow for document upload, print options (B&W/color, binding) and price calculation.',
    '* Modeled live order status and scheduled collection slot picker to reduce photocopy queues.',
    '* Defined counter-only QR pickup-verification flow for shop staff, kept separate from payment.',
    '* Authored the software requirements specification (SRS) for the platform.',
    '',
    'Fast Bite: Digital Campus Canteen Ordering System (React, TypeScript, Tailwind CSS)',
    '* Designed mobile-first ordering interface with canteen menus, availability and customization.',
    '* Prototyped scheduled pickup windows aligned with lecture/break timings with QR counter verification.',
    '* Modeled live kitchen status (Order Placed, In Prep, Ready at Counter) and campus reward-points concept.',
    '',
    'Personal Portfolio Website (React 19, TypeScript, Vite, Tailwind CSS v4, Motion; source on GitHub)',
    '* Built responsive multi-page site with case-study routes, project simulators, and Cmd/Ctrl+K palette.',
    '* Added accessibility basics: reduced-motion support, keyboard skip link and visible focus styles.',
    '',
    'HACKATHONS',
    '* Participant, Cloud technology hackathon',
    '* Participant, Finathon',
    '',
    'TECHNICAL SKILLS',
    '* AI / ML: machine learning fundamentals, data preprocessing, model evaluation',
    '* Languages: Python, Java',
    '* Web Development: React, Tailwind CSS, HTML5/CSS3, responsive design',
    '* DBMS: database management systems, SQL and schema design, database fundamentals, REST APIs, Supabase',
    '* Prompting: prompt design and iteration',
    '* Tools: Git and GitHub, VS Code, Vite, Linux and shell basics',
    '* Core CS: data structures and algorithms, object-oriented design'
  ];

  let stream = 'BT\n/F1 10 Tf\n40 760 Td\n14 TL\n';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    if (i === 0) {
      stream += `/F2 16 Tf (${line}) Tj /F1 10 Tf T*\n`;
    } else if (['SUMMARY', 'EDUCATION', 'PROJECTS', 'HACKATHONS', 'TECHNICAL SKILLS'].includes(lines[i])) {
      stream += `T* /F2 11 Tf (${line}) Tj /F1 10 Tf T*\n`;
    } else {
      stream += `(${line}) Tj T*\n`;
    }
  }
  stream += 'ET\n';

  const streamLen = Buffer.byteLength(stream);

  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>';
  objects[4] = `<< /Length ${streamLen} >>\nstream\n${stream}endstream`;
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[6] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  let pdf = '%PDF-1.4\n';
  const offsets = [];

  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(pdf);
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf);
  pdf += 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 1; i <= 6; i++) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  fs.writeFileSync(targetPath, pdf);
  console.log(`Generated valid PDF at ${targetPath}`);
}

createTextPdf();
