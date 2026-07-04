import { motion } from 'framer-motion'
import { allSkills, skillGroups } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Section } from './Section'

/** Infinite marquee strip — the list is duplicated so -50% loops cleanly. */
function SkillMarquee() {
  const strip = [...allSkills, ...allSkills]
  return (
    <div
      className="relative mb-16 overflow-hidden border-y border-white/5 py-4 select-none"
      aria-hidden
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {strip.map((skill, i) => (
          <span key={i} className="flex items-center gap-8 text-2xl font-semibold tracking-tight text-white/25 md:text-4xl">
            {skill}
            <span className="text-base text-electric/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <Section id="skills" ariaLabel="Skills" className="py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="02"
          title="A full-stack toolkit, wired from silicon up"
          kicker="From register-level C to REST APIs — grouped by where they live in the stack."
        />
      </div>

      <SkillMarquee />

      <div className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-electric/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold tracking-tight">{group.title}</h3>
                <span className="font-mono text-xs" style={{ color: group.accent }}>
                  0{gi + 1}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip" data-cursor="hover">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
