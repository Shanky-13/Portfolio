import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { cx } from '../../lib/utils'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface RevealTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  className?: string
  delay?: number
  stagger?: number
  /**
   * 'scroll' (default) — plays once when scrolled into view.
   * boolean — externally controlled (the hero waits for the preloader).
   */
  play?: boolean | 'scroll'
}

/**
 * Letter-by-letter reveal. Words are wrapped in overflow-hidden spans so
 * letters rise from beneath a masked line — the screen-reader label stays
 * the intact original string.
 */
export function RevealText({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.018,
  play = 'scroll',
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const played = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced || played.current) return
    const letters = el.querySelectorAll<HTMLElement>('.rt-letter')
    if (!letters.length) return

    gsap.set(letters, { yPercent: 120, rotate: 5 })
    const animateIn = () =>
      gsap.to(letters, {
        yPercent: 0,
        rotate: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger,
        delay,
        overwrite: 'auto',
      })

    if (play === 'scroll') {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          played.current = true
          animateIn()
        },
      })
      return () => st.kill()
    }

    if (play) {
      played.current = true
      animateIn()
    }
    return undefined
  }, [play, reduced, delay, stagger])

  const Tag = as as 'div'
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className="inline-block overflow-hidden align-bottom whitespace-pre pb-[0.08em] -mb-[0.08em]"
        >
          {(wi < words.length - 1 ? word + ' ' : word).split('').map((ch, ci) => (
            <span key={ci} className={cx('rt-letter inline-block whitespace-pre will-change-transform')}>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
