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
