// Genera todas las páginas HTML de la raíz con la plantilla común.
// Uso: node scripts/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, SERVICES, BY_SLUG, REVIEWS, PILLARS, CLASSES, SITE_URL } from './content.mjs';
import { pages } from './pages.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dims = JSON.parse(fs.readFileSync(path.join(root, 'assets/img/fotos/dims.json'), 'utf8'));
const v = Date.now().toString(36);

/* ---------- utilidades ---------- */
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const strip = s => String(s).replace(/<[^>]+>/g, '');
export const HERO_SIZES = '(orientation: portrait) 150vh, 100vw';
export const waUrl = text => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;

export const waMsg = s => {
  if (!s) return '¡Hola, Cristina! 🙏 Me gustaría información para reservar una clase en la Escuela de Yoga. ¿Qué horarios tenéis disponibles?';
  if (s.kids) return `¡Hola, Cristina! 🙏 Me gustaría información para apuntar a mi hijo/a a ${s.wa}. ¿Quedan plazas?`;
  if (s.workshops) return `¡Hola, Cristina! 🙏 Me gustaría recibir información sobre ${s.wa} y reservar plaza.`;
  if (s.retreat) return `¡Hola, Cristina! 🙏 Me gustaría recibir información sobre ${s.wa}: fechas, lugar y plazas.`;
  return `¡Hola, Cristina! 🙏 Me gustaría reservar ${s.wa} en la Escuela de Yoga. ¿Qué días y horarios tenéis disponibles?`;
};

/** Imagen responsive con srcset (600 / 1000 / 1600 / 2400 px). */
export const srcsetOf = name => [600, 1000, 1600, 2400].map(n => `assets/img/fotos/${name}-${n}.webp ${n}w`).join(', ');
export const pic = (name, { sizes = '100vw', alt = '', cls = '', eager = false, defer = false, pos = '', attrs = '' } = {}) => {
  const [w, h] = dims[name] || [1600, 1067];
  const src = `assets/img/fotos/${name}-1600.webp`;
  // defer: la imagen no se descarga hasta que el JS la pide (fotos 2–5 del pase de la portada)
  const s = defer ? `data-src="${src}" data-srcset="${srcsetOf(name)}"` : `src="${src}" srcset="${srcsetOf(name)}"`;
  return `<img class="${cls}" ${s} sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"${pos ? ` style="object-position:${pos}"` : ''}${attrs}>`;
};
/** Miniatura cuadrada de 160 px para círculos pequeños (menú, listas). */
export const thumb = name => `<img src="assets/img/fotos/${name}-160.webp" alt="" width="160" height="160" loading="lazy" decoding="async">`;

/** Adorno de la lámina «Motivos dorados» en su propio espacio, con animación propia. */
export const orn = (name, cls = '', w = 160) => `<img class="orn orn-${name} ${cls}" src="assets/img/adornos/${name}.webp" alt="" width="${w}" height="${w}" loading="lazy" decoding="async" aria-hidden="true">`;

