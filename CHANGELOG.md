# Portfolio Engineering Changelog

All notable architecture, performance, accessibility, and visual engineering changes across the portfolio transformation are documented here phase by phase.

---

## [Phase 1] - Codebase Hygiene, Single Source of Truth & Palette Unification

### What Changed & Why
- **Vite Base Configuration**:
  - Changed `base: './'` to `base: '/'` in `vite.config.ts`.
  - *Reason*: Deep routes (e.g. `/projects/statio-mlr` and `/about`) previously broke on browser reload when loaded directly on static hosts because relative assets (`./assets/...`) resolved against sub-paths.
- **Dead Code Elimination (28 Unused Files Removed)**:
  - Confirmed 0 imports via ripgrep and removed legacy unused components (`HeroVisual.tsx`, `NeuralGraphic.tsx`, `BackgroundFX.tsx`, `Nav.tsx`, `ScrollTop.tsx`, `Placeholder.tsx`, `ProjectCover.tsx`, `ProjectModal.tsx`, `CertificateViewer.tsx`, `Button.tsx`, `ImageWithFallback.tsx`, `Reveal.tsx`, `Section.tsx`).
  - Removed legacy sections (`Projects.tsx`, `Certificates.tsx`, `Timeline.tsx`, `Achievements.tsx`).
  - Removed superseded data stores (`profile.ts`, `links.ts`, `projects.ts`, `timeline.ts`, `achievements.ts`, `skills.ts`, `site.ts`, `certificates.ts`, `nav.ts`, `types.ts`).
  - Removed deprecated CLI push script `scripts/push.cjs` and removed `"push"` npm script in favor of secure standard `gh auth login`.
  - Preserved `ComputationalCore3D.tsx` for integration in Phase 6.
- **Single Source of Truth (`src/data/portfolioData.ts`)**:
  - Consolidated all personal details, education (`B.Tech in Computer Science & Engineering (AI & ML) at MLRIT (2022–2026)`), hackathon participation (`Cloud technology hackathon`, `Finathon`), verified LinkedIn profile (`https://www.linkedin.com/in/navadeep-justin-946366371`), and added the portfolio repository itself as project 03.
  - Added `SITE_URL` constant.
- **Palette Unification**:
  - Replaced ad-hoc hex values (`#171717`, `#D1FF00`, `#F5F5F0`, `#2B2B2B`) in `Contact.tsx`, `ScrollProgressBar.tsx`, and `ProjectCaseStudyModal.tsx` with design system tokens (`#11151A`, `#171D24`, `#C6FF00`, `#F4F6F8`, `#929BA6`).
- **Animation & Modal Hygiene**:
  - Replaced uninstalled `animate-in fade-in` Tailwind classes with CSS `@keyframes fadeIn` (`animate-fade-in`).
  - Refactored `ProjectCaseStudyModal.tsx` to reuse `useDialog` hook with keyboard trap, Escape dismissal, and scroll lock.
  - Replaced hero resume modal with direct download action `/resume.pdf` and secondary `/resume` page link.
  - Replaced hero footer text with `"Open to internships — Class of 2026 · AIML at MLRIT"`.
- **Content Honesty & Tone Down**:
  - Softened unsourced "Students wait 30-45 minutes" in `caseStudies.ts`.
  - Aligned About page timeline wording to "concept and interactive prototype" instead of "production-ready".
- **CI / CD Workflow**:
  - Replaced failing GitHub Pages deploy workflow with standard `.github/workflows/ci.yml` running `typecheck` and `build`.
- **Documentation**:
  - Rewrote `README.md` to reflect real stack, design tokens, and scripts.
  - Initialized `TODO_FOR_NAVADEEP.md`.

### Dependency Justification
- Zero new runtime dependencies added in Phase 1.
- Retained `three` and `@types/three` for `ComputationalCore3D.tsx` to maintain compilation integrity for Phase 6.
- Retained `isomorphic-git` for local phase commit management.

