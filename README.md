# Shashank Singh — 3D Portfolio

> **Signal → Intelligence.** A cinematic, scroll-driven 3D portfolio for an ECE engineer who builds where hardware meets AI—showcasing work like the May 2026 thesis on an EMG-Controlled Robotic Hand System, computer-vision wearables, and desktop AI assistants.

Built for high-performance visual impact using **React 19 + Vite + TypeScript**, **React Three Fiber** (+ drei, postprocessing), **GSAP ScrollTrigger**, **Framer Motion**, **Lenis** smooth scroll, and **Tailwind CSS v4**.

---

## ✨ The Experience

* **Hero — "Signal Bloom":** ~9,000 GPU particles form a living EMG waveform (a direct nod to the myoelectric arm project) that scatters around your cursor like an electrical charge. Floating PCB traces drift in the background, with the name and title revealing letter-by-letter after a capacitor-charge preloader.
* **Scroll Story:** One fixed canvas acts as the foundation. As you scroll, the particle field morphs (waveform → neural constellation → data helix → circuit lattice) while the camera glides along a Catmull-Rom rail, docking each section at a new dynamic angle.
* **Sections:** * **About:** Statistics wall charting the engineering journey.
  * **Skills:** Animated marquee and grouped grid detailing technical competencies.
  * **Projects:** 3D tilt cards featuring tech chips, impact lines, and glare effects.
  * **Achievements & Education:** Animated trophy wall and CGPA meter.
  * **Contact:** Giant mail CTA with one-click copy functionality.
* **Micro-interactions:** Custom cursor, magnetic buttons, scroll-linked letter reveals, film grain, bloom, and depth-of-field.

## 🚀 Quick Start

*Ensure you have Node 20+ installed.*

```bash
npm install        # install dependencies
npm run assets     # (re)generate placeholder og-image.png + resume.pdf
npm run dev        # dev server → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally

**📁 Project Structure**
The repository is modular and heavily optimized for lazy-loading 3D assets:

├── index.html                    # SEO/OG meta, fonts, JSON-LD, noscript fallback
├── public/
│   ├── favicon.svg               # waveform "S" mark
│   ├── og-image.png              # PLACEHOLDER — swap with a real 1200×630 share image
│   └── resume.pdf                # PLACEHOLDER — swap with your real résumé
├── scripts/
│   └── generate-placeholders.mjs # regenerates the two placeholder binaries
└── src/
    ├── data/content.ts           # ★ ALL site copy lives here — edit this file
    ├── lib/                      # utilities, GSAP registration, smooth scroll setup
    ├── hooks/useMediaQuery.ts    # mobile / reduced-motion / coarse-pointer hooks
    ├── components/
    │   ├── canvas/               # the 3D layer (lazy-loaded), WebGL components, and GLSL shaders
    │   ├── ui/                   # cursor, magnetic buttons, reveals, navbar, preloader
    │   └── sections/             # Hero, About, Skills, Projects, Achievements
    └── styles/index.css          # Tailwind v4 theme tokens + component classes

**✏️ Customization Guide**
Everything is designed to be easily modified from centralized files:

| **What**                 | **Where to Edit**                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **Site Copy & Projects** | `src/data/content.ts` — Fully typed and acts as the single source of truth.            |
| **Résumé**               | Replace `public/resume.pdf`.                                                           |
| **Share Image**          | Replace `public/og-image.png` (1200 × 630).                                            |
| **Deployed URL**         | Update the `og:url` meta tag in `index.html` (marked `TODO`).                          |
| **Project Previews**     | Swap `<ProjectArt />` in `Projects.tsx` for `<img>` screenshots.                       |
| **Colors & Theme**       | Modify the `@theme` block in `src/styles/index.css`.                                   |
| **3D Canvas Limits**     | Adjust particle counts or the camera path inside `Experience.tsx` and `CameraRig.tsx`. |

**⚡ Performance & Accessibility**
-Optimized 3D: The entire three.js stack loads behind React.lazy, ensuring the DOM shell paints instantly. manualChunks splits the libraries into cacheable chunks. All particle blending and physics run directly in the vertex shader for zero per-frame JS allocation.  

-Responsive Degradation: Mobile devices dynamically cap DPR at 1.5, reduce the particle count to 3,200, and disable depth-of-field. Antialiasing is natively disabled as bloom effectively hides aliasing.  

-Accessibility (prefers-reduced-motion): Smooth scrolling, custom cursors, magnetic buttons, tilts, and camera rails gracefully disable. The canvas renders a single safe static frame (frameloop="demand"). Fully compliant with semantic landmarks, skip-links, and screen-reader-safe letter reveals.  

-Fallbacks & SEO: If a browser does not support WebGL, the site falls back to a readable gradient backdrop. Includes complete meta/OG/Twitter tags, JSON-LD Person schema, and a <noscript> contingency.

**📦 Deployment**
Ready for fast deployment to static hosts like Vercel, Netlify, or GitHub Pages.
```````````````````````````````````````````````````
npm run build   # Deploy the resulting dist/ folder
```````````````````````````````````````````````````

**🌱 Future Expansion & Portfolio Growth**
While the current configuration is tightly focused on highlighting hardware and AI projects, a portfolio is only a fragment of your evolving body of work. The underlying architectural framework is built to easily scale and adapt. It effortlessly supports the introduction of projects that fall entirely outside the current scope—such as deploying full-stack web architectures, implementing cloud infrastructure, or directly rendering .gltf and .obj 3D models for entirely different fields of discovery.
