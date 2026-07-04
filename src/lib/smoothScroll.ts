import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { scrollState } from './scrollState'

let lenis: Lenis | null = null

/**
 * Boot smooth scrolling + global scroll-progress tracking.
 * When the user prefers reduced motion we skip Lenis entirely but still
 * track progress (the canvas renders a single static frame in that case).
 * Returns a cleanup function.
 */
export function initSmoothScroll(reducedMotion: boolean): () => void {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollState.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)

  let tickerFn: ((time: number) => void) | null = null

  if (!reducedMotion) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    // Keep GSAP's ScrollTrigger in sync with Lenis' virtual scroll.
    lenis.on('scroll', ScrollTrigger.update)
    tickerFn = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)
  }

  return () => {
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('resize', updateProgress)
    if (tickerFn) gsap.ticker.remove(tickerFn)
    lenis?.destroy()
    lenis = null
  }
}

/** Smooth-scroll to a section — falls back to native scrollIntoView. */
export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView()
}