### Bundle Size (Post-Phase 1)
- `dist/index.html`: 2.68 kB (gzip: 1.03 kB)
- `dist/assets/index.css`: 56.29 kB (gzip: 9.93 kB)
- `dist/assets/index.js`: 572.24 kB (gzip: 169.55 kB)

---

## [Phase 2] - Design Tokens & Atmosphere

### What Changed & Why
- **Motion & Spacing Tokens (`src/index.css`, `src/constants/motion.ts`)**:
  - Defined the single primary easing curve: `cubic-bezier(0.22, 1, 0.36, 1)` as `--ease-primary` / `EASE_PRIMARY`.
  - Added duration tokens: `--duration-short` (150ms), `--duration-medium` (300ms), and `--duration-long` (600ms).
  - Added elevation and glow tokens: `--glow-lime-sm`, `--glow-lime-md`, `--glow-lime-lg`, `--elevation-card`, and `--elevation-floating`.
  - Standardized `.lime-glow-hover` and `.animate-fade-in` to reference the central motion and glow tokens.
- **Cinematic Atmosphere Overlays (`.film-grain`, `.edge-vignette`)**:
  - Implemented a zero-render-cost, static fractal SVG noise texture overlay (`opacity: 0.032`, `pointer-events: none`, `z-index: 40`) and soft radial edge vignette (`z-index: 39`) across the entire portfolio in `App.tsx`.
- **Lightweight Hero WebGL Shader (`src/components/HeroShader.tsx`)**:
  - Built an organic fluid gradient and simplex noise shader using `ogl`.
  - Encapsulated within `React.lazy()` so `ogl` and GL code are deferred off the critical render path.
  - Automatically paused via `IntersectionObserver` when scrolled offscreen to conserve GPU/CPU power.
  - Device pixel ratio capped at 1.5 (`Math.min(window.devicePixelRatio || 1, 1.5)`).
  - Fallback: On touch devices (`pointer: coarse`), reduced motion (`prefers-reduced-motion: reduce`), or WebGL initialization failure, automatically reverts to a static high-fidelity CSS radial ambient gradient.

### Dependency Justification
- Added `ogl` (~15 kB gzipped): Minimal, high-performance WebGL library selected over Three.js (~160 kB) for the hero canvas background, cutting shader footprint by >90%. Defer-loaded via dynamic chunk.

### Mobile & Accessibility Compromises
- Disabled WebGL canvas animation on touch devices (`pointer: coarse`) and reduced-motion environments; rendered static CSS ambient glow instead to prevent battery drain and respect user motion preferences.

### Bundle Size (Post-Phase 2)
- `dist/index.html`: 2.68 kB (gzip: 1.03 kB)
- `dist/assets/index.css`: 57.25 kB (gzip: 10.30 kB)
- `dist/assets/HeroShader.js`: 49.26 kB (gzip: 15.12 kB) — *lazy-loaded chunk*
- `dist/assets/index.js`: 572.64 kB (gzip: 169.69 kB)

---

## [Phase 3] - Cursor System & Kinetic Micro-Interactions

### What Changed & Why
- **Upgraded Dual-Layer Cursor (`src/components/CustomCursor.tsx`)**:
  - Implemented an instant 0-latency electric lime dot + trailing spring-interpolated ring (`rAF`, `transforms` only).
  - Context morphing:
    - Scales and pulses over links and buttons (`a`, `button`, `[role="button"]`).
    - Morphs into label pill for `data-cursor-label` elements (`EXPLORE ↗`, `ABOUT ↓`, `PDF ↗`, `VIEW`, `CMD`, `CONNECT`, etc.).
    - Displays `"DRAG"` over draggable surfaces and `"PLAY"` over media players.
    - Shrinks to a tight focal ring over body text (`p`, `article`).
    - Uses `mix-blend-mode: difference` over large hero headlines for crisp typography inversion.
  - Native cursor preservation: Active native text cursor maintained over `input`, `textarea`, and editable elements. Completely disabled on touch devices (`pointer: coarse`).
  - Added click feedback ripple animation expanding from click coordinates.
