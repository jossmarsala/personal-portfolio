import './HalfCircleAnim.css'
import DotGrid from '../DotGrid/DotGrid'

interface Props {
  overrideAccentColor?: string
  accents?: string[]
}

export default function HalfCircleAnim({ 
  overrideAccentColor = '#6B7FFF',
  accents = ['#F5E642', '#6B7FFF', '#FFB3C6', '#FF2D78', '#A8FF3E', '#FF6B4A']
}: Props) {
  const nbCircles = 13; // 13 gives perfect symmetry with a dot exactly at 0deg
  const delay = 0.1; // 0.1s
  
  return (
    <div className="hc-container">
      <ul className="hc-circle" style={{ '--accent': overrideAccentColor } as React.CSSProperties}>
        {/* The grid is structurally merged inside the circle */}
        <div className="hc-grid-mask">
          <DotGrid />
        </div>

        {Array.from({ length: nbCircles }).map((_, i) => {
          // Half circle pointing right: from -90deg to +90deg
          const rotation = -90 + (180 / (nbCircles - 1)) * i;
          const animDelay = delay * i;
          
          // Subtle, balanced selection of colored dots (3 out of 13)
          const coloredIndices = [2, 6, 10];
          const isColored = coloredIndices.includes(i);
          
          // Use the full accents palette for the colored ones
          const dotColor = isColored 
            ? accents[coloredIndices.indexOf(i) % accents.length] 
            : undefined;
          
          return (
            <li 
              key={i} 
              className={`hc-small-circle${isColored ? ' is-colored' : ''}`}
              style={{
                '--rot': `${rotation}deg`,
                '--delay': `${animDelay}s`,
                '--curr-dot-color': dotColor,
              } as React.CSSProperties}
            />
          );
        })}
      </ul>
    </div>
  )
}
