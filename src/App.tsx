import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { initSmoothScroll } from './lib/smoothScroll'
import { scrollState } from './lib/scrollState'
import { supportsWebGL } from './lib/utils'
import { useIsMobile, usePrefersReducedMotion } from './hooks/useMediaQuery'

import { StaticBackdrop } from './components/canvas/StaticBackdrop'
import { Cursor } from './components/ui/Cursor'
import { Navbar } from './components/ui/Navbar'
import { Preloader } from './components/ui/Preloader'

import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Achievements } from './components/sections/Achievements'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'

/**
 * The 3D experience is lazy-loaded: three.js + R3F + postprocessing never
 * block first paint. The StaticBackdrop shows until the chunk arrives (and
 * forever, if WebGL is unavailable).
 */
const Experience = lazy(() => import('./components/canvas/Experience'))

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const webgl = useMemo(() => supportsWebGL(), [])

  const [loaded, setLoaded] = useState(false)

  // Smooth scroll + scroll-progress tracking (drives morph & camera).
  useEffect(() => initSmoothScroll(reducedMotion), [reducedMotion])

  // Global pointer → normalized device coords for the shader + camera rig.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      scrollState.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      {/* Keyboard users can skip straight to content */}
      <a href="#hero" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} reducedMotion={reducedMotion} />}
      </AnimatePresence>

      {/* Fixed 3D stage behind everything */}
      <StaticBackdrop />
      {webgl && (
        <div className="fixed inset-0 -z-10" aria-hidden>
          <Suspense fallback={null}>
            <Experience reducedMotion={reducedMotion} isMobile={isMobile} />
          </Suspense>
        </div>
      )}

      <Cursor />
      <div className="noise" aria-hidden />
      <Navbar />

      <main id="main">
        <Hero ready={loaded} />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>
    </>
  )
}