- **Magnetic Pull Elements (`src/hooks/useMagnetic.ts`, `src/components/Magnetic.tsx`)**:
  - Gentle kinetic pull on primary buttons, nav links, brand monogram, and contact triggers within radius; smoothly springs back on exit.
- **Dynamic Flashlight Grid (`src/components/FlashlightGrid.tsx`)**:
  - Hero and Contact sections reveal electric lime grid highlights through a soft radial mask following cursor coordinates via hardware-accelerated CSS variables.
- **Proximity Typography (`src/components/ProximityText.tsx`)**:
  - Hero headline characters dynamically shift weight, scale, and subtle text shadow based on distance to desktop cursor.
- **Cursor-Follow Preview Cards (`src/components/CursorPreview.tsx`)**:
  - Floating preview card follows cursor with easing when hovering project headlines or case-study links.
- **Spotlight with 3D Parallax Tilt & Glare (`src/components/Spotlight.tsx`)**:
  - Dual cursor-following glow (both background and hairline border) with sharp square corners (`rounded-none`).
  - Added 3D perspective parallax tilt (`rotateX`/`rotateY`) with specular glare reflection on project simulation cards.
- **Accessibility & Performance**:
  - Purely decorative (`aria-hidden="true"`).
  - Native focus rings (`:focus-visible`) remain intact.
  - Fallback under `prefers-reduced-motion: reduce`: static dot, magnetic pull, and 3D tilts disabled.

### Dependency Justification
- Zero new runtime packages added in Phase 3. Pure native DOM, CSS custom properties, and requestAnimationFrame transforms.

### Mobile & Touch Compromises
- Custom cursor, magnetic pull, cursor preview card, 3D tilt, and proximity typography are strictly scoped to `(hover: hover) and (pointer: fine)`. On mobile touch devices, native gestures and touch scrolls run completely untouched.

### Bundle Size (Post-Phase 3)
- `dist/index.html`: 2.68 kB (gzip: 1.03 kB)
- `dist/assets/index.css`: 57.75 kB (gzip: 10.43 kB)
- `dist/assets/HeroShader.js`: 49.26 kB (gzip: 15.12 kB) — *lazy-loaded chunk*
- `dist/assets/index.js`: 584.25 kB (gzip: 173.19 kB)

---

## [Phase 4] - Typography, Motion, Navigation & Bento Layouts

### What Changed & Why
- **SplitText Component (`src/components/SplitText.tsx`)**:
  - Masked line-by-line / word-by-word slide-up reveal on scroll viewport entry using `motion/react`.
  - Applied to Hero headline, About philosophy, Projects headline, Approach, Skills, and Education sections.
- **Scroll-Linked Giant Section Numbers (`src/components/SectionNumber.tsx`)**:
  - Replaced static text numbers with dynamic `00-06` indicators that dynamically shift opacity, tracking, and vertical parallax on scroll.
- **Route Transitions (`src/components/PageTransition.tsx`)**:
  - Built an electric lime wipe bar transition across route changes (using View Transitions API when available with a high-fidelity motion fallback).
- **Smooth Scrolling (`src/components/SmoothScroll.tsx`)**:
  - Integrated Lenis for momentum-based smooth inertia scrolling; hooked into animation frame loops and disabled automatically under `prefers-reduced-motion: reduce`.
  - Preserved anchor hash links (`#projects`, `#about`, `#contact`, etc.) and top scroll progress indicator.
- **Floating Pill Navigation (`src/components/Navbar.tsx`)**:
  - Upgraded fixed top bar to an ergonomic floating pill nav that compacts, blurs, and raises z-elevation on scroll.
  - Interactive active-section tracking via `useActiveSection` with electric lime pill highlight and magnetic triggers.
