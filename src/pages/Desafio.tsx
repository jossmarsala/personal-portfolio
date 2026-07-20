import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Desafio.css'

// ─── Theory pills ─────────────────────────────────────────────────────────────

const desafioItems = ['Problema', 'Objetivos', 'Concepto']

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Desafio() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="desafio-root">

      {/* ════════════════════════════════════════
          TOP BAR — Volver + pills
          ════════════════════════════════════════ */}
      <motion.header
        className="desafio-topbar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: 'easeOut' as const }}
      >
        <Link to="/" className="desafio-volver">
          <span className="desafio-volver-arrow">←</span>
          Volver
        </Link>

        <motion.div
          className="desafio-pills"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {desafioItems.map((item, i) => (
            <motion.span
              key={item}
              className="desafio-pill"
              variants={fadeUp}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.07, ease: 'easeOut' as const }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.header>

      {/* ════════════════════════════════════════
          DESAFÍO — Hero two-column editorial
          ════════════════════════════════════════ */}
      <section className="desafio-hero">
        <div className="desafio-hero-grid">

          <motion.div
            className="desafio-hero-left"
            variants={fadeLeft}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' as const }}
          >
            <p className="desafio-eyebrow">
              Definir el problema<br />antes de diseñar<br />la solución.
            </p>
          </motion.div>

          <motion.div
            className="desafio-hero-right"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' as const }}
          >
            <h1 className="desafio-display-title">DESAFÍO</h1>

            <div className="desafio-body-text">
              <p>
                ¿Cuál es el gran desafío de las marcas hoy en día? Estas no suelen fallar por falta de buenas ideas, sino porque esas ideas se construyen por partes. En las empresas, diseño y desarrollo suelen responder a equipos distintos, lo que puede costarles hasta un 32% de su potencial de crecimiento, según un{' '}
                <a
                  href="https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20design/our%20insights/the%20business%20value%20of%20design/mckinsey-bvod-art-digital-rgb.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  estudio realizado por McKinsey &amp; Company
                </a>
                . POSDATA nació para cuestionar esa lógica.
              </p>
              <p>
                El desafío consistió en transformar una marca nacida de forma intuitiva en un sistema visual y técnico consistente. La identidad debía transmitir criterio, precisión y permanencia, posicionándose como un estudio con estándares altos donde diseño y desarrollo conviven desde la primera decisión.
              </p>
              <p>
                La investigación combinó benchmarking, análisis de referentes y construcción de moodboards para comprender cómo los principales estudios presentan su trabajo, estructuran su comunicación y articulan identidad con tecnología. Más que buscar tendencias, el objetivo fue detectar patrones de comportamiento y encontrar un espacio propio dentro de un mercado donde lo creativo y lo técnico suelen presentarse como disciplinas separadas.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          DESAFÍO — Resolution: Hipótesis, Benchmarking, Moodboard
          ════════════════════════════════════════ */}
      <section className="desafio-resolution">
        <div className="desafio-resolution-inner">

          {/* Paso 01 — Hipótesis */}
          <motion.div
            className="desafio-res-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="desafio-res-left">
              <span className="desafio-res-step-num">Paso 01</span>
              <h2 className="desafio-res-heading">Hipótesis</h2>
            </div>

            <div className="desafio-res-right">
              <div className="desafio-res-body">
                <p>
                  Las interfaces pueden copiarse. Los estilos cambian. Lo que permanece es la estructura que sostiene las decisiones. Por eso, el proyecto no comenzó diseñando pantallas, sino definiendo los principios que permitirían que cada parte del sistema hablara el mismo lenguaje.
                </p>
              </div>

              <motion.div
                className="desafio-res-image"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.2 }}
              >
                <img
                  src="/images/DESAFIO-01.webp"
                  alt="Hipótesis — Paso 01"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Paso 02 — Benchmarking */}
          <motion.div
            className="desafio-res-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="desafio-res-left">
              <span className="desafio-res-step-num">Paso 02</span>
              <h2 className="desafio-res-heading">Benchmarking</h2>
            </div>

            <div className="desafio-res-right">
              <div className="desafio-res-body">
                <p>
                  El benchmark analizó estudios internacionales que integran branding, producto digital y desarrollo para identificar oportunidades de posicionamiento. La investigación reveló un espacio poco explorado entre el enfoque tecnológico de los estudios digital-first y la sensibilidad del diseño editorial, definiendo el territorio conceptual y competitivo de POSDATA.
                </p>
              </div>

              <motion.div
                className="desafio-res-image"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.2 }}
              >
                <img
                  src="/images/INVESTIGACION-01.webp"
                  alt="Benchmarking — Paso 02"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Paso 03 — Moodboard */}
          <motion.div
            className="desafio-res-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ paddingBottom: 0 }}
          >
            <div className="desafio-res-left">
              <span className="desafio-res-step-num">Paso 03</span>
              <h2 className="desafio-res-heading">Moodboard</h2>
            </div>

            <div className="desafio-res-right">
              <div className="desafio-res-body">
                <p>
                  El moodboard funcionó como una herramienta para validar el sistema visual antes de diseñar la identidad. La exploración confirmó que era posible articular materiales editoriales, fotografía documental y referencias tecnológicas en un mismo lenguaje, utilizando la luz, las texturas y el contraste entre modo claro y oscuro para representar las dos dimensiones de la marca: lo humano y lo técnico.
                </p>
              </div>

              <motion.div
                className="desafio-res-image"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: 0.2 }}
              >
                <img
                  src="/images/INVESTIGACION-02.webp"
                  alt="Moodboard — Paso 03"
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Next phase footer ── */}
      <section
        className="pp-next-phase"
        style={{
          padding: '2rem clamp(1.5rem, 4vw, 4rem)',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '15vh',
        }}
      >
        <div style={{ width: '100%', maxWidth: 'var(--max-width)', marginInline: 'auto' }}>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'var(--color-ink)',
              opacity: 0.12,
              marginBottom: '2rem',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Link
              to="/proceso"
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
                fontFamily: 'var(--font-body)',
                color: 'var(--color-ink)',
              }}
            >
              Ir a: Fase 2: Proceso
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
