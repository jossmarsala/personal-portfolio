const fs = require('fs');
const file = '/Users/jossmarsala/Documents/casestudy/src/pages/Solucion.tsx';
let content = fs.readFileSync(file, 'utf8');

// Paso 1
content = content.replace(
  /<div className="pp-step-anim-rect" style=\{\{ background: '#0d0d08', position: 'relative', overflow: 'hidden' \}\}>\n\s*<p className="pp-step-category">Logotipo y variantes<\/p>\n\s*<VizA \/>\n\s*<\/div>/g,
  `<div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Logotipo y variantes</p>
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
      </div>`
);

// Paso 2
content = content.replace(
  /<div className="pp-step-anim-rect" style=\{\{ background: '#0d0c08', position: 'relative', overflow: 'hidden' \}\}>\n\s*<p className="pp-step-category">Paleta cromática<\/p>\n\s*<VizB \/>\n\s*<\/div>/g,
  `<div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Paleta cromática</p>
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
      </div>`
);

// Paso 3
content = content.replace(
  /<div className="pp-step-anim-rect" style=\{\{ background: '#090d09', position: 'relative', overflow: 'hidden' \}\}>\n\s*<p className="pp-step-category">Tipografía y jerarquías<\/p>\n\s*<VizC \/>\n\s*<\/div>/g,
  `<div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Tipografía y jerarquías</p>
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
      </div>`
);

// Paso 5
content = content.replace(
  /<div className="pp-step-anim-rect" style=\{\{ background: '#0a0a0d', position: 'relative', overflow: 'hidden' \}\}>\n\s*<p className="pp-step-category">Animación y narrativa audiovisual<\/p>\n\s*<VizE \/>\n\s*<\/div>/g,
  `<div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Animación y narrativa audiovisual</p>
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
            objectFit: 'cover'
          }}
        />
      </div>`
);

// Paso 6
content = content.replace(
  /<div className="pp-step-anim-rect" style=\{\{ background: '#0d0a0d', position: 'relative', overflow: 'hidden' \}\}>\n\s*<p className="pp-step-category">Diseño de Interfaces<\/p>\n\s*<VizF \/>\n\s*<\/div>/g,
  `<div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Diseño de Interfaces</p>
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
      </div>`
);

// Remove the unused function definitions VizA, VizB, VizC, VizE, VizF
// We will rely on string indices to slice them out if regex is too complex
// VizA: from 'function VizA()' to 'function VizB()'
const idxA = content.indexOf('function VizA() {');
const idxB = content.indexOf('function VizB() {');
if (idxA !== -1 && idxB !== -1) {
  content = content.substring(0, idxA) + content.substring(idxB);
}

// VizB: from 'function VizB()' to 'function VizC()'
const idxB2 = content.indexOf('function VizB() {');
const idxC = content.indexOf('function VizC() {');
if (idxB2 !== -1 && idxC !== -1) {
  content = content.substring(0, idxB2) + content.substring(idxC);
}

// VizC: from 'function VizC()' to 'function VizD()'
const idxC2 = content.indexOf('function VizC() {');
const idxD = content.indexOf('function VizD() {');
if (idxC2 !== -1 && idxD !== -1) {
  content = content.substring(0, idxC2) + content.substring(idxD);
}

// VizE: from 'function VizE()' to 'function VizF()'
const idxE = content.indexOf('function VizE() {');
const idxF = content.indexOf('function VizF() {');
if (idxE !== -1 && idxF !== -1) {
  content = content.substring(0, idxE) + content.substring(idxF);
}

// VizF: from 'function VizF()' to '// ─── Resolution ───────────────────────────────────────────────────────────────'
const idxF2 = content.indexOf('function VizF() {');
const idxRes = content.indexOf('// ─── Resolution ───────────────────────────────────────────────────────────────');
if (idxF2 !== -1 && idxRes !== -1) {
  content = content.substring(0, idxF2) + content.substring(idxRes);
}

fs.writeFileSync(file, content);
console.log('Done!');
