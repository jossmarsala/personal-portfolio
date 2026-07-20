import { useRef, useEffect, useState } from 'react'

interface Point { x: number; y: number }

const WIDTH = 400
const HEIGHT = 400
const CX = WIDTH / 2
const CY = HEIGHT / 2
const SCALE = 70

function toCanvas(re: number, im: number): Point {
  return { x: CX + re * SCALE, y: CY - im * SCALE }
}

export default function ComplexPlane() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [z0, setZ0] = useState({ re: 0.5, im: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    draw(ctx, t)
  }, [t, z0])

  function draw(ctx: CanvasRenderingContext2D, time: number) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    // Background
    ctx.fillStyle = '#FAFAFA'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    // Grid
    ctx.strokeStyle = 'rgba(17,17,17,0.06)'
    ctx.lineWidth = 1
    for (let i = -5; i <= 5; i++) {
      const x = CX + i * SCALE
      const y = CY - i * SCALE
      ctx.beginPath()
      ctx.moveTo(x, 0); ctx.lineTo(x, HEIGHT)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, y); ctx.lineTo(WIDTH, y)
      ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = 'rgba(17,17,17,0.3)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, CY); ctx.lineTo(WIDTH, CY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(CX, 0); ctx.lineTo(CX, HEIGHT)
    ctx.stroke()

    // Axis labels
    ctx.fillStyle = '#666666'
    ctx.font = '11px Inter, sans-serif'
    ctx.fillText('Re', WIDTH - 24, CY - 8)
    ctx.fillText('Im', CX + 6, 16)
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue
      ctx.fillText(String(i), CX + i * SCALE - 5, CY + 16)
      ctx.fillText(String(i) + 'i', CX + 5, CY - i * SCALE + 4)
    }

    // Unit circle
    ctx.strokeStyle = 'rgba(132, 173, 216, 0.4)'
    ctx.lineWidth = 1.5
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.arc(CX, CY, SCALE, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Trajectory: e^(it) + (2i+1)*z0
    const trailLength = 200
    const z0re = z0.re
    const z0im = z0.im

    // Draw trail
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(232,109,66,0.35)'
    ctx.lineWidth = 1.5
    for (let j = 0; j < trailLength; j++) {
      const tj = time - (trailLength - j) * 0.03
      const eit_re = Math.cos(tj)
      const eit_im = Math.sin(tj)
      // (2i+1)*z0 = re: z0re - 2*z0im, im: z0im + 2*z0re ... wait, (1+2i)*z0
      // (1+2i)*(a+bi) = a - 2b + (b + 2a)i
      const prod_re = z0re - 2 * z0im
      const prod_im = z0im + 2 * z0re
      const zre = eit_re + prod_re
      const zim = eit_im + prod_im
      const p = toCanvas(zre, zim)
      if (j === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()

    // Current point z(t) = e^(it) + (1+2i)*z0
    const eit_re = Math.cos(time)
    const eit_im = Math.sin(time)
    const prod_re = z0re - 2 * z0im
    const prod_im = z0im + 2 * z0re
    const zre = eit_re + prod_re
    const zim = eit_im + prod_im
    const zp = toCanvas(zre, zim)

    // e^(it) point on unit circle
    const unitP = toCanvas(eit_re, eit_im)
    ctx.fillStyle = 'rgba(132,173,216,0.8)'
    ctx.strokeStyle = '#84ADD8'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(unitP.x, unitP.y, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#666'
    ctx.font = '10px Inter'
    ctx.fillText('e^(it)', unitP.x + 6, unitP.y - 4)

    // Line from origin to e^(it)
    ctx.strokeStyle = 'rgba(132,173,216,0.5)'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.moveTo(CX, CY)
    ctx.lineTo(unitP.x, unitP.y)
    ctx.stroke()
    ctx.setLineDash([])

    // Main z(t) point
    ctx.fillStyle = '#E86D42'
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(zp.x, zp.y, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Label
    ctx.fillStyle = '#111'
    ctx.font = 'bold 11px Inter, sans-serif'
    ctx.fillText(`z(t)`, zp.x + 10, zp.y - 4)
    ctx.fillStyle = '#666'
    ctx.font = '10px Inter, sans-serif'
    ctx.fillText(`(${zre.toFixed(2)}, ${zim.toFixed(2)}i)`, zp.x + 10, zp.y + 10)

    // z0 point
    const z0p = toCanvas(z0re, z0im)
    ctx.fillStyle = '#8EB9A6'
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(z0p.x, z0p.y, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#666'
    ctx.font = '10px Inter'
    ctx.fillText('z₀', z0p.x + 6, z0p.y - 4)

    // Angle arc
    ctx.strokeStyle = 'rgba(233,201,76,0.7)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(CX, CY, 25, 0, -time, time < 0)
    ctx.stroke()
    ctx.fillStyle = 'rgba(233,201,76,0.9)'
    ctx.font = '10px Inter'
    ctx.fillText('t', CX + 28, CY - 8)
  }

  useEffect(() => {
    if (!playing) return
    const animate = () => {
      timeRef.current += 0.025
      setT(timeRef.current)
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [playing])

  return (
    <div className="viz-container">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', alignItems: 'stretch' }}>
        {/* Canvas */}
        <div style={{ flex: '0 0 auto' }}>
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            style={{ display: 'block', maxWidth: '100%' }}
          />
        </div>

        {/* Controls panel */}
        <div style={{ flex: 1, minWidth: 200, padding: '1.5rem', borderLeft: 'var(--border-thin)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
              Función
            </p>
            <div style={{
              padding: '0.75rem',
              background: 'var(--color-bg)',
              borderLeft: '3px solid var(--accent-orange)',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 1.5,
            }}>
              z(t) = e^(it) + (1+2i)·z₀
            </div>
          </div>

          <div>
            <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
              Parámetro z₀ = {z0.re.toFixed(2)} + {z0.im.toFixed(2)}i
            </p>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Re(z₀)</label>
            <input
              type="range" min="-1.5" max="1.5" step="0.05"
              value={z0.re}
              onChange={e => setZ0(v => ({ ...v, re: parseFloat(e.target.value) }))}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            />
            <label style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Im(z₀)</label>
            <input
              type="range" min="-1.5" max="1.5" step="0.05"
              value={z0.im}
              onChange={e => setZ0(v => ({ ...v, im: parseFloat(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
              t = {t.toFixed(2)} rad
            </p>
            <input
              type="range" min="0" max="20" step="0.1"
              value={t}
              onChange={e => { setT(parseFloat(e.target.value)); timeRef.current = parseFloat(e.target.value) }}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button className={playing ? 'btn-outline' : 'btn-primary'} style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
              onClick={() => setPlaying(v => !v)}
            >
              {playing ? '⏸ Pausar' : '▶ Animar'}
            </button>
            <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
              onClick={() => { setT(0); timeRef.current = 0; setPlaying(false) }}
            >
              ↺ Resetear
            </button>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { color: '#E86D42', label: 'z(t) — posición actual' },
              { color: '#84ADD8', label: 'e^(it) — círculo unitario' },
              { color: '#8EB9A6', label: 'z₀ — condición inicial' },
              { color: '#E9C94C', label: 't — ángulo en radianes' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                <span className="text-caption">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="viz-caption">
        <span className="text-caption">Figura 6.1 — Plano complejo · Trayectoria paramétrica de z(t)</span>
      </div>
    </div>
  )
}
