import { motion } from 'framer-motion'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { site } from '../../data/content'
import { Magnetic } from '../ui/Magnetic'
import { RevealText } from '../ui/RevealText'
import { SocialLinks } from '../ui/SocialLinks'
import { Section } from './Section'

/** Big closing CTA: giant mail link, copy-email helper, socials, footer. */
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <Section id="contact" ariaLabel="Contact" className="flex min-h-svh flex-col justify-center pt-28">
      <div className="container-x flex-1 content-center py-16">
        <motion.p
          className="mb-6 font-mono text-sm tracking-[0.25em] text-electric uppercase"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          [ 06 ] — signal me
        </motion.p>

        <RevealText
          as="h2"
          text="Let’s build what’s next."
          className="mb-8 text-[clamp(2.6rem,8vw,6.5rem)] leading-[1.02] font-bold tracking-tight"
        />

        <motion.p
          className="mb-12 max-w-xl text-lg text-ghost"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          I’m graduating in July 2026 and actively looking for a fresher IT role — AI/ML,
          computer vision, embedded, or full-stack. If you’re hiring or just want to talk
          shop, my inbox is open.
        </motion.p>

        {/* Giant email CTA */}
        <motion.div
          className="mb-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 text-xl font-semibold tracking-tight break-all text-white transition-colors duration-300 hover:text-electric md:text-4xl"
            >
              {site.email}
              <ArrowUpRight
                aria-hidden
                className="h-6 w-6 shrink-0 text-electric transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-9 md:w-9"
              />
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={copyEmail}
            className="btn btn-ghost !px-4 !py-2 text-xs"
            aria-live="polite"
          >
            {copied ? <Check size={14} aria-hidden className="text-electric" /> : <Copy size={14} aria-hidden />}
            {copied ? 'Copied!' : 'Copy email'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <SocialLinks size="lg" />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-2 text-xs text-ghost sm:flex-row">
          <p>© 2026 {site.name}. Designed & built with signal and caffeine.</p>
          <p className="font-mono">
            {site.locationShort} · <span className="text-electric">available for hire</span>
          </p>
        </div>
      </footer>
    </Section>
  )
}
