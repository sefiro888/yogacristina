/* Escuela de Yoga Cristina Herrera · interacción y efectos
   intro, transiciones, scroll suave, cabecera, menú, textos que aparecen,
   pase de fotos, partículas de luz, horario en vivo, reserva por WhatsApp,
   test de prácticas, respiración guiada con cuenco tibetano y opiniones. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const CH = window.CH || { wa: '34606380745', hours: [] };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const waUrl = t => `https://wa.me/${CH.wa}?text=${encodeURIComponent(t)}`;
  const store = (k, v) => { try { sessionStorage.setItem(k, v); } catch (_) {} };
  const buzz = p => { try { if (navigator.vibrate && !reduce) navigator.vibrate(p); } catch (_) {} };
  const PLAY = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5Z"/></svg>';
  const PAUSE = '<svg class="ico ico-fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zm6.5 0H17v14h-3.5z"/></svg>';
  // Cuenco tibetano sintetizado (sin archivos de audio): parciales inarmónicos con batido lento
  let actx = null;
  const bowl = (f = 220) => {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const t = actx.currentTime;
      const master = actx.createGain();
      master.gain.value = .55;
      const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3200;
      master.connect(lp).connect(actx.destination);
      [[1, .5, 10], [2.76, .22, 7], [5.4, .1, 4.5], [8.93, .05, 3]].forEach(([r, a, d]) => {
        [0, .8].forEach(det => {
          const o = actx.createOscillator();
          const g = actx.createGain();
          o.type = 'sine';
          o.frequency.value = f * r + det;
          g.gain.setValueAtTime(.0001, t);
          g.gain.exponentialRampToValueAtTime(a * .5, t + .025);
          g.gain.exponentialRampToValueAtTime(.0001, t + d);
          o.connect(g).connect(master);
          o.start(t); o.stop(t + d + .1);
        });
      });
    } catch (_) {}
  };

  /* ---------- 1. Texto palabra a palabra ---------- */
  const split = el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.append(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const inner = document.createElement('span');
            inner.textContent = p;
            inner.style.setProperty('--i', i++);
            w.append(inner);
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
  };
  $$('.split').forEach(split);

  /* ---------- 2. Apariciones al hacer scroll ---------- */
  let started = false;
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-in');
    io.unobserve(en.target);
  }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
  const startReveals = () => {
    if (started) return;
    started = true;
    $$('.reveal, .split, .orn, .meter').forEach(el => io.observe(el));
  };

  /* ---------- 3. Intro (una vez por visita) ---------- */
  const intro = $('.intro');
  if (intro && root.classList.contains('show-intro')) {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      intro.classList.add('is-open');
      store('ch-intro', '1');
      setTimeout(startReveals, 250);
      setTimeout(() => root.classList.remove('show-intro'), 1200);
    };
    const t = setTimeout(finish, 2900);
    intro.addEventListener('click', () => { clearTimeout(t); finish(); });
    addEventListener('keydown', () => { clearTimeout(t); finish(); }, { once: true });
  } else {
    startReveals();
  }

  /* ---------- 4. Transición entre páginas ---------- */
  if (root.classList.contains('is-entering')) {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('entered')));
    setTimeout(() => root.classList.remove('is-entering', 'entered'), 900);
  }
  addEventListener('pageshow', e => { if (e.persisted) root.classList.remove('is-leaving', 'is-entering', 'entered', 'menu-open'); });

  /* ---------- 5. Scroll suave ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    const sync = () => {
      const stop = root.classList.contains('menu-open') || root.classList.contains('show-intro');
      stop ? lenis.stop() : lenis.start();
    };
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] });
    sync();
  }
  const scrollToEl = el => lenis ? lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  // Enlaces: anclas con scroll suave y resto de páginas con velo
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (/^(mailto:|tel:|sms:|javascript:)/i.test(a.getAttribute('href'))) return;
    const url = new URL(a.href, location.href);
    if (url.protocol !== location.protocol || url.host !== location.host) return;
    const samePage = url.pathname === location.pathname || (/\/$/.test(location.pathname) && /\/index\.html$/.test(url.pathname));
    if (samePage && url.hash) {
      const target = url.hash.length > 1 && document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      scrollToEl(target);
      history.replaceState(null, '', url.hash);
      return;
    }
    if (reduce) return;
    e.preventDefault();
    closeMenu();
    root.style.setProperty('--vx', e.clientX + 'px');
    root.style.setProperty('--vy', e.clientY + 'px');
    root.classList.add('is-leaving');
    store('ch-nav', '1');
    setTimeout(() => { location.href = a.href; }, 640);
  });
  // Llegada con ancla desde otra página
  if (location.hash) {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) setTimeout(() => scrollToEl(target), 700);
  }

  /* ---------- 6. Cabecera ---------- */
  const header = $('.site-header');
  const bar = $('.header-progress span');
  let lastY = scrollY;
  const onScrollHeader = () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    const menuBusy = root.classList.contains('menu-open') || $('.nav-drop.is-open');
    if (!menuBusy && !matchMedia('(max-width: 1080px)').matches) {
      if (y > 520 && y > lastY + 6) header.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 520) header.classList.remove('is-hidden');
    } else header.classList.remove('is-hidden');
    lastY = y;
  };

  /* ---------- 7. Menú móvil y desplegable de prácticas ---------- */
  const menuBtn = $('.menu-btn');
  const drop = $('.nav-drop');
  const dropBtn = $('.drop-btn');
  const isMobile = () => matchMedia('(max-width: 1080px)').matches;
  function closeMenu() {
    root.classList.remove('menu-open');
    menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    setDrop(false);
  }
  function setDrop(open) {
    if (!drop) return;
    drop.classList.toggle('is-open', open);
    dropBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn && menuBtn.addEventListener('click', () => {
    const open = !root.classList.contains('menu-open');
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    header.classList.remove('is-hidden');
  });
  if (drop) {
    let timer;
    dropBtn.addEventListener('click', () => setDrop(!drop.classList.contains('is-open')));
    drop.addEventListener('mouseenter', () => { if (!isMobile() && fine) { clearTimeout(timer); setDrop(true); } });
    drop.addEventListener('mouseleave', () => { if (!isMobile() && fine) timer = setTimeout(() => setDrop(false), 220); });
    document.addEventListener('click', e => { if (!isMobile() && !drop.contains(e.target)) setDrop(false); });
    drop.addEventListener('focusout', e => { if (!isMobile() && !drop.contains(e.relatedTarget)) setDrop(false); });
  }
  addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); } });

  /* ---------- 8. Pase de fotos de la portada ---------- */
  const slides = $$('.hero-slide');
  const marks = $$('.hero-index button');
  if (slides.length > 1) {
    let idx = 0;
    const dur = 6500;
    root.style.setProperty('--slide', dur / 1000 + 's');
    const go = n => {
      slides[idx].classList.remove('is-active');
      marks[idx] && marks[idx].classList.remove('is-active');
      idx = (n + slides.length) % slides.length;
      const img = $('img', slides[idx]);
      if (img && img.loading === 'lazy') img.loading = 'eager';
      slides[idx].classList.add('is-active');
      if (marks[idx]) { void marks[idx].offsetWidth; marks[idx].classList.add('is-active'); }
    };
    // precarga discreta del resto de fotos
    setTimeout(() => slides.forEach(s => { const i = $('img', s); if (i) i.loading = 'eager'; }), 2500);
    let timer = setInterval(() => go(idx + 1), dur);
    document.addEventListener('visibilitychange', () => {
      clearInterval(timer);
      if (!document.hidden) timer = setInterval(() => go(idx + 1), dur);
    });
  }

  /* ---------- 9. Parallax suave en fotos ---------- */
  const para = $$('[data-parallax]').map(el => ({ el, img: $('img', el), f: parseFloat(el.dataset.parallax) || .06 }));
  const onScrollPara = () => {
    if (reduce) return;
    const vh = innerHeight;
    para.forEach(p => {
      const r = p.el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100 || !p.img) return;
      const max = r.height * .085;
      const off = clamp((r.top + r.height / 2 - vh / 2) * -p.f, -max, max);
      p.img.style.setProperty('--py', off.toFixed(1) + 'px');
    });
  };

  /* ---------- 10. Líneas de pasos que se dibujan ---------- */
  const lines = $$('[data-steps]').map(el => ({ el, bar: $('.steps-line span, .tl-line span', el) }));
  const onScrollLines = () => {
    const vh = innerHeight;
    lines.forEach(l => {
      if (!l.bar) return;
      const r = l.el.getBoundingClientRect();
      const p = clamp((vh * .82 - r.top) / (vh * .45), 0, 1);
      l.bar.style.transform = `scaleX(${p.toFixed(3)})`;
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScrollHeader(); onScrollPara(); onScrollLines(); ticking = false; });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- 11. Partículas de luz (brasas de vela) ---------- */
  if (!reduce) {
    $$('canvas.embers').forEach(cv => {
      const ctx = cv.getContext('2d');
      let w = 0, h = 0, parts = [], run = false, raf = 0;
      const dpr = Math.min(2, devicePixelRatio || 1);
      const make = (anyY) => ({
        x: Math.random() * w, y: anyY ? Math.random() * h : h + 10,
        r: .6 + Math.random() * 1.9, vy: .12 + Math.random() * .42,
        a: .25 + Math.random() * .6, ph: Math.random() * 6.28, sp: .006 + Math.random() * .014,
        sw: 6 + Math.random() * 18, hue: 26 + Math.random() * 20
      });
      const size = () => {
        const r = cv.getBoundingClientRect();
        w = r.width; h = r.height;
        cv.width = w * dpr; cv.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = +cv.dataset.count || clamp(Math.round(w * h / 30000), 12, 38);
        parts = Array.from({ length: n }, () => make(true));
      };
      const tick = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (const p of parts) {
          p.y -= p.vy; p.ph += p.sp;
          const x = p.x + Math.sin(p.ph) * p.sw;
          const tw = p.a * (.55 + .45 * Math.sin(p.ph * 2.3));
          const fade = clamp(p.y / (h * .35), 0, 1);
          ctx.fillStyle = `hsla(${p.hue},100%,62%,${(tw * .14 * fade).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(x, p.y, p.r * 5, 0, 6.283); ctx.fill();
          ctx.fillStyle = `hsla(${p.hue + 8},100%,78%,${(tw * fade).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, 6.283); ctx.fill();
          if (p.y < -12) Object.assign(p, make(false));
        }
        if (run) raf = requestAnimationFrame(tick);
      };
      new ResizeObserver(size).observe(cv);
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !run) { run = true; raf = requestAnimationFrame(tick); }
        else if (!en.isIntersecting) { run = false; cancelAnimationFrame(raf); }
      }).observe(cv);
    });
  }

  /* ---------- 12. Luz que sigue al cursor en zonas oscuras ---------- */
  const glow = $('.glow-cursor');
  if (glow && fine && !reduce) {
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, on = false;
    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      const dark = !!(e.target.closest && e.target.closest('[data-glow]'));
      if (dark !== on) { on = dark; glow.classList.toggle('on', on); }
    }, { passive: true });
    const loop = () => { x += (tx - x) * .12; y += (ty - y) * .12; glow.style.transform = `translate3d(${x}px,${y}px,0)`; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- 13. Horario en vivo (hora de Madrid) ---------- */
  const madrid = () => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const get = t => (parts.find(p => p.type === t) || {}).value;
    let hh = +get('hour'); if (hh === 24) hh = 0;
    return { d: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')], m: hh * 60 + +get('minute') };
  };
  const mins = t => { const [a, b] = t.split(':').map(Number); return a * 60 + b; };
  const fmt = t => t.replace(/^0/, '');
  const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const status = () => {
    const { d, m } = madrid();
    const today = CH.hours.find(x => x.d === d) || { slots: [] };
    let text, open = false;
    const cur = today.slots.find(([a, b]) => m >= mins(a) && m < mins(b));
    if (cur) { open = true; text = `Abierto ahora · hasta las ${fmt(cur[1])}`; }
    else {
      const later = today.slots.find(([a]) => mins(a) > m);
      if (later) text = `Cerrado ahora · abre hoy a las ${fmt(later[0])}`;
      else {
        for (let k = 1; k <= 7; k++) {
          const nd = (d + k) % 7;
          const day = CH.hours.find(x => x.d === nd);
          if (day && day.slots.length) { text = `Cerrado ahora · abre ${k === 1 ? 'mañana' : 'el ' + dayNames[nd]} a las ${fmt(day.slots[0][0])}`; break; }
        }
      }
    }
    $$('[data-status]').forEach(el => {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      const s = $('span', el); if (s) s.textContent = text;
    });
    $$('.hours-list li, .tt-day').forEach(r => r.classList.toggle('is-today', +r.dataset.day === d));
    $$('[data-tt-day]').forEach(b => b.classList.toggle('is-today', +b.dataset.ttDay === d));
    // clases: las de hoy ya pasadas se atenúan y se marca la próxima
    const all = $$('.tt-class');
    const key = c => { const dd = +c.dataset.day; const diff = (dd - d + 7) % 7; return diff * 1440 + mins(c.dataset.start) - (diff === 0 ? m : 0) - (diff === 0 ? 0 : m); };
    let next = null, best = Infinity;
    all.forEach(c => {
      const past = +c.dataset.day === d && mins(c.dataset.start) < m;
      c.classList.toggle('is-past', past);
      c.classList.remove('is-next');
      const k = past ? key(c) + 7 * 1440 : key(c);
      if (k < best) { best = k; next = c; }
    });
    // en cada contenedor (cuadrante o página de práctica) se marca su propia próxima clase
    $$('.tt, .svc-classes').forEach(box => {
      let bn = null, bb = Infinity;
      $$('.tt-class', box).forEach(c => {
        const past = c.classList.contains('is-past');
        const k = past ? key(c) + 7 * 1440 : key(c);
        if (k < bb) { bb = k; bn = c; }
      });
      if (bn) bn.classList.add('is-next');
    });
    const nextEl = $('[data-next]');
    if (nextEl && next) {
      const nd = +next.dataset.day;
      const when = nd === d && best < 1440 ? 'hoy' : ((nd - d + 7) % 7 === 1 ? 'mañana' : 'el ' + dayNames[nd]);
      nextEl.innerHTML = `Próxima clase: <b>${when} a las ${fmt(next.dataset.start)}</b> · ${$('.tt-name', next).textContent}`;
      nextEl.hidden = false;
    }
    return d;
  };
  const today = status();
  setInterval(status, 60000);

  /* ---------- 13b. Cuadrante: pestañas por día (móvil) ---------- */
  const tt = $('[data-tt]');
  if (tt) {
    const tabs = $$('[data-tt-day]', tt);
    const show = d => {
      tabs.forEach(b => b.setAttribute('aria-selected', String(+b.dataset.ttDay === d)));
      $$('.tt-day', tt).forEach(c => c.classList.toggle('is-shown', +c.dataset.day === d));
    };
    tabs.forEach(b => b.addEventListener('click', () => show(+b.dataset.ttDay)));
    // abre el día de hoy (o el lunes en fin de semana)
    show(today >= 1 && today <= 5 ? today : 1);
  }

  /* ---------- 13c. Mapa: solo se carga si se pulsa ---------- */
  $$('[data-map]').forEach(card => {
    const btn = $('[data-map-load]', card);
    btn && btn.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.title = 'Mapa de la Escuela de Yoga Cristina Herrera';
      f.src = card.dataset.map;
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      card.append(f);
      card.classList.add('is-loaded');
    });
  });

  /* ---------- 14. Reserva por WhatsApp con mensaje escrito ---------- */
  $$('form[data-composer]').forEach(form => {
    const preview = $('[data-preview]', form);
    const compose = () => {
      const fd = new FormData(form);
      const name = String(fd.get('nombre') || '').trim();
      let intro = form.dataset.intro;
      const sel = $('select[name="practica"]', form);
      if (sel) intro = sel.selectedOptions[0] && sel.selectedOptions[0].dataset.intro ? sel.selectedOptions[0].dataset.intro : 'Me gustaría empezar yoga y que me aconsejéis qué práctica me conviene.';
      const lines = [];
      $$('[data-msg]', form).forEach(inp => {
        const label = inp.dataset.msg;
        if (!label || inp.name === 'practica') return;
        if (inp.type === 'radio' && !inp.checked) return;
        let val = String(inp.value || '').trim().replace(/\s+/g, ' ');
        if (!val) return;
        if (inp.type === 'number') val += ' años';
        lines.push(`• ${label}: ${val}`);
      });
      return `¡Hola, Cristina! 🙏\n${name ? `Soy ${name}. ` : ''}${intro}\n${lines.length ? lines.join('\n') + '\n' : ''}${form.dataset.close}`;
    };
    const update = () => { preview.textContent = compose(); };
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', e => {
      e.preventDefault();
      window.open(waUrl(compose()), '_blank', 'noopener');
      form.classList.remove('sent'); void form.offsetWidth; form.classList.add('sent');
    });
    update();
  });

  /* ---------- 15. Encuentra tu práctica ---------- */
  const fOpts = $$('.finder-opts button');
  if (fOpts.length) {
    const empty = $('.finder-empty');
    fOpts.forEach(b => b.addEventListener('click', () => {
      fOpts.forEach(o => o.setAttribute('aria-checked', String(o === b)));
      if (empty) empty.hidden = true;
      let shown;
      $$('[data-result]').forEach(c => {
        const on = c.dataset.result === b.dataset.target;
        c.hidden = !on;
        if (on) { shown = c; c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; const m = $('.meter', c); if (m) { m.classList.remove('is-in'); setTimeout(() => m.classList.add('is-in'), 120); } }
      });
      if (shown) {
        const r = shown.getBoundingClientRect();
        if (r.top > innerHeight * .7 || r.bottom > innerHeight) scrollToEl(shown);
      }
    }));
  }

  /* ---------- 16. Filtro de prácticas ---------- */
  const filters = $$('[data-filter]');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.setAttribute('aria-selected', String(x === f)));
    const g = f.dataset.filter;
    $$('.pcard').forEach((c, i) => {
      const on = g === 'all' || c.dataset.group === g;
      c.classList.toggle('is-hidden', !on);
      if (on) { c.classList.remove('is-in'); c.style.setProperty('--d', i % 3); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('is-in'))); }
    });
  }));

  /* ---------- 17. Respiración guiada + cuenco tibetano ---------- */
  const stage = $('[data-breathe]');
  if (stage) {
    const orb = $('.breathe-orb', stage);
    const label = $('.breathe-label', stage);
    const secEl = $('[data-sec]', stage);
    const toggle = $('[data-breathe-toggle]');
    const bowlBtn = $('[data-bowl]');
    const cyclesEl = $('[data-cycles]');
    const modes = $$('[data-pattern]');
    let pattern = [4, 2, 6], running = false, step = 0, timer = 0, tick = 0, cycles = 0, bowlOn = false;

    const phaseName = i => pattern.length === 4 ? ['Inhala', 'Retén', 'Exhala', 'Pausa'][i] : ['Inhala', 'Retén', 'Exhala'][i];
    const set = (s, g, t) => { orb.style.setProperty('--t', t + 's'); orb.style.setProperty('--s', s); orb.style.setProperty('--g', g); };
    const phase = () => {
      const name = phaseName(step);
      const dur = pattern[step];
      label.textContent = name;
      buzz(name === 'Inhala' ? 60 : name === 'Exhala' ? [30, 80, 30] : 20);
      if (name === 'Inhala') { set(1, 1, dur); if (bowlOn) bowl(); }
      else if (name === 'Exhala') set(.62, .25, dur);
      let left = dur;
      secEl.textContent = left;
      clearInterval(tick);
      tick = setInterval(() => { left--; secEl.textContent = left > 0 ? left : ''; }, 1000);
      timer = setTimeout(() => {
        step = (step + 1) % pattern.length;
        if (step === 0) { cycles++; cyclesEl.textContent = cycles; }
        phase();
      }, dur * 1000);
    };
    const stop = () => {
      running = false;
      clearTimeout(timer); clearInterval(tick);
      set(.62, .3, 1.2);
      label.textContent = 'Pulsa empezar';
      secEl.textContent = '';
      toggle.innerHTML = PLAY + '<span>Empezar</span>';
    };
    const start = () => {
      running = true; step = 0;
      toggle.innerHTML = PAUSE + '<span>Pausar</span>';
      phase();
    };
    toggle.addEventListener('click', () => running ? stop() : start());
    modes.forEach(m => m.addEventListener('click', () => {
      modes.forEach(x => x.setAttribute('aria-checked', String(x === m)));
      pattern = m.dataset.pattern.split(',').map(Number);
      if (running) { stop(); start(); }
    }));
    bowlBtn.addEventListener('click', () => {
      bowlOn = !bowlOn;
      bowlBtn.setAttribute('aria-pressed', String(bowlOn));
      if (bowlOn) bowl();
    });
    // se pausa si sales de la sección
    new IntersectionObserver(([en]) => { if (!en.isIntersecting && running) stop(); }, { threshold: 0 }).observe(stage);
  }

  /* ---------- 18. Opiniones ---------- */
  $$('[data-slider]').forEach(sl => {
    const items = $$('.review', sl);
    const dots = $$('.dots button', sl);
    let i = 0, timer;
    const show = n => {
      items[i].classList.remove('is-active'); dots[i] && dots[i].setAttribute('aria-selected', 'false');
      i = (n + items.length) % items.length;
      items[i].classList.add('is-active'); dots[i] && dots[i].setAttribute('aria-selected', 'true');
    };
    const play = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 7000); };
    dots.forEach((d, k) => d.addEventListener('click', () => { show(k); play(); }));
    sl.addEventListener('mouseenter', () => clearInterval(timer));
    sl.addEventListener('mouseleave', play);
    play();
  });

  /* ---------- 19. Contadores ---------- */
  const cio = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    cio.unobserve(el);
    const to = parseFloat(el.dataset.count);
    const dec = +el.dataset.decimals || 0;
    if (reduce) return;
    const t0 = performance.now();
    const step = now => {
      const p = clamp((now - t0) / 1600, 0, 1);
      const v = to * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec).replace('.', ',');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- 20. Carrusel de otras prácticas ---------- */
  const track = $('[data-related]');
  if (track) {
    $$('[data-rel]').forEach(b => b.addEventListener('click', () => {
      const card = $('.rcard', track);
      track.scrollBy({ left: (card ? card.offsetWidth + 19 : 320) * +b.dataset.rel, behavior: reduce ? 'auto' : 'smooth' });
    }));
    // arrastrar con el ratón
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { down = false; });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());
  }

  /* ---------- 17b. Escaneo corporal guiado (Yoga Nidra) ---------- */
  const scan = $('[data-scan]');
  if (scan) {
    const steps = JSON.parse(scan.dataset.scan);
    const zones = Object.fromEntries($$('[data-zone]', scan).map(g => [g.dataset.zone, g]));
    const nEl = $('[data-scan-n]', scan), zEl = $('[data-scan-zone]', scan), tEl = $('[data-scan-text]', scan);
    const bar = $('.scan-bar span', scan);
    const btn = $('[data-scan-toggle]');
    const bowlBtn = $('[data-scan-bowl]');
    const STEP = 14;
    const INTRO = tEl.textContent;
    let i = -1, timer = 0, running = false, bowlOn = false;
    const say = (zone, text, n) => {
      tEl.classList.add('is-fading');
      setTimeout(() => { tEl.textContent = text; zEl.textContent = zone; nEl.textContent = n; tEl.classList.remove('is-fading'); }, 450);
    };
    const paint = () => {
      Object.values(zones).forEach(g => g.classList.remove('is-active', 'is-done'));
      steps.forEach(([z], k) => {
        if (k > i) return;
        if (z === 'todo') { if (k === i) Object.values(zones).forEach(g => g.classList.add('is-active')); return; }
        zones[z] && zones[z].classList.add(k === i ? 'is-active' : 'is-done');
      });
    };
    const runBar = sec => {
      bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)';
      void bar.offsetWidth;
      bar.style.transition = `transform ${sec}s linear`; bar.style.transform = 'scaleX(1)';
    };
    const next = () => {
      i++;
      if (i >= steps.length) { finish(); return; }
      const [, zone, text] = steps[i];
      say(zone, text, `${i + 1}/${steps.length}`);
      paint(); runBar(STEP); buzz(40);
      timer = setTimeout(next, STEP * 1000);
    };
    const finish = () => {
      running = false; clearTimeout(timer);
      if (bowlOn) bowl(196);
      buzz([40, 120, 40]);
      say('Final', 'Mueve despacio los dedos, estírate si lo necesitas y abre los ojos cuando quieras.', `${steps.length}/${steps.length}`);
      btn.innerHTML = PLAY + '<span>Repetir</span>';
      i = -1;
    };
    const stop = () => {
      running = false; clearTimeout(timer);
      bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)';
      Object.values(zones).forEach(g => g.classList.remove('is-active', 'is-done'));
      say('Preparación', INTRO, `0/${steps.length}`);
      btn.innerHTML = PLAY + '<span>Empezar</span>';
      i = -1;
    };
    btn.addEventListener('click', () => {
      if (running) { stop(); return; }
      running = true;
      btn.innerHTML = PAUSE + '<span>Detener</span>';
      if (bowlOn) bowl(196);
      next();
    });
    bowlBtn.addEventListener('click', () => {
      bowlOn = !bowlOn;
      bowlBtn.setAttribute('aria-pressed', String(bowlOn));
      if (bowlOn) bowl(196);
    });
  }

  /* ---------- 17c. Carrusel de beneficios en móvil ---------- */
  $$('.benefit-grid').forEach(grid => {
    const cards = $$('.benefit', grid);
    if (cards.length < 2) return;
    const dots = document.createElement('div');
    dots.className = 'car-dots';
    dots.setAttribute('aria-label', 'Beneficios');
    cards.forEach((c, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Beneficio ${k + 1} de ${cards.length}`);
      b.addEventListener('click', () => grid.scrollTo({ left: c.offsetLeft - (grid.clientWidth - c.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' }));
      dots.append(b);
    });
    const hint = document.createElement('p');
    hint.className = 'car-hint';
    hint.textContent = 'Desliza →';
    grid.after(dots, hint);
    const mark = () => {
      const mid = grid.scrollLeft + grid.clientWidth / 2;
      let k = 0, bd = Infinity;
      cards.forEach((c, j) => { const dd = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (dd < bd) { bd = dd; k = j; } });
      [...dots.children].forEach((b, j) => b.setAttribute('aria-current', String(j === k)));
      if (grid.scrollLeft > 20) hint.style.opacity = '0';
    };
    grid.addEventListener('scroll', () => requestAnimationFrame(mark), { passive: true });
    mark();
  });

  /* ---------- 17d. Aviso de demostración ---------- */
  const demo = $('.demo-pill');
  if (demo) {
    demo.addEventListener('click', () => demo.setAttribute('aria-expanded', String(demo.getAttribute('aria-expanded') !== 'true')));
    document.addEventListener('click', e => { if (!demo.contains(e.target)) demo.setAttribute('aria-expanded', 'false'); });
  }

  /* ---------- 21. Botón flotante discreto junto al pie ---------- */
  const float = $('.wa-float');
  const base = $('.footer-base');
  if (float && base) new IntersectionObserver(([en]) => float.classList.toggle('is-away', en.isIntersecting)).observe(base);

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