/* ---------- iconos (trazo) ---------- */
const I = {
  wa: '<svg class="ico ico-fill" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 6.9L3 29l6.5-1.9c2 1.1 4.2 1.6 6.5 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.4c-2.1 0-4.1-.6-5.8-1.6l-.4-.2-3.9 1.1 1.1-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.8C5 10 9.9 5.3 16 5.3S27 10 27 15.8s-4.9 10.6-11 10.6Zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2l-1 1.3c-.2.2-.4.2-.7.1a9 9 0 0 1-4.5-3.9c-.3-.6.3-.5 1-1.8.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4Z"/></svg>',
  arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>',
  down: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  phone: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9 3l1.6 4.2-2 1.4a11 11 0 0 0 6.8 6.8l1.4-2L21 15l-.5 2.4a2.5 2.5 0 0 1-2.6 2A16 16 0 0 1 4.6 6.1a2.5 2.5 0 0 1 2-2.6Z"/></svg>',
  pin: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  mail: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
  clock: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  ig: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".9" class="dot"/></svg>',
  fb: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2.5V5H14a4 4 0 0 0-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9.4c0-.5.4-.9.9-.9Z"/></svg>',
  star: '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7Z"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  wave: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-1"/><path d="M2 17c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-1" opacity=".5"/></svg>',
  sun: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5m0 14v2.5M2.5 12H5m14 0h2.5M5.3 5.3l1.8 1.8m9.8 9.8 1.8 1.8M5.3 18.7l1.8-1.8m9.8-9.8 1.8-1.8"/></svg>',
  moon: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/><path d="M17 4v3m-1.5-1.5h3" opacity=".6"/></svg>',
  wind: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/></svg>',
  balance: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.5" r="2"/><path d="M12 7v7m0 0-3 7m3-7 3 7M5 10l7-1 7 1"/></svg>',
  feather: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4c-7 0-12 5-12 12v4"/><path d="M8 16c6 0 10-4 12-12M8 12h6m-3 4h4"/></svg>',
  leaf: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19 13 11"/></svg>',
  heart: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/></svg>',
  ear: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6"/><path d="M10 9.5a2 2 0 0 1 4 0c0 1.2-1.5 1.5-1.5 3"/></svg>',
  spark: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"/><path d="M19 16c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z" opacity=".6"/></svg>',
  eye: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
  compass: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/></svg>',
  lotus: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c2.2 2 3 4.3 3 6.5S13.8 16 12 17c-1.8-1-3-3.3-3-5.5S9.8 7 12 5Z"/><path d="M9 9.2C6.5 8.6 4 9 3 9.5c.3 3.8 3.5 7.5 9 7.5 5.5 0 8.7-3.7 9-7.5-1-.5-3.5-.9-6 .3"/><path d="M5 19.5h14" opacity=".6"/></svg>',
  sound: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4m4-7v10m4-13v16m4-13v10m4-7v4"/></svg>',
  users: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.4" opacity=".7"/><path d="M16.5 14c2.4.2 4 1.7 4.5 4.4" opacity=".7"/></svg>',
  book: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Z"/><path d="M12 6.5v13"/></svg>',
  mountain: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m2.5 19 7-11 4 6 2.5-3.5 5.5 8.5Z"/><circle cx="17" cy="5.5" r="1.8"/></svg>',
  smile: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/><path d="M9 9.5h.01M15 9.5h.01" stroke-width="2.4"/></svg>',
  play: '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5Z"/></svg>',
  pause: '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zm6.5 0H17v14h-3.5z"/></svg>',
  bell: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13a8 4 0 0 0 16 0"/><path d="M4 13c0-4 3.6-7 8-7s8 3 8 7"/><path d="M9 20h6" opacity=".6"/></svg>',
  om: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9.5c1.5-2 5-1.5 5 1 0 1.7-1.6 2.3-3 2.3 2.1 0 3.8.9 3.8 3.1 0 2.3-2.1 3.6-4.3 3.6-1.6 0-2.9-.7-3.5-1.8"/><path d="M10.6 13.5c1.3-1.7 3-2.4 4.4-1.9 1.6.6 2 2.6 1.4 4.2-.6 1.7-2.1 2.2-3.2 1.6"/><path d="M13 7c1.3 1.3 3.7 1.3 5 0"/><circle cx="17.5" cy="4" r=".9" class="dot"/></svg>'
};
export const icon = n => I[n] || '';

/* ---------- mandala SVG propio (marca de agua, gira lentamente) ---------- */
export const mandala = (cls = '') => {
  const petals = (n, r1, r2, w) => Array.from({ length: n }, (_, i) => `<path d="M0 -${r1} C ${w} -${(r1 + r2) / 2} ${w} -${r2 - 6} 0 -${r2} C -${w} -${r2 - 6} -${w} -${(r1 + r2) / 2} 0 -${r1}Z" transform="rotate(${(360 / n) * i})"/>`).join('');
  const dots = (n, r) => Array.from({ length: n }, (_, i) => `<circle cx="0" cy="-${r}" r="2.2" transform="rotate(${(360 / n) * i + 180 / n})"/>`).join('');
  return `<svg class="mandala ${cls}" viewBox="-260 -260 520 520" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.1">
<circle r="34"/><circle r="58"/><circle r="128" stroke-dasharray="2 6"/><circle r="196"/><circle r="248" stroke-dasharray="1 9"/>
${petals(8, 34, 92, 22)}${petals(16, 58, 150, 20)}${petals(24, 128, 196, 14)}${petals(32, 196, 240, 9)}</g>
<g fill="currentColor">${dots(16, 112)}${dots(32, 214)}</g></svg>`;
};

/* ---------- piezas comunes ---------- */
const NAV_MAIN = [
  ['inicio', 'index.html', 'Inicio'],
  ['sobre', 'sobre-cristina.html', 'Sobre Cristina'],
  ['horario', 'index.html#horario', 'Horario'],
  ['contacto', 'contacto.html', 'Contacto']
];

const megaItem = s => `<a class="mega-item" href="${s.file}"><span class="mega-thumb">${thumb(s.card)}</span><span><b>${s.name}</b><small>${s.menu}</small></span></a>`;

