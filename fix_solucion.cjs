const fs = require('fs');
const file = '/Users/jossmarsala/Documents/casestudy/src/pages/Solucion.tsx';
let content = fs.readFileSync(file, 'utf8');

const missingContent = `
const theoryItems = [
  'Sistema de Marca',
  'Design System',
  'Motion Graphics',
  'UX/UI'
]

const approach = (
  <>
    <p>
      POSDATA evolucionó a un sistema de marca donde identidad, comunicación, motion y UX responden a una misma lógica. La identidad visual articula referencias editoriales y tecnología contemporánea mediante una paleta cromática, dirección fotográfica para campañas y motion graphics. Esta lógica se trasladó al ecosistema digital mediante un prototipo Hi-Fi desarrollado sobre un Design System con componentes reutilizables, Auto Layout, variantes, propiedades booleanas y una grilla de 8 puntos.
    </p>
    <p>
      Así se demuestra cómo diseño y desarrollo pueden integrarse desde el origen para construir una experiencia coherente y escalable.
    </p>
  </>
)

`;

const target = '// ─── Resolution ───────────────────────────────────────────────────────────────';
content = content.replace(target, missingContent + target);
fs.writeFileSync(file, content);
console.log('Fixed');
