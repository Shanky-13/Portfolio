# Shashank Singh — 3D Portfolio

> **Signal → Intelligence.** A cinematic, scroll-driven 3D portfolio for an ECE engineer
> who builds where hardware meets AI — myoelectric prosthetics, computer-vision wearables,
> and desktop AI assistants.

Built with **React 19 + Vite + TypeScript**, **React Three Fiber** (+ drei, postprocessing),
**GSAP ScrollTrigger**, **Framer Motion**, **Lenis** smooth scroll and **Tailwind CSS v4**.

---

## ✨ The experience

- **Hero — "Signal Bloom":** ~9,000 GPU particles form a living EMG waveform (a nod to the
  myoelectric arm) that scatters around your cursor like charge. Floating PCB traces drift
  behind it. Name + title reveal letter-by-letter after a capacitor-charge preloader.
- **Scroll story:** one fixed canvas; as you scroll, the particle field **morphs** —
  waveform → neural constellation → data helix → circuit lattice — while the camera glides
  along a Catmull-Rom rail, docking each section at a new angle.
- **Sections:** About (stat wall) → Skills (marquee + grouped grid) → Projects (3D tilt
  cards with glare, tech chips, impact lines) → Achievements (animated trophy wall) →
  Education (animated CGPA meter) → Contact (giant mail CTA + copy-email).
- **Micro-interactions:** custom cursor, magnetic buttons, scroll-linked letter reveals,
  film grain, bloom + depth-of-field.

## 🚀 Quick start

```bash
npm install        # install dependencies
npm run assets     # (re)generate placeholder og-image.png + resume.pdf
npm run dev        # dev server → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
```

Node 20+ recommended.

## 📁 Project structure

├── index.html                    # SEO/OG meta, fonts, JSON-LD, noscript fallback├── public/│   ├── favicon.svg               # waveform "S" mark│   ├── og-image.png              # PLACEHOLDER — swap with a real 1200×630 share image│   └── resume.pdf                # PLACEHOLDER — swap with your real résumé├── scripts/│   └── generate-placeholders.mjs # regenerates the two placeholder binaries└── src/├── data/content.ts           # ★ ALL site copy lives here — edit this file├── lib/│   ├── gsap.ts               # single GSAP + ScrollTrigger registration│   ├── smoothScroll.ts       # Lenis boot + scroll-progress tracking│   ├── scrollState.ts        # render-free bridge: DOM scroll/mouse → shaders│   └── utils.ts              # cx(), WebGL feature detection├── hooks/useMediaQuery.ts    # mobile / reduced-motion / coarse-pointer hooks├── components/│   ├── canvas/               # the 3D layer (lazy-loaded)│   │   ├── Experience.tsx    #  root: DPR caps, fog, quality tiers│   │   ├── SignalField.tsx   # 4-state morphing particle system│   │   ├── shaders.ts        # GLSL: morph blend, EMG wave, cursor repulsion│   │   ├── CircuitTraces.tsx # PCB-style background traces + via pads│   │   ├── CameraRig.tsx     # scroll-driven Catmull-Rom camera rail│   │   ├── Effects.tsx       # bloom / DoF / grain / vignette│   │   └── StaticBackdrop.tsx# gradient fallback (no WebGL / while loading)│   ├── ui/                   # cursor, magnetic, reveals, navbar, preloader…│   └── sections/             # Hero, About, Skills, Projects, Achievements…└── styles/index.css          # Tailwind v4 theme tokens + component classes

## ✏️ Customizing

| What | Where |
|---|---|
| Any text, link, project, skill, achievement | `src/data/content.ts` — one file, fully typed |
| Résumé | Replace `public/resume.pdf` |
| Share image | Replace `public/og-image.png` (1200×630) |
| Deployed URL | `og:url` in `index.html` (marked `TODO`) |
| Project previews | Swap `<ProjectArt/>` in `Projects.tsx` for `<img>` screenshots (placeholders are watermarked) |
| Colors | `@theme` block in `src/styles/index.css` |
| Particle counts / camera path | `Experience.tsx` / `CameraRig.tsx` |

## ⚡ Performance & accessibility

- **Lazy 3D:** the entire three.js stack loads behind `React.lazy` — the DOM shell paints
  first; `manualChunks` splits three/r3f/motion into cacheable chunks.
- **60fps budget:** all particle blending/physics runs in the vertex shader (zero per-frame
  JS allocation); DPR capped at 2 (1.5 mobile); mobile drops to 3,200 particles and skips
  DoF/grain; antialias off (bloom hides aliasing).
- **`prefers-reduced-motion`:** Lenis, cursor, magnetic, tilt, marquee, letter reveals and
  the camera rail all disable; the canvas renders a single static frame (`frameloop="demand"`).
- **No WebGL?** Graceful gradient backdrop — content is fully readable.
- **A11y:** semantic landmarks, skip-link, keyboard-focus styles, `aria-label`s on icon
  links, screen-reader-safe letter reveals (intact `aria-label`, letters `aria-hidden`).
- **SEO:** full meta/OG/Twitter set, JSON-LD `Person` schema, `<noscript>` fallback.

## 📦 Deploying

Any static host works (Vercel / Netlify / GitHub Pages):

```bash
npm run build   # then deploy dist/
```

Before going live: swap the two placeholder files, set `og:url`, and point the project
card links at their real repos (marked `TODO` in `content.ts`).