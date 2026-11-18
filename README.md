# Sacred Force Tattoo

Sitio de Sacred Force Tattoo hecho con Next.js App Router, React y GSAP. La estructura de componentes, grilla y movimiento toma como referencia [cobiwave/jacobo-martinez](https://github.com/cobiwave/jacobo-martinez).

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abrí `http://localhost:3000`. `pnpm build` genera la portada y las tres páginas de trabajos estáticamente.

## Estructura

- `app/_components/`: portada, navegación, grilla de desarrollo, galerías y cursor.
- `app/_lib/motion.ts`: tokens, `useMotion`, `splitWords`, `revealTimeline` y utilidades GSAP.
- `app/trabajos/[category]/`: páginas `/trabajos/small`, `/trabajos/medium` y `/trabajos/large`.
- `app/globals.css`: tokens y grilla compartida de 4 columnas mobile, 8 tablet y 12 desktop.
- `public/assets/`: assets servidos desde la raíz del sitio.

En desarrollo, presioná `G` para mostrar u ocultar el overlay de la grilla. La animación de entrada se desactiva con `prefers-reduced-motion`.

## Reemplazo de assets

- Video del hero: `public/assets/video/bg-video.mp4` (MP4 sin audio); el SVG de `public/assets/atmosphere/studio-poster.svg` funciona como poster.
- Fotos de ambiente: `public/assets/atmosphere/`.
- Retratos reales: `public/assets/team/caro.svg` y `public/assets/team/david.svg`.
- Fotos reales de tatuajes: reemplazá los seis archivos `foto-*.svg` en cada carpeta de `public/assets/works/{small,medium,large}/`.

Los SVG de equipo y de las galerías están identificados como placeholders hasta que se incorporen las fotos reales.
