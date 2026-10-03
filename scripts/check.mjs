// Comprueba que todos los enlaces internos, imágenes y recursos de las páginas existen.
// Uso: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let refs = 0, bad = 0;
const ids = Object.fromEntries(pages.map(p => [p, new Set([...fs.readFileSync(path.join(root, p), 'utf8').matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))]));
for (const p of pages) {
  const html = fs.readFileSync(path.join(root, p), 'utf8');
  const urls = [...html.matchAll(/(?:href|src)="([^"]+)"/g), ...html.matchAll(/srcset="([^"]+)"/g)].flatMap(m => m[0].startsWith('srcset') ? m[1].split(',').map(s => s.trim().split(' ')[0]) : [m[1]]);
  for (const u of urls) {
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    refs++;
    const [file, hash] = u.split('?')[0].split('#');
    const target = file || p;
    if (file && !fs.existsSync(path.join(root, decodeURIComponent(file)))) { bad++; console.log('✗', p, '→', u); continue; }
    if (hash && target.endsWith('.html') && !ids[target]?.has(hash)) { bad++; console.log('✗ ancla', p, '→', u); }
  }
  const t = (html.match(/<title>([^<]+)/) || [])[1];
  const h1 = (html.match(/<h1/g) || []).length;
  if (h1 !== 1) console.log('⚠', p, 'tiene', h1, 'h1');
  console.log('·', p.padEnd(30), t);
}
console.log(`${refs} referencias internas, ${bad} rotas`);
