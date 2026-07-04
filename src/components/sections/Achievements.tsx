import { motion } from 'framer-motion'
import { Award, Cpu, Medal, Sparkles, Trophy, Zap } from 'lucide-react'
import { achievements, certifications, type BadgeIcon } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { TiltCard } from '../ui/TiltCard'
import { cx } from '../../lib/utils'
import { Section } from './Section'

const BADGE_ICONS: Record<BadgeIcon, React.ReactNode> = {
  trophy: <Trophy aria-hidden />,
  medal: <Medal aria-hidden />,
  zap: <Zap aria-hidden />,
  sparkles: <Sparkles aria-hidden />,
  cpu: <Cpu aria-hidden />,
}

/**
 * Animated trophy wall: the SIH card spans wide as the hero badge, the
 * rest tile around it. Certifications get their own strip below.
 */
export function Achievements() {
  return (
    <Section id="achievements" ariaLabel="Achievements and awards" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="04"
          title="A trophy wall in progress"
          kicker="National hackathons, competition wins and certifications — proof I ship under pressure."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.li
              key={a.title}
              className={cx(a.featured && 'sm:col-span-2')}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard max={6} className="h-full">
                <div
                  className={cx(
                    'glass group/badge relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-electric/40',
                    a.featured && 'border-electric/30',
                  )}
                >
                  {/* Featured glow wash */}
                  {a.featured && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(60% 90% at 12% 0%, rgb(0 229 255 / 0.09), transparent 70%)',
                      }}
                    />
                  )}

                  <div className="mb-5 flex items-start justify-between">
                    <span
                      className={cx(
                        'flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 [&>svg]:h-5 [&>svg]:w-5',
                        a.featured
                          ? 'border-electric/50 text-electric shadow-[0_0_28px_rgb(0_229_255/0.2)]'
                          : 'border-white/15 text-ghost group-hover/badge:border-electric/50 group-hover/badge:text-electric',
                      )}
                    >
                      {BADGE_ICONS[a.icon]}
                    </span>
                    <span
                      className={cx(
                        'rounded-full border px-3 py-1 text-[10px] tracking-[0.18em] uppercase',
                        a.tag === 'Winner' || a.featured
                          ? 'border-electric/40 text-electric'
                          : 'border-white/15 text-ghost',
                      )}
                    >
                      {a.tag}
                    </span>
                  </div>

                  <h3 className={cx('mb-2 font-bold tracking-tight', a.featured ? 'text-2xl md:text-3xl' : 'text-lg')}>
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ghost">{a.blurb}</p>
                </div>
              </TiltCard>
            </motion.li>
          ))}

          {/* Certifications tile completes the grid */}
          <motion.li
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard max={6} className="h-full">
              <div className="glass h-full rounded-2xl border-plasma/30 p-6">
                <div className="mb-5 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-plasma/50 text-plasma shadow-[0_0_28px_rgb(124_58_237/0.25)]">
                    <Award aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-plasma/40 px-3 py-1 text-[10px] tracking-[0.18em] text-plasma uppercase">
                    Certified
                  </span>
                </div>
                <h3 className="mb-1 text-lg font-bold tracking-tight">
                  {certifications.featured.issuer}
                </h3>
                <p className="mb-4 text-sm text-electric">{certifications.featured.name}</p>
                <p className="mb-2 text-[11px] tracking-[0.18em] text-ghost uppercase">
                  {certifications.caption}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {certifications.items.map((c) => (
                    <li key={c} className="chip !text-xs">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.li>
        </ul>
      </div>
    </Section>
  )
}
