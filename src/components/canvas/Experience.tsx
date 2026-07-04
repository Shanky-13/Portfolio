import { Canvas } from '@react-three/fiber'
import { SignalField } from './SignalField'
import { CircuitTraces } from './CircuitTraces'
import { CameraRig } from './CameraRig'
import { Effects } from './Effects'

interface ExperienceProps {
  reducedMotion: boolean
  isMobile: boolean
}

/**
 * The full-viewport 3D scene, mounted once behind the DOM content.
 * Default-exported so App can React.lazy() it — the whole three.js stack
 * stays out of the critical bundle.
 */
export default function Experience({ reducedMotion, isMobile }: ExperienceProps) {
  return (
    <Canvas
      // Static single frame for reduced-motion users; continuous otherwise.
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0.5, 8.8] }}
      // Cap DPR — retina 3x buys nothing visible here and costs half the frame.
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 9, 22]} />

      <SignalField count={isMobile ? 3200 : 9000} reducedMotion={reducedMotion} />
      <CircuitTraces reducedMotion={reducedMotion} />
      <CameraRig reducedMotion={reducedMotion} />
      <Effects highQuality={!isMobile && !reducedMotion} />
    </Canvas>
  )
}
