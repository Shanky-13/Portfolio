/**
 * Zero-cost gradient backdrop rendered behind (and while loading) the 3D
 * canvas. Doubles as the full fallback when WebGL isn't available, so the
 * site never shows a black hole.
 */
export function StaticBackdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-void">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 36%, rgb(0 229 255 / 0.07), transparent 70%),' +
            'radial-gradient(42% 42% at 74% 72%, rgb(124 58 237 / 0.09), transparent 70%),' +
            'radial-gradient(30% 30% at 18% 80%, rgb(0 229 255 / 0.04), transparent 70%)',
        }}
      />
    </div>
  )
}
