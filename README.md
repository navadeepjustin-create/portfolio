# NAVADEEP — Developer Portfolio

A high-performance personal developer portfolio built for **Navadeep**, a B.Tech Computer Science & Engineering (AIML) student at **MLR Institute of Technology (MLRIT), Hyderabad**.

Built with precision dark aesthetics, square-edge architecture, hairline telemetry borders, electric lime accents, interactive prototypes, and accessible navigation.

---

## 🎨 Visual Identity & Design System

- **Palette**:
  - Deep Canvas: `#080A0D`
  - Graphite Panels: `#11151A`
  - Elevated Surface: `#171D24`
  - Accent: Electric Lime `#C6FF00`
  - Foreground: `#F4F6F8`
  - Muted Telemetry: `#929BA6`
  - Hairline Borders: `rgba(244, 246, 248, 0.08)`
- **Typography**:
  - Display: **Space Grotesk**
  - Sans: **Inter**
  - Monospace: **JetBrains Mono**
- **Architecture**:
  - `00 // Hero`: Status pill, bold headline, terminal command palette trigger, verified sunset portrait.
  - `01 // About`: Philosophy, academic rigor at MLRIT, core technical mindset.
  - `02 // Featured Projects`: Interactive prototypes for **Statio-MLR** and **Fast Bite**, plus this open-source portfolio.
  - `03 // Approach`: 4-Phase engineering methodology (`01 DISCOVER`, `02 DESIGN`, `03 BUILD`, `04 REFINE`).
  - `04 // Skills`: Categorized technical matrix with zero fabricated progress bars.
  - `05 // Education`: Factual academic coursework in AIML, DBMS, and algorithms.
  - `06 // Contact`: Direct transmission card, verified social channels, validated contact form.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4
- **Animation & Motion**: Motion (`motion/react`)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React + Custom SVG Brand Marks

---

## ⚙️ Content Editing Guide (Single Source of Truth)

All verified personal information, projects, hackathon records, and social links are managed centrally in [`src/data/portfolioData.ts`](src/data/portfolioData.ts):

```typescript
export const portfolioData = {
  personal: {
    name: 'NAVADEEP',
    degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad, Telangana, India',
    ...
  },
  contact: {
    email: 'navadeepjustin@gmail.com',
    github: 'https://github.com/navadeepjustin-create',
    linkedin: 'https://www.linkedin.com/in/navadeep-justin-946366371',
    instagram: 'https://instagram.com/navdeep_.07',
  }
};
```

---

## 🚀 Development Scripts

```bash
# Start Vite local development server (runs at http://localhost:5173/)
npm run dev

# Run TypeScript typechecker with zero emission
npm run typecheck

# Run Vitest test suite (data integrity & component tests)
npm run test

# Build optimized production bundle with route prerendering & git telemetry
npm run build

# Preview production build locally (runs at http://localhost:4173/)
npm run preview

# Generate updated ATS resume PDF with Playwright
npm run resume:pdf
```

---

## 🐙 Git & Deployment Workflow

This project deploys automatically to **Vercel** when commits are pushed to the `main` branch.

To push commits securely using the GitHub CLI:

```bash
# 1. Authenticate with your GitHub account (one-time setup)
gh auth login

# 2. Stage and commit changes
git add .
git commit -m "feat: your change description"

# 3. Push to GitHub
git push origin main
```
