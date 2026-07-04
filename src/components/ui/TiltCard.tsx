import { useRef, type ReactNode } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cx } from '../../lib/utils'
import { useIsCoarsePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
}

/**
 * 3D-tilting card with a cursor-tracking glare. Springs (not tweens) so it
 * feels physical. Tilt is disabled for touch and reduced-motion users —
 * the card is still a perfectly good card.
 */
export function TiltCard({ children, className, max = 9 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const disabled = useIsCoarsePointer() || usePrefersReducedMotion()

  const rotateX = useSpring(0, { stiffness: 160, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 160, damping: 20 })

  const onMove = (e: React.PointerEvent) => {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5 // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-py * max)
    rotateY.set(px * max * 1.2)
    // Glare follows the pointer through CSS vars (no re-render).
    ref.current.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
    ref.current.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={cx('group relative will-change-transform', className)}
    >
      {children}
      {/* Cursor glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgb(0 229 255 / 0.10), transparent 65%)',
        }}
      />
    </motion.div>
  )
}
