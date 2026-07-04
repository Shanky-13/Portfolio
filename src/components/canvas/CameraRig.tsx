import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'

/**
 * Camera rail keyed to scroll progress. Each stop "docks" a section at a
 * fresh angle on the morphing field:
 *
 *   0.00 hero          — low frontal, inside the signal
 *   0.25 about/skills  — orbit right, rise toward the constellation
 *   0.50 projects      — sweep left along the helix
 *   0.75 achievements  — top-down PCB-inspection view
 *   1.00 contact       — settle back to center
 */
const POSITIONS = [
  new THREE.Vector3(0, 0.5, 8.8),
  new THREE.Vector3(3.6, 2.2, 7.4),
  new THREE.Vector3(-4.6, 1.6, 6.6),
  new THREE.Vector3(0.4, 5.6, 5.2),
  new THREE.Vector3(0, 0.9, 7.8),
]
const LOOKS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0.3, 0),
  new THREE.Vector3(0.4, 0, 0),
  new THREE.Vector3(0, 0, -0.4),
  new THREE.Vector3(0, 0.2, 0),
]

export function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const posCurve = useMemo(() => new THREE.CatmullRomCurve3(POSITIONS, false, 'catmullrom', 0.6), [])
  const lookCurve = useMemo(() => new THREE.CatmullRomCurve3(LOOKS, false, 'catmullrom', 0.6), [])

  const progress = useRef(0)
  const parallax = useRef({ x: 0, y: 0 })
  const tmpPos = useMemo(() => new THREE.Vector3(), [])
  const tmpLook = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera }, delta) => {
    if (reducedMotion) {
      // Static, composed hero frame for reduced-motion users.
      camera.position.copy(POSITIONS[0])
      camera.lookAt(LOOKS[0])
      return
    }

    // Damped chase of the scroll position = the "camera glide".
    progress.current = THREE.MathUtils.damp(progress.current, scrollState.progress, 2.2, delta)
    posCurve.getPoint(progress.current, tmpPos)
    lookCurve.getPoint(progress.current, tmpLook)

    // Mouse parallax, damped separately so it floats behind the pointer.
    parallax.current.x = THREE.MathUtils.damp(parallax.current.x, scrollState.mouse.x * 0.55, 2.5, delta)
    parallax.current.y = THREE.MathUtils.damp(parallax.current.y, scrollState.mouse.y * 0.3, 2.5, delta)

    camera.position.set(
      tmpPos.x + parallax.current.x,
      tmpPos.y + parallax.current.y,
      tmpPos.z,
    )
    camera.lookAt(tmpLook)
  })

  return null
}
