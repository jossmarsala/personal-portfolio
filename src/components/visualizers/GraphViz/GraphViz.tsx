import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ReactFlow,
  type Node,
  type Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// Graph definition
const GRAPH: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: ['G'],
  E: [],
  F: ['G'],
  G: ['H'],
  H: [],
}

const positions: Record<string, { x: number; y: number }> = {
  A: { x: 200, y: 20 },
  B: { x: 80,  y: 100 },
  C: { x: 320, y: 100 },
  D: { x: 20,  y: 200 },
  E: { x: 140, y: 200 },
  F: { x: 320, y: 200 },
  G: { x: 200, y: 300 },
  H: { x: 200, y: 400 },
}

// Precompute DFS traversal steps
function computeDFS(graph: Record<string, string[]>, start: string) {
  const visited: string[] = []
  const steps: { visited: string[]; current: string; stack: string[] }[] = []
  const stack: string[] = [start]
  const seen = new Set<string>()

  while (stack.length > 0) {
    const node = stack.pop()!
    if (seen.has(node)) continue
    seen.add(node)
    visited.push(node)
    steps.push({ visited: [...visited], current: node, stack: [...stack] })
    const neighbors = graph[node] ?? []
    for (let i = neighbors.length - 1; i >= 0; i--) {
      if (!seen.has(neighbors[i])) {
        stack.push(neighbors[i])
      }
    }
  }
  return steps
}

const DFS_STEPS = computeDFS(GRAPH, 'A')

const ACCENT_COLORS = {
  unvisited: '#ECECEC',
  current: '#E86D42',
  visited: '#8EB9A6',
  stack: '#E9C94C',
}

function buildNodes(step: { visited: string[]; current: string; stack: string[] } | null): Node[] {
  return Object.entries(positions).map(([id, pos]) => {
    let bg = ACCENT_COLORS.unvisited
    let border = 'rgba(17,17,17,0.2)'

    if (step) {
      if (step.current === id) { bg = ACCENT_COLORS.current; border = '#E86D42' }
      else if (step.visited.includes(id)) { bg = ACCENT_COLORS.visited; border = '#8EB9A6' }
      else if (step.stack.includes(id)) { bg = ACCENT_COLORS.stack; border = '#E9C94C' }
    }

    return {
      id,
      position: pos,
      data: { label: id },
      style: {
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: '50%',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '1.1rem',
        color: step?.current === id ? '#fff' : 'var(--color-ink)',
        fontWeight: 700,
        transition: 'all 300ms ease',
        boxShadow: step?.current === id ? '0 0 0 4px rgba(232,109,66,0.25)' : 'none',
      },
    }
  })
}

function buildEdges(step: { visited: string[] } | null): Edge[] {
  const edges: Edge[] = []
  Object.entries(GRAPH).forEach(([from, neighbors]) => {
    neighbors.forEach(to => {
      const isTraversed = step && step.visited.includes(from) && step.visited.includes(to)
      edges.push({
        id: `${from}-${to}`,
        source: from,
        target: to,
        animated: isTraversed ?? false,
        style: {
          stroke: isTraversed ? 'var(--accent-sage)' : 'rgba(17,17,17,0.25)',
          strokeWidth: isTraversed ? 2.5 : 1.5,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isTraversed ? 'var(--accent-sage)' : 'rgba(17,17,17,0.25)',
        },
      })
    })
  })
  return edges
}

export default function GraphViz() {
  const [currentStep, setCurrentStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const step = currentStep >= 0 ? DFS_STEPS[currentStep] : null
  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(null))
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(null))

  useEffect(() => {
    setNodes(buildNodes(step))
    setEdges(buildEdges(step))
  }, [currentStep])

  useEffect(() => {
    if (!playing) return
    if (currentStep >= DFS_STEPS.length - 1) { setPlaying(false); return }
    const t = setTimeout(() => setCurrentStep(s => s + 1), 900)
    return () => clearTimeout(t)
  }, [playing, currentStep])

  return (
    <div className="viz-container">
      <div style={{ height: 480, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
        >
          <Background color="rgba(17,17,17,0.04)" gap={24} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div style={{ padding: '1rem 1.5rem', borderTop: 'var(--border-thin)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { color: ACCENT_COLORS.current, label: 'Actual' },
          { color: ACCENT_COLORS.visited, label: 'Visitado' },
          { color: ACCENT_COLORS.stack, label: 'En pila' },
          { color: ACCENT_COLORS.unvisited, label: 'No visitado' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: l.color, border: '1px solid rgba(17,17,17,0.2)' }} />
            <span className="text-caption">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Step info */}
      {step && (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--color-charcoal)',
            color: 'var(--color-bg)',
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
          }}
        >
          <span>Nodo actual: <strong style={{ color: 'var(--accent-orange)' }}>{step.current}</strong></span>
          <span>Visitados: <strong style={{ color: 'var(--accent-sage)' }}>[{step.visited.join(', ')}]</strong></span>
          <span>Pila: <strong style={{ color: 'var(--accent-yellow)' }}>[{step.stack.join(', ')}]</strong></span>
        </motion.div>
      )}

      {/* Controls */}
      <div className="viz-caption">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            onClick={() => {
              if (currentStep >= DFS_STEPS.length - 1) { setCurrentStep(0); setPlaying(true) }
              else { setCurrentStep(s => Math.max(0, s)); setPlaying(v => !v) }
            }}
          >
            {playing ? '⏸ Pausar' : currentStep >= DFS_STEPS.length - 1 ? '↺ Reiniciar' : currentStep === -1 ? '▶ Iniciar DFS' : '▶ Continuar'}
          </button>
          <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep <= 0}
          >←</button>
          <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
            onClick={() => setCurrentStep(s => Math.min(DFS_STEPS.length - 1, s + 1))}
            disabled={currentStep >= DFS_STEPS.length - 1}
          >→</button>
          <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            onClick={() => { setCurrentStep(-1); setPlaying(false) }}
          >Resetear</button>
        </div>
        <span className="text-caption">
          {currentStep < 0 ? 'DFS — Búsqueda en profundidad' : `Paso ${currentStep + 1} / ${DFS_STEPS.length}`}
        </span>
      </div>
    </div>
  )
}
