import { useRef, type ReactNode } from 'react'
import { gsap } from '../../lib/gsap'
import { cx } from '../../lib/utils'
import { useIsCoarsePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  /** How far the child is pulled toward the pointer (0..1). */
  strength?: number
  className?: string
}

/**
 * Magnetic hover wrapper — the child leans toward the cursor while it is
 * inside the hit area and springs back on leave. No-op on touch devices
 * and under prefers-reduced-motion.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const disabled = useIsCoarsePointer() || usePrefersReducedMotion()

  const onMove = (e: React.PointerEvent) => {
    if (disabled || !wrapRef.current || !innerRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    gsap.to(innerRef.current, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    if (disabled || !innerRef.current) return
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div
      ref={wrapRef}
      className={cx('inline-block', className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