const header = meta => `<header class="site-header">
  <div class="header-progress" aria-hidden="true"><span></span></div>
  <div class="wrap header-in">
    <a class="brand" href="index.html" aria-label="Escuela de Yoga Cristina Herrera, inicio">
      <span class="brand-seal"><img src="assets/img/marca/sello-180.webp" width="180" height="180" alt=""></span>
      <span class="brand-txt"><b>Cristina Herrera</b><small>Escuela de yoga · Cieza</small></span>
    </a>
    <nav class="nav" id="nav" aria-label="Principal" data-lenis-prevent>
      <a href="index.html"${meta.nav === 'inicio' ? ' aria-current="page"' : ''}>Inicio</a>
      <div class="nav-drop">
        <button class="drop-btn" type="button" aria-expanded="false" aria-controls="mega"${meta.nav === 'servicio' ? ' data-current' : ''}>Prácticas ${icon('down')}</button>
        <div class="mega" id="mega">
          <div class="mega-in">
            <div class="mega-col">
              <p class="mega-h">Clases regulares</p>
              ${SERVICES.filter(s => s.group === 'clases').map(megaItem).join('\n              ')}
            </div>
            <div class="mega-col">
              <p class="mega-h">Experiencias</p>
              ${SERVICES.filter(s => s.group === 'experiencias').map(megaItem).join('\n              ')}
              <div class="mega-aside">
                ${orn('loto', 'orn-breathe', 90)}
                <p>¿No sabes por dónde empezar?</p>
                <a class="link-arrow" href="index.html#encuentra">Encuentra tu práctica ${icon('arrow')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
${NAV_MAIN.slice(1).map(([k, href, label]) => `      <a href="${href}"${meta.nav === k ? ' aria-current="page"' : ''}>${label}</a>`).join('\n')}
      <div class="nav-extra">
        <a class="btn btn-glow" href="${waUrl(waMsg())}" target="_blank" rel="noopener" data-wa-default>${icon('wa')} Reservar por WhatsApp</a>
        <p><a href="tel:${SITE.phoneIntl}">${SITE.phone}</a> · ${SITE.street}, Cieza</p>
        <p class="status" data-status><i></i><span>Consultando horario…</span></p>
        <p class="nav-demo">Web de demostración · horarios y fotos de ejemplo</p>
      </div>
    </nav>
    <p class="status status-head" data-status><i></i><span>…</span></p>
    <a class="btn btn-glow btn-sm header-cta" href="${waUrl(waMsg(meta.service))}" target="_blank" rel="noopener">${icon('wa')}<span>Reservar</span></a>
    <button class="menu-btn" type="button" aria-controls="nav" aria-expanded="false" aria-label="Abrir menú"><span></span><span></span></button>
  </div>
</header>`;

const footer = () => `<footer class="site-footer dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="footer-crown">${orn('guirnalda', 'orn-draw', 300)}</div>
  <div class="wrap footer-top">
    <a class="footer-seal" href="index.html" aria-label="Inicio"><img src="assets/img/marca/sello-360.webp" width="360" height="360" alt="Escuela de Yoga Cristina Herrera"></a>
    <p class="footer-claim">Enseñando el camino del <em>autoconocimiento</em> y bienestar.</p>
    <div class="footer-cta">
      <a class="btn btn-glow" href="${waUrl(waMsg())}" target="_blank" rel="noopener">${icon('wa')} Reserva tu clase</a>
      <a class="btn btn-ghost" href="${SITE.directions}" target="_blank" rel="noopener">${icon('pin')} Cómo llegar</a>
    </div>
  </div>
  <div class="wrap footer-cols">
    <div>
      <h2>Clases regulares</h2>
      <p class="footer-links">${SERVICES.filter(s => s.group === 'clases').map(s => `<a href="${s.file}">${s.name}</a>`).join('')}</p>
    </div>
    <div>
      <h2>Experiencias</h2>
      <p class="footer-links">${SERVICES.filter(s => s.group === 'experiencias').map(s => `<a href="${s.file}">${s.name}</a>`).join('')}<a href="sobre-cristina.html">Sobre Cristina</a><a href="contacto.html">Contacto</a></p>
    </div>
    <div>
      <h2>Visítanos</h2>
      <p>${SITE.street}<br>${SITE.city}</p>
      <p><a href="tel:${SITE.phoneIntl}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p class="status" data-status><i></i><span>…</span></p>
    </div>
    <div>
      <h2>Síguenos</h2>
      <p class="socials">
        <a class="soc" href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('ig')}</a>
        <a class="soc" href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('fb')}</a>
        <a class="soc" href="${waUrl(waMsg())}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('wa')}</a>
      </p>
      <p class="footer-rating"><b>${SITE.rating}</b> <span class="stars">${icon('star').repeat(5)}</span><br>${SITE.reviews} opiniones en Google</p>
    </div>
  </div>
  <div class="wrap footer-base">
    <p>© <span data-year>2026</span> ${SITE.name} · Cieza (Murcia)</p>
    <p class="footer-legal"><a href="aviso-legal.html">Aviso legal</a><a href="privacidad.html">Privacidad</a><a href="cookies.html">Cookies</a></p>
    <p class="footer-demo">Web de demostración: horarios, fotos y algunos textos son de ejemplo.</p>
    <a href="#contenido" class="to-top">Volver arriba ↑</a>
  </div>
</footer>`;

