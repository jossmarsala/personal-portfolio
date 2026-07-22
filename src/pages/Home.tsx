import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────
type ViewerConfig =
  | { type: 'pdf'; src: string }
  | { type: 'image'; src: string }
  | { type: 'gallery'; src: string[] }
  | { type: 'video'; src: string }
  | { type: 'vimeo'; src: string }
  | { type: 'figma'; src: string; externalUrl: string }

interface Deliverable {
  title: string
  category: string
  caption: string
  accent: string
  cover: string
  coverType: 'image' | 'video'
  aspectRatio: string
  viewer: ViewerConfig
}

// ── Data ───────────────────────────────────────────────────────
const problems = [
  {
    number: '01',
    title: 'Desafío',
    description: 'Definición del problema y objetivos principales.',
    path: '/desafio',
    accent: 'var(--accent-orange)',
    tag: 'Fase 1',
  },
  {
    number: '02',
    title: 'Proceso',
    description: 'Metodología aplicada y desarrollo paso a paso.',
    path: '/proceso',
    accent: 'var(--accent-sage)',
    tag: 'Fase 2',
  },
  {
    number: '03',
    title: 'Solución',
    description: 'Resultados obtenidos, conclusiones y entregables finales.',
    path: '/solucion',
    accent: 'var(--accent-yellow)',
    tag: 'Fase 3',
  },
]

// Columns: [campana] | [prototipo, animacion] | [brandbook, bumper] — then pitchdeck full-width
const deliverables: Deliverable[] = [
  {
    title: 'Brand Book',
    category: 'Branding',
    caption: 'Guía completa que establece las reglas de identidad visual y aplicación de la marca.',
    accent: 'var(--accent-orange)',
    cover: '/images/ENTREGABLES-01.png',
    coverType: 'image',
    aspectRatio: '16 / 9',
    viewer: { type: 'pdf', src: '/deliverables/POSDATA-brandbook.pdf' },
  },
  {
    title: 'Campaña Publicitaria',
    category: 'Branding',
    caption: 'Conjunto de piezas visuales diseñadas para crear reconocimiento de marca en diferentes formatos.',
    accent: 'var(--accent-pink)',
    cover: '/images/ENTREGABLES-02.png',
    coverType: 'image',
    aspectRatio: '9 / 16',
    viewer: {
      type: 'gallery',
      src: [
        '/deliverables/POSDATA_campaign-post.png',
        '/deliverables/POSDATA_campaign-story.png',
      ],
    },
  },
  {
    title: 'Bumper Reel',
    category: 'Motion Graphics',
    caption: 'Video en formato vertical de motion graphics para redes.',
    accent: 'var(--accent-yellow)',
    cover: '/videos/ENTREGABLES-03.mp4',
    coverType: 'video',
    aspectRatio: '9 / 16',
    viewer: { type: 'video', src: '/deliverables/POSDATA_bumper-reel.mp4' },
  },
  {
    title: 'Prototipo Interactivo',
    category: 'UX/UI',
    caption: 'Flujo navegable de alta fidelidad que integra motion y microinteracciones.',
    accent: 'var(--accent-sage)',
    cover: '/videos/ENTREGABLES-04.mp4',
    coverType: 'video',
    aspectRatio: '16 / 9',
    viewer: {
      type: 'figma',
      src: 'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FrHQVFsy9W4JCTxUlaiIsVs%2FPOSDATA%3Fnode-id%3D0-1%26t%3DEKci3ub8m6IFQ05p-1',
      externalUrl: 'https://www.figma.com/design/rHQVFsy9W4JCTxUlaiIsVs/POSDATA?node-id=0-1&t=EKci3ub8m6IFQ05p-1'
    },
  },
  {
    title: 'Animación de Logo',
    category: 'Motion Graphics',
    caption: 'Animación breve que introduce el logotipo principal de la marca.',
    accent: 'var(--accent-pink)',
    cover: '/videos/HERO_video.mp4',
    coverType: 'video',
    aspectRatio: '21 / 9',
    viewer: { type: 'video', src: '/videos/HERO_video.mp4' },
  },
  {
    title: 'Pitch Deck',
    category: 'Branding',
    caption: 'Presentación justificativa de los aspectos clave del proyecto.',
    accent: 'var(--accent-orange)',
    cover: '/images/ENTREGABLES-06.png',
    coverType: 'image',
    aspectRatio: '16 / 9',
    viewer: { type: 'vimeo', src: 'https://player.vimeo.com/video/1211538026?badge=0&autopause=0&player_id=0&app_id=58479' },
  },
]

