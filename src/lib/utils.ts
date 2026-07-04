/** Tiny className joiner — avoids pulling in a dependency for one-liners. */
export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

/** Feature-detect WebGL so we can fall back to a static backdrop. */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}
