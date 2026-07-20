import { useMemo } from 'react'

/* ─── Config ─────────────────────────────────────────── */
const COLS = 12
const ROWS = 12
const SPEED = 2.5  // seconds

/* ─── Palette accent positions (col, row) 1-indexed ──── */
const ACCENT_MAP: Record<string, string> = {
  '1-1':  'var(--accent-orange)',
  '2-2':  'var(--accent-orange)',
  '3-2':  'var(--accent-pink)',
  '4-1':  'var(--accent-blue)',
  '5-1':  'var(--accent-charcoal)',
  '5-3':  'var(--accent-blue)',
  '7-2':  'var(--accent-sage)',
  '8-1':  'var(--accent-yellow)',
  '9-2':  'var(--accent-sage)',
  '10-1': 'var(--accent-pink)',
  '11-3': 'var(--accent-yellow)',
  '12-2': 'var(--accent-charcoal)',
  '1-5':  'var(--accent-blue)',
  '2-4':  'var(--accent-blue)',
  '3-4':  'var(--accent-pink)',
  '5-5':  'var(--accent-pink)',
  '6-3':  'var(--accent-orange)',
  '7-4':  'var(--accent-orange)',
  '8-4':  'var(--accent-sage)',
  '9-4':  'var(--accent-sage)',
  '10-4': 'var(--accent-charcoal)',
  '11-5': 'var(--accent-yellow)',
  '12-5': 'var(--accent-yellow)',
  '1-8':  'var(--accent-charcoal)',
  '3-6':  'var(--accent-charcoal)',
  '3-9':  'var(--accent-orange)',
  '5-6':  'var(--accent-orange)',
  '5-10': 'var(--accent-pink)',
  '8-7':  'var(--accent-blue)',
  '8-9':  'var(--accent-charcoal)',
  '9-5':  'var(--accent-blue)',
  '10-8': 'var(--accent-blue)',
  '10-10':'var(--accent-sage)',
  '2-7':  'var(--accent-sage)',
  '2-11': 'var(--accent-pink)',
  '4-8':  'var(--accent-yellow)',
  '4-12': 'var(--accent-blue)',
  '7-9':  'var(--accent-orange)',
  '7-11': 'var(--accent-orange)',
  '11-7': 'var(--accent-pink)',
  '11-10':'var(--accent-yellow)',
  '1-9':  'var(--accent-pink)',
  '6-12': 'var(--accent-sage)',
  '9-12': 'var(--accent-sage)',
  '10-12':'var(--accent-charcoal)',
  '12-9': 'var(--accent-yellow)',
  '12-12':'var(--accent-yellow)',
}

interface Cell {
  index: number      // 1-based
  col: number        // 1-based
  row: number        // 1-based
  opacity: number
  delay: number
  accentColor: string | null
}

function buildCells(): Cell[] {
  const centerRow = Math.ceil(ROWS / 2)
  const centerCol = Math.ceil(COLS / 2)
  const cells: Cell[] = []

  for (let row = 1; row <= ROWS; row++) {
    for (let col = 1; col <= COLS; col++) {
      const index = col + COLS * (row - 1)
      const crPower = (centerRow - Math.abs(centerRow - row)) / 4
      const ccPower = (centerCol - Math.abs(centerCol - col)) / 4
      const combined = (crPower + ccPower) * 0.5

      cells.push({
        index,
        col,
        row,
        opacity: combined,
        delay: combined * -SPEED,
        accentColor: ACCENT_MAP[`${col}-${row}`] ?? null,
      })
    }
  }
  return cells
}

/* ─── Keyframe injection (once) ─────────────────────── */
const KEYFRAMES = `
@keyframes egi-dotPulse {
  0%, 23% { transform: translate3d(-50%, -50%, 0) scale(0); }
  43%, 100% { transform: translate3d(-50%, -50%, 0) scale(1); }
}
@keyframes egi-lineX {
  0%, 57% { transform: translate3d(-50%, 0, 0) rotate(0deg); }
  77%, 100% { transform: translate3d(-50%, 0, 0) rotate(90deg); }
}
@keyframes egi-lineY {
  0%, 57% { transform: translate3d(0, -50%, 0) rotate(0deg); }
  77%, 100% { transform: translate3d(0, -50%, 0) rotate(90deg); }
}
`

let injected = false
function injectKeyframes() {
  if (injected || typeof document === 'undefined') return
  injected = true
  const style = document.createElement('style')
  style.textContent = KEYFRAMES
  document.head.appendChild(style)
}

interface DotGridProps {
  overrideAccentColor?: string
}

/* ─── Component ─────────────────────────────────────── */
export default function DotGrid({ overrideAccentColor }: DotGridProps) {
  injectKeyframes()
  const cells = useMemo(() => buildCells(), [])

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'transparent',
        borderRadius: 0,
        // Define uniform dot size and gutter variables
        // custom properties for easy calc reference
        // @ts-expect-error custom css property variables
        '--dot-size': 'clamp(6px, 1.2vw, 12px)',
        '--gutter': 'clamp(10px, 2vw, 24px)',
      }}
    >
      {/* Grid container — centred, perfectly square aspect-ratio */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '102vw',
          height: '102vw', // forces aspect ratio to 1:1, making cells squares
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {cells.map((cell) => {
          const dotColor = cell.accentColor
            ? (overrideAccentColor ?? cell.accentColor)
            : 'rgba(255, 255, 255, 0.85)'
          const lineColor = 'rgba(255, 255, 255, 0.15)'
          const anim = `${SPEED}s infinite alternate-reverse ease-in`

          return (
            <div
              key={cell.index}
              style={{ position: 'relative' }}
            >
              {/* Horizontal line */}
              <div
                style={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 'calc((var(--dot-size) + var(--gutter)) / 2)',
                  width: 'calc(100% - var(--dot-size) - var(--gutter))',
                  height: '1.5px',
                  background: lineColor,
                  borderRadius: 4,
                  transformOrigin: 'center',
                  transform: 'translate3d(0, -50%, 0) rotate(0deg)',
                  opacity: cell.opacity,
                  animation: `egi-lineY ${anim}`,
                  animationDelay: `${cell.delay}s`,
                  pointerEvents: 'none',
                }}
              />

              {/* Vertical line */}
              <div
                style={{
                  content: '""',
                  position: 'absolute',
                  top: 'calc((var(--dot-size) + var(--gutter)) / 2)',
                  left: 0,
                  width: '1.5px',
                  height: 'calc(100% - var(--dot-size) - var(--gutter))',
                  background: lineColor,
                  borderRadius: 4,
                  transformOrigin: 'center',
                  transform: 'translate3d(-50%, 0, 0) rotate(0deg)',
                  opacity: cell.opacity,
                  animation: `egi-lineX ${anim}`,
                  animationDelay: `${cell.delay}s`,
                  pointerEvents: 'none',
                }}
              />

              {/* Intersection dot (Corner dot) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 'var(--dot-size)',
                  height: 'var(--dot-size)',
                  background: dotColor,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%) scale(0)',
                  opacity: cell.opacity,
                  animation: `egi-dotPulse ${SPEED}s infinite alternate ease-in`,
                  animationDelay: `${cell.delay}s`,
                  pointerEvents: 'none',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
