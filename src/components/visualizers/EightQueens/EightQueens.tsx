import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const N = 8

// Pre-computed solutions for demonstration
const SOLUTIONS: number[][] = [
  [0, 4, 7, 5, 2, 6, 1, 3],
  [0, 5, 7, 2, 6, 3, 1, 4],
  [0, 6, 3, 5, 7, 1, 4, 2],
  [0, 6, 4, 7, 1, 3, 5, 2],
  [1, 3, 5, 7, 2, 0, 6, 4],
  [1, 4, 6, 0, 2, 7, 5, 3],
  [1, 5, 0, 6, 3, 7, 2, 4],
  [2, 0, 6, 4, 7, 1, 3, 5],
  [2, 4, 1, 7, 0, 6, 3, 5],
  [3, 0, 4, 7, 1, 6, 2, 5],
]

function isSafe(board: number[], row: number, col: number): boolean {
  for (let r = 0; r < row; r++) {
    const c = board[r]
    if (c === col || Math.abs(c - col) === Math.abs(r - row)) return false
  }
  return true
}

function getConflicts(board: (number | null)[]): Set<string> {
  const conflicts = new Set<string>()
  const placed = board.map((col, row) => col !== null ? [row, col as number] : null).filter(Boolean) as [number, number][]

  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const [r1, c1] = placed[i]
      const [r2, c2] = placed[j]
      if (c1 === c2 || Math.abs(c1 - c2) === Math.abs(r1 - r2)) {
        conflicts.add(`${r1}-${c1}`)
        conflicts.add(`${r2}-${c2}`)
      }
    }
  }
  return conflicts
}

