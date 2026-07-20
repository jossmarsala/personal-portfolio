import { useState, useEffect } from 'react'
import ProblemPage from '../components/ProblemPage/ProblemPage'

function Paso04ImageAnimator() {
  const images = [
    '/images/SOLUCION-04-01.webp',
    '/images/SOLUCION-04-02.webp'
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Solución 04 - ${index + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: currentIndex === index ? 1 : 0,
            transform: currentIndex === index ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}
    </div>
  )
}

const ACCENT = 'var(--accent-yellow)'
const theoryItems = [
  'Sistema de Marca',
  'Design System',
  'Motion Graphics',
  'UX/UI'
]

const approach = (
  <>
    <p>
      POSDATA evolucionó a un sistema de marca donde identidad, comunicación, motion y UX responden a una misma lógica. La identidad visual articula referencias editoriales y tecnología contemporánea mediante una paleta cromática, dirección fotográfica para campañas y motion graphics. Esta lógica se trasladó al ecosistema digital mediante un prototipo Hi-Fi desarrollado sobre un Design System con componentes reutilizables.
    </p>
  </>
)

// ─── Resolution ───────────────────────────────────────────────────────────────
const resolution = (
  <>
    {/* ── PASO 01 — Vértices como vectores k-prometedores ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/SOLUCION-01.webp"
          alt="Solución 01"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            Su lenguaje visual combina una serif editorial y estilo pixel-art dentro una ejecución muy trabajada para transmitir permanencia y atención por el detalle. Las variantes en positivo, negativo y color principal amplían el rango de aplicación. Es el ADN de la marca: Todo sistema bien construido desde lo técnico lo estético, es atemporal.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Logotipo y variantes</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — Aristas como extensiones válidas / árbol ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/SOLUCION-02.webp"
          alt="Solución 02"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            El color principal Signal Blue representa la dimensión digital. Mientras que los secundarios: Cool Steel, Seal Red y Cotton Rose incorporan la parte humana, la calidez del mundo editorial. El conjunto equilibra precisión técnica y sensibilidad visual, manteniendo una identidad sobria. Además, ya que la marca fue pensada para ser llevada a la web, se añadió una paleta semántica que permite utilizar los colores para comunicar estados y acciones en la interfaz.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Paleta cromática</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — DFS Backtracking ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/SOLUCION-03.webp"
          alt="Solución 03"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La selección tipográfica refleja el mismo contraste conceptual de la marca. Instrument Serif aporta carácter editorial y se reserva para titulares, mientras que Raleway garantiza legibilidad en subtítulos y textos corridos. Como complemento, Doto y Prairie funcionan
            como recursos gráficos que incorporan metadatos, anotaciones y gestos humanos.
            Cada fuente cuenta con un fallback específico definido para asegurar consistencia sin importar el dispositivo o navegador.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Tipografía y jerarquías</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 04 — Número de independencia Q_{8,8} ── */}
    <div className="pp-step" style={{ flexDirection: 'row', alignItems: 'stretch' }}>
      {/* Left: 9:16 panel, full height */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        width: 'calc(100vh * 9 / 16)',
        height: '100%',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}>
        <Paso04ImageAnimator />
      </div>

      {/* Right: title + description */}
      <div className="pp-step-lower" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <div className="pp-step-body">
          <p>
            Se desarrolló una mini campaña de awareness bajo el concepto "La belleza es un sistema", reforzando la idea de que el diseño trasciende lo estético cuando existe una estructura detrás. La campaña fue adaptada a publicaciones y stories de Instagram, respetando grillas de seguridad.
            Se utilizó IA como herramienta creativa asistencial para producir las imágenes de fondo, siguiendo una dirección de arte y curaduría en Photoshop que aseguró coherencia con la identidad.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 04</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Piezas Gráficas y Comunicación</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 05 — Motion graphics — custom side-by-side layout ── */}
    <div className="pp-step" style={{ flexDirection: 'row', alignItems: 'stretch' }}>
      {/* Left: 9:16 video panel, full height */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        width: 'calc(100vh * 9 / 16)',
        height: '100%',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}>
        <video
          src="/videos/SOLUCION-05-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Right: title + description */}
      <div className="pp-step-lower" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <div className="pp-step-body">
          <p>
            El bumper reel comienza con el hook "Todo se ve igual", haciendo referencia a un mercado saturado de propuestas
            similares, y presenta a la marca como una alternativa construida desde la intención y la estructura.
            El video utiliza síncresis, y aplica los principios de Staging, Slow In &amp; Slow Out y Appeal para dirigir la atención, aportar naturalidad al movimiento y reforzar la narrativa. Además, se desarrolló una animación experimental del logotipo como extensión de la identidad.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 05</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Motion graphics</h3></div>
        </div>
      </div>
    </div>


    {/* ── PASO 06 — Diseño de Interfaces ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <video
          src="/videos/SOLUCION-06-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <div className="pp-step-lower">
        <div className="pp-step-body">
          <p>
            La interfaz del prototipo high-fi fue desarrollada sobre un Design System compuesto por componentes maestros con variantes y Auto Layout, organizado mediante una grilla de 8 puntos. Las microinteracciones fueron implementadas con Interactive Components y Smart Animate, mientras que la accesibilidad cromática se validó bajo los criterios WCAG 2.2. Se experimentó con el uso de la nueva función de animación de Figma para crear componentes con mayor complejidad.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 06</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Ecosistema Interactivo UX/UI</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 07 — Aprendizajes ── */}
    <div className="pp-step" style={{ flexDirection: 'row', alignItems: 'stretch' }}>
      {/* Left: 9:16 panel, full height */}
      <div style={{
        position: 'relative',
        flexShrink: 0,
        width: 'calc(100vh * 9 / 16)',
        height: '100%',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}>
        <video
          src="/videos/SOLUCION-07-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Right: title + description */}
      <div className="pp-step-lower" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <div className="pp-step-body">
          <p>
            POSDATA comenzó hace seis meses como una idea personal sin estructura. Durante dos meses de investigación y desarrollo evolucionó hasta convertirse en un sistema documentado.
          </p>
          <p>
            <strong>01. Diseñar es decidir qué dejar afuera: </strong>
            Un cambio importante fue abandonar decisiones basadas sólo en la preferencia estética. Durante el proceso se descartaron recursos gráficos e incluso un isologo que no fortalecían el sistema de marca. Una identidad sólida no se construye agregando elementos, sino eliminando aquello que no tiene una función clara.
          </p>
          <p>
            <strong>02. La estructura acelera la creatividad: </strong>
            Antes el diseño se concebía como un proceso principalmente intuitivo. Este proyecto demostró que los diseños no surgen de ideas aisladas, sino de definir principios y documentar decisiones. La estructura no limita la creatividad: la potencia.
          </p>
          <p>
            <strong>03. Un punto de partida para el futuro: </strong>
            POSDATA dejó de ser una idea personal para convertirse en una identidad documentada, un sistema visual consistente y un prototipo funcional. Estos sientan las bases para su próxima etapa: transformar la experiencia diseñada en un producto desarrollado y comenzar a trabajar con clientes reales.
          </p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 07</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Aprendizajes</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Solucion() {
  return (
    <ProblemPage
      number="03"
      subject="Teoría de Grafos"
      title="SOLUCIÓN"
      question="Resultados de unificar identidad, experiencia y tecnología."
      heroBackground="#1e1c08"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
      nextPhasePath="/#deliverables-gallery"
      nextPhaseLabel="Entregables"
    />
  )
}
