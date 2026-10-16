# NAVADEEP — Editorial Portfolio

An editorial, high-performance developer portfolio built for **Navadeep**, an AIML engineering student at **MLR Institute of Technology (MLRIT), Hyderabad**.

Inspired by modern high-end editorial portfolios, combining the sensibilities of a premium creative developer portfolio, a modern AI/technology brand, and an interactive digital showcase.

---

## 🎨 Visual Identity & Design System

- **Editorial Palette**:
  - Warm Off-White (`#F5F5F0`) — Primary editorial canvas
  - Deep Charcoal (`#1A1A1A` / `#111111`) — Immersive dark sections
  - Signature Electric Lime (`#D1FF00`) — Dynamic accents, indicators, active states
  - Hairline Borders (`#DADAD3` on light / `#333333` on dark)
- **Typography Pairing**:
  - Display: **Space Grotesk** (Geometric, oversized, tight letter-spacing)
  - Interface: **Inter** (High readability, neutral, modern)
  - Code & Monospace: **JetBrains Mono**
- **Alternating Rhythm**:
  - **00 // Hero**: Warm off-white canvas with oversized editorial typography, telemetry coordinates, and interactive generative neural mesh canvas with custom `ND` personal brand monogram.
  - **01 // About**: Immersive deep charcoal surface ("CURIOUS BY DEFAULT.") exploring the bridge between AI algorithms and real user experience.
  - **02 // Selected Projects**:
    - **Statio-MLR**: College Digital Xerox & Stationery Ordering System (interactive cost calculator, document upload, print specs, scheduled slots, and QR pickup verification).
    - **Fast Bite**: Digital Campus Canteen Ordering System (canteen menu customizer, scheduled pickup windows, live kitchen queue, counter QR token, campus rewards).
  - **03 // Approach**: 4-phase methodology (`01 DISCOVER`, `02 DESIGN`, `03 BUILD`, `04 REFINE`).
  - **04 // Skills**: Technical matrix titled *"Tools are just the start"* covering AI & Intelligent Systems, Programming, Web & Product Development, Data & Backend, and Workflow Tools (zero artificial progress bars).
  - **05 // Education**: Restrained academic showcase of B.Tech CSE (AIML) at MLR Institute of Technology.
  - **06 // Contact**: High-impact finale with oversized headline *"HAVE AN IDEA? LET'S BUILD IT."*, copy-email action with feedback toast, and transparent direct mail form.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4 + Custom Design Tokens
- **Icons**: Lucide React + Custom SVG Brand Marks

---

## ⚙️ Central Configuration (`src/data/portfolioData.ts`)

All personal information, social links, project definitions, and technical skills live in a single central configuration file:

```typescript
// Edit src/data/portfolioData.ts or src/data/socials.ts to update details:
export const portfolioData = {
  personal: {
    name: 'NAVADEEP',
    degree: 'B.Tech in Artificial Intelligence and Machine Learning (AIML)',
    institution: 'MLR Institute of Technology (MLRIT)',
    location: 'Hyderabad, Telangana, India',
    ...
  },
  contact: {
    email: 'navadeepjustin@gmail.com',
    github: 'https://github.com/navadeepjustin-create',
    linkedin: '', // Add LinkedIn URL when ready
  }
};
```

---

## 📤 Pushing to GitHub

Your local git repository is already initialized and committed on the `main` branch with the remote pointing to:
`https://github.com/navadeepjustin-create/portfolio.git`

To push your latest commits to GitHub:

### Option A — Automated Node script (recommended, requires no Xcode tools):
```bash
# Push directly using your GitHub Personal Access Token (PAT):
npm run push <YOUR_GITHUB_TOKEN>
# Or run without argument to be prompted securely:
npm run push
```

### Option B — Standard Git (if Xcode tools are installed):
```bash
git push -u origin main
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser:
http://127.0.0.1:5173/
```

### Production Build & Preview

```bash
# Build production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment

The build output (`dist/`) is 100% static and compatible with any modern hosting platform:

- **Vercel**: Import repository, framework preset `Vite`, build command `npm run build`, output directory `dist`.
- **Netlify**: Connect repository, build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: Build with GitHub Actions and publish the `dist` directory.
