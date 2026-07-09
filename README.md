# NOEMA — Premium AI Agency Website

A scroll-driven interactive story built with real-time procedural WebGL.
No static 3D assets: the signature form, its motion, and its lighting are
generated entirely in GLSL at runtime.

## Stack
- **Vite + React 18 + TypeScript**
- **Three.js / React Three Fiber** — real-time generative 3D
- **Custom GLSL shaders** — simplex-noise vertex displacement, metallic
  fresnel surface, chapter-driven color temperature (iris → teal, champagne
  specular)
- **GSAP + ScrollTrigger** — every reveal and camera move synced to scroll
- **Lenis** — smooth scrolling, wired into GSAP's ticker
- **@react-three/postprocessing** — Bloom, film grain, vignette, depth of
  field (desktop only)
- **Tailwind CSS** — token system: void / bone / mist / champagne / iris / teal

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Performance notes
- DPR capped at 1.8; antialiasing off (bloom + grain hide aliasing)
- Depth of field enabled only above 1024px viewport width
- Particle count and motion reduced automatically under
  `prefers-reduced-motion`
- Scroll progress is shared through a mutable module (`scrollState`) so the
  WebGL loop never triggers React re-renders

## Structure
```
src/
  components/   Scene, GenerativeForm (GLSL), Particles, Effects, Chrome
  sections/     Genesis, Craft, Method, Work, Contact (the five chapters)
  lib/          useSmoothScroll (Lenis+GSAP), useReveal, scrollState
```
