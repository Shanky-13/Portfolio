import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../../data/content'

interface PreloaderProps {
  onDone: () => void
  reducedMotion: boolean
}

/**
 * Page-load intro: a counter charges 0→100 like a capacitor while the
 * signal-field warms up behind it, then the whole panel wipes upward.
 * Under reduced motion it's a quick 300ms fade instead.
 */
export function Preloader({ onDone, reducedMotion }: PreloaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = reducedMotion ? 300 : 1500
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // fast start, soft landing
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-void p-6 md:p-10"
      role="status"
      aria-label="Loading portfolio"
      exit={
        reducedMotion
          ? { opacity: 0, transition: { duration: 0.25 } }
          : {
              clipPath: 'inset(0px 0px 100% 0px)',
              transition: { duration: 0.85, ease: [0.83, 0, 0.17, 1] },
            }
      }
    >
      <div className="flex items-center justify-between text-xs tracking-[0.3em] text-ghost uppercase">
        <span>{site.name} — Portfolio</span>
        <span>©2026</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <span className="text-gradient text-2xl font-bold tracking-tight">S—S</span>
        <p className="text-xs tracking-[0.35em] text-ghost uppercase">
          Initialising Signal Field
        </p>
        {/* Charge bar */}
        <div className="h-px w-56 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-electric to-plasma transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-end justify-end">
        <span className="text-7xl font-bold tracking-tighter text-white/90 tabular-nums md:text-8xl">
          {progress}
          <span className="text-electric">%</span>
        </span>
      </div>
    </motion.div>
  )
}