// Named refs for explicit column placement
const [dBrandBook, dCampana, dBumper, dProto, dLogo, dPitch] = deliverables

// ── Home Page ──────────────────────────────────────────────────
export default function Home() {
  const [activeViewer, setActiveViewer] = useState<{ item: Deliverable } | null>(null)
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#deliverables-gallery') {
      const timer = setTimeout(() => {
        const element = document.getElementById('deliverables-gallery')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location])

  const openViewer = useCallback((item: Deliverable) => {
    setActiveViewer({ item })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeViewer = useCallback(() => {
    setActiveViewer(null)
    document.body.style.overflow = ''
  }, [])

  return (
    <div>
      {/* ── Hero Section ────────────────────────── */}
      <section
        style={{
          borderBottom: 'var(--border-mid)',
          background: 'var(--color-bg)',
          position: 'relative',
        }}
      >
        {/* ── Discrete Dark Rectangle (Animation Panel) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(320px, 52vh, 520px)',
            background: '#0B0B0B',
            overflow: 'hidden',
          }}
        >
          <video
            src="/videos/HERO_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Aesthetic location/subject stamp, matching reference poster style */}
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              left: 'clamp(1rem, 4vw, 4rem)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.4)',
              userSelect: 'none',
            }}
          >
            PORTFOLIO JOSS MARSALA
          </div>
        </motion.div>

        {/* ── Content Grid below dark rectangle ── */}
        <div className="editorial-container" style={{ paddingBlock: '4rem 3.5rem' }}>
          <div
            className="editorial-grid"
            style={{
              alignItems: 'start',
            }}
          >
            {/* Left Column: Massive Bold Swiss Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-8"
            >
              <h1
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 'clamp(4rem, 10vw, 10rem)',
                  lineHeight: 0.9,
                  color: 'var(--color-ink)',
                  letterSpacing: '-0.05em',
                  margin: 0,
                }}
              >
                POSDATA STUDIO
              </h1>
            </motion.div>

            {/* Right Column: Red Accent Dot & Project Intro Paragraph */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="col-4"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingTop: '0.5rem',
              }}
            >
              {/* Seal red dot */}
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent-orange)',
                  marginBottom: '1.5rem',
                }}
              />

              {/* Pitch copy */}
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                  color: 'var(--color-muted)',
                  margin: 0,
                  maxWidth: '38ch',
                }}
              >
                POSDATA es un estudio creativo enfocado en el desarrollo de software que opera en la intersección exacta entre la dirección de arte y la ingeniería. Este registro documenta la transición de una idea abstracta hacia un ecosistema capaz de integrar branding, UX, desarrollo y motion bajo una misma lógica de diseño.
              </p>

              <div style={{ width: '100%' }}>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: 'var(--color-ink)',
                    opacity: 0.12,
                    marginTop: '3.5rem',
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
                  <button
                    onClick={() => {
                      document.getElementById('problems-list')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Comenzar exploración
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .mobile-text-left {
            text-align: left !important;
          }
          .mobile-mt-8 {
            margin-top: 3rem !important;
          }
        }
      `}</style>

      <section id="problems-list" style={{ paddingBlock: '0 2rem' }}>
        <div className="editorial-container">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to={p.path} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="problem-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '7rem 1fr auto',
                    alignItems: 'start',
                    gap: '2.5rem',
                    padding: '2rem 0',
                    borderBottom: '1px solid rgba(17,17,17,0.1)',
                    transition: 'background 300ms var(--ease-editorial)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(17,17,17,0.018)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  {/* Left — italic slash number */}
                  <div style={{ paddingTop: '0.6rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        color: 'var(--color-muted)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      /{p.number}
                    </span>
                  </div>

                  {/* Center — large multi-line title */}
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 800,
                        fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                        lineHeight: 0.95,
                        color: 'var(--color-ink)',
                        letterSpacing: '-0.03em',
                        margin: 0,
                      }}
                    >
                      {p.title}
                    </h2>
                  </div>

                  {/* Right — accent dot + tag + description + CTA */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      maxWidth: '22ch',
                      paddingTop: '0.5rem',
                    }}
                  >
                    {/* Accent dot + category tag */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: p.accent,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: p.accent,
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>

                    {/* VER ——— SECCIÓN */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-ink)',
                        }}
                      >
                        VER
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: '1px',
                          background: 'var(--color-ink)',
                          minWidth: '2rem',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-ink)',
                        }}
                      >
                        SECCIÓN
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Deliverables Gallery Section ─────────────── */}
      <section
        id="deliverables-gallery"
        style={{
          paddingBlock: '7rem 8rem',
          background: 'var(--color-bg)',
          position: 'relative',
        }}
      >
        <div className="editorial-container">

          {/* Section header row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '5rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-ink)',
                  margin: 0,
                }}
              >
                Resultados Finales
              </h2>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                color: 'var(--color-muted)',
                margin: 0,
                maxWidth: '32ch',
                textAlign: 'right',
              }}
            >
              Entregables que materializan el proyecto.
            </p>
          </motion.div>

          {/* ── Masonry Grid ── */}
          <style>{`
            /* Flex-column masonry layout */
            .masonry-columns {
              display: flex;
              gap: 1.25rem;
              align-items: flex-start;
            }
            .masonry-col {
              display: flex;
              flex-direction: column;
              gap: 1.25rem;
              /* column widths set inline */
            }
            .masonry-fullrow {
              margin-top: 1.25rem;
            }
            @media (max-width: 768px) {
              .masonry-columns {
                flex-wrap: wrap;
              }
              .masonry-col {
                flex: 1 1 calc(50% - 0.625rem) !important;
                min-width: 0;
              }
              .masonry-fullrow {
                margin-top: 1.25rem;
              }
            }
            @media (max-width: 480px) {
              .masonry-col {
                flex: 1 1 100% !important;
              }
            }

            .deliverable-card {
              cursor: pointer;
              display: flex;
              flex-direction: column;
              padding-bottom: 1.5rem;
              padding-left: .5rem;
              padding-right: .5rem;
            }

            .deliverable-card-cover {
              width: 100%;
              overflow: hidden;
              border-radius: 3px;
              position: relative;
              border: 1px solid rgba(17,17,17,0.10);
              background: rgba(17,17,17,0.04);
            }

            .deliverable-card-cover img,
            .deliverable-card-cover video {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 480ms cubic-bezier(0.25, 0.1, 0.25, 1);
            }

            .deliverable-card:hover .deliverable-card-cover img,
            .deliverable-card:hover .deliverable-card-cover video {
              transform: scale(1.03);
            }

            .deliverable-card-overlay {
              position: absolute;
              inset: 0;
              background: rgba(17,17,17,0);
              transition: background 350ms ease;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .deliverable-card:hover .deliverable-card-overlay {
              background: rgba(17,17,17,0.28);
            }

            .deliverable-card-open-icon {
              opacity: 0;
              transform: scale(0.85);
              transition: opacity 300ms ease, transform 300ms ease;
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: rgba(236,236,236,0.92);
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(8px);
            }

            .deliverable-card:hover .deliverable-card-open-icon {
              opacity: 1;
              transform: scale(1);
            }

            /* ── Viewer Modal ── */
            .viewer-backdrop {
              position: fixed;
              inset: 0;
              z-index: 9990;
              background: rgba(11,11,11,0.88);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
            }

            .viewer-modal {
              position: fixed;
              inset: 0;
              z-index: 9995;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 1.5rem;
              pointer-events: none;
            }

            .viewer-shell {
              pointer-events: all;
              width: 100%;
              max-width: 1200px;
              max-height: 92vh;
              display: flex;
              flex-direction: column;
              background: #111111;
              border-radius: 4px;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.08);
              box-shadow: 0 32px 80px rgba(0,0,0,0.55);
            }

            .viewer-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 1rem 1.5rem;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              flex-shrink: 0;
            }

            .viewer-body {
              flex: 1;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              min-height: 0;
            }

            .viewer-body iframe {
              width: 100%;
              height: 100%;
              border: none;
              display: block;
            }

            .viewer-body img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              display: block;
            }

            .viewer-body video {
              max-width: 100%;
              max-height: 100%;
              display: block;
            }

            .viewer-close-btn {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.15);
              background: rgba(255,255,255,0.06);
              color: rgba(255,255,255,0.8);
              font-size: 1.1rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 200ms ease, color 200ms ease;
              flex-shrink: 0;
            }

            .viewer-close-btn:hover {
              background: rgba(255,255,255,0.14);
              color: #fff;
            }

            .viewer-nav-btn {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 44px;
              height: 44px;
              border-radius: 50%;
              border: 1px solid rgba(255,255,255,0.18);
              background: rgba(255,255,255,0.08);
              color: rgba(255,255,255,0.9);
              font-size: 1.2rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 200ms ease;
              z-index: 2;
              backdrop-filter: blur(6px);
            }

            .viewer-nav-btn:hover {
              background: rgba(255,255,255,0.18);
            }

            .viewer-nav-btn.prev { left: 1rem; }
            .viewer-nav-btn.next { right: 1rem; }

            .viewer-counter {
              font-family: var(--font-body);
              font-size: 0.6875rem;
              font-weight: 500;
              letter-spacing: 0.08em;
              color: rgba(255,255,255,0.4);
              margin-left: auto;
              margin-right: 1rem;
            }

            @media (max-width: 768px) {
              .deliverables-masonry {
                grid-template-columns: 1fr 1fr;
                grid-template-areas:
                  "brandbook campana"
                  "bumper prototipo"
                  "logoani logoani"
                  "pitchdeck pitchdeck";
              }
              .viewer-shell {
                max-height: 95vh;
                border-radius: 2px;
              }
            }

            @media (max-width: 480px) {
              .deliverables-masonry {
                grid-template-columns: 1fr;
                grid-template-areas:
                  "brandbook"
                  "campana"
                  "bumper"
                  "prototipo"
                  "logoani"
                  "pitchdeck";
              }
            }
          `}</style>

          {/* ── 3 explicit flex columns ────────────────────────────
              Left   (1.5fr): Brand Book (16:9, focal point) + Logo (1:1)
              Center (1.0fr): Campaña (9:16 portrait, reduced size)
              Right  (1.0fr): Bumper (9:16) + Prototipo (16:9)
              Full row:       Pitch Deck (16:9) — unchanged, full width
          ── */}
          <div className="masonry-columns">

            {/* Left column — Wide, focal point */}
            <div className="masonry-col" style={{ flex: '1.5' }}>
              <MasonryCard item={dBrandBook} delay={0} onOpen={() => openViewer(dBrandBook)} />
              <MasonryCard item={dProto} delay={0.07} onOpen={() => openViewer(dProto)} />
            </div>

            {/* Center column — Narrower portrait anchor */}
            <div className="masonry-col" style={{ flex: '1' }}>
              <MasonryCard item={dCampana} delay={0.07} onOpen={() => openViewer(dCampana)} />
            </div>

            {/* Right column — Mixed */}
            <div className="masonry-col" style={{ flex: '1' }}>
              <MasonryCard item={dBumper} delay={0.14} onOpen={() => openViewer(dBumper)} />
              <MasonryCard item={dLogo} delay={0.21} onOpen={() => openViewer(dLogo)} />
            </div>

          </div>

          {/* Full-width Pitch Deck — unchanged */}
          <div className="masonry-fullrow">
            <MasonryCard item={dPitch} delay={0.18} onOpen={() => openViewer(dPitch)} />
          </div>

        </div>
      </section>

      {/* ── Fullscreen Viewer ── */}
      <AnimatePresence>
        {activeViewer && (
          <DeliverableViewer
            item={activeViewer.item}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Masonry Card Component ──────────────────────────────────────
function MasonryCard({
  item,
  delay,
  onOpen,
}: {
  item: Deliverable
  delay: number
  onOpen: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        className="deliverable-card"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`Abrir en una pestaña nueva ${item.title}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpen() }}
      >
        {/* Cover image / video */}
        <div
          className="deliverable-card-cover"
          style={{ aspectRatio: item.aspectRatio }}
        >
          {item.coverType === 'image' ? (
            <img
              src={item.cover}
              alt={item.title}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <video
              src={item.cover}
              autoPlay
              loop
              muted
              playsInline
            />
          )}

          {/* Hover overlay with open icon */}
          <div className="deliverable-card-overlay">
            <div className="deliverable-card-open-icon">
              {/* Expand icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </div>
          </div>

          {/* Video badge */}
          {(item.viewer.type === 'video') && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '0.75rem',
                background: 'rgba(17,17,17,0.7)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.5rem',
                borderRadius: '2px',
                backdropFilter: 'blur(4px)',
              }}
            >
              Video
            </div>
          )}

          {/* PDF badge */}
          {(item.viewer.type === 'pdf') && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '0.75rem',
                background: 'rgba(17,17,17,0.7)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.5rem',
                borderRadius: '2px',
                backdropFilter: 'blur(4px)',
              }}
            >
              PDF
            </div>
          )}

          {/* Figma badge */}
          {(item.viewer.type === 'figma') && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '0.75rem',
                background: 'rgba(17,17,17,0.7)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.5rem',
                borderRadius: '2px',
                backdropFilter: 'blur(4px)',
              }}
            >
              Figma
            </div>
          )}

          {/* Gallery badge */}
          {(item.viewer.type === 'gallery') && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                left: '0.75rem',
                background: 'rgba(17,17,17,0.7)',
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.5625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.5rem',
                borderRadius: '2px',
                backdropFilter: 'blur(4px)',
              }}
            >
              {`${(item.viewer as { type: 'gallery'; src: string[] }).src.length} imágenes`}
            </div>
          )}
        </div>

        {/* Label row: title — category */}
        <div
          style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(17,17,17,0.15)',
            marginTop: '0.875rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
              lineHeight: 1.2,
              marginBottom: '0.2rem',
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6875rem',
              fontWeight: 400,
              color: 'var(--color-muted)',
              letterSpacing: '0.01em',
            }}
          >
            {item.category}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Deliverable Viewer Modal ────────────────────────────────────
