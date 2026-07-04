import { motion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { site } from '../../data/content'
import { scrollToTarget } from '../../lib/smoothScroll'
import { Magnetic } from '../ui/Magnetic'
import { RevealText } from '../ui/RevealText'
import { SocialLinks } from '../ui/SocialLinks'
import { Section } from './Section'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
})

interface HeroProps {
  /** Flips true once the preloader has wiped away — starts the reveals. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const animate = ready ? { opacity: 1, y: 0 } : {}

  return (
    <Section id="hero" ariaLabel="Introduction" className="flex min-h-svh flex-col justify-center">
      <div className="container-x pt-32 pb-24">
        {/* Location / availability overline */}
        <motion.p
          className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.25em] text-ghost uppercase"
          {...fadeUp(0.15)}
          animate={animate}
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} aria-hidden className="text-electric" />
            {site.locationShort}
          </span>
          <span aria-hidden className="text-white/20">/</span>
          <span className="text-electric">Open to fresher IT roles · 2026</span>
        </motion.p>

        {/* Name — staggered letter reveal */}
        <h1 className="mb-6 text-[clamp(3.2rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-tight">
          <RevealText as="span" text={site.firstName.toUpperCase()} play={ready} delay={0.2} className="block" />
          <RevealText
            as="span"
            text={site.lastName.toUpperCase()}
            play={ready}
            delay={0.4}
            className="text-gradient block"
          />
        </h1>

        <RevealText
          as="p"
          text={site.title}
          play={ready}
          delay={0.65}
          stagger={0.008}
          className="mb-5 max-w-3xl text-lg font-medium text-white/90 md:text-2xl"
        />

        <motion.p
          className="mb-4 border-l-2 border-electric/60 pl-4 text-sm text-electric/90 italic md:text-base"
          {...fadeUp(0.9)}
          animate={animate}
        >
          “{site.tagline}”
        </motion.p>

        <motion.p className="mb-10 max-w-2xl leading-relaxed text-ghost" {...fadeUp(1.0)} animate={animate}>
          {site.heroBio}
        </motion.p>

        {/* CTAs + socials */}
        <motion.div className="flex flex-wrap items-center gap-4" {...fadeUp(1.15)} animate={animate}>
          <Magnetic>
            <button type="button" className="btn btn-primary" onClick={() => scrollToTarget('#projects')}>
              Explore projects
              <ArrowDown size={16} aria-hidden />
            </button>
          </Magnetic>
          <Magnetic>
            <a href={site.resumeUrl} download className="btn btn-ghost">
              Download resume
            </a>
          </Magnetic>
          <div className="ml-1">
            <SocialLinks />
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 motion-reduce:hidden"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.4em] text-ghost uppercase">scroll</span>
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-electric to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </Section>
  )
}
