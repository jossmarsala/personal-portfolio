import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function MatrixDisplay({
  matrix,
  highlightRow = -1,
  highlightCol = -1,
  accentColor = 'var(--accent-orange)',
  label,
}: {
  matrix: number[][]
  highlightRow?: number
  highlightCol?: number
  accentColor?: string
  label?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      {label && (
        <span className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {/* Left bracket */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 8, height: 8, borderLeft: '2px solid var(--color-ink)', borderTop: '2px solid var(--color-ink)' }} />
          <div style={{ flex: 1, borderLeft: '2px solid var(--color-ink)', marginLeft: -1 }} />
          <div style={{ width: 8, height: 8, borderLeft: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {matrix.map((row, r) => (
            <div key={r} style={{ display: 'flex', gap: '4px' }}>
              {row.map((val, c) => {
                const isHighRow = r === highlightRow
                const isHighCol = c === highlightCol
                const isActive = isHighRow || isHighCol

                return (
                  <motion.div
                    key={`${r}-${c}`}
                    animate={{
                      background: isHighRow && isHighCol
                        ? accentColor
                        : isHighRow
                          ? `${accentColor}55`
                          : isHighCol
                            ? `${accentColor}33`
                            : 'var(--color-white)',
                      color: isHighRow && isHighCol
                        ? '#fff'
                        : 'var(--color-ink)',
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      border: '1px solid rgba(17,17,17,0.1)',
                      borderRadius: '2px',
                    }}
                  >
                    {val}
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Right bracket */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 8, height: 8, borderRight: '2px solid var(--color-ink)', borderTop: '2px solid var(--color-ink)' }} />
          <div style={{ flex: 1, borderRight: '2px solid var(--color-ink)', marginRight: -1 }} />
          <div style={{ width: 8, height: 8, borderRight: '2px solid var(--color-ink)', borderBottom: '2px solid var(--color-ink)' }} />
        </div>
      </div>
    </div>
  )
}

function multiplyMatrices(A: number[][], B: number[][]): number[][] {
  const rows = A.length
  const cols = B[0].length
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) =>
      A[i].reduce((sum, _, k) => sum + A[i][k] * B[k][j], 0)
    )
  )
}

const A: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const B: number[][] = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1],
]

const RESULT = multiplyMatrices(A, B)

export default function MatrixViz() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const totalSteps = A.length * B[0].length

  const currentRow = step >= 0 ? Math.floor(step / B[0].length) : -1
  const currentCol = step >= 0 ? step % B[0].length : -1

  useEffect(() => {
    if (!playing) return
    if (step >= totalSteps - 1) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setStep(s => s + 1), 700)
    return () => clearTimeout(timer)
  }, [playing, step, totalSteps])

  const handlePlay = () => {
    if (step >= totalSteps - 1) {
      setStep(0)
      setPlaying(true)
    } else {
      setPlaying(true)
    }
  }

  const partialResult = RESULT.map((row, r) =>
    row.map((val, c) => {
      const cellStep = r * B[0].length + c
      return step >= cellStep ? val : null
    })
  )

  return (
    <div
      className="viz-container"
      style={{ padding: '2rem' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Matrix A */}
        <MatrixDisplay
          matrix={A}
          highlightRow={currentRow}
          accentColor="var(--accent-orange)"
          label="A (3×3)"
        />

        {/* × */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            color: 'var(--color-muted)',
            alignSelf: 'center',
            marginTop: '2rem',
          }}
        >
          ×
        </div>

        {/* Matrix B */}
        <MatrixDisplay
          matrix={B}
          highlightCol={currentCol}
          accentColor="var(--accent-blue)"
          label="B (3×3)"
        />

        {/* = */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            color: 'var(--color-muted)',
            alignSelf: 'center',
            marginTop: '2rem',
          }}
        >
          =
        </div>

        {/* Result matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span className="text-label" style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
            A × B
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 8, height: 8, borderLeft: '2px solid var(--accent-sage)', borderTop: '2px solid var(--accent-sage)' }} />
              <div style={{ flex: 1, borderLeft: '2px solid var(--accent-sage)', marginLeft: -1 }} />
              <div style={{ width: 8, height: 8, borderLeft: '2px solid var(--accent-sage)', borderBottom: '2px solid var(--accent-sage)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {partialResult.map((row, r) => (
                <div key={r} style={{ display: 'flex', gap: '4px' }}>
                  {row.map((val, c) => {
                    const isActive = r === currentRow && c === currentCol && step >= 0
                    return (
                      <AnimatePresence key={`${r}-${c}`}>
                        <motion.div
                          animate={{
                            background: isActive
                              ? 'var(--accent-sage)'
                              : val !== null
                                ? 'var(--color-white)'
                                : 'transparent',
                            scale: isActive ? 1.08 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            width: 44,
                            height: 44,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            border: '1px solid rgba(142,185,166,0.4)',
                            borderRadius: '2px',
                            color: isActive ? '#fff' : 'var(--color-ink)',
                          }}
                        >
                          {val !== null ? val : ''}
                        </motion.div>
                      </AnimatePresence>
                    )
                  })}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: 8, height: 8, borderRight: '2px solid var(--accent-sage)', borderTop: '2px solid var(--accent-sage)' }} />
              <div style={{ flex: 1, borderRight: '2px solid var(--accent-sage)', marginRight: -1 }} />
              <div style={{ width: 8, height: 8, borderRight: '2px solid var(--accent-sage)', borderBottom: '2px solid var(--accent-sage)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Info row */}
      {step >= 0 && currentRow >= 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1rem',
            background: 'var(--color-bg)',
            borderLeft: '3px solid var(--accent-orange)',
            fontSize: '0.875rem',
            color: 'var(--color-muted)',
          }}
        >
          Calculando{' '}
          <strong style={{ color: 'var(--color-ink)' }}>
            C[{currentRow}][{currentCol}]
          </strong>{' '}
          = fila {currentRow + 1} de A · columna {currentCol + 1} de B
          {' = '}
          <strong style={{ color: 'var(--accent-orange)' }}>
            {RESULT[currentRow][currentCol]}
          </strong>
        </motion.div>
      )}

      {/* Controls */}
      <div className="viz-caption" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn-primary"
            onClick={handlePlay}
            disabled={playing}
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', opacity: playing ? 0.5 : 1 }}
          >
            {step === -1 ? 'Animar' : step >= totalSteps - 1 ? 'Reiniciar' : 'Continuar'}
          </button>
          <button
            className="btn-outline"
            onClick={() => { setStep(-1); setPlaying(false) }}
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
          >
            Resetear
          </button>
          {!playing && step < totalSteps - 1 && step >= 0 && (
            <button
              className="btn-outline"
              onClick={() => setStep(s => Math.min(s + 1, totalSteps - 1))}
              style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            >
              Paso →
            </button>
          )}
        </div>
        <span className="text-caption">
          {step >= 0 ? `Paso ${step + 1} / ${totalSteps}` : 'Presiona Animar para comenzar'}
        </span>
      </div>
    </div>
  )
}
