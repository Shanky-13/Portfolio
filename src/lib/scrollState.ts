/**
 * Mutable, render-free state bridge between the DOM world (Lenis, pointer
 * events) and the R3F canvas (read every frame in useFrame). Deliberately
 * NOT React state — updating it never causes a re-render.
 */
export const scrollState = {
  /** Page scroll progress, 0 (top) → 1 (bottom). Drives morph + camera rail. */
  progress: 0,
  /** Pointer position in normalized device coords (-1..1, +y up). */
  mouse: { x: 0, y: 0 },
}
