# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

**Next.js 16.4 / React 19.3.** APIs may differ from what you remember. Check `node_modules/next/dist/docs/` before using Next APIs (for example, the global `PageProps<"/route">` helper and async `params` used in `app/trabajos/[category]/page.tsx`).

## Commands

Use pnpm (`packageManager: pnpm@10.28.0`).

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # statically generates / and /trabajos/{small,medium,large}
pnpm lint     # eslint flat config: next core-web-vitals + typescript
```

The project has no test suite. To type-check, run `pnpm exec tsc --noEmit`.

## What this is

This is the marketing site for Sacred Force Tattoo, a studio in Tribunales, Buenos Aires. All UI copy is in Spanish (`lang="es-AR"`), and new copy should be too. The component, grid and motion structure follows [cobiwave/jacobo-martinez](https://github.com/cobiwave/jacobo-martinez).

## Architecture

- **Routes:** `app/page.tsx` renders `StudioHome`, a large client component holding the hero, intro, team and category sections. `app/trabajos/[category]/page.tsx` is a server component. Its `workCategories` map is the single source of truth for valid slugs, titles, descriptions and the "next category" cycle. `generateStaticParams` builds from that map, and unknown slugs call `notFound()`. A new category also needs an entry in `categories` in `StudioHome.tsx` and in the `WorkCategory` type in `WorkGallery.tsx`.
- **Shared chrome:** `SiteShell.tsx` exports `SiteHeader` and `SiteFooter`, which each page renders itself (they are not in the layout). `layout.tsx` mounts `CustomCursor` globally. It also loads `GridOverlay` dynamically in development only (press `G` to toggle it; the state persists in localStorage).
- **Motion (`app/_lib/motion.ts`):** all GSAP usage goes through this module. It registers `useGSAP`, `ScrollTrigger` and `SplitText` once, and re-exports `gsap`. Import from it instead of from `gsap` directly.
  - `motion` holds the shared duration, ease, offset and stagger tokens.
  - `useMotion(scopeRef, { full, reduced })` wraps `useGSAP` and `gsap.matchMedia` to branch on `prefers-reduced-motion`. In both branches it ends by setting `autoAlpha: 1` on the scope, so animated sections start hidden in CSS and are revealed here.
  - `revealTimeline(trigger)` returns a timeline with the shared defaults and a one-shot ScrollTrigger at `top 62%`. `splitWords` wraps SplitText with masked words.
  - Animation targets are found through `data-*` attributes (`data-hero-title`, `data-intro`, `data-team`, `data-artist`, …), not CSS-module class names.
- **Preloader:** `StudioHome` waits for the hero `<video>` to be able to play, with a 2.5 s fallback, before it exits the loader (`loaderPhase`). `layout.tsx` hides `[data-preloader]` under `<noscript>`.
- **Styling:** CSS Modules per component, plus `app/globals.css` for the tokens and the grid.
  - `html` has `font-size: 62.5%`, so `1rem` = 10px.
  - The global `.container` is a CSS grid with 4, 8 or 12 columns (breakpoints at `48em` and `75em`). `.subgrid` spans the full width and inherits those columns. Lay out components by placing them on `grid-column` within these; avoid ad-hoc widths.
  - `.mono` is the DM Mono uppercase label style. Fonts come from Google Fonts through an `@import` in `globals.css`.
- **Gallery:** `WorkGallery` builds 6 items from `/assets/works/${category}/foto-N.svg`. It has a hand-rolled accessible lightbox with a focus trap, Esc and arrow-key navigation, a body scroll lock, and focus return.

## Assets

- All media (images, video, SVGs) goes in `public/assets/` only. Don't create media folders at the repo root. Reference files by their root-relative paths (`/assets/...`).
- The team portraits and gallery images are placeholder SVGs, and the UI labels them that way ("FOTO REAL PENDIENTE"). To swap in real photos, replace the files in place, keeping their names, or update the paths and alt text in `WorkGallery.tsx` and `StudioHome.tsx`.
- The hero video is `public/assets/video/bg-video.mp4` (muted MP4), with `public/assets/atmosphere/studio-poster.svg` as its poster.

## GSAP skills

The project vendors the official GSAP agent skills (`.claude/skills/gsap-*`, mirrored in `.agents/skills/`). Load the relevant one (`gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, …) before you write animation code.
