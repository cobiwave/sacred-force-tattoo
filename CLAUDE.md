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

- **Routes:** `app/page.tsx` is a server component that renders the header, the home sections in order (`Hero`, `Intro`, `Team`, `Works`, `Atmosphere`, `Contact`) and the footer. Each section is its own client component with its own CSS module, following the reference project. Every component lives in a folder named after it (`app/_components/Hero/Hero.tsx` + `Hero.module.css`) and is imported by its full path (`./_components/Hero/Hero`); there are no `index.ts` barrels. `SectionHeading` is the shared kicker + `h2` heading used by `Team`, `Works` (`layout="stacked"`) and `Contact`. It takes a `ref`; the parent section animates it by revealing `childrenOf(headingRef.current)` (`autoAlpha: 0, y: 16`, word stagger) at the start of its timeline, as in the reference project. `app/trabajos/[category]/page.tsx` is a server component. Its `workCategories` map is the single source of truth for valid slugs, titles, descriptions and the "next category" cycle. `generateStaticParams` builds from that map, and unknown slugs call `notFound()`. Each entry also holds `count`, the number of photos in that category's folder. A new category also needs an entry in `categories` in `Works.tsx` and in the `WorkCategory` type in `WorkGallery.tsx`.
- **Shared chrome:** `SiteShell.tsx` exports `SiteHeader` and `SiteFooter`, which each page renders itself (they are not in the layout). `layout.tsx` mounts `CustomCursor` globally. It also loads `GridOverlay` dynamically in development only (press `G` to toggle it; the state persists in localStorage).
- **Motion (`app/_lib/motion.ts`):** all GSAP usage goes through this module. It registers `useGSAP`, `ScrollTrigger` and `SplitText` once, and re-exports `gsap`. Import from it instead of from `gsap` directly.
  - `motion` holds the shared duration, ease, offset and stagger tokens.
  - `useMotion(scopeRef, { full, reduced })` wraps `useGSAP` and `gsap.matchMedia` to branch on `prefers-reduced-motion`. In both branches it ends by setting `autoAlpha: 1` on the scope, so animated sections start hidden in CSS and are revealed here.
  - `revealTimeline(trigger)` returns a timeline with the shared defaults and a one-shot ScrollTrigger at `top 62%`. `splitWords` wraps SplitText with masked words.
  - Each section owns its animation: its root `<section>` has `data-reveal` (hidden in `globals.css` until `useMotion` reveals it; `layout.tsx` un-hides it under `<noscript>`) and is passed as the `useMotion` scope. Targets are reached through `useRef`s (`childrenOf(listRef.current)` for staggered lists), not CSS-module class names or `data-*` selectors. Sections below the fold pass their own root to `revealTimeline(...)`; the hero omits the trigger so it plays on load.
- **Styling:** CSS Modules per component, plus `app/globals.css` for the tokens and the grid.
  - `html` has `font-size: 62.5%`, so `1rem` = 10px.
  - The global `.container` is a CSS grid with 4, 8 or 12 columns (breakpoints at `48em` and `75em`). `.subgrid` spans the full width and inherits those columns. Lay out components by placing them on `grid-column` within these; avoid ad-hoc widths.
  - `.mono` is the DM Mono uppercase label style. Fonts come from Google Fonts through an `@import` in `globals.css`.
- **Gallery:** `WorkGallery` builds `count` items from `/assets/works/${category}/tattoo-${category}-NN.webp` (two-digit, 1-based). The masonry rhythm repeats every 3 items through `:nth-child(3n…)`. It has a hand-rolled accessible lightbox with a focus trap, Esc and arrow-key navigation, a body scroll lock, and focus return.

## Assets

- All media (images, video, SVGs) goes in `public/assets/` only. Don't create media folders at the repo root. Reference files by their root-relative paths (`/assets/...`).
- Photos are WebP, at most 1600px on the long side (portraits 1400px), `cwebp -q 78 -m 6 -metadata none`, and each one under 1 MB. Convert new photos the same way before adding them; don't commit original JPG/PNG/HEIC files.
- Gallery photos live in `public/assets/works/{small,medium,large}/tattoo-{category}-NN.webp`. To add one, use the next number and bump `count` for that category in `app/trabajos/[category]/page.tsx`.
- Team portraits are `public/assets/team/{caro,david-arana}.webp`, referenced in `Team.tsx`. The atmosphere images are still placeholder SVGs.
- The hero video is rendered by `HeroVideo.tsx` from `public/assets/video/bg-video.webm` (VP9) with `bg-video.mp4` as fallback, and `bg-video-poster.webp` (first frame) as its poster. It has no `autoPlay`: it plays from a `useEffect` unless `prefers-reduced-motion` is set. If you replace the video, regenerate the WebM and poster from the MP4 (`ffmpeg … -c:v libvpx-vp9 -crf 36` and `cwebp`).

## GSAP skills

The project vendors the official GSAP agent skills (`.claude/skills/gsap-*`, mirrored in `.agents/skills/`). Load the relevant one (`gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, …) before you write animation code.
