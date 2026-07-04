import { motion } from 'framer-motion'
import { RevealText } from './RevealText'

interface SectionHeadingProps {
  index: string
  title: string
  kicker?: string
}

/** Consistent editorial header for every section: index → rule → big title. */
export function SectionHeading({ index, title, kicker }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        className="mb-5 flex items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-mono text-sm tracking-[0.25em] text-electric">[ {index} ]</span>
        <span className="h-px w-16 bg-gradient-to-r from-electric/70 to-transparent" />
      </motion.div>

      <RevealText
        as="h2"
        text={title}
        className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
      />

      {kicker && (
        <motion.p
          className="mt-5 max-w-xl text-ghost"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {kicker}
        </motion.p>
      )}
    </div>
  )
}
