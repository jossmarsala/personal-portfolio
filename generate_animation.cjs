const fs = require('fs');

const rects = [
  { size: [80, 15], kf: [0, 15, -80, -100, -100, 100], invert: false },
  { size: [10, 50], kf: [20, 10, 10, -40, 130, -100], invert: true },
  { size: [40, 10], kf: [25, 105, 25, 10, 10, 250], invert: false },
  { size: [50, 15], kf: [10, 30, -80, -50, -50, 300], invert: true },
  { size: [15, 70], kf: [5, -10, -10, -10, -150], invert: true },
  { size: [5, 5], kf: [15, -20, -135, 10, 10, 100], invert: false },
  { size: [10, 70], kf: [35, 10, 10, -90, -180, -150], invert: true },
  { size: [5, 80], kf: [15, -10, -10, -45, 120], invert: false },
  { size: [5, 40], kf: [15, 30, 30, -50, -120, 50], invert: true },
  { size: [15, 20], kf: [15, -20, -20, 40, -120, 400], invert: false },
  { size: [60, 10], kf: [5, 20, -60, 70, 70], invert: false },
  { size: [15, 15], kf: [25, -25, 65, 90, 90, 250], invert: true },
  { size: [15, 60], kf: [15, 30, 30, 20, -50, 150], invert: false },
  { size: [40, 10], kf: [15, 5, 125, 50, 50, -50], invert: false },
  { size: [65, 10], kf: [0, 35, 155, 30, 30, -300], invert: true },
  { size: [45, 5], kf: [5, 35, -100, -20, -20], invert: false },
  { size: [5, 100], kf: [30, 5, 5, -0, -180, 50], invert: false },
  { size: [30, 5], kf: [35, -5, 75, -35, -35, 75], invert: true },
  { size: [10, 60], kf: [45, 15, 15, 40, -40, -75], invert: true },
  { size: [10, 50], kf: [5, 10, 10, 85, 170, 400], invert: false },
  { size: [15, 40], kf: [25, -30, -30, -5, 150, 150], invert: true },
  { size: [5, 70], kf: [15, -60, -60, -140, -5], invert: false },
  { size: [5, 30], kf: [0, 60, 60, 5, 120, 50], invert: true },
  { size: [45, 15], kf: [35, 10, -90, 20, 20], invert: true },
  { size: [45, 15], kf: [35, -15, 80, -70, -70, -100], invert: false },
  { size: [35, 15], kf: [0, -15, 60, -15, -15, 200], invert: true },
  { size: [15, 45], kf: [0, 20, 20, -15, 45, 250], invert: false },
  { size: [45, 15], kf: [5, 15, -80, 95, 95, -100], invert: true }
];

const colors = [
  'var(--accent-orange)',
  'var(--accent-pink)',
  'var(--accent-blue)',
  'var(--accent-green)',
  'var(--accent-yellow)',
  'var(--color-ink)',
];

let css = `.hero-animation-wrapper {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 323px;
  transform-origin: 50% 50%;
  pointer-events: none;
}
.hero-animation-out {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.hero-animation-rect {
  border-radius: 999px;
  border: 2px solid var(--color-ink);
}
`;

rects.forEach((r, i) => {
  const index = i + 1;
  const size = r.size;
  const kf = r.kf;
  
  const start = kf[0];
  const sX = kf[1];
  const eX = kf[2];
  const sY = kf[3];
  const eY = kf[4];
  const delay = kf[5] || 0;
  
  // Random color based on index
  const color = colors[index % colors.length];
  
  css += `.v${index} {
  width: ${size[0]}px;
  height: ${size[1]}px;
  background-color: ${color};
  transform: translate3d(${sX}px, ${sY}px, 0);
  animation: v${index} 1250ms alternate infinite ease-in-out;
`;
  if (delay) css += `  animation-delay: ${delay}ms;\n`;
  css += `}
@keyframes v${index} {
  ${start}% { transform: translate3d(${sX}px, ${sY}px, 0); }
  100% { transform: translate3d(${eX}px, ${eY}px, 0); }
}
`;
});


let tsx = `import './HeroAnimation.css';

export default function HeroAnimation() {
  return (
    <div className="hero-animation-container" style={{ position: 'relative', width: '100%', height: '350px', overflow: 'hidden' }}>
      <div className="hero-animation-wrapper">
`;
for (let i = 1; i <= 28; i++) {
  tsx += `        <div className="hero-animation-out"><div className="hero-animation-rect v${i}"></div></div>\n`;
}
tsx += `      </div>
    </div>
  );
}
`;

fs.mkdirSync("src/components/HeroAnimation", { recursive: true });
fs.writeFileSync("src/components/HeroAnimation/HeroAnimation.css", css);
fs.mkdirSync('src/components/HeroAnimation', { recursive: true });
fs.writeFileSync('src/components/HeroAnimation/HeroAnimation.tsx', tsx);
console.log('done');
