import { motion } from 'framer-motion'

interface EditorialTitleProps {
  number?: string
  label?: string
  title: string
  subtitle?: string
  accentColor?: string
}

export default function EditorialTitle({
  number,
  label,
  title,
  subtitle,
  accentColor = 'var(--accent-orange)',
}: EditorialTitleProps) {
  return (
    <div style={{ position: 'relative' }}>
      {number && (
        <div
          className="section-number"
          style={{
            position: 'absolute',
            top: '-0.5em',
            right: 0,
            WebkitTextStrokeColor: accentColor,
            opacity: 0.08,
            lineHeight: 0.85,
          }}
        >
          {number}
        </div>
      )}

      {label && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-label"
          style={{ color: accentColor, marginBottom: '0.75rem' }}
        >
          {label}
        </motion.p>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-display-lg"
        style={{ color: 'var(--color-ink)' }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: '1rem',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-muted)',
            fontWeight: 400,
            maxWidth: '60ch',
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
