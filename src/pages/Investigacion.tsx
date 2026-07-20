import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-pink)'
const ACCENT_HEX = '#728be7ff'
const A_COLOR = '#69b6ddff'
const B_COLOR = '#e77290'

// ─── Data ─────────────────────────────────────────────────────────────────────

const dataA = [3, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 11, 12]
const dataB = [3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 7, 7, 8, 9, 10, 11, 12]

// freq by time value
const freqA: Record<number, number> = {}
const freqB: Record<number, number> = {}
dataA.forEach(v => { freqA[v] = (freqA[v] || 0) + 1 })
dataB.forEach(v => { freqB[v] = (freqB[v] || 0) + 1 })

// ─── Theory / pills ─────────────────────────────────────────────────────────

const theoryItems = [
  'Benchmark',
  'Moodboard',
  'Insights',
  'Referentes',
]

// ─── Approach ────────────────────────────────────────────────────────────────

const approach = (
  <>
    <p>
      La investigación combinó benchmarking, análisis de referentes y construcción de moodboards para comprender cómo los principales estudios presentan su trabajo, estructuran su comunicación y articulan identidad con tecnología. Más que buscar tendencias, el objetivo fue detectar patrones de comportamiento y encontrar un espacio propio dentro de un mercado donde lo creativo y lo técnico suelen presentarse como disciplinas separadas.
    </p>
  </>
)

// ─── Visualization Helpers ───────────────────────────────────────────────────

// Compact horizontal bar inside dark SVG
export function HBar({ y, val, max, color, label, valLabel }: {
  y: number; val: number; max: number; color: string; label: string; valLabel: string
}) {
  const BAR_W = 480
  const w = (val / max) * BAR_W
  return (
    <g>
      <text x={10} y={y - 3} fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.08em">
        {label}
      </text>
      <rect x={10} y={y + 2} width={BAR_W} height={16} fill="rgba(255,255,255,0.05)" rx={3} />
      <rect x={10} y={y + 2} width={w} height={16} fill={color} rx={3} opacity={0.85} />
      <text x={10 + w + 8} y={y + 14} fill={color} fontSize="10" fontFamily="Inter,sans-serif" fontWeight="800">
        {valLabel}
      </text>
    </g>
  )
}

// ─── SVG: Stats comparison bars ──────────────────────────────────────────────

