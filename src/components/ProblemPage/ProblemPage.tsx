import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import './ProblemPage.css'

// ─── Types ──────────────────────────────────────────────────────────────────

export type TheoryItem = string

export interface ProblemPageProps {
  /** e.g. "01" */
  number: string
  /** e.g. "Álgebra Lineal" */
  subject: string
  /** Large editorial display title */
  title: ReactNode
  /** Compelling question shown as the muted eyebrow on the left */
  question?: string
  /** Hero background color (kept for legacy compatibility) */
  heroBackground?: string
  /** Accent color CSS variable string, e.g. "var(--accent-orange)" */
  accent?: string
  /** Items for the top-bar pills */
  theoryItems: TheoryItem[]
  /** Approach section body — rendered in the right column alongside the title */
  approach: ReactNode
  /** Resolution section body */
  resolution: ReactNode
  /** Path to the next phase, if any */
  nextPhasePath?: string
  /** Label for the next phase button */
  nextPhaseLabel?: string
}

// ─── Circle accent colors per accent ─────────────────────────────────────

function resolveCircleColor(accent: string): string {
  if (accent.includes('orange') || accent.includes('#E95D35')) return '#FF6B4A'
  if (accent.includes('blue')   || accent.includes('#59a7fb')) return '#6B7FFF'
  if (accent.includes('sage')   || accent.includes('#59c383')) return '#A8FF3E'
  if (accent.includes('yellow') || accent.includes('#F7B626')) return '#F5E642'
  if (accent.includes('pink')   || accent.includes('#e77290')) return '#FF2D78'
  return '#F5E642'
}

// ─── Framer variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProblemPage(props: ProblemPageProps) {
  const {
    title,
    question,
    accent = 'var(--accent-orange)',
    theoryItems,
    approach,
    resolution,
    nextPhasePath,
    nextPhaseLabel,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(1)

  // Navigate forward through steps
  const handleNext = useCallback(() => {
    setCurrentStep((prev) => {
      const slides = containerRef.current?.querySelectorAll('.pp-step, .pp-next-phase') || []
      if (slides.length === 0) return prev

      let next = prev
      const firstSlide = slides[0] as HTMLElement
      const rect = firstSlide.getBoundingClientRect()

      // If the first slide is below the middle of the viewport,
      // it means we are in the hero section. Scroll to index 0.
      if (rect.top > window.innerHeight * 0.5) {
        next = 0
      } else {
        next = Math.min(prev + 1, slides.length - 1)
      }

      setTimeout(() => {
        const nextEl = slides[next] as HTMLElement
        if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)

      return next
    })
  }, [])

  // Navigate backward through steps
  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => {
      const slides = containerRef.current?.querySelectorAll('.pp-step, .pp-next-phase') || []
      if (slides.length === 0) return prev

      const firstSlide = slides[0] as HTMLElement
      const rect = firstSlide.getBoundingClientRect()

      // If we are at step 0 and the first slide is at or below the top of viewport
      if (prev === 0 && rect.top >= -10) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 50)
        return 0
      }

      const next = Math.max(prev - 1, 0)
      
      setTimeout(() => {
        const nextEl = slides[next] as HTMLElement
        if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)

      return next
    })
  }, [])

  // Keyboard bindings — Space/ArrowDown advance through steps
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
      if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // IntersectionObserver — tracks which step is currently in view
  useEffect(() => {
    if (!containerRef.current) return
    const slides = Array.from(
      containerRef.current.querySelectorAll('.pp-step, .pp-next-phase')
    )
    setTotalSteps(slides.length || 1)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pp-active-slide')
            const index = slides.indexOf(entry.target)
            if (index !== -1) setCurrentStep(index)
          } else {
            entry.target.classList.remove('pp-active-slide')
          }
        })
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    )

    slides.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [resolution])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const circleColor = resolveCircleColor(accent)
  const resolvedAccent = accent.startsWith('var(') ? circleColor : accent

  return (
    <div ref={containerRef} className="pp-root">

      {/* ══════════════════════════════════════════
          TOP BAR — Volver + Theory pills
          ══════════════════════════════════════════ */}
      <motion.header
        className="pp-topbar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' as const }}
      >
        <Link to="/" className="pp-volver-btn">
          <span className="pp-volver-arrow">←</span>
          Volver
        </Link>

        <motion.div
          className="pp-topbar-pills"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {theoryItems.map((item, i) => (
            <motion.span
              key={i}
              className="pp-hero-pill"
              variants={fadeUp}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.07, ease: 'easeOut' as const }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.header>

      {/* ══════════════════════════════════════════
          HERO — Two-column editorial layout
          Left: muted eyebrow (question)
          Right: display title + approach text
          ══════════════════════════════════════════ */}
      <section className="pp-hero-editorial">
        <div className="pp-hero-editorial-grid">

          {/* Left: muted eyebrow */}
          <motion.div
            className="pp-hero-editorial-left"
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' as const }}
          >
            {question && (
              <p className="pp-hero-editorial-eyebrow">{question}</p>
            )}
          </motion.div>

          {/* Right: large title + approach body */}
          <motion.div
            className="pp-hero-editorial-right"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' as const }}
          >
            <h1 className="pp-hero-editorial-title">{title}</h1>
            <div className="pp-hero-editorial-body">
              {approach}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-WIDTH MEDIA BLOCK
          ══════════════════════════════════════════ */}
      <motion.div
        className="pp-hero-media"
        initial={{ opacity: 0, scale: 1.015 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <video
          src="/videos/PROJECT_hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left center',
            display: 'block',
          }}
        />
        <div className="pp-hero-media-bar" style={{ justifyContent: 'flex-end' }}>
          <span className="pp-hero-media-hint">(Scroll)</span>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          RESOLUTION — Full-screen step slides
          ══════════════════════════════════════════ */}
      <section className="pp-resolution">
        <div
          className="pp-steps"
          style={{ '--step-accent': resolvedAccent } as React.CSSProperties}
        >
          {resolution}
        </div>
      </section>

      {nextPhasePath && (
        <section
          className="pp-next-phase"
          style={{
            scrollSnapAlign: 'start',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(2rem, 5vw, 5rem)',
            background: 'var(--pp-cream)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '30vh',
          }}
        >
          <div style={{ width: '100%', maxWidth: 'var(--max-width)', marginInline: 'auto' }}>
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--pp-ink)',
                opacity: 0.12,
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Link
                to={nextPhasePath}
                state={{ scrollToDeliverables: nextPhasePath.includes('#deliverables-gallery') }}
                className="nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  fontFamily: 'var(--pp-font-body)',
                  color: 'var(--pp-ink)',
                }}
              >
                Ir a: {nextPhaseLabel || 'Siguiente fase'}
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="pp-hud-counter">
        {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
      </div>

    </div>
  )
}
