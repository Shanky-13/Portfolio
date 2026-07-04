import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing'

/**
 * Cinematic grade: soft mipmap bloom on everything emissive, gentle
 * depth-of-field + grain on desktop only (mobile gets bloom + vignette,
 * which is the 90% of the look for a fraction of the cost).
 */
export function Effects({ highQuality }: { highQuality: boolean }) {
  if (!highQuality) {
    return (
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.08} luminanceSmoothing={0.9} radius={0.75} />
        <Vignette eskil={false} offset={0.18} darkness={0.8} />
      </EffectComposer>
    )
  }
  return (
    <EffectComposer multisampling={0}>
      <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.08} luminanceSmoothing={0.9} radius={0.75} />
      <DepthOfField target={[0, 0, 1.5]} focalLength={0.16} bokehScale={2.2} />
      <Noise premultiply opacity={0.07} />
      <Vignette eskil={false} offset={0.18} darkness={0.8} />
    </EffectComposer>
  )
}
