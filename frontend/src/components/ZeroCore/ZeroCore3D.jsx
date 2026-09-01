import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import './ZeroCore3D.css'

function ParticleField() {
  const particlesRef = useRef(null)

  const positions = useMemo(() => {
    const count = 90
    const data = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 1.45 + Math.random() * 0.75
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 1.4

      data[i * 3] =
        Math.cos(angle) * radius

      data[i * 3 + 1] =
        height

      data[i * 3 + 2] =
        Math.sin(angle) * radius
    }

    return data
  }, [])

  useFrame((_, delta) => {
    if (!particlesRef.current) return

    particlesRef.current.rotation.y += delta * 0.035
    particlesRef.current.rotation.x += delta * 0.01
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#35e7ff"
        size={0.018}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function NebulaShell({ activated }) {
  const materialRef = useRef(null)

  useFrame((state) => {
    if (!materialRef.current) return

    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime

    materialRef.current.uniforms.uActivation.value =
      activated ? 1 : 0
  })

  return (
    <mesh scale={1.04}>
      <sphereGeometry args={[0.72, 128, 128]} />

      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        side={THREE.FrontSide}
        uniforms={{
          uTime: {
            value: 0,
          },
          uActivation: {
            value: 0,
          },
        }}

        vertexShader={`
          uniform float uTime;

          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {

            vec3 pos = position;

            // ====================================
            // ORGANIC SURFACE MOVEMENT
            // ====================================

            float wave1 =
              sin(
                position.x * 7.0 +
                uTime * 0.8
              );

            float wave2 =
              sin(
                position.y * 9.0 -
                uTime * 0.55
              );

            float wave3 =
              sin(
                position.z * 8.0 +
                uTime * 0.65
              );

            float distortion =
              (wave1 + wave2 + wave3)
              * 0.012;

            // Push the shell very slightly
            // in/out along its normal.
            pos += normal * distortion;

            vNormal =
              normalize(
                normalMatrix * normal
              );

            vPosition = pos;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(pos, 1.0);
          }
        `}

        fragmentShader={`
          uniform float uTime;
          uniform float uActivation;

          varying vec3 vNormal;
          varying vec3 vPosition;


          // ====================================
          // RANDOM
          // ====================================

          float hash(vec3 p) {

            p =
              fract(
                p * 0.3183099 +
                vec3(0.1, 0.2, 0.3)
              );

            p *= 17.0;

            return fract(
              p.x *
              p.y *
              p.z *
              (p.x + p.y + p.z)
            );
          }


          // ====================================
          // 3D NOISE
          // ====================================

          float noise(vec3 p) {

            vec3 i = floor(p);
            vec3 f = fract(p);

            f =
              f *
              f *
              (3.0 - 2.0 * f);

            float n000 =
              hash(i);

            float n100 =
              hash(i + vec3(1.0, 0.0, 0.0));

            float n010 =
              hash(i + vec3(0.0, 1.0, 0.0));

            float n110 =
              hash(i + vec3(1.0, 1.0, 0.0));

            float n001 =
              hash(i + vec3(0.0, 0.0, 1.0));

            float n101 =
              hash(i + vec3(1.0, 0.0, 1.0));

            float n011 =
              hash(i + vec3(0.0, 1.0, 1.0));

            float n111 =
              hash(i + vec3(1.0, 1.0, 1.0));


            float nx00 =
              mix(n000, n100, f.x);

            float nx10 =
              mix(n010, n110, f.x);

            float nx01 =
              mix(n001, n101, f.x);

            float nx11 =
              mix(n011, n111, f.x);


            float nxy0 =
              mix(nx00, nx10, f.y);

            float nxy1 =
              mix(nx01, nx11, f.y);


            return mix(
              nxy0,
              nxy1,
              f.z
            );
          }


          // ====================================
          // FRACTAL BROWNian MOTION
          // ====================================

          float fbm(vec3 p) {

            float value = 0.0;

            float amplitude = 0.5;

            for (int i = 0; i < 5; i++) {

              value +=
                noise(p) *
                amplitude;

              p *= 2.0;

              amplitude *= 0.5;
            }

            return value;
          }


        void main() {

          vec3 normal =
            normalize(vNormal);


          // ====================================
          // ANIMATED NEBULA COORDINATES
          // ====================================

          vec3 p =
            vPosition * 5.0;

          p.x += uTime * 0.045;
          p.y += uTime * 0.018;
          p.z -= uTime * 0.035;


          // ====================================
          // LARGE COSMIC CLOUD
          // ====================================

          float cloud =
            fbm(p);


          // ====================================
          // FINE PLASMA DETAIL
          // ====================================

          float detail =
            fbm(
              p * 2.8 -
              vec3(
                uTime * 0.025,
                uTime * 0.015,
                0.0
              )
            );


          // ====================================
          // MOVING ENERGY VEINS
          // ====================================

          float veinNoise =
            fbm(
              p * 1.65 +
              vec3(
                -uTime * 0.035,
                uTime * 0.02,
                uTime * 0.045
              )
            );

          float veins =
            smoothstep(
              0.56,
              0.72,
              veinNoise
            );


          // ====================================
          // CLOUD MASK
          // ====================================

          float cloudMask =
            smoothstep(
              0.38,
              0.70,
              cloud
            );


          // ====================================
          // EDGE / SURFACE ENERGY
          // ====================================

          float fresnel =
            pow(
              1.0 - abs(normal.z),
              2.8
            );


          // Keep most of the center dark.
          float surfaceEnergy =
            cloudMask *
            (0.18 + fresnel * 0.82);

          float veinEnergy =
            veins *
            (0.35 + fresnel * 0.65);

          float energy =
            surfaceEnergy +
            veinEnergy * 0.55;


          // ====================================
          // PLASMA VEINS
          // ====================================

          energy +=
            veins *
            fresnel *
            0.75;


          // ====================================
          // CYAN
          // ====================================

          vec3 cyan =
            vec3(
              0.0,
              0.72,
              1.0
            );


          // ====================================
          // BLUE
          // ====================================

          vec3 blue =
            vec3(
              0.05,
              0.25,
              1.0
            );


          // ====================================
          // VIOLET
          // ====================================

          vec3 violet =
            vec3(
              0.42,
              0.08,
              1.0
            );


          // ====================================
          // MAGENTA
          // ====================================

          vec3 magenta =
            vec3(
              0.95,
              0.03,
              0.72
            );


          // ====================================
          // COLOR FLOW
          // ====================================

          float colorFlow =
            smoothstep(
              -0.35,
              0.55,
              normal.y
            );


          vec3 nebulaColor =
            mix(
              violet,
              cyan,
              colorFlow
            );


          // ====================================
          // BLUE VARIATION
          // ====================================

          float blueZone =
            smoothstep(
              0.35,
              0.75,
              noise(
                p * 1.4
              )
            );


          nebulaColor =
            mix(
              nebulaColor,
              blue,
              blueZone * 0.65
            );


          // ====================================
          // MAGENTA PATCHES
          // ====================================

          float magentaZone =
            smoothstep(
              0.58,
              0.78,
              noise(
                p * 1.8
              )
            );


          nebulaColor =
            mix(
              nebulaColor,
              magenta,
              magentaZone * 0.5
            );


          // ====================================
          // BRIGHT PLASMA
          // ====================================

          float hotspot =
            pow(
              veins,
              3.8
            );


          nebulaColor +=
            cyan *
            hotspot *
            (1.8 + uActivation * 2.2);

          nebulaColor +=
            violet *
            hotspot *
            0.55;

          nebulaColor +=
            violet *
            cloudMask *
            0.35;


          // ====================================
          // ACTIVATION RESPONSE
          // ====================================

          float reaction =
            uActivation;

          // Brief energy surge
          float reactionEnergy =
            reaction *
            (0.35 + veins * 0.65);


          // ====================================
          // FINAL ENERGY
          // ====================================

          float finalEnergy =
            energy *
            (0.9 + reactionEnergy);


          // ====================================
        // NEON CORE SURFACE
        // ====================================

        // Deep space base.
        // This prevents the core from becoming
        // a flat cyan sphere.
        vec3 baseColor =
          vec3(
            0.003,
            0.006,
            0.018
          );


        // ====================================
        // CLOUD COLOR
        // ====================================

        float cloudGlow =
          smoothstep(
            0.15,
            0.75,
            cloudMask
          );


        // ====================================
        // NEON VEINS
        // ====================================

        float veinGlow =
        smoothstep(
          0.22,
          0.82,
          veins
        );


        // ====================================
        // SURFACE COLOR
        // ====================================

        // Start from dark space.
        vec3 surfaceColor =
          baseColor;


        // Add subtle cosmic cloud color.
        surfaceColor +=
          nebulaColor *
          cloudGlow *
          0.42;


        // Add stronger neon plasma veins.
        surfaceColor +=
          cyan *
          veinGlow *
          1.15;

        // ====================================
        // MICRO NEBULA DETAIL
        // ====================================

        float microNoise =
          fbm(
            p * 3.2
          );

        float microCloud =
          smoothstep(
            0.48,
            0.72,
            microNoise
          );


        // Very subtle blue atmospheric detail
        surfaceColor +=
          cyan *
          microCloud *
          0.16;


        // Subtle violet variation
        surfaceColor +=
          violet *
          microCloud *
          0.10;


        // Violet energy around the surface.
        surfaceColor +=
          violet *
          veinGlow *
          0.55;


        // Magenta variation.
        surfaceColor +=
          magenta *
          magentaZone *
          0.22;


        // ====================================
        // HOTSPOTS
        // ====================================

        surfaceColor +=
          cyan *
          hotspot *
          (2.0 + uActivation * 2.5);

        surfaceColor +=
          violet *
          hotspot *
          0.75;


        // ====================================
        // EDGE NEON
        // ====================================

        surfaceColor +=
          cyan *
          fresnel *
          0.28;

        surfaceColor +=
          violet *
          fresnel *
          0.18;


        // ====================================
        // FINAL OUTPUT
        // ====================================

        gl_FragColor =
          vec4(
            surfaceColor,
            1.0
          );
        }
        `}
      />
    </mesh>
  )
}

function CoreObject({ onActivate }) {
  const [activated, setActivated] = useState(false)
  const [fading, setFading] = useState(false)

  const coreRef = useRef(null)
  const audioRef = useRef(null)

  const ringOneRef = useRef(null)
  const ringTwoRef = useRef(null)
  const ringThreeRef = useRef(null)

const handleActivate = () => {
  if (activated) return

    setActivated(true)
    setFading(false)

    // PLAY CORE SOUND
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/dark-synth.wav')
      audioRef.current.volume = 0.45
    }

    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})

    if (onActivate) {
      onActivate()
    }

    setTimeout(() => {
      setFading(true)
    }, 5000)

    setTimeout(() => {
      setActivated(false)
      setFading(false)
    }, 5600)
}

  useFrame((state, delta) => {
    if (!coreRef.current) return

    const time = state.clock.elapsedTime

    // ====================================
    // MOUSE / POINTER RESPONSE
    // ====================================

    const targetRotationX =
      -state.pointer.y * 0.18

    const targetRotationY =
      state.pointer.x * 0.28

    coreRef.current.rotation.x +=
      (targetRotationX - coreRef.current.rotation.x) *
      delta *
      4

    coreRef.current.rotation.y +=
      (targetRotationY - coreRef.current.rotation.y) *
      delta *
      4

    // Very subtle continuous movement
    coreRef.current.rotation.z +=
      delta * 0.025


    // ====================================
    // ENERGY PULSE
    // ====================================

    const normalPulse =
      1 + Math.sin(time * 0.8) * 0.04

    const reactionPulse =
      activated 
        ? fading
          ? 1.0 + Math.sin(time * 4) * 0.03
          : 1.18 + Math.sin(time * 4) * 0.03
        : normalPulse

    coreRef.current.scale.setScalar(
      reactionPulse
    )


    // ====================================
    // ORBITAL MOTION
    // ====================================

    if (ringOneRef.current) {
        ringOneRef.current.rotation.z +=
          delta * (activated ? 2.4 : 0.45)
      }

      if (ringTwoRef.current) {
        ringTwoRef.current.rotation.z -=
          delta * (activated ? 1.8 : 0.3)

        ringTwoRef.current.rotation.x +=
          delta * (activated ? 0.35 : 0.08)
      }

      if (ringThreeRef.current) {
        ringThreeRef.current.rotation.z +=
          delta * (activated ? 1.2 : 0.2)

        ringThreeRef.current.rotation.y -=
          delta * (activated ? 0.3 : 0.06)
      }
  })

  return (
    <group ref={coreRef}>

      <NebulaShell activated={activated} />

      {/* ====================================
          OUTER ENERGY FIELD
      ==================================== */}

      <mesh>
        <sphereGeometry args={[0.82, 64, 64]} />

        <meshBasicMaterial
          color="#35e7ff"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>


      {/* ====================================
          MAIN CORE — DARK COSMIC BASE
      ==================================== */}

      <mesh
        onClick={handleActivate}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[0.58, 64, 64]} />

        <meshStandardMaterial
          color="#010208"
          emissive="#020812"
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.75}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>


      {/* ====================================
          INNER NEON ATMOSPHERE
      ==================================== */}

      <mesh scale={0.72}>
        <sphereGeometry args={[0.58, 64, 64]} />

        <meshBasicMaterial
          color="#35e7ff"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>


      {/* ====================================
          INNER ENERGY
      ==================================== */}

      <mesh scale={0.38}>
        <sphereGeometry args={[0.58, 48, 48]} />

        <meshBasicMaterial
          color="#dffcff"
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>


      {/* ====================================
          PRIMARY ORBIT
      ==================================== */}

      <mesh
        ref={ringOneRef}
        rotation={[Math.PI / 2.7, 0.15, 0]}
      >
        <torusGeometry
          args={[0.92, 0.008, 16, 160]}
        />

        <meshBasicMaterial
          color="#35e7ff"
          transparent
          opacity={0.75}
        />
      </mesh>


      {/* ====================================
          SECONDARY ORBIT
      ==================================== */}

      <mesh
        ref={ringTwoRef}
        rotation={[
          Math.PI / 2.2,
          -0.3,
          0.35,
        ]}
      >
        <torusGeometry
          args={[1.12, 0.006, 16, 160]}
        />

        <meshBasicMaterial
          color="#7c5cff"
          transparent
          opacity={0.55}
        />
      </mesh>


      {/* ====================================
          OUTER ORBIT
      ==================================== */}

      <mesh
        ref={ringThreeRef}
        rotation={[
          Math.PI / 2.4,
          0.4,
          -0.45,
        ]}
      >
        <torusGeometry
          args={[1.35, 0.004, 12, 160]}
        />

        <meshBasicMaterial
          color="#d946ef"
          transparent
          opacity={0.4}
        />
      </mesh>


      {/* ====================================
          CORE LIGHT
      ==================================== */}

      <pointLight
        position={[0, 0, 1]}
        intensity={2.8}
        distance={4}
        color="#35e7ff"
      />

    </group>
  )
}


function ZeroCore3D({ onActivate }) {
  return (
    <div className="zero-core-3d">

      <Canvas
        camera={{
          position: [0, 0, 3.5],
          fov: 45,
        }}

        dpr={[1, 1.5]}

        gl={{
          alpha: true,
          antialias: true,
        }}

        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >

        <ambientLight intensity={0.18} />

        <pointLight
          position={[2, 2, 3]}
          intensity={2}
          color="#35e7ff"
        />

        <pointLight
          position={[-2, -1, 2]}
          intensity={1.5}
          color="#7c5cff"
        />

        <ParticleField />

        <CoreObject onActivate={onActivate} />

        <EffectComposer>
          <Bloom
            intensity={2.9}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.6}
            mipmapBlur
          />
        </EffectComposer>

      </Canvas>

      {/* ====================================
          CORE IDENTITY
      ==================================== */}

      <div className="zero-core-3d__label">
        00
      </div>

    </div>
  )
}

export default ZeroCore3D