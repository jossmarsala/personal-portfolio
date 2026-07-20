import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Inicio' },
  { path: '/desafio', label: '1. Desafío' },
  { path: '/proceso', label: '2. Proceso' },
  { path: '/solucion', label: '3. Solución' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const isHome = location.pathname === '/'
  const isOverlay = isHome && !scrolled

  return (
    <>
      <header
        className={isOverlay ? 'nav-overlay' : ''}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(236, 236, 236, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? 'var(--border-thin)' : 'none',
          transition: 'all 400ms var(--ease-editorial)',
        }}
      >
        <div className="editorial-container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
          }}>
            {/* Logo / wordmark */}
            <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: isOverlay ? '#FFFFFF' : 'var(--color-ink)',
                  letterSpacing: '0.02em',
                  transition: 'color 400ms var(--ease-editorial)',
                }}
              >
                PORTFOLIO JOSS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--accent-orange)',
                }}
              >
                MARSALA
              </span>
            </NavLink>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="hidden-mobile">
              {navItems.slice(1).map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="show-mobile"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isOverlay ? '#FFFFFF' : 'var(--color-ink)',
                display: 'none',
                transition: 'color 400ms var(--ease-editorial)',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '4rem',
              insetInline: 0,
              background: 'rgba(236, 236, 236, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: 'var(--border-mid)',
              zIndex: 99,
              padding: '1.5rem 0',
            }}
          >
            <div className="editorial-container">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    style={{ padding: '0.75rem 0', fontSize: '1rem', borderBottom: 'var(--border-thin)' }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        header.nav-overlay .nav-link {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        header.nav-overlay .nav-link:hover,
        header.nav-overlay .nav-link.active {
          color: #FFFFFF !important;
        }
        header.nav-overlay .nav-link::after {
          background: #FFFFFF !important;
        }
      `}</style>
    </>
  )
}