const layout = (meta, body, file) => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${meta.title}</title>
<meta name="description" content="${esc(meta.desc)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${SITE_URL}${file === 'index.html' ? '' : file}">
<meta name="theme-color" content="#120a07">
<link rel="icon" type="image/png" sizes="48x48" href="assets/img/marca/favicon-48.png">
<link rel="apple-touch-icon" href="assets/img/marca/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.desc)}">
<meta property="og:url" content="${SITE_URL}${file === 'index.html' ? '' : file}">
<meta property="og:image" content="${SITE_URL}assets/img/og-escuela.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${meta.lcp ? `<link rel="preload" as="image" href="assets/img/fotos/${meta.lcp}-1600.webp" imagesrcset="${srcsetOf(meta.lcp)}" imagesizes="${HERO_SIZES}" fetchpriority="high">` : ''}
<link rel="preload" href="assets/fonts/fraunces-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/figtree-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css?v=${v}">
<script>(function(d){d.classList.add('js');try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(sessionStorage.getItem('ch-nav')){d.classList.add('is-entering');sessionStorage.removeItem('ch-nav')}else if(!sessionStorage.getItem('ch-intro')&&!r){d.classList.add('show-intro')}}catch(e){}})(document.documentElement)</script>
${meta.ld ? `<script type="application/ld+json">${meta.ld}</script>` : ''}
</head>
<body class="page-${meta.key}">
<a class="skip" href="#contenido">Saltar al contenido</a>
<div class="intro" aria-hidden="true">
  <div class="intro-core">
    <div class="intro-seal"><span class="intro-halo"></span><img src="assets/img/marca/sello-360.webp" alt="" width="360" height="360"></div>
    <p class="intro-breath"><span>Inhala</span><span>Exhala</span></p>
  </div>
  <p class="intro-skip">Toca para entrar</p>
</div>
<div class="veil" aria-hidden="true"><img src="assets/img/marca/sello-180.webp" alt="" width="180" height="180"></div>
<div class="glow-cursor" aria-hidden="true"></div>

${header(meta)}

<main id="contenido">
${body}
</main>

${footer()}

<button class="demo-pill" type="button" aria-expanded="false" aria-controls="demo-note"><span class="demo-dot" aria-hidden="true"></span><b>Demo</b><span class="demo-note" id="demo-note">Web de demostración · horarios, fotos y algunos textos son de ejemplo</span></button>

<a class="wa-float" href="${waUrl(waMsg(meta.service))}" target="_blank" rel="noopener" aria-label="Reservar por WhatsApp${meta.service ? ': ' + esc(meta.service.name) : ''}">
  <span class="wa-float-ring" aria-hidden="true"></span>${icon('wa')}<span class="wa-float-tip">${meta.service ? 'Reservar ' + esc(meta.service.name) : 'Reserva por WhatsApp'}</span>
</a>

<nav class="dock" aria-label="Acciones rápidas">
  <a href="tel:${SITE.phoneIntl}">${icon('phone')}<span>Llamar</span></a>
  <a href="${SITE.directions}" target="_blank" rel="noopener">${icon('pin')}<span>Cómo llegar</span></a>
  <a class="dock-main" href="${waUrl(waMsg(meta.service))}" target="_blank" rel="noopener">${icon('wa')}<span>Reservar</span></a>
</nav>

<script src="assets/js/data.js?v=${v}" defer></script>
<script src="assets/js/lenis.min.js" defer></script>
<script src="assets/js/main.js?v=${v}" defer></script>
</body>
</html>
`;

/* ---------- generación ---------- */
fs.writeFileSync(path.join(root, 'assets/js/data.js'), `// Generado por scripts/build.mjs: no editar a mano
window.CH = ${JSON.stringify({ wa: SITE.wa, hours: SITE.hours.map(d => ({ d: d.d, name: d.name, slots: d.slots })) })};
`);
const helpers = { SITE, SERVICES, BY_SLUG, REVIEWS, PILLARS, CLASSES, HERO_SIZES, pic, thumb, orn, icon, mandala, waUrl, waMsg, esc, strip };
let n = 0;
for (const page of pages(helpers)) {
  fs.writeFileSync(path.join(root, page.file), layout(page.meta, page.body.trim(), page.file));
  n++;
  console.log('✓', page.file);
}
console.log(`${n} páginas generadas`);