export default function EightQueens() {
  const [board, setBoard] = useState<(number | null)[]>(Array(N).fill(null))
  const [autoPlay, setAutoPlay] = useState(false)
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState<'explore' | 'backtrack' | 'solutions'>('explore')
  const [selectedSolution, setSelectedSolution] = useState(0)

  const placedCount = board.filter(v => v !== null).length
  const conflicts = getConflicts(board)
  const hasConflicts = conflicts.size > 0

  // Pre-build steps for backtracking mode (limited for performance)
  const steps: (number | null)[][] = []
  function buildLimitedSteps(b: number[], row: number, limit: number): boolean {
    if (steps.length >= limit) return false
    if (row === N) {
      steps.push([...b])
      return true
    }
    for (let col = 0; col < N; col++) {
      if (steps.length >= limit) return false
      steps.push([...b.slice(0, row), col, ...Array(N - row - 1).fill(null)])
      if (isSafe(b, row, col)) {
        b[row] = col
        if (buildLimitedSteps(b, row + 1, limit)) return true
      }
    }
    return false
  }

  const LIMIT = 120
  buildLimitedSteps(Array(N).fill(-1), 0, LIMIT)

  // Autoplay backtracking
  useEffect(() => {
    if (mode !== 'backtrack' || !autoPlay) return
    if (step >= steps.length - 1) { setAutoPlay(false); return }
    const t = setTimeout(() => setStep(s => s + 1), 80)
    return () => clearTimeout(t)
  }, [mode, autoPlay, step, steps.length])

  const currentStepBoard = steps[step] ?? Array(N).fill(null)

  const handleCellClick = (row: number, col: number) => {
    if (mode !== 'explore') return
    const newBoard = [...board]
    if (newBoard[row] === col) {
      newBoard[row] = null
    } else {
      newBoard[row] = col
    }
    setBoard(newBoard)
  }

  const loadSolution = (idx: number) => {
    setSelectedSolution(idx)
    const sol = SOLUTIONS[idx]
    const newBoard = sol.map(c => c)
    setBoard(newBoard)
  }

  const displayBoard = mode === 'backtrack' ? currentStepBoard : board

  return (
    <div className="viz-container" style={{ padding: '1.5rem' }}>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: 'var(--border-thin)' }}>
        {(['explore', 'backtrack', 'solutions'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); if (m === 'backtrack') { setStep(0); setAutoPlay(false) } }}
            style={{
              padding: '0.6rem 1rem',
              background: mode === m ? 'var(--color-ink)' : 'transparent',
              color: mode === m ? 'var(--color-bg)' : 'var(--color-muted)',
              border: 'none',
              borderBottom: mode === m ? '2px solid var(--accent-sage)' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              transition: 'all 200ms ease',
            }}
          >
            {m === 'explore' ? 'Explorar' : m === 'backtrack' ? 'Backtracking' : 'Soluciones'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Chess board */}
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${N}, 1fr)`,
              gap: 2,
              background: 'rgba(17,17,17,0.1)',
              padding: 2,
              width: 'min(360px, 100%)',
              aspectRatio: '1',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {Array.from({ length: N }, (_, row) =>
              Array.from({ length: N }, (_, col) => {
                const isLight = (row + col) % 2 === 0
                const queen = displayBoard[row]
                const isQueen = queen === col || (typeof queen === 'number' && queen >= 0 && queen === col)
                const key = `${row}-${col}`
                const isConflict = conflicts.has(key) && mode === 'explore'

                return (
                  <motion.div
                    key={key}
                    onClick={() => handleCellClick(row, col)}
                    animate={{
                      background: isConflict
                        ? 'rgba(232,109,66,0.35)'
                        : isQueen
                          ? isLight ? '#d4e8d4' : '#a8d4a8'
                          : isLight ? '#F0F0F0' : '#C8C8C8',
                      scale: isQueen ? 1 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: mode === 'explore' ? 'pointer' : 'default',
                      position: 'relative',
                      fontSize: 'clamp(18px, 3vw, 28px)',
                    }}
                    whileHover={mode === 'explore' ? { scale: 0.95 } : {}}
                  >
                    <AnimatePresence>
                      {isQueen && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          style={{
                            fontSize: 'clamp(16px, 2.5vw, 24px)',
                            filter: isConflict ? 'hue-rotate(30deg)' : 'none',
                            lineHeight: 1,
                          }}
                        >
                          ♛
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {/* Column labels */}
                    {row === 7 && (
                      <span style={{
                        position: 'absolute',
                        bottom: 2,
                        right: 3,
                        fontSize: '0.55rem',
                        color: 'rgba(17,17,17,0.35)',
                        fontWeight: 600,
                      }}>
                        {String.fromCharCode(65 + col)}
                      </span>
                    )}
                    {col === 0 && (
                      <span style={{
                        position: 'absolute',
                        top: 2,
                        left: 3,
                        fontSize: '0.55rem',
                        color: 'rgba(17,17,17,0.35)',
                        fontWeight: 600,
                      }}>
                        {8 - row}
                      </span>
                    )}
                  </motion.div>
                )
              })
            )}
          </div>

          {/* Status */}
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-caption">
              {mode === 'explore' && `${placedCount}/8 reinas colocadas`}
              {mode === 'backtrack' && `Paso ${step + 1} / ${steps.length}`}
              {mode === 'solutions' && `Solución ${selectedSolution + 1} / ${SOLUTIONS.length}`}
            </span>
            {mode === 'explore' && placedCount === 8 && !hasConflicts && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-label"
                style={{ color: 'var(--accent-sage)' }}
              >
                ✓ Solución válida
              </motion.span>
            )}
            {mode === 'explore' && hasConflicts && (
              <span className="text-label" style={{ color: 'var(--accent-orange)' }}>
                ✕ Conflicto detectado
              </span>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {mode === 'explore' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                Haz clic en una celda para colocar o quitar una reina. El tablero indica en{' '}
                <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>naranja</span> los conflictos.
              </p>
              <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }} onClick={() => setBoard(Array(N).fill(null))}>
                Limpiar tablero
              </button>
              <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }} onClick={() => loadSolution(0)}>
                Cargar solución ejemplo
              </button>
            </div>
          )}

          {mode === 'backtrack' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                Visualiza el algoritmo de backtracking. La reina naranja indica la posición siendo probada.
                Se retrocede cuando hay conflicto.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                  onClick={() => setAutoPlay(v => !v)}
                >
                  {autoPlay ? '⏸ Pausar' : '▶ Animar'}
                </button>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                  onClick={() => { setStep(0); setAutoPlay(false) }}
                >
                  ↺ Inicio
                </button>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
                  onClick={() => setStep(s => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  ←
                </button>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
                  onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                  disabled={step >= steps.length - 1}
                >
                  →
                </button>
              </div>
              {/* Progress bar */}
              <div style={{ background: 'rgba(17,17,17,0.1)', height: 4, borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                  style={{ height: '100%', background: 'var(--accent-sage)', borderRadius: 2 }}
                />
              </div>
            </div>
          )}

          {mode === 'solutions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                El problema de las 8 reinas tiene <strong style={{ color: 'var(--color-ink)' }}>92 soluciones</strong>. Aquí se muestran 10:
              </p>
              {SOLUTIONS.map((sol, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedSolution(idx); setBoard(sol.map(c => c)) }}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: selectedSolution === idx ? 'var(--color-ink)' : 'transparent',
                    color: selectedSolution === idx ? 'var(--color-bg)' : 'var(--color-muted)',
                    border: '1px solid rgba(17,17,17,0.1)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    textAlign: 'left',
                    transition: 'all 150ms ease',
                  }}
                >
                  Sol. {idx + 1}: [{sol.join(', ')}]
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
