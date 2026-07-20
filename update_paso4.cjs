const fs = require('fs');
const file = '/Users/jossmarsala/Documents/casestudy/src/pages/Solucion.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove ACCENT_HEX
content = content.replace("const ACCENT_HEX = '#F5E642'\n\n", "");

// 2. Remove KEYFRAMES to the end of VizD
const idxStart = content.indexOf('// ─── Shared keyframes ─────────────────────────────────────────────────────────');
const idxEnd = content.indexOf('// ─── Step E — Bipartite graph rows vs columns ─────────────────────────────────');
if (idxStart !== -1 && idxEnd !== -1) {
  content = content.substring(0, idxStart) + content.substring(idxEnd + '// ─── Step E — Bipartite graph rows vs columns ─────────────────────────────────\n\n'.length);
}

// 3. Replace Paso 04 div
content = content.replace(
  /<div className="pp-step-anim-rect" style=\{\{ background: '#0d0d0a', position: 'relative', overflow: 'hidden' \}\}>\n\s*<p className="pp-step-category">Aplicaciones del Sistema Visual<\/p>\n\s*<VizD \/>\n\s*<\/div>/g,
  `<div className="pp-step-anim-rect" style={{ background: '#0a0a0a', position: 'relative' }}>
        <p className="pp-step-category">Aplicaciones del Sistema Visual</p>
        <img
          src="/images/SOLUCION-04.webp"
          alt="Solución 04"
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

fs.writeFileSync(file, content);
console.log('Done');