export function StatsBarsViz() {
  // Media, Mediana, Moda for A and B
  const stats = [
    { label: 'Media', a: 7.50, b: 5.30, max: 12 },
    { label: 'Mediana', a: 7.50, b: 4.50, max: 12 },
    { label: 'Moda', a: 7.00, b: 3.00, max: 12 },
    { label: 'Desv. Est.', a: 1.96, b: 2.51, max: 4 },
    { label: 'Error Típ.', a: 0.35, b: 0.45, max: 1 },
  ]
  const BAR_W = 260
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <text x={30} y={38} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em">MÉTRICAS ESTADÍSTICAS</text>
      {stats.map((s, i) => {
        const y = 60 + i * 58
        const wA = (s.a / s.max) * BAR_W
        const wB = (s.b / s.max) * BAR_W
        return (
          <g key={s.label}>
            <text x={30} y={y + 12} fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700" letterSpacing="0.06em">{s.label.toUpperCase()}</text>
            {/* A bar */}
            <rect x={130} y={y} width={BAR_W} height={14} fill="rgba(255,255,255,0.05)" rx={3} />
            <rect x={130} y={y} width={wA} height={14} fill={A_COLOR} rx={3} opacity={0.9} />
            <text x={130 + wA + 6} y={y + 11} fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">{s.a}</text>
            {/* B bar */}
            <rect x={430} y={y} width={BAR_W} height={14} fill="rgba(255,255,255,0.05)" rx={3} />
            <rect x={430} y={y} width={wB * (BAR_W / 260)} height={14} fill={B_COLOR} rx={3} opacity={0.85} />
            <text x={430 + wB * (BAR_W / 260) + 6} y={y + 11} fill={B_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">{s.b}</text>
            {/* labels */}
            <text x={120} y={y + 11} fill={A_COLOR} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="end">A</text>
            <text x={420} y={y + 11} fill={B_COLOR} fontSize="8" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="end">B</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── SVG: Symmetry / Asymmetry illustration ───────────────────────────────────

export function SymmetryViz() {
  // Bell curve A (symmetric) + skewed curve B
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <text x={200} y={28} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em" textAnchor="middle">ALGORITMO A — Simétrica (0,00)</text>
      <text x={590} y={28} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em" textAnchor="middle">ALGORITMO B — Asimetría positiva (1,31)</text>
      {/* A - symmetric bell */}
      <path d="M 40,300 Q 80,300 120,250 Q 160,150 200,80 Q 240,150 280,250 Q 320,300 360,300" fill="none" stroke={A_COLOR} strokeWidth="2.5" />
      <line x1={200} y1={80} x2={200} y2={300} stroke={A_COLOR} strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={200} y={72} fill={A_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">x̄ = Me = 7,5</text>
      <line x1={40} y1={300} x2={360} y2={300} stroke="#333" strokeWidth="1" />
      {/* B - right-skewed */}
      <path d="M 430,300 Q 460,300 480,180 Q 500,60 520,50 Q 550,80 580,150 Q 620,230 660,280 Q 700,300 760,300" fill="none" stroke={B_COLOR} strokeWidth="2.5" />
      {/* Moda */}
      <line x1={518} y1={50} x2={518} y2={300} stroke="rgba(231,114,144,0.5)" strokeWidth="1" strokeDasharray="3,3" />
      <text x={518} y={44} fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Mo=3</text>
      {/* Mediana */}
      <line x1={560} y1={100} x2={560} y2={300} stroke="rgba(231,114,144,0.7)" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={560} y={92} fill="rgba(231,114,144,0.8)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Me=4,5</text>
      {/* Media */}
      <line x1={600} y1={150} x2={600} y2={300} stroke={B_COLOR} strokeWidth="2" />
      <text x={600} y={142} fill={B_COLOR} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">x̄=5,3</text>
      <line x1={430} y1={300} x2={760} y2={300} stroke="#333" strokeWidth="1" />
      {/* cola label */}
      <text x={700} y={275} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter,sans-serif">cola →</text>
    </svg>
  )
}

// ─── SVG: t-test result ───────────────────────────────────────────────────────

export function TTestViz() {
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* null distribution curve */}
      <path d="M 80,300 Q 200,300 280,180 Q 340,80 400,65 Q 460,80 520,180 Q 600,300 720,300" fill="none" stroke="#444" strokeWidth="2" />
      <line x1={80} y1={300} x2={720} y2={300} stroke="#333" strokeWidth="1" />
      {/* Center / H0 zone */}
      <line x1={400} y1={65} x2={400} y2={300} stroke="#555" strokeWidth="1" strokeDasharray="4,4" />
      <text x={400} y={58} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">H₀: μA−μB=0</text>
      {/* critical region left */}
      <path d="M 80,300 Q 150,300 185,280 Q 205,260 220,250" fill={ACCENT_HEX} opacity={0.15} />
      {/* critical region right */}
      <path d="M 580,250 Q 595,260 615,280 Q 650,300 720,300" fill={ACCENT_HEX} opacity={0.15} />
      {/* alpha lines */}
      <line x1={225} y1={250} x2={225} y2={300} stroke={ACCENT_HEX} strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={225} y={244} fill={ACCENT_HEX} fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">α/2 = 0,025</text>
      <line x1={575} y1={250} x2={575} y2={300} stroke={ACCENT_HEX} strokeWidth="1.5" strokeDasharray="3,3" />
      <text x={575} y={244} fill={ACCENT_HEX} fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">α/2 = 0,025</text>
      {/* Observed t-statistic */}
      <line x1={150} y1={290} x2={150} y2={300} stroke="#FF2D78" strokeWidth="3" />
      <circle cx={150} cy={292} r={5} fill="#FF2D78" />
      <text x={150} y={284} fill="#FF2D78" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">t obs</text>
      {/* p-value annotation */}
      <rect x={240} y={100} width={320} height={100} fill="rgba(255,45,120,0.08)" rx={8} stroke="rgba(255,45,120,0.25)" strokeWidth="1" />
      <text x={400} y={128} fill="#FF2D78" fontSize="13" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle">P-valor = 0,00022</text>
      <text x={400} y={148} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">0,00022 {"<"} α = 0,05</text>
      <text x={400} y={168} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Inter,sans-serif" textAnchor="middle">✗ Se rechaza H₀</text>
      <text x={400} y={188} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">Confianza 95%</text>
    </svg>
  )
}

// ─── SVG: Contingency table visual ───────────────────────────────────────────

export function ContingencyViz() {
  const rows = [
    { label: '< 5 s', a: 2, b: 15, tot: 17, color: '#A8FF3E' },
    { label: '5 – 7 s', a: 13, b: 8, tot: 21, color: '#F5E642' },
    { label: '> 7 s', a: 15, b: 7, tot: 22, color: '#FF6B4A' },
  ]
  const colX = [60, 220, 360, 500]
  const rowH = 70
  return (
    <svg viewBox="0 0 700 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* Header */}
      {['Rango (s)', 'Algoritmo A', 'Algoritmo B', 'Total'].map((h, i) => (
        <text key={h} x={colX[i] + 80} y={50} fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.12em" textAnchor="middle">{h.toUpperCase()}</text>
      ))}
      <line x1={40} y1={58} x2={620} y2={58} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {rows.map((r, i) => {
        const y = 70 + i * rowH
        const barWA = (r.a / 30) * 140
        const barWB = (r.b / 30) * 140
        return (
          <g key={r.label}>
            <text x={colX[0] + 80} y={y + 28} fill={r.color} fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{r.label}</text>
            {/* A bar-cell */}
            <rect x={colX[1] + 10} y={y + 8} width={140} height={20} fill="rgba(255,255,255,0.04)" rx={3} />
            <rect x={colX[1] + 10} y={y + 8} width={barWA} height={20} fill={A_COLOR} rx={3} opacity={0.9} />
            <text x={colX[1] + 80} y={y + 23} fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{r.a}</text>
            {/* B bar-cell */}
            <rect x={colX[2] + 10} y={y + 8} width={140} height={20} fill="rgba(255,255,255,0.04)" rx={3} />
            <rect x={colX[2] + 10} y={y + 8} width={barWB} height={20} fill={B_COLOR} rx={3} opacity={0.85} />
            <text x={colX[2] + 80} y={y + 23} fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">{r.b}</text>
            {/* Total */}
            <text x={colX[3] + 80} y={y + 23} fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="700" textAnchor="middle">{r.tot}</text>
            <line x1={40} y1={y + rowH - 4} x2={620} y2={y + rowH - 4} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </g>
        )
      })}
      {/* Footer totals */}
      <line x1={40} y1={286} x2={620} y2={286} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {['Total', '30', '30', '60'].map((t, i) => (
        <text key={i} x={colX[i] + 80} y={306} fill="#fff" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="900" textAnchor="middle">{t}</text>
      ))}
      <text x={350} y={355} fill="#444" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">TABLA DE CONTINGENCIA</text>
    </svg>
  )
}

// ─── SVG: Donut chart for probability distribution ──────────────────────────

export function DonutViz() {
  // Menor a 5: 17/60=28.3%, Entre 5-7: 21/60=35%, Mayor a 7: 22/60=36.7%
  const slices = [
    { pct: 17 / 60, color: '#e77290', label: '< 5 s', n: 17 },
    { pct: 21 / 60, color: '#F5E642', label: '5–7 s', n: 21 },
    { pct: 22 / 60, color: '#FF6B4A', label: '> 7 s', n: 22 },
  ]
  const cx = 220, cy = 190, r = 120, innerR = 68
  let cumAngle = -Math.PI / 2
  const paths = slices.map(s => {
    const startA = cumAngle
    const endA = cumAngle + 2 * Math.PI * s.pct
    cumAngle = endA
    const x1 = cx + r * Math.cos(startA), y1 = cy + r * Math.sin(startA)
    const x2 = cx + r * Math.cos(endA), y2 = cy + r * Math.sin(endA)
    const ix1 = cx + innerR * Math.cos(startA), iy1 = cy + innerR * Math.sin(startA)
    const ix2 = cx + innerR * Math.cos(endA), iy2 = cy + innerR * Math.sin(endA)
    const large = s.pct > 0.5 ? 1 : 0
    return { ...s, d: `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`, midA: (startA + endA) / 2 }
  })
  return (
    <svg viewBox="0 0 700 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} opacity={0.9} />
      ))}
      {/* center label */}
      <text x={cx} y={cy - 8} fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="800" textAnchor="middle">N = 60</text>
      <text x={cx} y={cy + 8} fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">ejecuciones</text>
      {/* legend */}
      {slices.map((s, i) => (
        <g key={i}>
          <rect x={380} y={120 + i * 50} width={14} height={14} fill={s.color} rx={3} />
          <text x={400} y={132 + i * 50} fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">{s.label}</text>
          <text x={400} y={146 + i * 50} fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Inter,sans-serif">{(s.pct * 100).toFixed(1)}%</text>
        </g>
      ))}
      <text x={350} y={355} fill="#444" fontSize="9" textAnchor="middle" fontFamily="Inter,sans-serif" letterSpacing="0.08em">DISTRIBUCIÓN PROBABILÍSTICA</text>
    </svg>
  )
}

// ─── SVG: Probability bar for each question ──────────────────────────────────

export function ProbBarViz({ items }: { items: { label: string; prob: number; color: string; formula: string }[] }) {
  return (
    <svg viewBox="0 0 800 380" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <text x={100} y={50} fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="800" letterSpacing="0.15em">PROBABILIDADES CALCULADAS</text>
      {items.map((item, i) => {
        const y = 120 + i * 115
        const BAR = 540
        const w = item.prob * BAR
        return (
          <g key={i}>
            <text x={100} y={y} fill="rgba(255,255,255,0.65)" fontSize="12" fontFamily="Inter,sans-serif" fontWeight="700">{item.label}</text>
            <text x={100} y={y + 20} fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter,sans-serif">{item.formula}</text>
            <rect x={100} y={y + 35} width={BAR} height={20} fill="rgba(255,255,255,0.05)" rx={4} />
            <rect x={100} y={y + 35} width={w} height={20} fill={item.color} rx={4} opacity={0.85} />
            <text x={100 + w + 14} y={y + 50} fill={item.color} fontSize="14" fontFamily="Inter,sans-serif" fontWeight="900">{(item.prob * 100).toFixed(2)}%</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Resolution steps ─────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ════════════════════════════════════════════════════════
        PASO 01 — CONSIGNA Y DATOS CRUDOS
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/INVESTIGACION-01.webp"
          alt="Investigación 01"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El benchmark analizó estudios internacionales que integran branding, producto digital y desarrollo para identificar oportunidades de posicionamiento. La investigación reveló un espacio poco explorado entre el enfoque tecnológico de los estudios digital-first y la sensibilidad del diseño editorial, definiendo el territorio conceptual y competitivo de POSDATA.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Benchmarking</h3></div>
        </div>
      </div>
    </div>

    {/* ════════════════════════════════════════════════════════
        PASO 02 — TABLA ESTADÍSTICA DESCRIPTIVA COMPLETA
        ════════════════════════════════════════════════════════ */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/INVESTIGACION-02.webp"
          alt="Investigación 02"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>El moodboard funcionó como una herramienta para validar el sistema visual antes de diseñar la identidad. La exploración confirmó que era posible articular materiales editoriales, fotografía documental y referencias tecnológicas en un mismo lenguaje, utilizando la luz, las texturas y el contraste entre modo claro y oscuro para representar las dos dimensiones de la marca: lo humano y lo técnico.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Moodboard</h3></div>
        </div>
      </div>
    </div>

  </>
)

// ─── Page export ──────────────────────────────────────────────────────────────

export default function Investigacion() {
  return (
    <ProblemPage
      number="02"
      subject="Estadística"
      title="INVESTIGACIÓN"
      question="Encontrar patrones para tomar las decisiones."
      heroBackground="#1a2433"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
      nextPhasePath="/proceso"
      nextPhaseLabel="Fase 3: Proceso"
    />
  )
}