- **Fixed Side Chapter Indicator (`src/components/SideChapterIndicator.tsx`)**:
  - Fixed telemetry sidebar (`00` to `06`) on the left desktop viewport margin that tracks active section and fills with scroll progress. Cleanly hidden on mobile.
- **Bento Grid Architecture (`src/sections/About.tsx`, `src/sections/Skills.tsx`)**:
  - Converted About and Skills sections into modern bento layouts with variable tile proportions, hairline borders, and `Spotlight` hover glow.
- **Infinite Skills Marquee (`src/components/SkillsMarquee.tsx`)**:
  - Continuous animated ticker of core verified technologies; pauses on user hover and remains static under reduced motion.

### Dependency Justification
- Added `lenis` (~4 kB gzipped): Industry-standard lightweight smooth scroll library with zero overhead on main-thread layout and native fallbacks.

### Mobile & Accessibility Compromises
- The side chapter indicator (`SideChapterIndicator`) is hidden on screen widths below `1024px` to preserve screen real estate.
- Lenis smooth scrolling and SplitText transforms are disabled under `prefers-reduced-motion: reduce`.

### Bundle Size (Post-Phase 4)
- `dist/index.html`: 2.68 kB (gzip: 1.03 kB)
- `dist/assets/index.css`: 60.93 kB (gzip: 10.86 kB)
- `dist/assets/HeroShader.js`: 49.26 kB (gzip: 15.12 kB) — *lazy-loaded chunk*
- `dist/assets/index.js`: 619.88 kB (gzip: 184.03 kB)

---

## [Phase 5] - Proof, Projects, Scrollytelling, Resume & Authenticity

### What Changed & Why
- **Extended Project Data Model (`src/data/portfolioData.ts`, `src/data/caseStudies.ts`)**:
  - Added required fields: `liveUrl`, `repoUrl`, `screenshots[]`, `video`, `architectureDiagram`, `role`, `timeline`, `outcomes` (real only), and `learnings`.
  - Added the portfolio site itself as a 3rd project linking to its public repo (`github.com/navadeepjustin-create/portfolio`).
  - Action buttons render Live/Repo links ONLY when URLs exist; otherwise display an honest, transparent "In development (Prototype)" status badge.
- **Sleek Device Frame (`src/components/PhoneFrame.tsx`)**:
  - Obsidian cyber-styled mobile phone frame with status bar, dynamic notch, and active step telemetry badge.
  - Video slot targeting `/projects/<id>.webm` (and `.mp4`); automatically degrades to interactive prototype mockups (`StatioMockup` / `FastBiteMockup`) when video file is pending, with accessible TODO telemetry.
- **Scrollytelling Case Study Redesign (`src/pages/ProjectCaseStudyPage.tsx`)**:
  - Pinned device frame on the left, swapping narrative stages dynamically as the user scrolls (`IntersectionObserver`).
  - Full structured flow: Problem Statement → Qualitative Research & Observations (with honest placeholder block for real evidence) → Architectural Decisions & Tradeoffs → Vector SVG Architecture Diagram → Critical Retrospective (What I Would Do Differently) → Forward Roadmap.
  - Added accessible image `Lightbox` component with keyboard trap and scroll lock.
- **Vector System Architecture Diagrams (`src/components/ArchitectureDiagram.tsx`)**:
  - High-precision inline SVG diagrams illustrating system tiers (Client SPA, Validation Engine, Decoupled QR Token Generator, and Counter Operator Terminal).
- **Verified Hackathons Block (`src/components/HackathonsBlock.tsx`)**:
  - Added dedicated block to both home page (`About.tsx`) and `/about` page (`AboutPage.tsx`).
  - Seeded strictly with confirmed events: *Cloud technology hackathon* and *Finathon* (participation only). Renders only existing fields without empty labels.
