import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { RevealText } from '../ui/RevealText'
import { TiltCard } from '../ui/TiltCard'
import { cx } from '../../lib/utils'
import { ProjectArt } from './ProjectArt'
import { Section } from './Section'

/** Centerpiece: large alternating rows, each a 3D-tilting glass card. */
export function Projects() {
  return (
    <Section id="projects" ariaLabel="Projects" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="03"
          title="Hard problems, real working products"
          kicker="Three flagship builds spanning EMG signal processing, computer vision and applied AI."
        />

        <div className="space-y-16 md:space-y-24">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <div
                  className={cx(
                    'glass flex flex-col gap-8 overflow-hidden rounded-2xl p-6 md:items-center md:gap-12 md:p-10',
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                  )}
                >
                  {/* Visual — PLACEHOLDER art, swap with real screenshots */}
                  <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 md:w-1/2">
                    <ProjectArt kind={p.art} title={p.title} />
                  </div>

                  {/* Info */}
                  <div className="md:w-1/2">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="font-mono text-sm text-electric">/{p.index}</span>
                      <span
                        className={cx(
                          'rounded-full border px-3 py-0.5 text-[11px] tracking-widest uppercase',
                          p.status === 'Ongoing'
                            ? 'border-electric/50 text-electric'
                            : 'border-white/20 text-ghost',
                        )}
                      >
                        {p.status}
                      </span>
                    </div>

                    <RevealText
                      as="h3"
                      text={p.title}
                      className="mb-4 text-2xl font-bold tracking-tight md:text-4xl"
                    />

                    <p className="mb-4 leading-relaxed text-ghost">{p.description}</p>

                    {/* Impact / metric line */}
                    <p className="mb-6 border-l-2 border-plasma/70 pl-4 text-sm text-white/80 italic">
                      {p.impact}
                    </p>

                    <ul className="mb-7 flex flex-wrap gap-2" aria-label="Technologies used">
                      {p.tech.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-electric"
                    >
                      View code on GitHub
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}
