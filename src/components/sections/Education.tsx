import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Section } from './Section'

/** Single-entry education card with an animated CGPA meter. */
export function Education() {
  const reduced = useReducedMotion()
  const pct = (education.cgpa / education.cgpaMax) * 100

  return (
    <Section id="education" ariaLabel="Education" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading index="05" title="Engineered at PSIT Kanpur" />

        <motion.div
          className="glass relative overflow-hidden rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Corner wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 80% at 90% 10%, rgb(124 58 237 / 0.10), transparent 70%)',
            }}
          />

          <div className="grid gap-10 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-electric/40 text-electric">
                  <GraduationCap aria-hidden className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs tracking-[0.25em] text-ghost uppercase">
                  {education.period}
                </span>
              </div>

              <h3 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
                {education.degree}
              </h3>
              <p className="text-ghost">{education.institute}</p>
            </div>

            {/* CGPA meter */}
            <div>
              <div className="mb-3 flex items-end justify-between">
                <span className="text-xs tracking-[0.25em] text-ghost uppercase">CGPA</span>
                <span className="text-gradient text-4xl font-bold tabular-nums">
                  {education.cgpa.toFixed(2)}
                  <span className="text-lg text-ghost"> / {education.cgpaMax}</span>
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-white/10"
                role="meter"
                aria-valuenow={education.cgpa}
                aria-valuemin={0}
                aria-valuemax={education.cgpaMax}
                aria-label={`CGPA ${education.cgpa} out of ${education.cgpaMax}`}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-electric to-plasma"
                  initial={{ width: reduced ? `${pct}%` : '0%' }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