- **Single Source of Truth ATS Resume (`src/data/resume.ts`, `src/pages/ResumePage.tsx`)**:
  - Created `/resume` route with clean, single-column, ATS-friendly A4 print styling (white background, pure black text, selectable typography, standard headings, visible link URLs, zero decorative icons).
  - Screen wrapper features a dark preview container with instant "Download PDF" and "Print" actions.
  - Added `scripts/generate-pdf.cjs` with Playwright support (respects existing `public/resume.pdf` exports) and `"resume:pdf"` npm script.
  - Hero action buttons link directly to `/resume.pdf` with `/resume` page secondary action and copy-email fallback.
- **Contact Form Hardening & Verification (`src/sections/Contact.tsx`, `src/components/SocialLinks.tsx`)**:
  - Added hidden honeypot spam protection trap (`_website_hp`).
  - Wired endpoint submission via `VITE_CONTACT_FORM_ENDPOINT` with graceful mailto fallback.
  - Added verified LinkedIn URL (`https://www.linkedin.com/in/navadeep-justin-946366371`) to Contact, footer, command palette, and About page.
  - Filtered out unconfigured social links so zero dead or disabled cards appear.

### Dependency Justification
- Zero new runtime packages added in Phase 5. All diagrams built with native inline vector SVGs, and resume built with semantic HTML and print CSS.

### Mobile & Accessibility Compromises
- Scrollytelling switches from sticky pinned layout to natural fluid vertical stacking on viewports under `1024px` and under `prefers-reduced-motion: reduce`.
- Video slot falls back to lightweight, zero-latency interactive React simulators on touch devices.

### Bundle Size (Post-Phase 5)
- `dist/index.html`: 2.68 kB (gzip: 1.03 kB)
- `dist/assets/index.css`: 64.43 kB (gzip: 11.56 kB)
- `dist/assets/HeroShader.js`: 49.26 kB (gzip: 15.12 kB) — *lazy-loaded chunk*
- `dist/assets/index.js`: 676.21 kB (gzip: 198.35 kB)

---

## [Phase 6] - Signature Moments & Technical Personality

### What Changed & Why
- **In-Browser Client-Side ML Playground (`/lab`, `src/pages/LabPage.tsx`)**:
  - Implemented an interactive feedforward neural regression model computing cafeteria queue wait times in real-time.
  - Features 4 inputs: lunch rush time window, physical queue length, basket size, and active kitchen staff.
  - Implemented client-side mathematical pipeline: z-score feature normalization, 3-unit hidden layer with ReLU activations ($\max(0, z)$), and linear wait-time projection.
  - Inference executes in under $1\text{ ms}$ (typically $\approx 300\text{--}600\text{ }\mu\text{s}$) with 0 outbound API calls.
  - Transparency & Rigor: Prominently marked with an unmissable alert declaring that the model is trained on a *synthetic campus simulation dataset* and not physical clock logs.
  - Lazy-loaded via dynamic `React.lazy()` to ensure zero impact on the initial home bundle.
- **Home Page ML Lab Teaser (`src/sections/Skills.tsx`)**:
  - Added an interactive spotlight teaser card linking directly to `/lab`.
- **Hero Computational Core 3D Accent (`src/components/ComputationalCore3D.tsx`, `src/sections/Hero.tsx`)**:
  - Reintegrated `ComputationalCore3D` as a lazy-loaded companion mode on the Hero portrait card.
  - Users can seamlessly switch between `[PORTRAIT]` (preserving the verified sunset photograph of Navadeep standing in foreground) and `[3D CORE]`.
  - Capped WebGL DPR at $1.5$ to protect low-power GPUs; pauses animation when out of viewport via `IntersectionObserver`; degrades to 2D SVG fallback under WebGL failure or `prefers-reduced-motion`.
