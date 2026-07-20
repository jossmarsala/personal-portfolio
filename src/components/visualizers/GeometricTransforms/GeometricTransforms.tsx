import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Edges } from '@react-three/drei'
import * as THREE from 'three'

type Transform = 'identity' | 'translate' | 'rotate' | 'scale'

interface CubeProps {
  transform: Transform
  animating: boolean
}

function AnimatedCube({ transform, animating }: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current || !animating) return
    t.current += delta * 0.8

    const mesh = meshRef.current

    switch (transform) {
      case 'translate':
        mesh.position.x = Math.sin(t.current) * 1.5
        mesh.position.y = Math.cos(t.current * 0.7) * 0.5
        mesh.rotation.set(0, 0, 0)
        mesh.scale.set(1, 1, 1)
        break
      case 'rotate':
        mesh.position.set(0, 0, 0)
        mesh.scale.set(1, 1, 1)
        mesh.rotation.y = t.current * 1.5
        mesh.rotation.x = t.current * 0.5
        break
      case 'scale':
        mesh.position.set(0, 0, 0)
        mesh.rotation.set(0, 0, 0)
        const s = 0.6 + Math.abs(Math.sin(t.current)) * 0.8
        mesh.scale.set(s, s, s)
        break
      default:
        mesh.position.set(0, 0, 0)
        mesh.rotation.set(0, 0, 0)
        mesh.scale.set(1, 1, 1)
    }
  })

  const colors: Record<Transform, string> = {
    identity: '#84ADD8',
    translate: '#E86D42',
    rotate: '#8EB9A6',
    scale: '#E9C94C',
  }

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshPhongMaterial
        color={colors[transform]}
        transparent
        opacity={0.85}
        wireframe={false}
      />
      <Edges color="#111" lineWidth={1.5} />
    </mesh>
  )
}

function AxisHelper() {
  return (
    <group>
      {/* X axis - red */}
      <mesh position={[1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="#E86D42" />
      </mesh>
      {/* Y axis - green */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="#8EB9A6" />
      </mesh>
      {/* Z axis - blue */}
      <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshBasicMaterial color="#84ADD8" />
      </mesh>
    </group>
  )
}

const transforms: { key: Transform; label: string; description: string }[] = [
  { key: 'identity', label: 'Identidad', description: 'Sin transformación. T = I₃' },
  { key: 'translate', label: 'Traslación', description: 'T(x, y, z) + (dx, dy, dz)' },
  { key: 'rotate', label: 'Rotación', description: 'Rₓ(θ) · R_y(φ)' },
  { key: 'scale', label: 'Escala', description: 'S(sx, sy, sz) · v' },
]

export default function GeometricTransforms() {
  const [activeTransform, setActiveTransform] = useState<Transform>('identity')
  const [animating, setAnimating] = useState(false)

  return (
    <div className="viz-container">
      {/* Transform selector */}
      <div style={{ display: 'flex', gap: 0, borderBottom: 'var(--border-thin)' }}>
        {transforms.map(t => (
          <button
            key={t.key}
            onClick={() => { setActiveTransform(t.key); setAnimating(false) }}
            style={{
              padding: '0.75rem 1rem',
              background: activeTransform === t.key ? 'var(--color-ink)' : 'transparent',
              color: activeTransform === t.key ? 'var(--color-bg)' : 'var(--color-muted)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              transition: 'all 200ms ease',
              flex: 1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 3D Canvas */}
      <div style={{ height: 380, background: '#F5F5F3' }}>
        <Canvas
          camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} />
          <pointLight position={[-5, -3, -5]} intensity={0.3} />

          <AxisHelper />
          <AnimatedCube transform={activeTransform} animating={animating} />

          <Grid
            args={[10, 10]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#cccccc"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#bbbbbb"
            fadeDistance={8}
            position={[0, -0.7, 0]}
          />

          <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
        </Canvas>
      </div>

      {/* Description */}
      <div style={{ padding: '1rem 1.5rem', borderTop: 'var(--border-thin)', background: 'var(--color-white)' }}>
        <p className="text-label" style={{ color: 'var(--color-muted)' }}>
          {transforms.find(t => t.key === activeTransform)?.description}
        </p>
      </div>

      {/* Axis legend */}
      <div style={{ padding: '0.75rem 1.5rem', display: 'flex', gap: '1.5rem', borderTop: 'var(--border-thin)', flexWrap: 'wrap' }}>
        {[
          { color: '#E86D42', label: 'Eje X' },
          { color: '#8EB9A6', label: 'Eje Y' },
          { color: '#84ADD8', label: 'Eje Z' },
        ].map(a => (
          <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 16, height: 3, background: a.color, borderRadius: 1 }} />
            <span className="text-caption">{a.label}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <button
          className={animating ? 'btn-outline' : 'btn-primary'}
          style={{ fontSize: '0.7rem', padding: '0.4rem 0.9rem' }}
          onClick={() => setAnimating(v => !v)}
          disabled={activeTransform === 'identity'}
        >
          {animating ? '⏸ Detener' : '▶ Animar'}
        </button>
      </div>

      <div className="viz-caption">
        <span className="text-caption">Figura 5.1 — Transformaciones 3D interactivas · Drag para rotar la vista</span>
      </div>
    </div>
  )
}
