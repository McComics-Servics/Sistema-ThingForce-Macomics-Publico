// Auditoria F3: handlers que escriben en config sin disparar ningun refresco.
// Recorre los JS modulares, corta por bloques de funcion/listener y evalua
// cada bloque de forma independiente.
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const REFRESH = /drawPreview\s*\(|applyDoorsToSelection\s*\(|sketchup\s*\.\s*\w+\s*\(|requestRealtimeModelUpdate|updateStructure|update_structure|refresh\w*\s*\(|sync\w*\s*\(|render\w*\s*\(|schedule\w*\s*\(|apply\w+\s*\(|mccRefresh|update[A-Z]\w*UI\s*\(/;
const WRITE = /\bconfig\.([A-Za-z_$][\w$]*)\s*(=[^=]|\+\+|--|\[)/g;

// Bloques: funcion nombrada, funcion anonima de listener, o arrow de listener.
function blocks(src) {
  const out = [];
  const starts = [];
  const re = /(function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{)|(addEventListener\s*\(\s*['"]([a-z]+)['"]\s*,\s*(?:function\s*\([^)]*\)\s*\{|\([^)]*\)\s*=>\s*\{))|(on[a-z]+\s*=\s*(?:function\s*\([^)]*\)\s*\{|\([^)]*\)\s*=>\s*\{))/g;
  let m;
  while ((m = re.exec(src))) starts.push({ idx: m.index, open: re.lastIndex - 1, name: m[2] || (m[4] ? 'listener:' + m[4] : 'handler') });
  for (const s of starts) {
    let depth = 0, i = s.open, end = -1;
    for (; i < src.length; i++) {
      const c = src[i];
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end > 0) out.push({ name: s.name, line: src.slice(0, s.idx).split('\n').length, body: src.slice(s.open, end + 1) });
  }
  return out;
}

const findings = [];
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) {
  const src = fs.readFileSync(path.join(dir, file), 'utf8');
  for (const b of blocks(src)) {
    // Ignorar bloques contenedores enormes (agregan ruido: contienen sub-handlers)
    if (b.body.length > 6000) continue;
    const keys = new Set();
    let w;
    const re = new RegExp(WRITE.source, 'g');
    while ((w = re.exec(b.body))) keys.add(w[1]);
    if (!keys.size) continue;
    if (REFRESH.test(b.body)) continue;
    findings.push({ file, line: b.line, name: b.name, keys: [...keys] });
  }
}

findings.sort((a, b) => b.keys.length - a.keys.length);
console.log('HANDLERS QUE ESCRIBEN config SIN NINGUN REFRESCO: ' + findings.length + '\n');
for (const f of findings) console.log(`${f.file}:${f.line}  ${f.name}\n    -> ${f.keys.join(', ')}`);
