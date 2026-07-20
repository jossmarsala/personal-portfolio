import './HeroAnimation.css';

const RECTS = Array.from({ length: 28 }, (_, i) => i + 1);

export default function HeroAnimation() {
  return (
    <div className="hero-animation-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="hero-animation-wrapper" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%) scale(1.25)' }}>
        {RECTS.map((i) => (
          <div key={i} className="hero-animation-out">
            <div className={`hero-animation-rect v${i}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