- **Skippable Monogram Intro (`src/components/SkippableIntro.tsx`)**:
  - Designed an authentic 1.8-second monogram draw-in with animated SVG path stroke, real-time coordinate telemetry counter (`17.5449° N, 78.4326° E`), and MLRIT campus identifier.
  - Skippable on click, `Escape`, `Space`, or `Enter`.
  - Persisted in `sessionStorage` (with try/catch error boundary) so it plays once per browser session.
- **Live Status & Telemetry Widget (`src/components/LiveStatusWidget.tsx`)**:
  - Displays live Hyderabad (`Asia/Kolkata`) IST digital clock with 1-second update interval.
  - Displays dynamic "Currently Building" status from `portfolioData.personal.currentlyBuilding`.
  - Displays the latest public GitHub commit hash and commit message, fetched at build-time.
- **Build-Time Git Telemetry Hook (`scripts/fetch-commit.cjs`)**:
  - Automatically queries GitHub API at build time to fetch the latest commit hash from `navadeepjustin-create/portfolio` and writes to `src/data/latestCommit.json`. Gracefully falls back to local git hash if offline.
  - Hooked into `"build"` script in `package.json`.
- **Terminal-Style NotFound Route (`src/pages/NotFoundPage.tsx`)**:
  - Re-architected 404 page into an authentic interactive Linux shell terminal emulator (`NAVADEEP OS v8.3.4`).
  - Supports interactive command input: `help`, `cd /`, `cd /projects`, `cd /about`, `cd /resume`, `cd /lab`, and `clear`.
- **Terminal Commands in Command Palette (`src/components/CommandPalette.tsx`)**:
  - Added terminal-style commands: `help`, `theme` (cycles accent colors), `notes`, and playful root command `sudo hire navadeep` (navigates directly to `#contact`).
- **Tab Visibility Title Cue (`src/hooks/useDocumentTitleVisibility.ts`)**:
  - Dynamically updates `document.title` to `⚡ (1) Signal received // Navadeep` when user tabs away, restoring original title on re-focus.
- **Dynamic Accent Color Switcher (`src/components/AccentSwitcher.tsx`)**:
  - Allows instant switching between Electric Lime (`#C6FF00`), Cyber Cyan (`#00F0FF`), and Solar Orange (`#FF8800`).
  - Updates `--accent-primary` and `--accent-glow` CSS variables, maintaining WCAG AA contrast against dark obsidian `#080A0D` canvas.
  - Persisted in `localStorage` with try/catch. Placed in Hero status bar and Footer.
- **Engineering Notes Logbook (`src/pages/NotesPage.tsx`, `src/data/notes.ts`)**:
  - Created `/notes` route with technical architectural field notes on QR decoupling in campus environments and client-side ML trade-offs.
  - Features tag filtering, reading time indicators, expandable reading view, and discussion prompts.

### Dependency Justification
- Zero new external runtime dependencies added. The ML model inference was authored as high-performance, zero-overhead pure TypeScript vector math without importing bulky 30MB ONNX/TF.js runtimes.

### Mobile & Accessibility Compromises
- 3D Computational Core and Hero WebGL shader automatically pause when scrolled out of view and cap DPR at 1.5.
- Touch devices continue using standard, uncluttered native touch interactions while retaining interactive access to the ML playground sliders.

### Bundle Size (Post-Phase 6)
- `dist/index.html`: 2.76 kB (gzip: 1.06 kB)
- `dist/assets/index.css`: 66.27 kB (gzip: 11.82 kB)
- `dist/assets/HeroShader.js`: 49.27 kB (gzip: 15.13 kB) — *lazy chunk*
- `dist/assets/ComputationalCore3D.js`: 541.37 kB (gzip: 135.56 kB) — *lazy chunk*
- `dist/assets/LabPage.js`: 11.44 kB (gzip: 3.44 kB) — *lazy chunk*
- `dist/assets/NotesPage.js`: 9.07 kB (gzip: 3.55 kB) — *lazy chunk*
- `dist/assets/index.js`: 682.67 kB (gzip: 199.84 kB)


