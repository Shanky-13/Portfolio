import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { Mail } from 'lucide-react'
import { site, type SocialIcon } from '../../data/content'
import { Magnetic } from './Magnetic'
import { cx } from '../../lib/utils'

const ICONS: Record<SocialIcon, React.ReactNode> = {
  github: <FaGithub aria-hidden />,
  linkedin: <FaLinkedinIn aria-hidden />,
  leetcode: <SiLeetcode aria-hidden />,
  mail: <Mail aria-hidden size={18} />,
}

/**
 * Icon-button links to every profile — used in both the hero and the
 * contact section. External links open in a new tab; mailto stays put.
 */
export function SocialLinks({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <ul className="flex items-center gap-3" aria-label="Social profiles">
      {site.socials.map((s) => {
        const external = s.href.startsWith('http')
        return (
          <li key={s.label}>
            <Magnetic strength={0.3}>
              <a
                href={s.href}
                aria-label={s.label}
                title={s.label}
                {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className={cx(
                  'flex items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-300',
                  'hover:border-electric/70 hover:text-electric hover:shadow-[0_0_24px_rgb(0_229_255/0.25)]',
                  size === 'md' ? 'h-11 w-11 text-lg' : 'h-14 w-14 text-xl',
                )}
              >
                {ICONS[s.icon]}
              </a>
            </Magnetic>
          </li>
        )
      })}
    </ul>
  )
}
