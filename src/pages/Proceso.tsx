import ProblemPage from '../components/ProblemPage/ProblemPage'

const ACCENT = 'var(--accent-sage)'

const theoryItems = [
  'Design System',
  'Arquitectura',
  'Decisiones',
]

const approach = (
  <>
    <p>
      El proceso comenzó reorganizando una marca que existía de forma "casual", pero que todavía no contaba con principios claros para sostener sus decisiones. A través de bocetos, wireframes y múltiples iteraciones, cada elemento fue validado en función de una misma pregunta: ¿aporta coherencia al sistema? Esa lógica permitió transformar una identidad basada en preferencias personales en un lenguaje visual consistente y documentado.
    </p>
  </>
)

// ─── Resolution ───────────────────────────────────────────────────────────────

const resolution = (
  <>
    {/* ── PASO 01 — Restricciones: R(3,3) verdadero ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/PROCESO-01.webp"
          alt="Proceso 01"
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
          <p>La idea de POSDATA existía desde hacía tiempo, pero todavía era una intuición. En esta etapa empecé a probar combinaciones, descartar caminos y conectar referencias hasta encontrar una dirección que realmente representara lo que quería construir. El concepto ya estaba ahí, lo que faltaba era darle una forma consistente.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 01</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Exploración visual</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 02 — Reglas Generales ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/PROCESO-02.webp"
          alt="Proceso 02"
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
          <p>El rediseño de la versión inicial del manual de marca fue el punto de inflexión del proyecto. A medida que la identidad evolucionaba, cada decisión comenzó a documentarse y transformarse en una regla del sistema. Partimos de una exploración visual, donde definimos la dirección estética y conceptual, y avanzamos hacia reglas concretas que permitieran estructurar y dar consistencia a la identidad.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 02</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Definición de principios</h3></div>
        </div>
      </div>
    </div>

    {/* ── PASO 03 — Implementación Python ── */}
    <div className="pp-step">
      <div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <img
          src="/images/PROCESO-03.webp"
          alt="Proceso 03"
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
          <p>Los wireframes permitieron trasladar los principios de la marca al entorno digital antes de trabajar la estética final. La estructura, la jerarquía del contenido y la navegación se definieron desde la función, estableciendo una base sólida sobre la que luego se desarrolló la interfaz y el sistema de componentes.</p>
        </div>
        <div className="pp-step-title-row">
          <div className="pp-step-num-col"><span className="pp-step-num-circle">Paso 03</span></div>
          <div className="pp-step-content"><h3 className="pp-step-heading">Wireframing</h3></div>
        </div>
      </div>
    </div>
  </>
)

export default function Proceso() {
  return (
    <ProblemPage
      number="02"
      subject="Lógica Computacional"
      title="PROCESO"
      question="Convertir ideas en un sistema consistente."
      heroBackground="#1a2018"
      accent={ACCENT}
      theoryItems={theoryItems}
      approach={approach}
      resolution={resolution}
      nextPhasePath="/solucion"
      nextPhaseLabel="Fase 3: Solución"
    />
  )
}
