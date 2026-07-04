import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'
import { particleVertex, particleFragment } from './shaders'

interface SignalFieldProps {
  /** Particle budget — lowered on mobile for a solid 60fps. */
  count: number
  reducedMotion: boolean
}

/** Cheap gaussian-ish random, centered on 0. */
const gauss = () => (Math.random() + Math.random() + Math.random()) / 1.5 - 1

/**
 * Builds the four morph-target position sets on the CPU once; all blending,
 * waving and cursor physics then run on the GPU (zero per-frame allocation).
 */
function buildAttributes(count: number) {
  // Snap to a W×H grid so the waveform state reads as a clean plane.
  const w = Math.round(Math.sqrt(count * (16 / 9)))
  const h = Math.floor(count / w)
  const n = w * h

  const wave = new Float32Array(n * 3)
  const net = new Float32Array(n * 3)
  const helix = new Float32Array(n * 3)
  const lattice = new Float32Array(n * 3)
  const seed = new Float32Array(n)

  // Neural constellation: clustered nodes on a squashed sphere + edges.
  const NODES = 26
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < NODES; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(2.3)
    v.y *= 0.72
    nodes.push(v)
  }

  for (let i = 0; i < n; i++) {
    const i3 = i * 3
    seed[i] = Math.random()

    // --- State 0: waveform plane (y displaced in the shader)
    const col = i % w
    const row = Math.floor(i / w)
    wave[i3] = (col / (w - 1) - 0.5) * 16
    wave[i3 + 1] = 0
    wave[i3 + 2] = (row / (h - 1) - 0.5) * 7 - 1

    // --- State 1: neural constellation — 62% node clusters, 38% edges
    if (Math.random() < 0.62) {
      const nd = nodes[Math.floor(Math.random() * NODES)]
      net[i3] = nd.x + gauss() * 0.24
      net[i3 + 1] = nd.y + gauss() * 0.24
      net[i3 + 2] = nd.z + gauss() * 0.24
    } else {
      const a = nodes[Math.floor(Math.random() * NODES)]
      const b = nodes[Math.floor(Math.random() * NODES)]
      const t = Math.random()
      net[i3] = a.x + (b.x - a.x) * t + gauss() * 0.03
      net[i3 + 1] = a.y + (b.y - a.y) * t + gauss() * 0.03
      net[i3 + 2] = a.z + (b.z - a.z) * t + gauss() * 0.03
    }

    // --- State 2: double data helix along x
    const t = (i / n - 0.5) * 12
    const strand = i % 2 === 0 ? 0 : Math.PI
    const ang = t * 1.5 + strand
    const r = 1.5 + gauss() * 0.1
    helix[i3] = t + gauss() * 0.06
    helix[i3 + 1] = Math.sin(ang) * r * 0.62
    helix[i3 + 2] = Math.cos(ang) * r * 0.62 - 0.4

    // --- State 3: circuit lattice — points snapped to a PCB-like grid
    const step = 0.62
    lattice[i3] = (Math.floor(Math.random() * 24) - 11.5) * step
    lattice[i3 + 1] = (Math.floor(Math.random() * 13) - 6) * step * 0.85
    lattice[i3 + 2] = (Math.random() - 0.5) * 0.7
  }

  return { n, wave, net, helix, lattice, seed }
}

export function SignalField({ count, reducedMotion }: SignalFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const attrs = useMemo(() => buildAttributes(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uWaveAmp: { value: 1 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) }, // parked off-field
      uMouseForce: { value: 0 },
      uSize: { value: count < 5000 ? 5.2 : 4.2 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColorA: { value: new THREE.Color('#00e5ff') },
      uColorB: { value: new THREE.Color('#7c3aed') },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Reused per-frame scratch objects — no allocation inside useFrame.
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const fieldPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])
  const hit = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera }, delta) => {
    const mat = materialRef.current
    if (!mat) return
    const u = mat.uniforms

    if (!reducedMotion) {
      u.uTime.value += delta

      // Morph chases scroll progress with critical damping — buttery, no snap.
      const target = scrollState.progress * 3
      u.uMorph.value = THREE.MathUtils.damp(u.uMorph.value, target, 2.6, delta)

      // Project the cursor onto the field plane for the repulsion force.
      ndc.set(scrollState.mouse.x, scrollState.mouse.y)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(fieldPlane, hit)) {
        u.uMouse.value.lerp(hit, 0.18)
      }
      u.uMouseForce.value = THREE.MathUtils.damp(u.uMouseForce.value, 0.55, 3, delta)
    }
  })

  return (
    <points frustumCulled={false} position={[0, -0.2, 0]}>
      <bufferGeometry>
        {/* `position` mirrors aWave so three.js can compute a bounding sphere */}
        <bufferAttribute attach="attributes-position" args={[attrs.wave, 3]} />
        <bufferAttribute attach="attributes-aWave" args={[attrs.wave, 3]} />
        <bufferAttribute attach="attributes-aNet" args={[attrs.net, 3]} />
        <bufferAttribute attach="attributes-aHelix" args={[attrs.helix, 3]} />
        <bufferAttribute attach="attributes-aLattice" args={[attrs.lattice, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[attrs.seed, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
