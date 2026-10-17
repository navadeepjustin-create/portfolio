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

