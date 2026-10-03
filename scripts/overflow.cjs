// Detecta elementos que se salen por la derecha (aunque body tenga overflow-x: hidden).
// Uso: node scripts/overflow.cjs  (servidor en 5190, Playwright global)
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(path.join(process.env.APPDATA, 'npm/node_modules/playwright'));
const pages = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));
(async () => {
  const b = await chromium.launch();
  for (const [w, h, mob] of [[390, 844, true], [320, 640, true], [768, 1024, true], [1440, 900, false]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
    await p.addInitScript(() => { try { sessionStorage.setItem('ch-intro', '1'); } catch (e) {} });
    for (const f of pages) {
      await p.goto('http://localhost:5190/' + f, { waitUntil: 'load' });
      await p.evaluate(() => document.querySelectorAll('.reveal,.split,.orn,.meter').forEach(e => e.classList.add('is-in')));
      await p.waitForTimeout(250);
      const bad = await p.evaluate(() => {
        const W = innerWidth, out = [];
        const skip = el => el.closest('.related-track, .marquee, .benefit-grid, .mandala-bg, .embers, .nav, .mega, .demo-pill, .glow-cursor, .veil, .intro, .hero-slides, .phero-media, .map-art, .legal-table, .tt-tabs, .scan-fig');
        document.querySelectorAll('main *, footer *').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width && r.right > W + 1 && !skip(el)) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} → ${Math.round(r.right - W)}px`);
        });
        return [...new Set(out)].slice(0, 6);
      });
      if (bad.length) console.log(w, f, bad);
    }
    await p.close();
  }
  console.log('revisión de desbordes terminada');
  await b.close();
})();
