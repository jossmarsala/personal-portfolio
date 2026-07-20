import { useState, useEffect } from 'react'

export default function GridOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'g' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setVisible(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={`grid-overlay ${visible ? 'visible' : ''}`}>
      <div className="grid-overlay-inner">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-overlay-col" />
        ))}
      </div>
    </div>
  )
}
