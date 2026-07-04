import type { ProjectArt as ArtKind } from '../../data/content'

/**
 * ============================================================
 * PLACEHOLDER PROJECT ART
 * Stylized neon schematics standing in for real screenshots.
 * Swap by replacing <ProjectArt/> in Projects.tsx with an
 * <img src="..." alt="..."> (or keep these — they scale forever).
 * ============================================================
 */
export function ProjectArt({ kind, title }: { kind: ArtKind; title: string }) {
  return (
    <svg
      viewBox="0 0 800 450"
      role="img"
      aria-label={`${title} — placeholder preview illustration`}
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`bg-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#101020" />
          <stop offset="1" stopColor="#0a0a0f" />
        </linearGradient>
        <linearGradient id={`neon-${kind}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#00e5ff" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      <rect width="800" height="450" fill={`url(#bg-${kind})`} />
      {/* Faint grid */}
      <g stroke="#ffffff" strokeOpacity="0.04">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="450" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 55} x2="800" y2={i * 55} />
        ))}
      </g>

      {kind === 'assistant' && (
        <g fill="none" stroke={`url(#neon-${kind})`} strokeWidth="3" strokeLinecap="round">
          {/* App window */}
          <rect x="180" y="90" width="440" height="270" rx="18" strokeOpacity="0.85" />
          <line x1="180" y1="135" x2="620" y2="135" strokeOpacity="0.4" />
          <circle cx="210" cy="112" r="5" fill="#00e5ff" stroke="none" />
          <circle cx="230" cy="112" r="5" fill="#7c3aed" stroke="none" opacity="0.7" />
          {/* Voice waveform */}
          <path d="M230 250 l30 0 15 -45 20 90 20 -120 20 150 20 -105 15 30 40 0 15 -60 20 85 20 -70 15 45 90 0" strokeOpacity="0.95" />
          {/* Mic */}
          <circle cx="400" cy="325" r="16" strokeOpacity="0.8" />
          <path d="M400 341 v12 M385 353 h30" strokeOpacity="0.8" />
        </g>
      )}

      {kind === 'prosthetic' && (
        <g fill="none" stroke={`url(#neon-${kind})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* EMG signal feeding the arm */}
          <path d="M60 225 h60 l12 -35 16 70 16 -90 16 110 16 -80 12 25 h40" strokeOpacity="0.9" />
          {/* Forearm chassis */}
          <path d="M250 190 h190 a30 30 0 0 1 30 30 v10 a30 30 0 0 1 -30 30 h-190 z" strokeOpacity="0.85" />
          <circle cx="290" cy="225" r="11" strokeOpacity="0.6" />
          <circle cx="420" cy="225" r="16" strokeOpacity="0.85" />
          {/* Fingers */}
          <path d="M470 205 q60 -45 110 -38 M470 218 q70 -18 120 -8 M470 233 q70 12 118 26 M470 245 q55 35 95 52" strokeOpacity="0.9" />
          {/* Sensor pads */}
          <circle cx="120" cy="300" r="7" fill="#00e5ff" stroke="none" opacity="0.9" />
          <circle cx="170" cy="320" r="7" fill="#7c3aed" stroke="none" opacity="0.9" />
          <path d="M120 300 q60 30 130 -40 M170 320 q50 0 100 -70" strokeOpacity="0.35" strokeDasharray="5 7" />
        </g>
      )}

      {kind === 'glasses' && (
        <g fill="none" stroke={`url(#neon-${kind})`} strokeWidth="3" strokeLinecap="round">
          {/* Frames */}
          <rect x="215" y="185" width="150" height="95" rx="26" strokeOpacity="0.9" />
          <rect x="435" y="185" width="150" height="95" rx="26" strokeOpacity="0.9" />
          <path d="M365 215 q35 -18 70 0 M215 210 l-45 -12 M585 210 l45 -12" strokeOpacity="0.7" />
          {/* Detection brackets around an object */}
          <path d="M120 330 h28 M120 330 v28 M248 330 h-28 M248 330 v28 M120 430 h28 M120 402 v28 M248 430 h-28 M248 402 v28" strokeOpacity="0.85" transform="translate(0,-60)" />
          <circle cx="184" cy="325" r="18" strokeOpacity="0.5" />
          {/* Audio feedback arcs */}
          <path d="M640 300 q22 25 0 50 M665 285 q40 40 0 80 M690 270 q58 55 0 110" strokeOpacity="0.8" transform="translate(0,-70)" />
        </g>
      )}

      {/* Placeholder watermark — remove when swapping in real previews */}
      <text x="776" y="430" textAnchor="end" fontSize="12" fill="#ffffff" fillOpacity="0.28" fontFamily="monospace" letterSpacing="2">
        PLACEHOLDER PREVIEW
      </text>
    </svg>
  )
}
