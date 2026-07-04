import { motion } from 'framer-motion'
import { site, stats } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Section } from './Section'

/** Bio on the left, glowing stat wall on the right. */
export function About() {
  return (
    <Section id="about" ariaLabel="About me" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="01" title="Where hardware meets intelligence" />

        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          {/* Bio */}
          <div className="space-y-6 md:col-span-3">
            {site.aboutBio.map((para, i) => (
              <motion.p
                key={i}
                className="text-lg leading-relaxed text-ghost first:text-xl first:text-white/90"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Stat wall */}
          <dl className="grid grid-cols-2 gap-4 self-start md:col-span-2">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-electric/40"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <dd className="text-gradient text-3xl font-bold tracking-tight">{s.value}</dd>
                <dt className="mt-2 text-xs leading-relaxed text-ghost">{s.label}</dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
