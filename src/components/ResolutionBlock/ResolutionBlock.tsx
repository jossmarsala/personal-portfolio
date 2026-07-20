import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ResolutionBlockProps {
  step?: number | string
  title?: string
  children: ReactNode
  dark?: boolean
}

export default function ResolutionBlock({
  step,
  title,
  children,
  dark = false,
}: ResolutionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: dark ? 'var(--color-charcoal)' : 'var(--color-white)',
        color: dark ? 'var(--color-bg)' : 'var(--color-ink)',
        padding: '2rem',
        borderLeft: '3px solid var(--accent-orange)',
        marginBottom: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        {step !== undefined && (
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              lineHeight: 0.9,
              color: 'var(--accent-orange)',
              flexShrink: 0,
              minWidth: '2.5rem',
            }}
          >
            {String(step).padStart(2, '0')}
          </div>
        )}
        <div style={{ flex: 1 }}>
          {title && (
            <p
              className="text-label"
              style={{
                color: dark ? 'var(--accent-orange)' : 'var(--color-muted)',
                marginBottom: '0.75rem',
              }}
            >
              {title}
            </p>
          )}
          <div style={{ lineHeight: 1.7 }}>{children}</div>
        </div>
      </div>
    </motion.div>
  )
}
