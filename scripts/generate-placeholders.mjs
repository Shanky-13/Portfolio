/**
 * Generates binary placeholder assets with zero dependencies:
 *   public/og-image.png — 1200×630 branded gradient + waveform (raw PNG via zlib)
 *   public/resume.pdf   — one-page placeholder PDF
 *
 * Run: npm run assets   (re-run any time; overwrites both files)
 * Swap both files with real ones before deploying.
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
mkdirSync(join(root, 'public'), { recursive: true })

/* ---------------------------------------------------------------- PNG */
const W = 1200
const H = 630

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

// Scene painters ------------------------------------------------------
const lerp = (a, b, t) => a + (b - a) * t
const CYAN = [0, 229, 255]
const VIOLET = [124, 58, 237]

/** EMG-style waveform y for a given x (deterministic pseudo-random bursts). */
function waveY(x) {
  const t = x / W
  let y = Math.sin(t * 22) * 30 + Math.sin(t * 53 + 1.7) * 14
  // bursts
  const burst = Math.max(0, Math.sin(t * 6.5 + 0.8)) ** 6
  y += Math.sin(t * 240) * 70 * burst
  return H * 0.56 + y
}

const rows = []
for (let y = 0; y < H; y++) {
  const row = Buffer.alloc(1 + W * 3)
  row[0] = 0 // filter: none
  for (let x = 0; x < W; x++) {
    // Base: near-black with two soft radial glows (cyan TL-ish, violet BR)
    let r = 10, g = 10, b = 15
    const d1 = Math.hypot(x - W * 0.28, y - H * 0.38) / (W * 0.55)
    const d2 = Math.hypot(x - W * 0.8, y - H * 0.75) / (W * 0.5)
    const g1 = Math.max(0, 1 - d1) ** 2 * 0.35
    const g2 = Math.max(0, 1 - d2) ** 2 * 0.4
    r += CYAN[0] * g1 * 0.25 + VIOLET[0] * g2 * 0.35
    g += CYAN[1] * g1 * 0.25 + VIOLET[1] * g2 * 0.35
    b += CYAN[2] * g1 * 0.25 + VIOLET[2] * g2 * 0.35

    // Subtle grid
    if (x % 60 === 0 || y % 60 === 0) { r += 6; g += 6; b += 9 }

    // Waveform stroke with glow falloff, gradient cyan→violet across x
    const wy = waveY(x)
    const dist = Math.abs(y - wy)
    if (dist < 26) {
      const k = Math.max(0, 1 - dist / 26) ** 2.2
      const core = dist < 2.2 ? 1 : 0
      const mixT = x / W
      const cr = lerp(CYAN[0], VIOLET[0], mixT)
      const cg = lerp(CYAN[1], VIOLET[1], mixT)
      const cb = lerp(CYAN[2], VIOLET[2], mixT)
      r += cr * (k * 0.5 + core * 0.9)
      g += cg * (k * 0.5 + core * 0.9)
      b += cb * (k * 0.5 + core * 0.9)
    }

    const i = 1 + x * 3
    row[i] = Math.min(255, r | 0)
    row[i + 1] = Math.min(255, g | 0)
    row[i + 2] = Math.min(255, b | 0)
  }
  rows.push(row)
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(H, 4)
ihdr[8] = 8 // bit depth
ihdr[9] = 2 // color type: truecolor
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', deflateSync(Buffer.concat(rows), { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
])
writeFileSync(join(root, 'public/og-image.png'), png)
console.log(`✓ public/og-image.png (${(png.length / 1024).toFixed(0)} KB, ${W}×${H})`)

/* ---------------------------------------------------------------- PDF */
const text = (x, y, size, str) =>
  `BT /F1 ${size} Tf ${x} ${y} Td (${str.replace(/[()\\]/g, '\\$&')}) Tj ET`
const stream = [
  '0.039 0.039 0.059 rg 0 0 612 792 re f',
  '0 0.898 1 rg',
  text(72, 700, 24, 'Shashank Singh'),
  '1 1 1 rg',
  text(72, 676, 12, 'Electronics & Communication Engineer - AI/ML & Full-Stack Developer'),
  '0.64 0.66 0.74 rg',
  text(72, 640, 11, 'PLACEHOLDER RESUME - replace public/resume.pdf with the real file.'),
  text(72, 620, 11, 'Email: 2k22.ece.2213346@gmail.com'),
  text(72, 604, 11, 'GitHub: github.com/Shanky-13  |  LinkedIn: /in/shashank-singh-79632a337'),
].join('\n')

const objs = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
]
let pdf = '%PDF-1.4\n'
const offsets = []
objs.forEach((o, i) => {
  offsets.push(pdf.length)
  pdf += `${i + 1} 0 obj\n${o}\nendobj\n`
})
const xref = pdf.length
pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`
pdf += offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')
pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`
writeFileSync(join(root, 'public/resume.pdf'), pdf)
console.log('✓ public/resume.pdf (placeholder)')
