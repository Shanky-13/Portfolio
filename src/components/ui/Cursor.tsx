import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useIsCoarsePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Custom cursor: an electric dot that sticks to the pointer and a lagging
 * ring that swells over interactive elements. Only active on fine pointers
 * with motion allowed — touch users and reduced-motion users keep the
 * system cursor.
 */
export function Cursor() {
  const coarse = useIsCoarsePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = !coarse && !reduced

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!enabled || !dot || !ring) return

    document.documentElement.classList.add('has-cursor')

    // quickTo = pre-compiled tweens; the dot snaps, the ring trails.
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })
    const ringScale = gsap.quickTo(ring, 'scale', { duration: 0.35, ease: 'power3.out' })

    gsap.set([dot, ring], { xPercent: 0, yPercent: 0, x: -100, y: -100 })

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    // Swell over anything clickable.
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('a, button, [data-cursor="hover"]')

    const onOver = (e: PointerEvent) => {
      if (!isInteractive(e.target)) return
      ringScale(2.1)
      ring.classList.add('is-hover')
    }
    const onOut = (e: PointerEvent) => {
      if (!isInteractive(e.target)) return
      ringScale(1)
      ring.classList.remove('is-hover')
    }
    const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 })
    const onEnter = () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}
