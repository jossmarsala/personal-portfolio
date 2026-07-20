import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

// Frequency distribution data
const frequencyData = [
  { range: '50-59', freq: 2, relFreq: 0.067 },
  { range: '60-69', freq: 5, relFreq: 0.167 },
  { range: '70-79', freq: 9, relFreq: 0.300 },
  { range: '80-89', freq: 8, relFreq: 0.267 },
  { range: '90-99', freq: 6, relFreq: 0.200 },
]

// Raw data for stats
const rawData = [52, 58, 62, 65, 67, 70, 72, 73, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 87, 88, 90, 91, 93, 95, 96, 98, 99, 67, 78, 85]
const sorted = [...rawData].sort((a, b) => a - b)
const n = sorted.length
const mean = rawData.reduce((a, b) => a + b, 0) / n
const median = n % 2 === 0 ? (sorted[n/2-1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)]
const q1 = sorted[Math.floor(n/4)]
const q3 = sorted[Math.floor(3*n/4)]
const variance = rawData.reduce((a, v) => a + (v - mean) ** 2, 0) / n
const std = Math.sqrt(variance)

const ACCENT = 'var(--accent-blue)'

export default function StatsCharts() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Histogram */}
      <div className="viz-container">
        <div style={{ padding: '1.5rem 1.5rem 0' }}>
          <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
            Figura 2.1
          </p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink)' }}>
            Distribución de frecuencias absolutas
          </p>
        </div>
        <div style={{ height: 280, padding: '1rem 1rem 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frequencyData} barCategoryGap="10%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.07)" />
              <XAxis
                dataKey="range"
                tick={{ fontSize: 11, fontFamily: 'Inter', fill: '#666' }}
                axisLine={{ stroke: 'rgba(17,17,17,0.2)' }}
              />
              <YAxis
                tick={{ fontSize: 11, fontFamily: 'Inter', fill: '#666' }}
                axisLine={{ stroke: 'rgba(17,17,17,0.2)' }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-charcoal)',
                  border: 'none',
                  borderRadius: 2,
                  color: 'var(--color-bg)',
                  fontSize: 12,
                  fontFamily: 'Inter',
                }}
                labelStyle={{ color: 'var(--accent-blue)' }}
              />
              <ReferenceLine
                x="70-79"
                stroke="var(--accent-orange)"
                strokeDasharray="4 4"
                label={{ value: 'Moda', fill: 'var(--accent-orange)', fontSize: 10 }}
              />
              <Bar
                dataKey="freq"
                fill={ACCENT}
                name="Frecuencia"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="viz-caption">
          <span className="text-caption">n = 30 observaciones · Intervalos de amplitud 10</span>
        </div>
      </div>

      {/* Relative Frequency */}
      <div className="viz-container">
        <div style={{ padding: '1.5rem 1.5rem 0' }}>
          <p className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
            Figura 2.2
          </p>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink)' }}>
            Distribución de frecuencias relativas
          </p>
        </div>
        <div style={{ height: 260, padding: '1rem 1rem 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frequencyData} barCategoryGap="10%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.07)" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fontFamily: 'Inter', fill: '#666' }} />
              <YAxis tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} tick={{ fontSize: 11, fontFamily: 'Inter', fill: '#666' }} />
              <Tooltip
                formatter={(v: unknown) => [`${(Number(v) * 100).toFixed(1)}%`, 'Freq. relativa']}
                contentStyle={{ background: 'var(--color-charcoal)', border: 'none', borderRadius: 2, color: 'var(--color-bg)', fontSize: 12, fontFamily: 'Inter' }}
              />
              <Bar dataKey="relFreq" fill="var(--accent-sage)" name="Freq. relativa" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="viz-caption">
          <span className="text-caption">Frecuencia relativa = fi / n</span>
        </div>
      </div>

      {/* Summary statistics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1px',
          background: 'rgba(17,17,17,0.1)',
          border: '1px solid rgba(17,17,17,0.1)',
        }}
      >
        {[
          { label: 'Media', value: mean.toFixed(2), color: 'var(--accent-orange)' },
          { label: 'Mediana', value: median.toFixed(2), color: 'var(--accent-blue)' },
          { label: 'Q₁', value: q1.toFixed(2), color: 'var(--accent-sage)' },
          { label: 'Q₃', value: q3.toFixed(2), color: 'var(--accent-pink)' },
          { label: 'Desv. Est.', value: std.toFixed(2), color: 'var(--accent-yellow)' },
          { label: 'Varianza', value: variance.toFixed(2), color: 'var(--color-muted)' },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              background: 'var(--color-white)',
              padding: '1.25rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: stat.color,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div className="text-caption" style={{ marginTop: '0.5rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
