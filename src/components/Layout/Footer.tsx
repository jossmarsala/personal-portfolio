export default function Footer() {
  return (
    <footer style={{
      borderTop: 'var(--border-mid)',
      marginTop: '6rem',
      paddingBlock: '2.5rem',
    }}>
      <div className="editorial-container">
        <div className="editorial-grid" style={{ alignItems: 'center' }}>
          <div className="col-6">
            <p className="text-caption">
              Case Study para POSDATA
            </p>
            <p className="text-caption" style={{ marginTop: '0.25rem' }}>
              © Josefina Marsala, todos los derechos reservados
            </p>
          </div>
          <div className="col-6" style={{ textAlign: 'right' }}>
            <p className="text-caption" style={{ marginTop: '0.25rem', color: 'var(--accent-orange)' }}>
              Diplomatura Diseño Multimedial UTNBA
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