function DeliverableViewer({
  item,
  onClose,
}: {
  item: Deliverable
  onClose: () => void
}) {
  const [galleryIndex, setGalleryIndex] = useState(0)

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (item.viewer.type === 'gallery') {
        const srcs = (item.viewer as { type: 'gallery'; src: string[] }).src
        if (e.key === 'ArrowRight') setGalleryIndex(i => (i + 1) % srcs.length)
        if (e.key === 'ArrowLeft') setGalleryIndex(i => (i - 1 + srcs.length) % srcs.length)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [item, onClose])

  const gallerySrcs = item.viewer.type === 'gallery'
    ? (item.viewer as { type: 'gallery'; src: string[] }).src
    : []

  // Height classes for viewer body based on content type
  const bodyHeight =
    item.viewer.type === 'pdf'
      ? '75vh'
      : item.viewer.type === 'video'
        ? 'auto'
        : item.viewer.type === 'vimeo'
          ? '75vh'
          : item.viewer.type === 'figma'
            ? '85vh'
            : '75vh'

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="viewer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="viewer-modal">
        <motion.div
          className="viewer-shell"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ maxHeight: bodyHeight === 'auto' ? '92vh' : undefined }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="viewer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: item.accent,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginLeft: '0.25rem',
                }}
              >
                {item.category}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {item.viewer.type === 'figma' && (
                <a
                  href={item.viewer.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    transition: 'background 200ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  title="Abrir en una pestaña nueva"
                >
                  Abrir en una pestaña nueva
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
              {item.viewer.type === 'gallery' && (
                <span className="viewer-counter">
                  {galleryIndex + 1} / {gallerySrcs.length}
                </span>
              )}
              <button
                className="viewer-close-btn"
                onClick={onClose}
                aria-label="Cerrar visor"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div
            className="viewer-body"
            style={{
              height: bodyHeight,
              background: item.viewer.type === 'pdf' ? '#1a1a1a' : '#0b0b0b',
            }}
          >
            {item.viewer.type === 'pdf' && (
              <iframe
                src={`${item.viewer.src}#toolbar=1&view=FitH`}
                title={item.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            )}

            {item.viewer.type === 'figma' && (
              <iframe
                src={item.viewer.src}
                title={item.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
              />
            )}

            {item.viewer.type === 'image' && (
              <img
                src={item.viewer.src}
                alt={item.title}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            )}

            {item.viewer.type === 'video' && (
              <video
                src={item.viewer.src}
                controls
                autoPlay
                playsInline
                style={{
                  maxWidth: '100%',
                  maxHeight: '82vh',
                  display: 'block',
                }}
              />
            )}

            {item.viewer.type === 'vimeo' && (
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <iframe
                  src={item.viewer.src}
                  title={item.title}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            )}

            {item.viewer.type === 'gallery' && (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={gallerySrcs[galleryIndex]}
                    src={gallerySrcs[galleryIndex]}
                    alt={`${item.title} — ${galleryIndex + 1}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                </AnimatePresence>

                {gallerySrcs.length > 1 && (
                  <>
                    <button
                      className="viewer-nav-btn prev"
                      onClick={() => setGalleryIndex(i => (i - 1 + gallerySrcs.length) % gallerySrcs.length)}
                      aria-label="Imagen anterior"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      className="viewer-nav-btn next"
                      onClick={() => setGalleryIndex(i => (i + 1) % gallerySrcs.length)}
                      aria-label="Imagen siguiente"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
