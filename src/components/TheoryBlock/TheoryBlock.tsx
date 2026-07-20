import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface TheoryBlockProps {
  title?: string
  children: ReactNode
  accentColor?: string
  index?: number
}

export default function TheoryBlock({
  title,
  children,
  accentColor = 'var(--color-ink)',
  index = 0,
}: TheoryBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="theory-block"
      style={{ borderTopColor: accentColor }}
    >
      {title && (
        <p
          className="text-label"
          style={{ color: accentColor, marginBottom: '1rem' }}
        >
          {title}
        </p>
      )}
      <div style={{ color: 'var(--color-ink)', lineHeight: 1.7 }}>
        {children}
      </div>
    </motion.div>
  )
}
