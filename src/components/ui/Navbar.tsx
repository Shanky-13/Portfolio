import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { navLinks, site } from '../../data/content'
import { scrollToTarget } from '../../lib/smoothScroll'
import { Magnetic } from './Magnetic'
import { cx } from '../../lib/utils'

/**
 * Fixed top navigation: anchor links (smooth-scrolled through Lenis), a
 * résumé download, and a full-screen animated menu on mobile.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(`#${id}`)
  }

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500',
        scrolled ? 'border-b border-white/5 bg-void/70 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav className="container-x flex items-center justify-between py-4" aria-label="Primary">
        {/* Logo — waveform S mark */}
        <a
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          className="group flex items-center gap-2 text-lg font-bold tracking-tight"
          aria-label="Back to top"
        >
          <span className="text-gradient">S—S</span>
          <span className="hidden text-xs font-normal tracking-[0.3em] text-ghost uppercase transition-colors group-hover:text-electric sm:inline">
            {'/// signal'}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="text-sm text-ghost transition-colors duration-300 hover:text-electric"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.3}>
            <a href={site.resumeUrl} download className="btn btn-primary !px-5 !py-2.5 text-sm">
              <Download size={15} aria-hidden />
              Resume
            </a>
          </Magnetic>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-[72px] z-40 flex flex-col gap-2 border-t border-white/5 bg-void/95 px-6 py-10 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                className="border-b border-white/5 py-4 text-3xl font-semibold tracking-tight hover:text-electric"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
              >
                <span className="mr-3 font-mono text-sm text-electric">0{i + 1}</span>
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
