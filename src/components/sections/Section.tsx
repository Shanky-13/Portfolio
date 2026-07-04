import type { ReactNode } from 'react'
import { cx } from '../../lib/utils'

interface SectionProps {
  id: string
  ariaLabel: string
  className?: string
  children: ReactNode
}

/** Semantic section wrapper — sits on z-10 above the fixed 3D canvas. */
export function Section({ id, ariaLabel, className, children }: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={cx('relative z-10', className)}>
      {children}
    </section>
  )
}
