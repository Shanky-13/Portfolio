import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * Faint PCB-style traces floating behind the particle field: orthogonal
 * runs with 45°/90° bends (classic board routing) plus glowing "via" pads
 * at every joint. Additive-blended so bloom picks them up gently.
 */
export function CircuitTraces({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)

  const { linePositions, lineColors, padPositions } = useMemo(() => {
    const pts: number[] = []
    const cols: number[] = []
    const pads: number[] = []
    const cyan = new THREE.Color('#00e5ff')
    const violet = new THREE.Color('#7c3aed')

    for (let t = 0; t < 26; t++) {
      let x = rand(-9, 9)
      let y = rand(-5, 5)
      const z = rand(-4.6, -2.6)
      // Start axis-aligned, then bend in 45° increments like real routing.
      let dir = Math.floor(rand(0, 4)) * (Math.PI / 2)
      const color = Math.random() > 0.5 ? cyan : violet
      const segments = 3 + Math.floor(Math.random() * 4)

      pads.push(x, y, z)
      for (let s = 0; s < segments; s++) {
        const len = rand(0.5, 2.1)
        const nx = x + Math.cos(dir) * len
        const ny = y + Math.sin(dir) * len
        pts.push(x, y, z, nx, ny, z)
        // Dim each trace toward its tail for a signal-decay feel.
        const k = 1 - (s / segments) * 0.6
        cols.push(color.r * k, color.g * k, color.b * k, color.r * k, color.g * k, color.b * k)
        pads.push(nx, ny, z)
        x = nx
        y = ny
        dir += (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4) * (Math.random() > 0.5 ? 1 : 2)
      }
    }

    return {
      linePositions: new Float32Array(pts),
      lineColors: new Float32Array(cols),
      padPositions: new Float32Array(pads),
    }
  }, [])

  useFrame(({ clock }) => {
    if (reducedMotion || !group.current) return
    const t = clock.elapsedTime
    // Slow ambient drift — enough life to feel alive, never distracting.
    group.current.rotation.z = Math.sin(t * 0.06) * 0.03
    group.current.position.y = Math.sin(t * 0.1) * 0.18
  })

  return (
    <group ref={group}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {/* Via pads at every bend */}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[padPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#00e5ff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
