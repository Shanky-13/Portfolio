/**
 * GLSL for the SignalField particle system.
 *
 * Every particle carries FOUR target positions (one per story state) and the
 * vertex shader blends between them with `uMorph` (0..3):
 *
 *   0 — EMG waveform plane   (hero: raw signal)
 *   1 — neural constellation (about/skills: intelligence)
 *   2 — data helix           (projects: engineered structure)
 *   3 — circuit lattice      (achievements/education: silicon)
 *
 * The cursor is projected onto the field plane and pushed into `uMouse`;
 * particles scatter away from it like charge and flash brighter.
 */

export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;       // 0..3 across the scroll story
  uniform float uWaveAmp;     // wave strength (mostly on state 0)
  uniform vec3  uMouse;       // world-space cursor on the z=0 plane
  uniform float uMouseForce;  // 0 when idle / reduced motion
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3  aWave;
  attribute vec3  aNet;
  attribute vec3  aHelix;
  attribute vec3  aLattice;
  attribute float aSeed;      // per-particle random, 0..1

  varying float vGlow;        // cursor-charge flash
  varying float vMix;         // cyan → violet blend
  varying float vSeed;

  // Triangle-window weight for morph state k
  float stateWeight(float k) {
    return clamp(1.0 - abs(uMorph - k), 0.0, 1.0);
  }

  void main() {
    float w0 = stateWeight(0.0);
    float w1 = stateWeight(1.0);
    float w2 = stateWeight(2.0);
    float w3 = stateWeight(3.0);

    vec3 pos = aWave * w0 + aNet * w1 + aHelix * w2 + aLattice * w3;

    // --- EMG-style signal: two traveling carriers + random burst envelope
    float carrier = sin(pos.x * 0.9 + uTime * 1.4) * 0.45
                  + sin(pos.x * 2.3 - uTime * 2.2 + pos.z * 0.8) * 0.22;
    float burst = smoothstep(0.72, 1.0, sin(uTime * 0.6 + aSeed * 6.2831))
                * sin(uTime * 13.0 + aSeed * 40.0) * 0.38;
    pos.y += (carrier + burst) * uWaveAmp * (w0 + w3 * 0.2);

    // --- Gentle breathing on the volumetric states
    pos += normalize(pos + 0.0001) * sin(uTime * 0.6 + aSeed * 12.0) * 0.035 * (w1 + w2);

    // --- Cursor repulsion: particles scatter like charge around the pointer
    vec2 d = pos.xy - uMouse.xy;
    float force = exp(-dot(d, d) * 1.35) * uMouseForce;
    pos.xy += normalize(d + 0.0001) * force;
    pos.z  += force * 0.45;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio
                 * (0.55 + aSeed * 0.9)
                 * (1.0 + force * 1.6)
                 * (6.0 / max(0.1, -mv.z));

    vGlow = force;
    vSeed = aSeed;
    vMix  = clamp(pos.y * 0.22 + 0.5 + (aSeed - 0.5) * 0.35, 0.0, 1.0);
  }
`

export const particleFragment = /* glsl */ `
  uniform vec3 uColorA;  // electric cyan
  uniform vec3 uColorB;  // plasma violet

  varying float vGlow;
  varying float vMix;
  varying float vSeed;

  void main() {
    // Soft round sprite
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.06, d);
    if (alpha < 0.01) discard;

    vec3 col = mix(uColorA, uColorB, vMix);
    col += vGlow * vec3(0.55, 0.9, 1.0);          // charge flash near the cursor
    float tw = 0.75 + 0.25 * sin(vSeed * 100.0);  // per-particle brightness variance

    gl_FragColor = vec4(col, alpha * (0.5 + 0.5 * tw));
    #include <colorspace_fragment>
  }
`
