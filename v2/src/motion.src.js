/* Ynera · motion.js
   Capa de movimiento debajo del hero: láminas apiladas, índice de láminas,
   reveals de texto, transición bosque → Lám. VI y microinteracciones.
   Principio de marca: crecer, no aparecer. Curva de entrada cubic-bezier(.16,1,.3,1).
   Progressive enhancement: sin este archivo (o con prefers-reduced-motion) la página
   queda estática y completa. Los estados ocultos solo existen bajo html.motion. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const story = $('#story');
  if (!story) return;
  const chaps = $$('#story .chap');
  const secs = $$('main > section.sec');
  const lenis = window.__lenis || null;
  const desk = matchMedia('(min-width: 981px)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');

  /* ================= LÁMINAS: datos ================= */
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  // color de servicio solo en II–IV (V: cian de los casos); el resto en hueso
  const COLORS = ['var(--bone)', 'var(--root)', 'var(--bark)', 'var(--leaf)', 'var(--cyan)',
    'var(--bone)', 'var(--bone)', 'var(--bone)', 'var(--bone)', 'var(--bone)', 'var(--bone)'];
  const SEC_NAMES = ['Para quién', 'Test', 'Nosotros', 'Cómo trabajamos', 'Preguntas', 'Cierre'];
  const plates = [
    ...chaps.map(c => ({el: c, name: (c.dataset.plate || '').split('·').pop().trim()})),
    ...secs.map((s, i) => ({el: s, name: SEC_NAMES[i] || ''}))
  ].slice(0, ROMAN.length);

  /* ================= MÉTRICAS DE FLUJO =================
     Las .sec son sticky y se escalan: su getBoundingClientRect no dice dónde están en el flujo.
     Todo se calcula desde el final de #story (que nunca se transforma) sumando alturas. */
  let M = {vh: innerHeight, storyTop: 0, storyH: 1, storyBottom: 0, secs: [], docH: 1};
  // apilado y telón solo en escritorio con Lenis; en celular, solo reveals
  const stackOn = () => !reduce && !!lenis && desk.matches;
  let stack = stackOn();
  // cuánto de la lámina entrante tiene que subir (fracción de pantalla) antes de que la de abajo empiece a velarse
  const HOLD = .35;
  function measure() {
    const vh = innerHeight, sy = scrollY;
    const storyTop = story.getBoundingClientRect().top + sy, storyH = story.offsetHeight;
    let y = storyTop + storyH;
    const list = secs.map(el => { const h = el.offsetHeight, o = {el, top: y, h}; y += h; return o; });
    M = {vh, storyTop, storyH, storyBottom: storyTop + storyH, secs: list, docH: root.scrollHeight};
    list.forEach(({el, h}) => {
      el.style.setProperty('--st', Math.min(0, vh - h) + 'px');
      el.style.setProperty('--oy', Math.max(h - vh / 2, h / 2).toFixed(0) + 'px');
      el.style.setProperty('--ct', Math.max(0, h - vh) + 'px');
    });
  }
  const chapters = $('.chapters', story);
  const flowTop = i => i < chaps.length
    ? (i === 0 ? 0 : M.storyTop + chapters.offsetTop + chaps[i].offsetTop)
    : (M.secs[i - chaps.length] || {top: 0}).top;

  /* ================= ÍNDICE DE LÁMINAS ================= */
  const rail = document.createElement('nav');
  rail.className = 'rail'; rail.setAttribute('aria-label', 'Índice de láminas');
  rail.innerHTML = plates.map((p, i) => `<a href="#${p.el.id || 'top'}" data-i="${i}" style="--c:${COLORS[i]}" aria-label="Lámina ${ROMAN[i]}: ${p.name}"><span class="rl" aria-hidden="true">${p.name}</span><span class="rn" aria-hidden="true">${ROMAN[i]}</span><span class="rt" aria-hidden="true"></span></a>`).join('');
  document.body.appendChild(rail);
  const railLinks = $$('a', rail);
  const nav = $('.nav'), navIn = $('.nav-in'), brand = $('.nav .brand');
  const navLam = document.createElement('span');
  navLam.className = 'nav-lam num'; navLam.setAttribute('aria-hidden', 'true');
  navLam.innerHTML = `<b>I</b> / ${ROMAN[plates.length - 1]}`;
  if (navIn && brand) brand.after(navLam);
  const navProg = document.createElement('i');
  navProg.className = 'nav-prog'; navProg.setAttribute('aria-hidden', 'true');
  if (nav) nav.appendChild(navProg);
  const navLamB = navLam.querySelector('b');

  const goTo = i => {
    const y = Math.max(0, Math.round(flowTop(i)));
    if (lenis) lenis.scrollTo(y, {duration: 1.6});
    else scrollTo(0, y);
  };
  rail.addEventListener('click', e => {
    const a = e.target.closest('a[data-i]'); if (!a) return;
    e.preventDefault(); e.stopPropagation(); // tree.js no debe medir el rect de una lámina apilada
    goTo(+a.dataset.i);
  });

  let active = -1;
  function setActive() {
    const sy = scrollY, vh = M.vh, mid = sy + vh * .5;
    let idx;
    if (mid < M.storyBottom) {
      // misma fórmula que tree.js para el rótulo "Lám. I · Semilla"
      const p = clamp((sy - M.storyTop) / Math.max(1, M.storyH - vh));
      idx = Math.min(chaps.length - 1, Math.floor(p * chaps.length + .04));
    } else {
      idx = chaps.length;
      M.secs.forEach((s, i) => { if (s.top <= mid) idx = chaps.length + i; });
    }
    idx = Math.min(idx, plates.length - 1);
    navProg.style.transform = `scaleX(${clamp(sy / Math.max(1, M.docH - vh)).toFixed(4)})`;
    if (idx === active) return;
    const first = active < 0;
    active = idx;
    railLinks.forEach((a, i) => { a.classList.toggle('on', i === idx); if (i === idx) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    navLam.style.setProperty('--c', COLORS[idx]); navProg.style.setProperty('--c', COLORS[idx]);
    navLamB.textContent = ROMAN[idx];
    if (!reduce && !first) gsap.fromTo(navLamB, {yPercent: 90, opacity: 0}, {yPercent: 0, opacity: 1, duration: .5, ease: 'power3.out', clearProps: 'transform,opacity'});
  }

  /* con movimiento reducido: índice estático y nada más */
  if (reduce) {
    measure(); setActive();
    addEventListener('scroll', setActive, {passive: true});
    addEventListener('resize', () => { measure(); setActive(); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger, CustomEase);
  window.__motion = {gsap, ScrollTrigger}; // para QA (capturas a velocidad reducida)
  CustomEase.create('grow', '.16,1,.3,1');   // entradas: arranque decidido, llegada lenta
  CustomEase.create('ui', '.2,.8,.2,1');      // UI y hover

  try {
    root.classList.add('motion');
    root.classList.toggle('stack', stack);
    root.classList.toggle('curtain', stack);

    /* ================= APILADO + TELÓN ================= */
    const plate = $('.plate', story), plateIn = $('.plate-in', story);
    const veils = secs.map(s => { const v = document.createElement('div'); v.className = 'sec-veil'; v.setAttribute('aria-hidden', 'true'); s.appendChild(v); return v; });
    const edges = secs.map(s => { const v = document.createElement('div'); v.className = 'sec-edge'; v.setAttribute('aria-hidden', 'true'); s.prepend(v); return v; });
    const eOut = p => 1 - Math.pow(1 - p, 2);
    const last = {};
    // escribe un estilo solo si cambió
    function putStyle(key, target, prop, val) { if (last[key] !== val) { last[key] = val; target[prop] = val; } }
    const bosque = chaps[chaps.length - 1];
    function update() {
      const sy = scrollY, vh = M.vh;
      // V → VI: la placa y la columna de la Lám. V quedan quietas (misma translate) mientras VI sube encima
      const pc = clamp((sy - (M.storyBottom - vh)) / vh);
      const inCurtain = stack && pc > 0 && pc < 1;
      const hold = inCurtain ? `translate3d(0,${(pc * vh).toFixed(1)}px,0)` : '';
      putStyle('pl', plate.style, 'transform', hold);
      putStyle('bq', bosque.style, 'transform', hold);
      putStyle('pis', plateIn.style, 'transform', inCurtain ? `scale(${(1 - .05 * eOut(pc)).toFixed(4)})` : '');
      putStyle('pio', plateIn.style, 'opacity', inCurtain ? (1 - .7 * pc).toFixed(3) : '');
      putStyle('bqo', bosque.style, 'opacity', inCurtain ? (1 - .75 * clamp((pc - .3) / .7)).toFixed(3) : '');
      if (last.curt !== inCurtain) { last.curt = inCurtain; plateIn.classList.toggle('curt', inCurtain); }
      if (!stack) return;
      M.secs.forEach((cur, i) => {
        const next = M.secs[i + 1];
        if (!next) return;
        // la de abajo recién se vela y se aleja en el último tramo (HOLD) de la subida: antes se lee entera
        const L = Math.min(cur.h, vh), W = L * HOLD, p = clamp((sy - (next.top - W)) / W), el = cur.el;
        const gone = sy > next.top + 2, cov = p > 0 && !gone;
        if (last['g' + i] !== gone) { last['g' + i] = gone; el.classList.toggle('gone', gone); }
        if (last['c' + i] !== cov) { last['c' + i] = cov; el.classList.toggle('covering', cov); }
        putStyle('t' + i, el.style, 'transform', p > 0 ? `scale(${(1 - .05 * eOut(p)).toFixed(4)})` : '');
        putStyle('v' + i, veils[i].style, 'opacity', p > 0 ? (.78 * p).toFixed(3) : '0');
      });
    }
    // al cruzar el corte escritorio/celular: limpiar todo lo que el apilado dejó escrito
    function setStack(on) {
      if (on === stack) return;
      stack = on;
      root.classList.toggle('stack', on); root.classList.toggle('curtain', on);
      if (!on) {
        [plate, plateIn, bosque].forEach(e => { e.style.transform = ''; e.style.opacity = ''; });
        plateIn.classList.remove('curt');
        secs.forEach((e, i) => { e.style.transform = ''; e.classList.remove('gone', 'covering'); veils[i].style.opacity = '0'; });
        for (const k in last) delete last[k];
      }
    }

    const tick = () => { update(); setActive(); };
    measure(); tick();
    if (lenis) {
      lenis.on('scroll', () => { tick(); ScrollTrigger.update(); });
    } else addEventListener('scroll', tick, {passive: true});
    let rq = 0;
    const remeasure = () => { cancelAnimationFrame(rq); rq = requestAnimationFrame(() => { measure(); tick(); }); };
    addEventListener('resize', () => { setStack(stackOn()); remeasure(); });
    if ('ResizeObserver' in window) { const ro = new ResizeObserver(remeasure); [story, ...secs].forEach(s => ro.observe(s)); }
    addEventListener('load', remeasure);

    /* Anchors hacia algo dentro de una lámina apilada: tree.js mide el rect del destino.
       Si esa lámina está fija/escalada, la devolvemos al flujo solo durante el click. */
    let measuring = null;
    document.addEventListener('click', e => {
      const a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a || rail.contains(a)) return;
      const id = a.getAttribute('href'); if (id.length < 2) return;
      let t; try { t = document.querySelector(id); } catch (_) { return; }
      const s = t && t.closest('.sec'); if (!s) return;
      s.classList.add('measure'); measuring = s;
    }, true);
    addEventListener('click', () => { if (measuring) { measuring.classList.remove('measure'); measuring = null; } });

    /* ================= TEXTO ================= */
    // 1) títulos por líneas: se parte en palabras, se agrupa por renglón medido y cada renglón es una máscara
    const splitEls = [...$$('.chap:not(.hero) h2'), ...$$('.sec h2'), ...$$('.motto')];
    function split(el) {
      if (el._orig == null) el._orig = el.innerHTML; else el.innerHTML = el._orig;
      const nodes = [];
      [...el.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) nodes.push(document.createTextNode(' '));
            else { const w = document.createElement('span'); w.textContent = part; nodes.push(w); }
          });
        } else nodes.push(n);
      });
      el.textContent = ''; nodes.forEach(n => el.appendChild(n));
      const lines = []; let cur = [], top = null;
      nodes.forEach(n => {
        if (n.nodeName === 'BR') { lines.push(cur); cur = []; top = null; return; }
        if (n.nodeType === 1) {
          const t = n.offsetTop;
          if (top !== null && t > top + 2) { lines.push(cur); cur = []; }
          top = t;
        }
        cur.push(n);
      });
      lines.push(cur);
      el.textContent = '';
      lines.forEach(ln => {
        while (ln.length && ln[0].nodeType === 3) ln.shift();
        while (ln.length && ln[ln.length - 1].nodeType === 3) ln.pop();
        if (!ln.length) return;
        const o = document.createElement('span'), i = document.createElement('span');
        o.className = 'ln-m'; ln.forEach(n => i.appendChild(n)); i.appendChild(document.createTextNode(' '));
        o.appendChild(i); el.appendChild(o);
      });
      el.dataset.split = '';
    }
    splitEls.forEach(split);
    let lastW = innerWidth, st = 0;
    const resplit = () => { splitEls.forEach(el => { gsap.killTweensOf(el.querySelectorAll('.ln-m>span')); split(el); }); ScrollTrigger.refresh(); };
    addEventListener('resize', () => { if (innerWidth === lastW) return; lastW = innerWidth; clearTimeout(st); st = setTimeout(resplit, 220); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { splitEls.forEach(el => { if (!el._busy) split(el); }); remeasure(); });

    // 2) etiquetas de lámina (mono + latín): suben desde 40% con fundido, sin tipeo
    const labelEls = [...$$('.sec .lam'), ...$$('.chap:not(.hero) .plate-no'), ...$$('.chap:not(.hero) .chap-card > .key')];

    // 3) bloques que suben (fade + rise, nunca fade solo) y listas en cascada
    const riseSel = [
      '.chap:not(.hero) .lede', '.chap:not(.hero) .did', '.chap:not(.hero) .ctx', '#bosque .case',
      '.sec .lede', '.fork-hd', '.fork-col li',
      '#list .item', '.reading',
      '.person > *',
      '.step', '.pledge',
      '.faq-side .ctx', '.faq-list details',
      '.offer', '.offer-col > .mono', '.offer-col li', '.offer-ft .cta-row',
      '.foot-sig > *', '.foot-links a', '.foot-meta > *'
    ].join(',');
    const riseEls = $$(riseSel);
    [...labelEls, ...riseEls].forEach(el => { el.dataset.rv = ''; });
    labelEls.forEach(el => { el.dataset.label = ''; });
    const footWord = $('.foot-word svg');

    const reveal = (el, delay) => {
      if (el.classList.contains('rv-in')) return;
      el.classList.add('rv-in');
      if (el.hasAttribute('data-split')) {
        el._busy = true;
        gsap.fromTo(el.querySelectorAll('.ln-m>span'), {yPercent: 112}, {yPercent: 0, duration: .8, ease: 'grow', stagger: .06, delay, clearProps: 'transform', onComplete: () => { el._busy = false; }});
      } else if (el.hasAttribute('data-label')) {
        gsap.fromTo(el.children.length ? el.children : el, {opacity: 0, yPercent: 40}, {opacity: 1, yPercent: 0, duration: .6, ease: 'grow', stagger: .06, delay, clearProps: 'opacity,transform'});
      } else {
        gsap.fromTo(el, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: .75, ease: 'grow', delay, clearProps: 'opacity,transform'});
        // pasos: el número cuenta desde 00
        const num = el.classList.contains('step') && $(':scope > .mono', el);
        if (num) {
          const n = parseInt(num.textContent, 10) || 0, o = {v: 0};
          gsap.to(o, {v: n, duration: .4, ease: `steps(${Math.max(1, n)})`, delay: delay + .1, onUpdate: () => { num.textContent = String(Math.round(o.v)).padStart(2, '0'); }});
        }
      }
    };
    // cascada en orden del DOM también entre lotes: cada elemento arranca 60 ms después del anterior
    // (nunca antes que uno que está más arriba), con un retraso máximo de .4 s → entrada total ≤ 1,2 s
    const docOrder = (a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    let nextAt = 0;
    const io = new IntersectionObserver(entries => {
      const now = performance.now() / 1000;
      entries.filter(e => e.isIntersecting).map(e => e.target).sort(docOrder).forEach(el => {
        io.unobserve(el);
        const d = Math.min(Math.max(0, nextAt - now), .4);
        nextAt = now + d + .06;
        reveal(el, d);
      });
    }, {rootMargin: '0px 0px -8% 0px'}); // = start 'top 92%'
    [...splitEls, ...labelEls, ...riseEls].sort(docOrder).forEach(el => io.observe(el));

    // pie: la palabra crece desde su base
    if (footWord) {
      gsap.fromTo(footWord, {yPercent: 45}, {yPercent: 0, ease: 'none', scrollTrigger: {trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true}});
    }

    // 4) paneles II–V: al salir se desvanecen (cuando el texto ya pasó la mitad superior)
    // (V queda fuera: en escritorio la sostiene el telón; en celular sale con el scroll)
    chaps.slice(1, -1).forEach(ch => {
      const card = $('.chap-card', ch), lastEl = card && card.lastElementChild;
      if (!lastEl) return;
      gsap.fromTo(ch, {opacity: 1}, {opacity: 0, ease: 'power1.in', immediateRender: false,
        scrollTrigger: {trigger: lastEl, start: 'bottom 36%', end: 'bottom 2%', scrub: true}});
    });

    /* ================= MICROINTERACCIONES ================= */
    // flechas → span.arr para que avancen en hover
    $$('.btn, .ctx').forEach(b => {
      const s = [...b.querySelectorAll('span[aria-hidden="true"]')].find(x => x.textContent.trim() === '→');
      if (s) { s.classList.add('arr'); return; }
      const t = [...b.childNodes].reverse().find(n => n.nodeType === 3 && /→\s*$/.test(n.textContent));
      if (t) { t.textContent = t.textContent.replace(/\s*→\s*$/, ' '); const a = document.createElement('span'); a.className = 'arr'; a.setAttribute('aria-hidden', 'true'); a.textContent = '→'; b.appendChild(a); }
    });

    if (fine.matches) {
      // CTA principal (hero) y su eco en el cierre: magnetismo corto, sin rebote
      $$('.chap.hero .btn-glow, #contacto .offer-ft .btn-fill').forEach(btn => {
        const xTo = gsap.quickTo(btn, 'x', {duration: .7, ease: 'power3.out'});
        const yTo = gsap.quickTo(btn, 'y', {duration: .7, ease: 'power3.out'});
        let on = false;
        addEventListener('pointermove', e => {
          const r = btn.getBoundingClientRect();
          const cx = r.left + r.width / 2 - (gsap.getProperty(btn, 'x') || 0);
          const cy = r.top + r.height / 2 - (gsap.getProperty(btn, 'y') || 0);
          const dx = e.clientX - cx, dy = e.clientY - cy;
          const near = Math.abs(dx) < r.width / 2 + 36 && Math.abs(dy) < r.height / 2 + 30;
          if (near) { on = true; xTo(clamp(dx * .15, -6, 6)); yTo(clamp(dy * .2, -6, 6)); }
          else if (on) { on = false; xTo(0); yTo(0); }
        }, {passive: true});
      });
    }

    ScrollTrigger.refresh();
  } catch (err) {
    // si algo falla, nada queda oculto
    root.classList.remove('motion', 'stack', 'curtain');
    $$('[data-rv],[data-split]').forEach(el => el.classList.add('rv-in'));
    console.warn('motion.js', err);
  }
})();
