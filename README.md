# Matthew Davis — Personal Website

A single-screen interactive magnetic field built with Next.js, TypeScript,
Tailwind CSS, Framer Motion, Canvas, and simplex noise.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

- Particle color and background: `styles/globals.css`
- Particle behavior and density: `components/magnetic-field/magnetic-field.tsx`
- Opening transition: `components/lens-transition/lens-transition.tsx`
- Refraction lens opacity and sizing: `styles/globals.css`
- Live canvas refraction behavior: `components/refraction-lens/refraction-lens.tsx`

Move the pointer around the canvas and hold the primary mouse button to pull the
field toward it.

## Deployment

`pnpm build` creates a static `out/` directory ready for GitHub Pages.
