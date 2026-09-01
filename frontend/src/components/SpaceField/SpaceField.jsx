import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import './SpaceField.css'

function Stars() {
  const starsRef = useRef(null)

  const positions = useMemo(() => {
    const count = 180
    const data = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      data[i * 3] =
        (Math.random() - 0.5) * 14

      data[i * 3 + 1] =
        (Math.random() - 0.5) * 10

      data[i * 3 + 2] =
        (Math.random() - 0.5) * 8
    }

    return data
  }, [])

  useFrame((_, delta) => {
    if (!starsRef.current) return

    starsRef.current.rotation.y += delta * 0.008
    starsRef.current.rotation.x += delta * 0.002
  })

  return (
    <points ref={starsRef}>
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
        size={0.012}
        transparent
        opacity={0.35}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function SpaceField() {
  return (
    <div className="space-field">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 60,
        }}
        dpr={[1, 1.5]}
      >
        <Stars />
      </Canvas>
    </div>
  )
}

export default SpaceField