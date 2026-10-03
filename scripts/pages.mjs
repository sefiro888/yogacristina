// Plantillas de cada página. Recibe las utilidades desde build.mjs.
export function pages(h) {
  const { SITE, SERVICES, BY_SLUG, REVIEWS, PILLARS, CLASSES, pic, orn, icon, mandala, waUrl, waMsg, esc, strip } = h;
  const out = [];
  const add = (file, meta, body) => out.push({ file, meta, body });

  /* ---------- bloques reutilizables ---------- */
  const meter = (e, label = '') => `<div class="meter" style="--e:${e}" role="img" aria-label="Intensidad: ${esc(label)} (${e} de 5, de la quietud al movimiento)"><span>Quietud</span><i><b></b></i><span>Movimiento</span></div>`;

  const sectionHead = ({ kicker, title, lead = '', ornName = '', center = false, cls = '' }) => `<header class="sec-head${center ? ' is-center' : ''} ${cls}">
      ${ornName ? `<div class="sec-orn">${orn(ornName, 'orn-breathe', 120)}</div>` : ''}
      <p class="kicker reveal">${kicker}</p>
      <h2 class="split">${title}</h2>
      ${lead ? `<p class="sec-lead reveal">${lead}</p>` : ''}
    </header>`;

  const reviewsBlock = (title = 'Lo que dicen <em>nuestros alumnos</em>') => `<section class="reviews dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  ${mandala('mandala-bg mandala-left')}
  <div class="wrap reviews-in">
    <div class="reviews-score reveal">
      <p class="kicker">Opiniones en Google</p>
      <p class="score"><span data-count="5" data-decimals="1">${SITE.rating}</span><small>/5</small></p>
      <p class="stars">${icon('star').repeat(5)}</p>
      <p class="score-note">${SITE.reviews} opiniones · todas de 5 estrellas</p>
      <a class="link-arrow" href="${SITE.maps}" target="_blank" rel="noopener">Ver en Google ${icon('arrow')}</a>
    </div>
    <div class="reviews-slider" data-slider>
      <h2 class="split">${title}</h2>
      <div class="slides">
        ${REVIEWS.map((r, i) => `<figure class="review${i === 0 ? ' is-active' : ''}">
          <blockquote>${esc(r.q)}</blockquote>
          <figcaption><b>${r.a}</b> · ${r.t}</figcaption>
        </figure>`).join('\n        ')}
      </div>
      <div class="dots" role="tablist" aria-label="Opiniones">${REVIEWS.map((_, i) => `<button type="button" role="tab" aria-label="Opinión ${i + 1}"${i === 0 ? ' aria-selected="true"' : ''}></button>`).join('')}</div>
    </div>
  </div>
</section>`;

  const hoursTable = () => `<ul class="hours-list">
        ${SITE.hours.map(d => `<li data-day="${d.d}"><span>${d.name}</span><span>${d.slots.length ? d.slots.map(([a, b]) => `${a.replace(/^0/, '')}–${b.replace(/^0/, '')}`).join(' · ') : 'Cerrado'}</span></li>`).join('\n        ')}
      </ul>`;

  const toMin = t => { const [a, b] = t.split(':').map(Number); return a * 60 + b; };

  /* ---------- cuadrante de clases (EJEMPLO salvo lo marcado como real) ---------- */
  const DAYS = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes' };
  const fmtT = t => t.replace(/^0/, '');
  const endTime = (t, dur) => { const m = toMin(t) + dur; return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; };
  const classMsg = c => c.slug === 'yoga-ninos-adolescentes'
    ? `¡Hola, Cristina! 🙏 Me gustaría apuntar a mi hijo/a a la clase de yoga y mindfulness para niños del ${DAYS[c.d].toLowerCase()} a las ${fmtT(c.t)}. ¿Queda plaza?`
    : `¡Hola, Cristina! 🙏 Me gustaría reservar la clase de ${BY_SLUG[c.slug].name} del ${DAYS[c.d].toLowerCase()} a las ${fmtT(c.t)}. ¿Queda plaza?`;
  const classCard = (c, withDay = false) => {
    const s = BY_SLUG[c.slug];
    return `<article class="tt-class${c.real ? ' is-real' : ''}" data-day="${c.d}" data-start="${c.t}">
            <div class="tt-top"><p class="tt-time">${withDay ? `<small>${DAYS[c.d]}</small>` : ''}${fmtT(c.t)}<span>–${endTime(c.t, c.dur)}</span></p><span class="tt-badge">${c.real ? 'Horario real' : 'Ejemplo'}</span></div>
            <a class="tt-name" href="${s.file}">${s.name}</a>
            <p class="tt-meta">${c.dur} min · ${s.energyLabel}</p>
            <a class="tt-book" href="${waUrl(classMsg(c))}" target="_blank" rel="noopener">${icon('wa')} Reservar esta clase</a>
          </article>`;
  };
  const timetable = () => `<div class="tt reveal" data-tt>
      <div class="tt-tabs" role="tablist" aria-label="Día de la semana">${[1, 2, 3, 4, 5].map(d => `<button type="button" role="tab" data-tt-day="${d}" aria-selected="${d === 1}">${DAYS[d].slice(0, 3)}<small>${DAYS[d].slice(3)}</small></button>`).join('')}</div>
      <div class="tt-grid">
        ${[1, 2, 3, 4, 5].map(d => `<section class="tt-day${d === 1 ? ' is-shown' : ''}" data-day="${d}" aria-label="${DAYS[d]}">
          <h3 class="tt-day-h">${DAYS[d]}</h3>
          ${CLASSES.filter(c => c.d === d).map(c => classCard(c)).join('\n          ')}
        </section>`).join('\n        ')}
      </div>
    </div>`;
  const demoBanner = text => `<div class="demo-banner reveal"><span class="demo-banner-ico" aria-hidden="true">i</span><p>${text}</p></div>`;

  /* ---------- mapa que solo se carga al pulsarlo ---------- */
  const mapArt = (() => {
    const roads = [[-20, 60, 430, 250, 14], [40, 360, 380, -20, 18], [-10, 210, 420, 120, 10], [150, -10, 230, 360, 9], [290, -10, 330, 360, 12], [-10, 300, 200, 360, 7], [250, -10, 420, 140, 7], [60, -10, 10, 200, 6], [120, 360, 420, 260, 6]];
    return `<svg class="map-art" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${roads.map(([a, b, c, d, w]) => `<path d="M${a} ${b} L${c} ${d}" stroke-width="${w}"/>`).join('')}<circle cx="200" cy="170" r="70" class="map-glow"/></svg>`;
  })();
  const mapCard = () => `<div class="map-card reveal" data-reveal="zoom" data-map="${SITE.mapEmbed}">
      <div class="map-ph">
        ${mapArt}
        <span class="map-pin"><img src="assets/img/marca/sello-180.webp" alt="" width="180" height="180"></span>
        <div class="map-ph-txt">
          <p class="map-addr"><b>${SITE.street}</b><br>${SITE.city}</p>
          <button type="button" class="btn btn-glow" data-map-load>${icon('pin')} Ver mapa interactivo</button>
          <p class="map-note">El mapa es de Google Maps y solo se carga si lo pulsas: entonces Google puede usar cookies. <a href="cookies.html">Más información</a></p>
        </div>
      </div>
    </div>`;

  /* ---------- escaneo corporal guiado (Yoga Nidra) ---------- */
  const SCAN = [
    ['pies', 'Pies', 'Lleva la atención a los pies. Siente el contacto de los talones con el suelo y deja que se vuelvan pesados.'],
    ['piernas', 'Piernas', 'Sube por los tobillos, las pantorrillas y las rodillas hasta los muslos. No hay nada que hacer: solo notar.'],
    ['abdomen', 'Caderas y abdomen', 'Observa cómo el abdomen sube y baja con la respiración. Deja que la pelvis se apoye por completo.'],
    ['pecho', 'Pecho', 'Siente el pecho abrirse al inhalar y soltarse al exhalar. El corazón late a su propio ritmo.'],
    ['brazos', 'Brazos y manos', 'Recorre los brazos hasta las manos. Siente las palmas, cada dedo y el aire que las rodea.'],
    ['cuello', 'Hombros y cuello', 'Deja caer los hombros lejos de las orejas. Suelta el cuello, la nuca y la mandíbula.'],
    ['rostro', 'Rostro', 'Relaja la frente, los ojos, las mejillas y los labios. El rostro se vuelve blando y sereno.'],
    ['todo', 'Todo el cuerpo', 'Siente el cuerpo entero a la vez, tranquilo y presente. Quédate aquí unos instantes.']
  ];
  const bodySvg = `<svg class="scan-body" viewBox="0 0 620 230" role="img" aria-label="Silueta de una persona tumbada en postura de relajación">
      <ellipse class="scan-mat" cx="310" cy="115" rx="300" ry="100"/>
      <g data-zone="brazos"><rect x="152" y="46" width="150" height="20" rx="10"/><rect x="152" y="164" width="150" height="20" rx="10"/><circle cx="314" cy="56" r="12"/><circle cx="314" cy="174" r="12"/></g>
      <g data-zone="piernas"><rect x="322" y="86" width="208" height="26" rx="13"/><rect x="322" y="118" width="208" height="26" rx="13"/></g>
      <g data-zone="pies"><ellipse cx="546" cy="99" rx="15" ry="15"/><ellipse cx="546" cy="131" rx="15" ry="15"/></g>
      <g data-zone="abdomen"><rect x="240" y="82" width="88" height="66" rx="28"/></g>
      <g data-zone="pecho"><rect x="150" y="78" width="96" height="74" rx="30"/></g>
      <g data-zone="cuello"><rect x="104" y="104" width="30" height="22" rx="8"/><path d="M130 82 Q140 74 156 78 L156 152 Q140 156 130 148 Z"/></g>
      <g data-zone="rostro"><circle cx="78" cy="115" r="31"/></g>
    </svg>`;
  const scanSection = () => `<section class="scan dark" id="escaneo" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap scan-grid">
    <div class="scan-text">
      <div class="scan-orn">${orn('luna', 'orn-float', 110)}</div>
      <p class="kicker reveal">Pruébalo ahora</p>
      <h2 class="split">Un pequeño <em>escaneo corporal</em></h2>
      <p class="reveal">El Yoga Nidra recorre el cuerpo con la atención, parte por parte. Túmbate o siéntate cómodo, pulsa empezar y sigue la luz: son unos dos minutos.</p>
      <div class="scan-actions reveal">
        <button type="button" class="btn btn-glow" data-scan-toggle>${icon('play')}<span>Empezar</span></button>
        <button type="button" class="btn btn-ghost" data-scan-bowl aria-pressed="false">${icon('bell')}<span>Cuenco tibetano</span></button>
      </div>
      <p class="small scan-small reveal">Una muestra breve para la web. En la escuela, la práctica completa la guía Cristina.</p>
    </div>
    <div class="scan-stage reveal" data-reveal="zoom" data-scan="${esc(JSON.stringify(SCAN))}">
      <div class="scan-fig">${bodySvg}</div>
      <div class="scan-panel" aria-live="polite">
        <p class="scan-step"><span data-scan-n>0/${SCAN.length}</span> · <b data-scan-zone>Preparación</b></p>
        <p class="scan-now" data-scan-text>Busca una postura cómoda, cierra los ojos si quieres y respira con calma.</p>
        <div class="scan-bar" aria-hidden="true"><span></span></div>
      </div>
    </div>
  </div>
</section>`;

  /* ---------- reserva por WhatsApp (componedor) ---------- */
  const chips = (name, label, opts, msg) => `<fieldset class="field${opts.some(o => o.length > 12) || opts.length > 3 ? ' field-wide' : ''}">
          <legend>${label}</legend>
          <div class="chips-select">${opts.map((o, i) => `<label><input type="radio" name="${name}" value="${esc(o)}"${i === 0 ? ' checked' : ''} data-msg="${esc(msg)}"><span>${o}</span></label>`).join('')}</div>
        </fieldset>`;
  const text = (name, label, msg, ph = '', type = 'text') => `<label class="field"><span>${label}</span><input type="${type}" name="${name}" placeholder="${esc(ph)}" autocomplete="${name === 'nombre' ? 'given-name' : 'off'}" data-msg="${esc(msg)}"${type === 'number' ? ' min="3" max="18" inputmode="numeric"' : ''}></label>`;
  const area = () => `<label class="field field-wide"><span>¿Algo que debamos saber? <small>(opcional)</small></span><textarea name="nota" rows="2" placeholder="Lesiones, dudas, preferencias…" data-msg="Comentario"></textarea></label>`;

  const composerFields = s => {
    const nombre = text('nombre', 'Tu nombre', '', 'Ej.: Lucía');
    if (!s) return [
      `<label class="field field-wide"><span>¿Qué práctica te interesa?</span><select name="practica" data-msg="Práctica">
            <option value="">Aún no lo sé, quiero que me aconsejes</option>
            ${SERVICES.map(x => `<option value="${esc(x.name)}" data-intro="${esc(composerIntro(x))}">${x.name}</option>`).join('')}
          </select></label>`,
      nombre,
      chips('franja', 'Prefiero', ['Mañanas', 'Tardes', 'Me adapto'], 'Prefiero'),
      chips('exp', 'Experiencia', ['Es mi primera vez', 'Ya he practicado yoga'], 'Experiencia'),
      area()];
    if (s.kids) return [text('nombre', 'Tu nombre', '', 'Madre, padre o tutor'), text('edad', 'Edad del niño/a', 'Edad', 'Ej.: 8', 'number'), chips('dia', 'Día', ['Lunes y miércoles', 'Solo lunes', 'Solo miércoles'], 'Días'), area()];
    if (s.workshops) return [nombre, chips('interes', 'Me interesa', ['Cualquier taller', 'Sonido y cuencos', 'Yoga Nidra', 'Yoga & Brunch'], 'Me interesa'), chips('personas', 'Plazas', ['1', '2', '3 o más'], 'Plazas'), area()];
    if (s.retreat) return [nombre, chips('personas', 'Plazas', ['1', '2', '3 o más'], 'Plazas'), chips('exp', 'Experiencia', ['Ya practico yoga', 'Soy principiante'], 'Experiencia'), area()];
    if (s.private) return [nombre, chips('objetivo', 'Busco', ['Iniciarme', 'Retomar el yoga', 'Algo concreto'], 'Busco'), chips('franja', 'Prefiero', ['Mañanas', 'Tardes', 'Me adapto'], 'Prefiero'), area()];
    const slots = CLASSES.filter(c => c.slug === s.slug && !c.real);
    const when = slots.length
      ? chips('clase', 'Clase <small>(horario de ejemplo)</small>', [...slots.map(c => `${DAYS[c.d]} ${fmtT(c.t)}`), 'Otro horario'], 'Clase')
      : chips('franja', 'Prefiero', ['Mañanas', 'Tardes', 'Me adapto'], 'Prefiero');
    return [nombre, when, chips('exp', 'Experiencia', ['Es mi primera vez', 'Ya he practicado yoga'], 'Experiencia'), area()];
  };
  const composerIntro = s => !s ? 'Me gustaría reservar una clase en la Escuela de Yoga.'
    : s.kids ? `Me gustaría apuntar a mi hijo/a a ${s.wa}.`
      : s.workshops ? `Me gustaría información sobre ${s.wa} y reservar plaza.`
        : s.retreat ? `Me gustaría información sobre ${s.wa}: fechas, lugar y plazas.`
          : `Me gustaría reservar ${s.wa}.`;
  const composerClose = s => !s ? '¿Qué días y horarios tenéis disponibles? ¡Gracias!' : s.kids ? '¿Quedan plazas? ¡Gracias!' : (s.workshops || s.retreat) ? '¡Gracias!' : '¿Qué días tenéis plaza? ¡Gracias!';

  const composer = s => `<form class="composer reveal" data-composer data-intro="${esc(composerIntro(s))}" data-close="${esc(composerClose(s))}" data-wa="${SITE.wa}" novalidate>
        <div class="composer-fields">
          ${composerFields(s).join('\n          ')}
        </div>
        <div class="composer-preview" aria-live="polite">
          <p class="preview-h">${icon('wa')} Vista previa del mensaje</p>
          <div class="bubble"><p data-preview>${esc('¡Hola, Cristina! 🙏 ' + composerIntro(s))}</p><span class="bubble-time">ahora ✓✓</span></div>
        </div>
        <div class="composer-actions">
          <button class="btn btn-glow btn-lg" type="submit">${icon('wa')} Enviar por WhatsApp</button>
          <p class="composer-note">Se abrirá WhatsApp con el mensaje escrito. Tú decides cuándo enviarlo.</p>
        </div>
      </form>`;

  /* ---------- PÁGINAS DE SERVICIO ---------- */
  for (const s of SERVICES) {
    const others = SERVICES.filter(x => x.slug !== s.slug);
    const svcClasses = CLASSES.filter(c => c.slug === s.slug);
    const body = `
<section class="phero dark" data-glow>
  <div class="phero-media">${pic(s.hero, { alt: strip(s.title) + ' en la Escuela de Yoga Cristina Herrera', eager: true, pos: s.heroPos, cls: 'kenburns' })}</div>
  <div class="phero-scrim" aria-hidden="true"></div>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap phero-in">
    <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span>/</span><a href="index.html#practicas">Prácticas</a><span>/</span><span aria-current="page">${s.name}</span></nav>
    <p class="kicker kicker-light">${s.kicker}</p>
    <h1 class="phero-title split">${s.title}</h1>
    <p class="phero-lead">${s.lead}</p>
    <div class="phero-cta">
      <a class="btn btn-glow btn-lg" href="${waUrl(waMsg(s))}" target="_blank" rel="noopener">${icon('wa')} Reservar por WhatsApp</a>
      <a class="btn btn-ghost btn-lg" href="#reserva">Personalizar reserva ${icon('arrow')}</a>
    </div>
    <ul class="phero-chips">${s.chips.map(c => `<li>${c}</li>`).join('')}</ul>
  </div>
  <div class="phero-energy">
    <p>Intensidad · <b>${s.energyLabel}</b></p>
    ${meter(s.energy, s.energyLabel)}
  </div>
  <a class="scroll-cue" href="#practica" aria-label="Seguir leyendo"><span></span></a>
</section>

<section class="intro-sec light" id="practica">
  <div class="wrap intro-grid">
    <div class="intro-text">
      <div class="intro-orn">${orn(s.orn, 'orn-' + (s.orn === 'mandala' || s.orn === 'sol' ? 'spin' : 'float'), 150)}</div>
      <p class="kicker reveal">La práctica</p>
      <h2 class="split">${s.intro.title}</h2>
      ${s.intro.paras.map(p => `<p class="reveal">${p}</p>`).join('\n      ')}
      <a class="link-arrow reveal" href="#reserva">Quiero probarlo ${icon('arrow')}</a>
    </div>
    <figure class="frame frame-arch reveal" data-reveal="zoom">
      <div class="frame-media" data-parallax="0.08">${pic(s.intro.img, { sizes: '(max-width: 860px) 92vw, 44vw', alt: s.intro.imgAlt })}</div>
    </figure>
  </div>
</section>

<section class="benefits dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  ${mandala('mandala-bg mandala-right')}
  <div class="wrap">
    ${sectionHead({ kicker: 'Beneficios', title: 'Lo que vas a <em>sentir</em>', center: true })}
    <div class="benefit-grid">
      ${s.benefits.map((b, i) => `<article class="benefit reveal" style="--d:${i}">
        <span class="benefit-ico">${icon(b.i)}</span>
        <h3>${b.t}</h3>
        <p>${b.d}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="flow light">
  <div class="wrap">
    <div class="divider">${orn('guirnalda', 'orn-draw', 300)}</div>
    ${sectionHead({ kicker: s.workshops ? 'Cómo funciona' : s.retreat ? 'Un día de retiro' : 'Paso a paso', title: s.workshops ? 'Así se vive un <em>taller</em>' : s.retreat ? 'El ritmo de un <em>retiro</em>' : 'Así fluye una <em>sesión</em>', center: true })}
    <ol class="steps" data-steps>
      <li class="steps-line" aria-hidden="true"><span></span></li>
      ${s.flow.map((f, i) => `<li class="step reveal" style="--d:${i}">
        <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
        <h3>${f.t}</h3>
        <p>${f.d}</p>
      </li>`).join('\n      ')}
    </ol>
  </div>
</section>

${s.slug === 'yoga-nidra' ? scanSection() : ''}

<section class="who sand">
  <div class="wrap who-grid">
    <div class="who-text">
      <p class="kicker reveal">Es para ti</p>
      <h2 class="split">¿Para <em>quién</em> es?</h2>
      <ul class="ticks">
        ${s.forWhom.map((f, i) => `<li class="reveal" style="--d:${i}">${icon('check')}<span>${f}</span></li>`).join('\n        ')}
      </ul>
      <div class="who-orn">${orn('rama', 'orn-sway', 130)}</div>
    </div>
    <div class="mosaic">
      ${s.gallery.map((g, i) => `<figure class="mosaic-${i} reveal" data-reveal="zoom" style="--d:${i}"><div class="frame-media" data-parallax="${[0.06, -0.05, 0.04][i]}">${pic(g, { sizes: '(max-width: 860px) 46vw, 26vw', alt: '' })}</div></figure>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="pull dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap pull-in">
    <div class="pull-orn">${orn('om', 'orn-glow', 120)}</div>
    <blockquote class="split">${s.quote.q}</blockquote>
    <p class="pull-cite reveal">— ${s.quote.c}</p>
  </div>
</section>

<section class="reserve light" id="reserva">
  <div class="wrap reserve-grid">
    <div class="reserve-info">
      <p class="kicker reveal">Reserva directa</p>
      <h2 class="split">${s.resv}, en un mensaje</h2>
      <p class="reveal">Elige tus preferencias y te abrimos WhatsApp con el mensaje ya escrito para Cristina. Sin formularios eternos ni esperas.</p>
      ${svcClasses.length ? `<div class="reserve-hours reveal">
        <p class="reserve-hours-h">${icon('clock')} ${s.kids ? 'Clases de yoga para niños' : 'Clases de ' + s.name}${svcClasses.every(c => c.real) ? '' : ' <span class="tt-badge">Ejemplo</span>'}</p>
        <div class="svc-classes">
          ${svcClasses.map(c => classCard(c, true)).join('\n          ')}
        </div>
        <p class="status" data-status><i></i><span>…</span></p>
        <p class="small">${svcClasses.every(c => c.real) ? 'Yoga y mindfulness para niños y adolescentes.' : 'Horario de ejemplo para la demostración.'} <a class="link-arrow" href="index.html#horario">Ver todas las clases</a></p>
      </div>` : `<div class="reserve-hours reveal">
        <p class="reserve-hours-h">${icon('clock')} Horario de la escuela</p>
        ${hoursTable()}
        <p class="status" data-status><i></i><span>…</span></p>
        <p class="small">Pregúntanos por las próximas fechas.</p>
      </div>`}
    </div>
    ${composer(s)}
  </div>
</section>

<section class="related dark" data-glow>
  <div class="wrap">
    <div class="related-head">
      <h2 class="split">Otras formas de <em>practicar</em></h2>
      <div class="related-nav"><button type="button" class="circle-btn" data-rel="-1" aria-label="Anterior">${icon('arrow')}</button><button type="button" class="circle-btn" data-rel="1" aria-label="Siguiente">${icon('arrow')}</button></div>
    </div>
  </div>
  <div class="related-track" data-related>
    ${others.map(o => `<a class="rcard" href="${o.file}">
      <span class="rcard-media">${pic(o.card, { sizes: '320px', alt: '' })}</span>
      <span class="rcard-body"><small>${o.kicker}</small><b>${o.name}</b>${meter(o.energy, o.energyLabel)}</span>
    </a>`).join('\n    ')}
  </div>
</section>`;
    add(s.file, {
      key: 'servicio servicio-' + s.slug, nav: 'servicio', service: s,
      title: `${({ 'yoga-ninos-adolescentes': 'Yoga para niños y adolescentes en Cieza', talleres: 'Talleres de yoga en Cieza', retiros: 'Retiros de yoga', 'sesiones-privadas': 'Sesiones privadas de yoga en Cieza' })[s.slug] || s.name + ' en Cieza'} · Escuela de Yoga Cristina Herrera`, desc: s.desc
    }, body);
  }

  /* ---------- INICIO ---------- */
  const slides = [
    { img: 'meditacion-ambar', label: 'Meditación', pos: '70% 50%' },
    { img: 'hatha-vinyasa', label: 'Hatha Vinyasa', pos: '66% 40%' },
    { img: 'mantras-ambar', label: 'Mantras', pos: '50% 45%' },
    { img: 'nidra-atardecer', label: 'Yoga Nidra', pos: '62% 60%' },
    { img: 'retiro-mediterraneo', label: 'Retiros', pos: '55% 55%' }
  ];
  const finder = [
    ['Moverme y recargar energía', 'hatha-vinyasa', 'sun'],
    ['Descansar de verdad', 'yoga-restaurativo', 'moon'],
    ['Desconectar la mente', 'yoga-nidra', 'feather'],
    ['Calmar los pensamientos', 'meditacion', 'eye'],
    ['Sentir la voz y el sonido', 'mantras', 'sound'],
    ['Algo para mis hijos', 'yoga-ninos-adolescentes', 'smile'],
    ['Vivir algo especial', 'talleres', 'spark'],
    ['Escaparme unos días', 'retiros', 'mountain'],
    ['Ir a mi ritmo, a solas', 'sesiones-privadas', 'compass']
  ];
  const ldIndex = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'SportsActivityLocation', additionalType: 'https://schema.org/HealthClub',
    name: SITE.name, telephone: SITE.phoneIntl, email: SITE.email,
    address: { '@type': 'PostalAddress', streetAddress: 'C. de José Planes, 4', postalCode: '30530', addressLocality: 'Cieza', addressRegion: 'Murcia', addressCountry: 'ES' },
    geo: { '@type': 'GeoCoordinates', latitude: 38.2414556, longitude: -1.419749 },
    sameAs: [SITE.instagram, SITE.facebook],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: 5, reviewCount: SITE.reviews },
    openingHoursSpecification: SITE.hours.flatMap(d => d.slots.map(([a, b]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.d], opens: a, closes: b })))
  });

  add('index.html', {
    key: 'inicio', nav: 'inicio', ld: ldIndex,
    title: 'Escuela de Yoga Cristina Herrera · Yoga en Cieza (Murcia)',
    desc: 'Escuela de yoga en Cieza: Hatha Vinyasa, yoga restaurativo, Yoga Nidra, meditación, mantras, yoga para niños, talleres y retiros. Reserva por WhatsApp.'
  }, `
<section class="hero dark" data-glow data-hero>
  <div class="hero-slides">
    ${slides.map((sl, i) => `<div class="hero-slide${i === 0 ? ' is-active' : ''}" data-label="${sl.label}">${pic(sl.img, { alt: '', eager: i === 0, pos: sl.pos, cls: 'kenburns' })}</div>`).join('\n    ')}
  </div>
  <div class="hero-scrim" aria-hidden="true"></div>
  <canvas class="embers" aria-hidden="true" data-count="46"></canvas>
  <div class="wrap hero-in">
    <p class="kicker kicker-light hero-kicker"><span class="kicker-dot"></span>Escuela de yoga en Cieza · Murcia</p>
    <h1 class="hero-title split">Vuelve a <em>tu centro</em></h1>
    <p class="hero-lead">Tradición y modernidad para un yoga único. Una escuela en evolución donde el alumno es el gran protagonista y cada sesión es distinta… igual que tú.</p>
    <div class="hero-cta">
      <a class="btn btn-glow btn-lg" href="${waUrl(waMsg())}" target="_blank" rel="noopener">${icon('wa')} Reserva tu clase</a>
      <a class="btn btn-ghost btn-lg" href="#practicas">Descubre las prácticas ${icon('arrow')}</a>
    </div>
    <div class="hero-meta">
      <a class="hero-rating" href="${SITE.maps}" target="_blank" rel="noopener"><span class="stars">${icon('star').repeat(5)}</span><b>${SITE.rating}</b> · ${SITE.reviews} opiniones en Google</a>
      <p class="status" data-status><i></i><span>…</span></p>
    </div>
  </div>
  <div class="hero-index" aria-hidden="true">
    ${slides.map((sl, i) => `<button type="button" tabindex="-1" class="${i === 0 ? 'is-active' : ''}"><span class="hi-n">0${i + 1}</span><span class="hi-l">${sl.label}</span><i></i></button>`).join('')}
  </div>
  <a class="scroll-cue" href="#escuela" aria-label="Seguir"><span></span></a>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    ${[0, 1].map(() => `<p>${SERVICES.map(s => `<span>${s.name}</span><img src="assets/img/adornos/loto.webp" alt="" width="34" height="34">`).join('')}</p>`).join('')}
  </div>
</div>

<section class="school light" id="escuela">
  <div class="wrap school-grid">
    <div class="school-visual reveal" data-reveal="zoom">
      ${mandala('mandala-ring')}
      <div class="school-seal"><span class="seal-halo"></span><img src="assets/img/marca/sello-720.webp" width="720" height="720" alt="Logotipo de la Escuela de Yoga Cristina Herrera: OM dorado sobre círculo negro"></div>
      ${orn('luna', 'orn-float school-moon', 110)}
    </div>
    <div class="school-text">
      <p class="kicker reveal">Una escuela en evolución</p>
      <h2 class="split">Donde se aúnan <em>tradición</em> y <em>modernidad</em></h2>
      <p class="reveal">En la calle José Planes de Cieza, la escuela de Cristina Herrera propone una mirada amplia sobre el yoga. La transmisión del yoga en todos sus aspectos cobra vida a través de clases continuas, talleres y retiros.</p>
      <p class="reveal">Aquí la práctica no se limita al trabajo físico: incorpora respiración, meditación, descanso consciente y expresión sonora, para que cada persona se acerque al yoga desde sus intereses, su momento vital y su ritmo.</p>
      <dl class="stats">
        <div class="reveal" style="--d:0"><dt><span data-count="5" data-decimals="1">5,0</span>★</dt><dd>en Google</dd></div>
        <div class="reveal" style="--d:1"><dt><span data-count="9">9</span></dt><dd>formas de practicar</dd></div>
        <div class="reveal" style="--d:2"><dt>L–V</dt><dd>mañana y tarde</dd></div>
      </dl>
      <a class="link-arrow reveal" href="sobre-cristina.html">Conoce a Cristina ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="practices dark" id="practicas" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  ${mandala('mandala-bg mandala-left')}
  <div class="wrap">
    ${sectionHead({ kicker: 'Prácticas', title: 'Nueve maneras de <em>practicar</em>', lead: 'Desde una sesión activa hasta una práctica de pausa y reposo. Cada una tiene su página, con todo lo que necesitas saber y tu reserva directa por WhatsApp.', center: true })}
    <div class="filters reveal" role="tablist" aria-label="Filtrar prácticas">
      <button type="button" role="tab" aria-selected="true" data-filter="all">Todas</button>
      <button type="button" role="tab" aria-selected="false" data-filter="clases">Clases regulares</button>
      <button type="button" role="tab" aria-selected="false" data-filter="experiencias">Experiencias</button>
    </div>
    <div class="pgrid">
      ${SERVICES.map((s, i) => `<a class="pcard reveal" style="--d:${i % 3}" href="${s.file}" data-group="${s.group}">
        <span class="pcard-media">${pic(s.card, { sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw', alt: '' })}</span>
        <span class="pcard-body">
          <small>${s.kicker}</small>
          <b>${s.name}</b>
          <span class="pcard-desc">${s.lead}</span>
          ${meter(s.energy, s.energyLabel)}
          <span class="pcard-go">Descubrir ${icon('arrow')}</span>
        </span>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="finder light" id="encuentra">
  <div class="wrap">
    ${sectionHead({ kicker: 'Encuentra tu práctica', title: '¿Qué necesitas <em>hoy</em>?', lead: 'Elige lo que más te apetece y te contamos por dónde empezar.', ornName: 'loto', center: true })}
    <div class="finder-opts reveal" role="radiogroup" aria-label="¿Qué necesitas hoy?">
      ${finder.map(([t, slug, ic], i) => `<button type="button" role="radio" aria-checked="false" data-target="${slug}" style="--d:${i}">${icon(ic)}<span>${t}</span></button>`).join('\n      ')}
    </div>
    <div class="finder-result" aria-live="polite">
      <p class="finder-empty">${orn('arco', 'orn-breathe', 200)}<span>Tu práctica aparecerá aquí</span></p>
      ${finder.map(([, slug]) => { const s = BY_SLUG[slug]; return `<article class="finder-card" data-result="${slug}" hidden>
        <div class="finder-media">${pic(s.card, { sizes: '(max-width: 860px) 92vw, 40vw', alt: '' })}</div>
        <div class="finder-body">
          <p class="kicker">Te recomendamos</p>
          <h3>${s.title}</h3>
          <p>${s.lead}</p>
          ${meter(s.energy, s.energyLabel)}
          <div class="finder-cta"><a class="btn btn-dark" href="${s.file}">Ver ${s.name} ${icon('arrow')}</a><a class="btn btn-glow" href="${waUrl(waMsg(s))}" target="_blank" rel="noopener">${icon('wa')} Reservar</a></div>
        </div>
      </article>`; }).join('\n      ')}
    </div>
  </div>
</section>

<section class="breathe dark" id="respira" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap breathe-grid">
    <div class="breathe-text">
      <p class="kicker reveal">Un minuto para ti</p>
      <h2 class="split">Respira <em>con nosotros</em></h2>
      <p class="reveal">La respiración es el puente entre el cuerpo y la mente. Elige un ritmo, pulsa empezar y sigue el círculo de luz: inhala cuando crece, exhala cuando se recoge.</p>
      <div class="breathe-modes reveal" role="radiogroup" aria-label="Ritmo de respiración">
        <button type="button" role="radio" aria-checked="true" data-pattern="4,2,6">Calma <small>4 · 2 · 6</small></button>
        <button type="button" role="radio" aria-checked="false" data-pattern="4,4,4,4">Equilibrio <small>4 · 4 · 4 · 4</small></button>
        <button type="button" role="radio" aria-checked="false" data-pattern="4,7,8">Descanso <small>4 · 7 · 8</small></button>
      </div>
      <div class="breathe-actions reveal">
        <button type="button" class="btn btn-glow" data-breathe-toggle>${icon('play')}<span>Empezar</span></button>
        <button type="button" class="btn btn-ghost" data-bowl aria-pressed="false">${icon('bell')}<span>Cuenco tibetano</span></button>
      </div>
      <p class="breathe-count reveal">Ciclos completados: <b data-cycles>0</b></p>
    </div>
    <div class="breathe-stage reveal" data-reveal="zoom" data-breathe>
      <div class="breathe-rings" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="breathe-orb"><span class="breathe-label" aria-live="polite">Pulsa empezar</span><span class="breathe-sec" data-sec></span></div>
      ${orn('vela', 'orn-flicker breathe-candle', 90)}
    </div>
  </div>
</section>

<section class="unique light">
  <div class="wrap unique-grid">
    <div class="unique-head">
      <div class="unique-orn">${orn('esquina', 'orn-draw-corner', 140)}</div>
      <p class="kicker reveal">Lo que nos hace únicos</p>
      <h2 class="split">El alumno, <em>el gran protagonista</em></h2>
      <p class="reveal">Una forma de impartir las clases en la que puedes sentir la raíz del yoga mientras realizas tu práctica.</p>
      <a class="btn btn-dark reveal" href="sobre-cristina.html">Nuestra filosofía ${icon('arrow')}</a>
    </div>
    <ol class="pillars">
      ${PILLARS.map((p, i) => `<li class="pillar reveal" style="--d:${i}"><span class="pillar-n">${p.n}</span><div><h3>${p.t}</h3><p>${p.d}</p></div></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="schedule sand" id="horario">
  <div class="wrap">
    ${sectionHead({ kicker: 'Horario de clases', title: 'Cuándo <em>practicar</em>', lead: 'Elige tu clase y resérvala con un toque: el mensaje de WhatsApp ya lleva la práctica, el día y la hora.', center: true })}
    <p class="status status-big reveal" data-status><i></i><span>…</span></p>
    ${demoBanner('<b>Cuadrante de ejemplo.</b> Así se verá el horario de clases. Los huecos marcados como «Ejemplo» se cambiarán por el horario real de la escuela; el yoga para niños de los lunes y miércoles a las 17:30 sí es real.')}
    <p class="tt-next reveal" data-next hidden></p>
    ${timetable()}
    <details class="open-hours reveal"><summary>${icon('clock')} Horario de apertura de la escuela</summary>${hoursTable()}</details>
    <div class="center reveal"><a class="btn btn-glow" href="${waUrl('¡Hola, Cristina! 🙏 Me gustaría saber qué clases hay cada día y reservar mi plaza.')}" target="_blank" rel="noopener">${icon('wa')} Preguntar horarios por WhatsApp</a></div>
  </div>
</section>

${reviewsBlock()}

<section class="duo light">
  <div class="wrap duo-grid">
    <article class="duo-card reveal" data-reveal="up">
      <a class="duo-media" href="sobre-cristina.html" tabindex="-1" aria-hidden="true"><span class="frame-media" data-parallax="0.06">${pic('manos-guian', { sizes: '(max-width: 860px) 92vw, 46vw', alt: '' })}</span></a>
      <div class="duo-body">
        <p class="kicker">Sobre Cristina</p>
        <h3>Una forma de guiar <em>cercana y vocacional</em></h3>
        <p>Instructora y profesora diplomada por la Escuela Internacional de Yoga. Enseña el camino del autoconocimiento y el bienestar.</p>
        <a class="link-arrow" href="sobre-cristina.html">Conocer su historia ${icon('arrow')}</a>
      </div>
    </article>
    <article class="duo-card reveal" data-reveal="up" style="--d:1">
      <a class="duo-media" href="talleres.html" tabindex="-1" aria-hidden="true"><span class="frame-media" data-parallax="0.06">${pic('circulo-calma', { sizes: '(max-width: 860px) 92vw, 46vw', alt: '' })}</span></a>
      <div class="duo-body">
        <p class="kicker">Talleres y retiros</p>
        <h3>Para seguir <em>descubriendo</em> el yoga</h3>
        <p>Sonido, Yoga Nidra, brunch consciente y retiros inmersivos. Anunciamos cada encuentro en nuestras redes.</p>
        <div class="duo-links"><a class="link-arrow" href="talleres.html">Talleres ${icon('arrow')}</a><a class="link-arrow" href="retiros.html">Retiros ${icon('arrow')}</a><a class="link-arrow" href="${SITE.instagram}" target="_blank" rel="noopener">${icon('ig')} Instagram</a></div>
      </div>
    </article>
  </div>
</section>

<section class="visit dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap visit-grid">
    <div class="visit-text">
      <div class="visit-orn">${orn('sol', 'orn-spin', 120)}</div>
      <p class="kicker reveal">Te esperamos</p>
      <h2 class="split">Estamos encantados de <em>recibirte</em></h2>
      <ul class="visit-list">
        <li class="reveal">${icon('pin')}<span><b>${SITE.street}</b><br>${SITE.city}</span></li>
        <li class="reveal">${icon('phone')}<span><a href="tel:${SITE.phoneIntl}">${SITE.phone}</a><br><small>Llamada o WhatsApp</small></span></li>
        <li class="reveal">${icon('clock')}<span class="status" data-status><i></i><span>…</span></span></li>
      </ul>
      <div class="visit-cta reveal">
        <a class="btn btn-glow" href="${waUrl(waMsg())}" target="_blank" rel="noopener">${icon('wa')} Reservar por WhatsApp</a>
        <a class="btn btn-ghost" href="${SITE.directions}" target="_blank" rel="noopener">${icon('pin')} Cómo llegar</a>
      </div>
    </div>
    ${mapCard()}
  </div>
</section>`);

  /* ---------- SOBRE CRISTINA ---------- */
  add('sobre-cristina.html', {
    key: 'sobre', nav: 'sobre',
    title: 'Sobre Cristina Herrera · Escuela de Yoga en Cieza',
    desc: 'Cristina Herrera, instructora y profesora de yoga diplomada por la Escuela Internacional de Yoga. Su historia, su filosofía y su escuela en Cieza.'
  }, `
<section class="phero dark" data-glow>
  <div class="phero-media">${pic('manos-guian', { alt: 'Manos de la profesora guiando la práctica de una alumna', eager: true, pos: '40% 45%', cls: 'kenburns' })}</div>
  <div class="phero-scrim" aria-hidden="true"></div>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap phero-in">
    <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span>/</span><span aria-current="page">Sobre Cristina</span></nav>
    <p class="kicker kicker-light">Profesora de yoga · Cieza</p>
    <h1 class="phero-title split">Cristina <em>Herrera</em></h1>
    <p class="phero-lead">Instructora y profesora diplomada por la Escuela Internacional de Yoga. Desde su escuela en Cieza enseña el camino del autoconocimiento y el bienestar.</p>
    <div class="phero-cta">
      <a class="btn btn-glow btn-lg" href="${waUrl('¡Hola, Cristina! 🙏 He visto tu web y me gustaría conocer la escuela y probar una clase.')}" target="_blank" rel="noopener">${icon('wa')} Escribir a Cristina</a>
      <a class="btn btn-ghost btn-lg" href="#historia">Su historia ${icon('arrow')}</a>
    </div>
  </div>
  <a class="scroll-cue" href="#historia" aria-label="Seguir leyendo"><span></span></a>
</section>

<section class="intro-sec light" id="historia">
  <div class="wrap intro-grid">
    <div class="intro-text">
      <div class="intro-orn">${orn('loto', 'orn-breathe', 140)}</div>
      <p class="kicker reveal">Quién es</p>
      <h2 class="split">Una forma de guiar <em>cercana, vocacional</em> y profunda</h2>
      <p class="reveal">Cristina Herrera es instructora y profesora de yoga, diplomada por la Escuela Internacional de Yoga. Desde su escuela en la calle José Planes de Cieza comparte una práctica que no se limita al trabajo físico: posturas, respiración, meditación, descanso consciente y expresión sonora.</p>
      <p class="reveal">Quienes practican con ella destacan su vocación y su manera de transmitir el yoga desde su dimensión más espiritual: guía con facilidad, acompaña de cerca y hace que cada clase se viva con total entrega.</p>
      <p class="reveal">Su propuesta tiene identidad propia: una escuela en evolución donde se aúnan tradición y modernidad, para un yoga único que evoluciona contigo.</p>
    </div>
    <figure class="letrero reveal" data-reveal="zoom">
      ${mandala('mandala-ring')}
      <div class="letrero-disc"><img src="assets/img/marca/letrero-1200.webp" width="1200" height="1200" loading="lazy" alt="Letrero luminoso de la escuela con el OM y el nombre de Cristina Herrera"></div>
      <figcaption>El OM que ilumina la escuela</figcaption>
    </figure>
  </div>
</section>

<section class="timeline dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  ${mandala('mandala-bg mandala-right')}
  <div class="wrap">
    ${sectionHead({ kicker: 'Su camino', title: 'Una trayectoria <em>en evolución</em>', center: true })}
    <ol class="tl" data-steps>
      <li class="tl-line" aria-hidden="true"><span></span></li>
      <li class="tl-item reveal"><span class="tl-dot"></span><p class="tl-when">Formación</p><h3>Escuela Internacional de Yoga</h3><p>Se diploma como instructora y profesora de yoga.</p></li>
      <li class="tl-item reveal"><span class="tl-dot"></span><p class="tl-when">2016</p><h3>Clases regulares en Cieza</h3><p>Imparte clases semanales en la ciudad, con grupos de mañana, de tarde y de yoga infantil.</p></li>
      <li class="tl-item reveal"><span class="tl-dot"></span><p class="tl-when">2020</p><h3>Yoga para todos en Abarán</h3><p>Imparte una clase de yoga que el Ayuntamiento de Abarán comparte con sus vecinos.</p></li>
      <li class="tl-item reveal"><span class="tl-dot"></span><p class="tl-when">Hoy</p><h3>Su propia escuela</h3><p>En C. de José Planes, 4: clases continuas, yoga para niños, talleres, retiros y sesiones privadas.</p></li>
    </ol>
  </div>
</section>

<section class="unique light">
  <div class="wrap unique-grid">
    <div class="unique-head">
      <div class="unique-orn">${orn('esquina', 'orn-draw-corner', 140)}</div>
      <p class="kicker reveal">Filosofía</p>
      <h2 class="split">Eres <em>energía en movimiento</em></h2>
      <p class="reveal">«Eso es precisamente lo que nos hace únicos»: una forma de impartir las clases donde el alumno, el gran protagonista, puede sentir la raíz del yoga mientras realiza su práctica.</p>
    </div>
    <ol class="pillars">
      ${PILLARS.map((p, i) => `<li class="pillar reveal" style="--d:${i}"><span class="pillar-n">${p.n}</span><div><h3>${p.t}</h3><p>${p.d}</p></div></li>`).join('\n      ')}
    </ol>
  </div>
</section>

<section class="pull dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap pull-in">
    <div class="pull-orn">${orn('om', 'orn-glow', 120)}</div>
    <blockquote class="split">Un yoga revolucionario que <em>evolucione contigo</em>. Y este es tu sitio.</blockquote>
    <p class="pull-cite reveal">— Escuela de Yoga Cristina Herrera · #yogavolution</p>
  </div>
</section>

<section class="teach light">
  <div class="wrap">
    ${sectionHead({ kicker: 'Lo que enseña', title: 'Una escuela, <em>muchas puertas</em> de entrada', lead: 'Cada persona puede acercarse al yoga desde el movimiento, el descanso o la presencia.', ornName: 'mandala', center: true })}
    <div class="teach-grid">
      ${SERVICES.map((s, i) => `<a class="teach-item reveal" style="--d:${i % 3}" href="${s.file}"><span class="teach-media">${pic(s.card, { sizes: '96px', alt: '' })}</span><span><b>${s.name}</b><small>${s.menu}</small></span>${icon('arrow')}</a>`).join('\n      ')}
    </div>
  </div>
</section>

${reviewsBlock('Lo que dicen de <em>Cristina</em>')}

<section class="cta-band light">
  <div class="wrap cta-in">
    <div class="cta-orn">${orn('cojin', 'orn-float', 150)}</div>
    <div>
      <p class="kicker reveal">Te esperamos</p>
      <h2 class="split">Ven a <em>conocer</em> la escuela</h2>
      <p class="reveal">Escribe a Cristina y cuéntale qué buscas. Ella te aconsejará la práctica que mejor encaja contigo.</p>
      <div class="cta-actions reveal"><a class="btn btn-glow btn-lg" href="${waUrl('¡Hola, Cristina! 🙏 He visto tu web y me gustaría conocer la escuela y probar una clase.')}" target="_blank" rel="noopener">${icon('wa')} Escribir por WhatsApp</a><a class="btn btn-dark btn-lg" href="contacto.html">Contacto ${icon('arrow')}</a></div>
    </div>
  </div>
</section>`);

  /* ---------- CONTACTO ---------- */
  add('contacto.html', {
    key: 'contacto', nav: 'contacto',
    title: 'Contacto y reservas · Escuela de Yoga Cristina Herrera (Cieza)',
    desc: 'Reserva tu clase de yoga en Cieza por WhatsApp. C. de José Planes, 4 · 606 38 07 45. Horario, mapa y preguntas frecuentes.'
  }, `
<section class="phero phero-short dark" data-glow>
  <div class="phero-media">${pic('rincon-calido', { alt: 'Rincón de la sala de yoga con cojines y luz cálida', eager: true, pos: '50% 60%', cls: 'kenburns' })}</div>
  <div class="phero-scrim" aria-hidden="true"></div>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap phero-in">
    <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span>/</span><span aria-current="page">Contacto</span></nav>
    <p class="kicker kicker-light">Contacto y reservas</p>
    <h1 class="phero-title split">Ven a <em>respirar</em> con nosotros</h1>
    <p class="phero-lead">Escríbenos por WhatsApp, llámanos o pásate por la escuela en C. de José Planes, 4 (Cieza). Te ayudamos a elegir tu práctica.</p>
    <p class="status status-hero" data-status><i></i><span>…</span></p>
  </div>
</section>

<section class="contact-cards light">
  <div class="wrap ccards">
    <a class="ccard reveal" style="--d:0" href="${waUrl(waMsg())}" target="_blank" rel="noopener"><span class="ccard-ico">${icon('wa')}</span><small>WhatsApp</small><b>${SITE.phone}</b><span class="ccard-go">Escribir ahora ${icon('arrow')}</span></a>
    <a class="ccard reveal" style="--d:1" href="tel:${SITE.phoneIntl}"><span class="ccard-ico">${icon('phone')}</span><small>Teléfono</small><b>${SITE.phone}</b><span class="ccard-go">Llamar ${icon('arrow')}</span></a>
    <a class="ccard reveal" style="--d:2" href="mailto:${SITE.email}"><span class="ccard-ico">${icon('mail')}</span><small>Correo</small><b class="ccard-mail">${SITE.email}</b><span class="ccard-go">Enviar correo ${icon('arrow')}</span></a>
    <a class="ccard reveal" style="--d:3" href="${SITE.directions}" target="_blank" rel="noopener"><span class="ccard-ico">${icon('pin')}</span><small>Dirección</small><b>${SITE.street}</b><span class="ccard-go">Cómo llegar ${icon('arrow')}</span></a>
  </div>
</section>

<section class="reserve light" id="reserva">
  <div class="wrap reserve-grid">
    <div class="reserve-info">
      <div class="reserve-orn">${orn('mandala', 'orn-spin', 130)}</div>
      <p class="kicker reveal">Reserva directa</p>
      <h2 class="split">Tu reserva, <em>en un mensaje</em></h2>
      <p class="reveal">Elige la práctica y tus preferencias: te abrimos WhatsApp con el mensaje ya escrito para Cristina. Si no sabes por dónde empezar, déjalo en «Aún no lo sé» y te aconsejamos.</p>
      <div class="reserve-hours reveal">
        <p class="reserve-hours-h">${icon('clock')} Horario de la escuela</p>
        ${hoursTable()}
        <p class="status" data-status><i></i><span>…</span></p>
        <p class="small">Niños y adolescentes: lunes y miércoles a las 17:30.</p>
      </div>
    </div>
    ${composer(null)}
  </div>
</section>

<section class="visit dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap visit-grid">
    <div class="visit-text">
      <div class="visit-orn">${orn('sol', 'orn-spin', 120)}</div>
      <p class="kicker reveal">Dónde estamos</p>
      <h2 class="split">En el corazón de <em>Cieza</em></h2>
      <ul class="visit-list">
        <li class="reveal">${icon('pin')}<span><b>${SITE.street}</b><br>${SITE.city}</span></li>
        <li class="reveal">${icon('ig')}<span><a href="${SITE.instagram}" target="_blank" rel="noopener">@cristinaherrerayoga</a><br><small>Talleres, horarios y novedades</small></span></li>
        <li class="reveal">${icon('fb')}<span><a href="${SITE.facebook}" target="_blank" rel="noopener">Cristina Herrera Yoga</a><br><small>Facebook</small></span></li>
      </ul>
      <div class="visit-cta reveal"><a class="btn btn-glow" href="${SITE.directions}" target="_blank" rel="noopener">${icon('pin')} Cómo llegar</a><a class="btn btn-ghost" href="${SITE.maps}" target="_blank" rel="noopener">Ver en Google Maps</a></div>
    </div>
    ${mapCard()}
  </div>
</section>

<section class="faq light">
  <div class="wrap faq-grid">
    <div class="faq-head">
      <div class="faq-orn">${orn('rama', 'orn-sway', 120)}</div>
      <p class="kicker reveal">Preguntas frecuentes</p>
      <h2 class="split">Antes de tu <em>primera clase</em></h2>
      <p class="reveal">¿Te queda alguna duda? Escríbenos y te respondemos encantados.</p>
    </div>
    <div class="faq-list">
      ${[
        ['¿Necesito experiencia previa?', 'No. La escuela propone distintas puertas de entrada para que cada persona se acerque al yoga desde su momento vital y su ritmo. Si te inicias, cuéntanoslo al reservar y te aconsejaremos la práctica más adecuada.'],
        ['¿Cómo reservo mi plaza?', 'Lo más rápido es WhatsApp: en cada práctica tienes un botón con el mensaje ya escrito. También puedes llamar al 606 38 07 45 o escribir a ' + SITE.email + '.'],
        ['¿Qué práctica me conviene?', 'Si buscas movimiento, prueba Hatha Vinyasa; si necesitas descansar, yoga restaurativo o Yoga Nidra; para calmar la mente, meditación o mantras. En la portada tienes «Encuentra tu práctica» para orientarte.'],
        ['¿Hay clases para niños?', 'Sí: yoga y mindfulness para niños y adolescentes los lunes y miércoles a las 17:30.'],
        ['¿Qué tengo que llevar?', 'Ropa cómoda que te permita moverte y, si quieres, algo de abrigo para la relajación final. Si tienes dudas sobre el material, pregúntanos al reservar.'],
        ['¿El centro es accesible?', 'Algunas fichas públicas del local indican acceso, aparcamiento y aseo adaptados. Si tienes necesidades concretas, consúltanos antes de venir y te lo confirmamos.']
      ].map(([q, a], i) => `<details class="faq-item reveal" style="--d:${i}"${i === 0 ? ' open' : ''}><summary>${q}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-a"><p>${a}</p></div></details>`).join('\n      ')}
    </div>
  </div>
</section>`);

  /* ---------- PÁGINAS LEGALES (borrador: datos del titular pendientes) ---------- */
  const pend = t => `<mark class="pending">Pendiente: ${t}</mark>`;
  const LEGAL = [
    ['aviso-legal.html', 'Aviso legal'],
    ['privacidad.html', 'Política de privacidad'],
    ['cookies.html', 'Política de cookies']
  ];
  const titular = `<ul class="legal-data">
        <li><b>Titular:</b> ${pend('nombre y apellidos o razón social')}</li>
        <li><b>NIF:</b> ${pend('NIF o CIF')}</li>
        <li><b>Domicilio:</b> C. de José Planes, 4, 30530 Cieza (Murcia) ${pend('confirmar si es también el domicilio a efectos legales')}</li>
        <li><b>Correo electrónico:</b> <a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><b>Teléfono:</b> <a href="tel:${SITE.phoneIntl}">${SITE.phone}</a></li>
      </ul>`;
  const legalPage = (file, title, lead, body) => add(file, {
    key: 'legal', nav: '', title: `${title} · ${SITE.name}`, desc: `${title} de la web de la ${SITE.name} (Cieza).`
  }, `
<section class="legal-hero dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  ${mandala('mandala-bg mandala-right')}
  <div class="wrap legal-hero-in">
    <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span>/</span><span aria-current="page">${title}</span></nav>
    <p class="kicker kicker-light">Información legal</p>
    <h1 class="split">${title}</h1>
    <p class="legal-lead">${lead}</p>
  </div>
</section>

<section class="legal light">
  <div class="wrap legal-grid">
    <aside class="legal-nav">
      <p class="legal-nav-h">Información legal</p>
      ${LEGAL.map(([f, t]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ''}>${t}</a>`).join('\n      ')}
      <div class="legal-orn">${orn('loto', 'orn-breathe', 90)}</div>
    </aside>
    <article class="legal-body">
      <div class="legal-draft"><span class="demo-banner-ico" aria-hidden="true">!</span><p><b>Borrador orientativo para la demostración.</b> Antes de publicar la web definitiva hay que completar los datos marcados como «Pendiente» y revisar estos textos con una asesoría.</p></div>
      ${body}
      <p class="legal-updated">Última actualización: ${pend('fecha de publicación')}</p>
    </article>
  </div>
</section>`);

  legalPage('aviso-legal.html', 'Aviso legal', 'Datos del titular de esta web y condiciones de uso, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE).', `
      <h2>1. Datos identificativos</h2>
      <p>En cumplimiento del artículo 10 de la LSSI-CE, se informa de los datos del titular de esta web:</p>
      ${titular}
      <p><b>Actividad:</b> escuela de yoga (clases regulares, yoga para niños y adolescentes, talleres, retiros y sesiones privadas).</p>
      <h2>2. Objeto y aceptación</h2>
      <p>Esta web informa sobre la escuela, sus prácticas y la forma de contactar y reservar. Navegar por ella implica aceptar este aviso legal. Si no estás de acuerdo, te pedimos que no la utilices.</p>
      <h2>3. Uso de la web</h2>
      <p>Te comprometes a usar la web y sus contenidos de forma lícita, sin dañar su funcionamiento ni los derechos de terceros.</p>
      <h2>4. Información sobre clases, horarios y precios</h2>
      <p>La información de horarios, plazas y actividades es orientativa y puede cambiar. La reserva solo queda confirmada cuando la escuela te responde por WhatsApp, teléfono o correo.</p>
      <h2>5. Propiedad intelectual e industrial</h2>
      <p>El nombre, el logotipo, los textos y el diseño de esta web pertenecen a su titular o se usan con autorización. No está permitida su reproducción o distribución sin permiso. Algunas fotografías son ilustrativas.</p>
      <h2>6. Enlaces a otros sitios</h2>
      <p>La web enlaza con servicios de terceros (WhatsApp, Instagram, Facebook y Google Maps). Al usarlos se aplican sus propias condiciones y políticas de privacidad; la escuela no se hace responsable de sus contenidos.</p>
      <h2>7. Responsabilidad</h2>
      <p>Se procura que la información sea correcta y esté actualizada, pero no se garantiza la ausencia de errores ni la disponibilidad continua de la web.</p>
      <h2>8. Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente.</p>`);

  legalPage('privacidad.html', 'Política de privacidad', 'Cómo se tratan los datos personales que compartes con la escuela, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).', `
      <h2>1. Responsable del tratamiento</h2>
      ${titular}
      <h2>2. Qué datos tratamos</h2>
      <p>Los que tú nos facilitas al escribirnos por WhatsApp, llamarnos o enviarnos un correo: nombre, teléfono, el contenido del mensaje y tus preferencias de clase. En las clases para niños y adolescentes, los datos del menor (por ejemplo, su edad) los facilita su madre, padre o tutor.</p>
      <p><b>Esta web no envía datos a ningún servidor.</b> El asistente de reserva solo prepara el texto del mensaje en tu propio navegador y lo abre en WhatsApp: tú decides si lo envías.</p>
      <h2>3. Para qué los usamos</h2>
      <ul><li>Responder a tus consultas.</li><li>Gestionar tus reservas y tu asistencia a clases, talleres, retiros y sesiones privadas.</li><li>Avisarte de cambios en las clases que has reservado.</li></ul>
      <h2>4. Base legal</h2>
      <p>Tu consentimiento al contactar con la escuela y, cuando reservas, la aplicación de medidas precontractuales o la ejecución del servicio que solicitas.</p>
      <h2>5. Cuánto tiempo los conservamos</h2>
      <p>El tiempo necesario para atender tu consulta o mientras mantengas relación con la escuela, y después durante los plazos que exija la ley. ${pend('confirmar plazos de conservación')}</p>
      <h2>6. Con quién se comparten</h2>
      <p>No se ceden datos a terceros salvo obligación legal. Si eliges escribir por WhatsApp, ese servicio lo presta WhatsApp Ireland Limited (grupo Meta) conforme a sus propias condiciones.</p>
      <h2>7. Tus derechos</h2>
      <p>Puedes pedir el acceso, la rectificación, la supresión, la oposición, la limitación del tratamiento y la portabilidad de tus datos escribiendo a <a href="mailto:${SITE.email}">${SITE.email}</a>. Si consideras que no se han atendido correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).</p>
      <h2>8. Menores de edad</h2>
      <p>Los datos de menores de 14 años solo se tratan con el consentimiento de quien tenga su patria potestad o tutela.</p>`);

  legalPage('cookies.html', 'Política de cookies', 'Qué se guarda en tu navegador al visitar esta web y cómo controlarlo.', `
      <h2>1. Esta web no usa cookies de análisis ni de publicidad</h2>
      <p>No hay herramientas de estadística, píxeles publicitarios ni seguimiento. Las tipografías y las imágenes se sirven desde la propia web, sin conectar con Google Fonts ni con otros servidores.</p>
      <h2>2. Almacenamiento técnico</h2>
      <p>Para que la web funcione con normalidad se guardan dos valores en el almacenamiento de sesión de tu navegador. Son técnicos, no te identifican y se borran al cerrar la pestaña, por lo que no necesitan consentimiento:</p>
      <div class="legal-table"><table>
        <thead><tr><th>Nombre</th><th>Tipo</th><th>Para qué sirve</th><th>Duración</th></tr></thead>
        <tbody>
          <tr><td>ch-intro</td><td>Sesión (técnica)</td><td>Recordar que ya has visto la animación de entrada</td><td>Hasta cerrar la pestaña</td></tr>
          <tr><td>ch-nav</td><td>Sesión (técnica)</td><td>Hacer la transición suave al cambiar de página</td><td>Unos segundos</td></tr>
        </tbody>
      </table></div>
      <h2>3. Servicios de terceros que solo se activan si tú quieres</h2>
      <ul>
        <li><b>Google Maps:</b> el mapa solo se carga si pulsas «Ver mapa interactivo». A partir de ese momento Google puede instalar cookies y tratar datos según su <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">política de privacidad</a>.</li>
        <li><b>WhatsApp, Instagram y Facebook:</b> son enlaces externos. Al abrirlos sales de esta web y se aplican las políticas de Meta.</li>
      </ul>
      <h2>4. Cómo controlarlo</h2>
      <p>Puedes borrar el almacenamiento y las cookies, o bloquearlos, desde la configuración de tu navegador (Chrome, Safari, Firefox o Edge).</p>`);

  /* ---------- 404 ---------- */
  add('404.html', { key: 'error', nav: '', title: 'Página no encontrada · Escuela de Yoga Cristina Herrera', desc: 'La página que buscas no existe.' }, `
<section class="notfound dark" data-glow>
  <canvas class="embers" aria-hidden="true"></canvas>
  <div class="wrap notfound-in">
    ${orn('luna', 'orn-float', 140)}
    <p class="kicker kicker-light">Error 404</p>
    <h1 class="split">Esta página se fue a <em>meditar</em></h1>
    <p>Respira hondo y vuelve al inicio: allí te esperan todas nuestras prácticas.</p>
    <a class="btn btn-glow btn-lg" href="index.html">Volver al inicio ${icon('arrow')}</a>
  </div>
</section>`);

  return out;
}
