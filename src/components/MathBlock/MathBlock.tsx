import { useEffect, useRef } from 'react'
import katex from 'katex'

interface MathBlockProps {
  formula: string
  display?: boolean
  className?: string
}

export default function MathBlock({ formula, display = false, className = '' }: MathBlockProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    try {
      katex.render(formula, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      })
    } catch (e) {
      if (ref.current) ref.current.textContent = formula
    }
  }, [formula, display])

  if (display) {
    return (
      <div
        className={`katex-display ${className}`}
        style={{
          padding: '1.5rem 2rem',
          background: 'var(--color-white)',
          borderLeft: '3px solid var(--accent-orange)',
          margin: '2rem 0',
          overflowX: 'auto',
        }}
      >
        <span ref={ref} />
      </div>
    )
  }

  return <span ref={ref} className={`math-inline ${className}`} />
}
