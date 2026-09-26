// Ynera — escena 3D del árbol sobre una isla flotante.
// Se compila a v2/tree.js con esbuild (ver v2/src/README.md).
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js';
import Lenis from 'lenis';

const canvas = document.getElementById('tree');
const story = document.getElementById('story');
const plateNo = document.getElementById('plateNo');
const labelsEl = document.getElementById('labels');
const chaps = [...document.querySelectorAll('.chap')];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ss = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(x, y, z) { const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return h - Math.floor(h); }
function noise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const c = (a, b, d) => hash(xi + a, yi + b, zi + d);
  const x00 = lerp(c(0, 0, 0), c(1, 0, 0), u), x10 = lerp(c(0, 1, 0), c(1, 1, 0), u);
  const x01 = lerp(c(0, 0, 1), c(1, 0, 1), u), x11 = lerp(c(0, 1, 1), c(1, 1, 1), u);
  return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
}

// <tree-build>
/* ---------- tree structure ----------
   Trunk with a gentle S curve and a planar Y fork (the logo); above it every limb keeps a
   leader (apical dominance) and sprouts laterals along its length with 137.5° phyllotaxis.
   Radii follow da Vinci's rule (area is conserved at each fork). */
const SEG = 6;
const GOLD = 137.5 * Math.PI / 180;
function buildTree(seed, o) {
  const R = rng(seed);
  const branches = [];
  const up = new THREE.Vector3(0, 1, 0);
  function basis(v, ref) {
    const a = ref || (Math.abs(v.y) < .9 ? up : new THREE.Vector3(1, 0, 0));
    const u = new THREE.Vector3().crossVectors(v, a).normalize();
    const w = new THREE.Vector3().crossVectors(v, u).normalize();
    return [u, w];
  }
  function add(b, parent) {
    b.id = branches.length; b.kids = []; b.parent = parent || null;
    b.curve = new THREE.CatmullRomCurve3(b.pts, false, 'centripetal');
    b.len = b.curve.getLength(); b.g1 = b.g0 + b.len;
    branches.push(b); if (parent) parent.kids.push(b);
    return b;
  }
  const rAt = (b, t) => b.r1 + (b.r0 - b.r1) * Math.pow(1 - t, 1.6);
  function path(start, dir, len, wob, trop, bend, lockX) {
    const pts = [start.clone()], p = start.clone(), v = dir.clone();
    for (let i = 1; i <= SEG; i++) {
      const jx = (R() - .5) * wob / SEG * 2; if (!lockX) v.x += jx; v.z += (R() - .5) * wob / SEG * 2; v.y += (R() - .5) * wob / SEG;
      v.y += trop; if (bend) v.add(bend);
      v.normalize();
      p.addScaledVector(v, len / SEG);
      pts.push(p.clone());
    }
    return pts;
  }
  const endDir = b => b.curve.getTangentAt(1).normalize();

  // limbs above the fork
  function limb(start, dir, len, r0, d, parent, g0, hue, bend) {
    const wob = d === 1 ? .22 : .45;
    const trop = d <= 2 ? .04 : d === 3 ? 0 : -.035;
    // the Y arms only wander in depth, so from the front the Y stays clean
    const pts = path(start, dir, len, wob, trop, bend, d === 1);
    const leaf = d >= o.depth;
    const b = add({pts, r0, r1: leaf ? r0 * .35 : Math.max(.012, r0 * .82), d, isRoot: false, g0, hue}, parent);
    if (leaf) return b;
    const nLat = d <= 3 ? 2 : d === 4 && R() < .4 ? 2 : 1;
    const gF = nLat === 2 ? .72 : .80, lF = nLat === 2 ? .48 : .58;
    // leader: keeps going, slightly deflected
    const v = endDir(b), [u, w] = basis(v);
    const ga = R() * Math.PI * 2, gt = (d <= 3 ? .28 : .15) + (R() - .5) * .16;
    // leaders lean away from the crown's axis: an open, umbrella-shaped crown
    const e = b.pts[SEG], out = new THREE.Vector3(e.x, 0, e.z);
    const gs = u.clone().multiplyScalar(Math.cos(ga)).addScaledVector(w, Math.sin(ga));
    if (out.lengthSq() > 1e-4) { out.normalize().addScaledVector(v, -out.dot(v)); gs.addScaledVector(out.normalize(), o.open || 0).normalize(); }
    const gd = v.clone().multiplyScalar(Math.cos(gt)).addScaledVector(gs, Math.sin(gt)).normalize();
    const gr = Math.max(.012, b.r1 * gF);
    b.guided = true;
    limb(b.pts[SEG].clone().addScaledVector(gd, -b.r1 * .6), gd, len * (d < 4 ? .88 : .8) * (d === 1 ? o.crown || 1 : 1), gr, d + 1, b, b.g1 - b.r1 * .6, hue);
    // laterals along the limb
    let az = R() * Math.PI * 2;
    const ts = nLat === 2 ? [.45 + R() * .15, .68 + R() * .17] : [.5 + R() * .35];
    if (d === 1) { ts[0] = .56 + R() * .1; ts[1] = .72 + R() * .12; }
    for (let k = 0; k < nLat; k++) {
      const t = ts[k];
      const p = b.curve.getPointAt(t), vt = b.curve.getTangentAt(t).normalize();
      let side;
      if (d === 1) {
        // keep the first laterals of each Y arm out of the XY plane so the Y still reads from the front
        const [uu, ww] = basis(vt, new THREE.Vector3(0, 0, 1));
        const a = (k ? 1 : -1) * Math.PI / 2 + (R() - .5) * 1.0;
        side = uu.multiplyScalar(Math.cos(a)).addScaledVector(ww, Math.sin(a));
      } else {
        az += GOLD;
        const [uu, ww] = basis(vt);
        side = uu.multiplyScalar(Math.cos(az)).addScaledVector(ww, Math.sin(az));
      }
      const cd = d + 1, tilt = (cd === 2 ? .95 : cd <= 4 ? 1.0 : 1.1) + (R() - .5) * .3;
      const ld = vt.clone().multiplyScalar(Math.cos(tilt)).addScaledVector(side, Math.sin(tilt)).normalize();
      const rp = rAt(b, t);
      // the first laterals of the Y arms wait for the arm to finish, so the hero sprout stays a clean Y
      const lg0 = d === 1 ? b.g1 + .03 : b.g0 + t * b.len;
      // low laterals droop a little, like the lower limbs of a solitary tree
      const droop = cd >= 3 ? new THREE.Vector3(0, -.05 * (1 - clamp((p.y - forkY) / 2.5)), 0) : null;
      limb(p.clone().addScaledVector(ld, -rp * .6), ld, len * (d <= 3 ? .78 : .62) * (d === 1 ? o.crown || 1 : 1), Math.max(.012, b.r1 * lF), cd, b, lg0, hue, droop);
    }
    return b;
  }

  // roots: the original forking cascade (kept as is), plus a gravity/wobble override for hanging roots
  function root(start, dir, len, r0, d, max, g0, parent, wob = .9, grav = .16) {
    const pts = path(start, dir, len, wob, -grav);
    const r1 = r0 * .6;
    const b = add({pts, r0, r1, d, isRoot: true, g0, hue: 0}, parent);
    if (d >= max) { b.r1 = r0 * .3; return b; }
    const n = d > 1 && R() < .28 ? 3 : 2;
    const v = endDir(b), [u, w] = basis(v);
    const az0 = R() * Math.PI * 2;
    for (let k = 0; k < n; k++) {
      const az = az0 + k * (Math.PI * 2 / n) + (R() - .5) * .8;
      const tilt = .6 + (R() - .5) * .3;
      const side = u.clone().multiplyScalar(Math.cos(az)).addScaledVector(w, Math.sin(az));
      const cd = v.clone().multiplyScalar(Math.cos(tilt)).addScaledVector(side, Math.sin(tilt)).normalize();
      root(b.pts[SEG].clone().addScaledVector(cd, -r1 * .5), cd, len * (.72 + R() * .16), r1 * (n === 2 ? .84 : .74), d + 1, max, b.g1, b, wob, grav);
    }
    return b;
  }

  // trunk: gentle S curve plus a 3–4° lean
  let forkY = 2;
  const L0 = o.len, sDir = new THREE.Vector3(Math.cos(.9), 0, Math.sin(.9)), lean = new THREE.Vector3(-.06, 1, .025).normalize();
  const tp = [];
  for (let i = 0; i <= SEG; i++) {
    const p = new THREE.Vector3(0, -.05, 0).addScaledVector(lean, L0 * i / SEG);
    p.addScaledVector(sDir, L0 * .045 * Math.sin(Math.PI * 2 * i / SEG * .75));
    tp.push(p);
  }
  const trunk = add({pts: tp, r0: o.r, r1: o.r * .8, d: 0, isRoot: false, g0: 0, hue: 0, trunk: true, guided: true});
  const top = tp[SEG], tv = endDir(trunk);
  forkY = top.y;
  // the Y: planar and symmetric, each arm with da Vinci's .71
  for (let k = 0; k < 2; k++) {
    const sx = k ? 1 : -1;
    const side = new THREE.Vector3(sx, 0, .15).normalize();
    const cd = tv.clone().multiplyScalar(Math.cos(.5)).addScaledVector(side, Math.sin(.5)).normalize();
    limb(top.clone().addScaledVector(tv, -trunk.r1 * .9).addScaledVector(side, trunk.r1 * .3), cd, L0 * o.arm, trunk.r1 * .71, 1, trunk, trunk.g1 - trunk.r1 * .9, sx, new THREE.Vector3(-sx * .03, 0, 0));
  }
  // short surface roots that snake over the island, continuing the buttresses
  for (let k = 0; k < (o.surf || 0); k++) {
    const az = .4 + k * Math.PI / 3 + (R() - .5) * .25;
    const d0 = new THREE.Vector3(Math.cos(az), -.05, Math.sin(az)).normalize();
    const st = new THREE.Vector3(Math.cos(az) * o.r * .9, -.05 + .27 - .03, Math.sin(az) * o.r * .9);
    const pts = path(st, d0, o.surfLen || .7, .7, -.02);
    add({pts, r0: o.r * .45, r1: o.r * .05, d: 1, isRoot: false, surf: true, g0: 0, hue: 0}, trunk);
  }
  for (let k = 0; k < o.roots; k++) {
    const az = k / o.roots * Math.PI * 2 + .4;
    root(new THREE.Vector3(0, -.05, 0), new THREE.Vector3(Math.cos(az) * .7, -1, Math.sin(az) * .7).normalize(), o.rootLen, o.r * .6, 0, o.rootDepth, 0, null);
  }
  // roots hanging from the underside of the island: the part of the cascade you actually see
  for (let k = 0; k < (o.hang || 0); k++) {
    const az = k / o.hang * Math.PI * 2 + R() * .6, rad = .2 + R() * .8;
    const st = new THREE.Vector3(Math.cos(az) * rad, o.hangY || -1.6, Math.sin(az) * rad);
    const dv = new THREE.Vector3(Math.cos(az) * .35, -1, Math.sin(az) * .35).normalize();
    root(st, dv, o.hangLen, o.hangR || .09, 1, o.hangDepth || 4, R() * .3, null, .5, .25);
  }
  const tree = branches.filter(b => !b.isRoot);
  const gMax = Math.max(...tree.map(b => b.g1));
  const rMax = Math.max(...branches.filter(b => b.isRoot).map(b => b.g1));
  const gY = Math.max(...tree.filter(b => b.d <= 1 && !b.surf).map(b => b.g1)) / gMax;
  return {branches, gMax, rMax, gY, trunk, forkY: top.y, ground: .27};
}
// </tree-build>

/* ---------- smooth, weighted scrolling ---------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({lerp: .085, wheelMultiplier: .9, smoothWheel: true});
  window.__lenis = lenis; // expuesto para motion.js (ScrollTrigger + índice de láminas)
  // motion.js pasa Lenis al ticker de GSAP (un solo rAF) y levanta esta bandera; sin motion.js sigue este loop
  const loop = t => { if (window.__lenisTicker) return; lenis.raf(t); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const el = document.querySelector(id); if (!el) return;
    e.preventDefault(); lenis.scrollTo(el, {offset: 0, duration: 1.6});
  });
}
const hero = document.querySelector('.chap.hero');

let webgl = true;
let renderer;
try {
  renderer = new THREE.WebGLRenderer({canvas, antialias: true, powerPreference: 'high-performance'});
} catch (e) { webgl = false; }
if (!webgl) {
  document.documentElement.classList.add('no-webgl');
} else {
  run();
}

function run() {
  const mobile = () => innerWidth < 980;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile() ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 200);

  const C = {
    root: new THREE.Color('#FF9A1F'),
    bark: new THREE.Color('#B25BFF'),
    leaf: new THREE.Color('#3F7BFF'),
    cyan: new THREE.Color('#27F0D2'),
    white: new THREE.Color('#F4EEFF')
  };

  /* ---------- sky ---------- */
  {
    const g = new THREE.SphereGeometry(90, 32, 16);
    const m = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: `varying vec3 vP;
        void main(){
          float h = normalize(vP).y;
          vec3 top = vec3(.012,.014,.06), mid = vec3(.035,.02,.075), low = vec3(.01,.008,.02);
          vec3 c = mix(mid, top, smoothstep(0., .8, h));
          c = mix(c, low, smoothstep(0., -.6, h));
          // magenta-violet band on the horizon and a cold cyan haze below it
          c += vec3(.14,.035,.2) * exp(-abs(h - .06) * 6.);
          c += vec3(.0,.06,.07) * exp(-abs(h + .12) * 5.);
          // nebula wisps
          float a = atan(vP.z, vP.x);
          c += vec3(.06,.02,.1) * pow(max(0., sin(a*3. + h*6.)), 6.) * smoothstep(-.1,.5,h) * .8;
          gl_FragColor = vec4(c, 1.);
        }`
    });
    scene.add(new THREE.Mesh(g, m));

    const n = 1600, pos = new Float32Array(n * 3), sz = new Float32Array(n);
    const R = rng(3);
    for (let i = 0; i < n; i++) {
      const th = R() * Math.PI * 2, ph = Math.acos(R() * 1.6 - .6), r = 70;
      pos.set([Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r, Math.sin(ph) * Math.sin(th) * r], i * 3);
      sz[i] = R();
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    sg.setAttribute('aS', new THREE.BufferAttribute(sz, 1));
    const sm = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: {uTime: {value: 0}, uPR: {value: renderer.getPixelRatio()}},
      vertexShader: `attribute float aS; uniform float uTime, uPR; varying float vA;
        void main(){ vA = (.25 + .75*aS*aS) * (.6 + .4*sin(uTime*1.3 + aS*40.));
          gl_PointSize = (1. + aS*1.6) * uPR; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord-.5); gl_FragColor = vec4(vec3(.85,.87,1.)*vA*smoothstep(.5,0.,d), 1.); }`
    });
    scene.add(new THREE.Points(sg, sm));
    scene.userData.stars = sm;
  }

  /* ---------- lights ---------- */
  scene.add(new THREE.HemisphereLight(0x7f8cff, 0x2a1a08, .55));
  const moon = new THREE.DirectionalLight(0xb8c2ff, 1.1); moon.position.set(-6, 10, 6); scene.add(moon);
  const under = new THREE.PointLight(0xffa640, 0, 18, 1.4); under.position.set(0, -3.6, 0); scene.add(under);
  const crown = new THREE.PointLight(0x8f7bff, 0, 18, 1.6); crown.position.set(0, 5.5, 0); scene.add(crown);

  /* ---------- shared GLSL ---------- */
  const SWAY = `
    uniform float uTime, uWind;
    vec3 sway(vec3 p){
      float h = max(0., p.y - 1.7);
      p.x += sin(uTime*.8 + p.y*.7 + p.z*.3) * h*h * .018 * uWind;
      p.z += cos(uTime*.6 + p.y*.5 + p.x*.3) * h*h * .014 * uWind;
      return p;
    }`;

  /* ---------- tree ---------- */
  function tubeGeometry(T, radialFor) {
    const P = [], G = [], K = [], B = [], U = [], Th = [], Rd = [], I = [];
    let vi = 0;
    const pt = new THREE.Vector3(), tg = new THREE.Vector3(), off = new THREE.Vector3(), bin = new THREE.Vector3();
    const sm = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
    for (const b of T.branches) {
      const radial = radialFor(b), d = b.d, root = b.isRoot, trunk = !!b.trunk;
      const rings = trunk ? 56 : root ? (d <= 1 ? 14 : d <= 3 ? 9 : 6) : b.surf ? 12 : d <= 1 ? 24 : d <= 3 ? 12 : 6;
      // bark: vertical ridges (cantos) that fade out on thin twigs
      const F = root ? (d <= 1 ? 5 : 0) : b.surf ? 6 : d === 0 ? 14 : d === 1 ? 9 : d <= 3 ? 6 : 0;
      const A = root ? (d <= 1 ? .07 : 0) : b.surf ? .06 : d === 0 ? .10 : d <= 2 ? .06 : d === 3 ? .04 : 0;
      const L = b.len, norm = root ? T.rMax : T.gMax;
      let nrm = null, r = 0;
      for (let i = 0; i <= rings; i++) {
        const u = i / rings, t = trunk ? .5 - .5 * Math.cos(Math.PI * u) : u;  // the trunk packs rings at its flared base and at the fork
        b.curve.getPointAt(t, pt); b.curve.getTangentAt(t, tg).normalize();
        if (!nrm) nrm = Math.abs(tg.y) < .9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
        nrm.addScaledVector(tg, -nrm.dot(tg)).normalize();       // parallel transport
        bin.crossVectors(tg, nrm).normalize();
        r = b.r1 + (b.r0 - b.r1) * Math.pow(1 - t, 1.6);
        if (b.parent && !root) r *= b.d === 1 && !b.surf ? 1 + .18 * Math.pow(Math.max(0, 1 - t / .3), 2) : 1 + .12 * Math.pow(Math.max(0, 1 - t / .25), 2);   // branch collar
        if (b.guided && !trunk) r *= 1 + .06 * sm(.92, 1, t);
        if (trunk) r *= 1 - .1 * sm(.9, 1, t);   // round shoulder tucked inside the collars of the Y arms
        const s = t * L;
        const g = (b.g0 + t * L) / norm;
        const hue = b.hue * sm(T.forkY - .15, T.forkY + 1.1, pt.y);
        const thin = sm(.075, .014, r);
        for (let j = 0; j < radial; j++) {
          const a = j / radial * Math.PI * 2;
          off.copy(nrm).multiplyScalar(Math.cos(a)).addScaledVector(bin, Math.sin(a));
          const th = trunk ? Math.atan2(off.z, off.x) : a;   // world azimuth on the trunk so the buttresses meet the roots
          const c = Math.cos(th), sn = Math.sin(th);
          // ridges wander, split and merge instead of running as regular flutes
          const q = Math.sin(F * th + .35 * s + 2.5 * noise(c * 2 + b.id * 3.1, s * 1.8, sn * 2) + 2.2 * (noise(c * 4 + 9, s * 3.2, sn * 4) - .5));
          const ridge = sm(-.2, .8, q), furrow = sm(-.8, .1, q);
          let rr = r;
          if (trunk) {
            const e = Math.exp(-Math.max(0, s - T.ground) / (.09 * L));
            rr *= 1 + .75 * e * (.45 + .55 * Math.pow(.5 + .5 * Math.cos(6 * (th - .4)), 1.6));
            rr -= r * .03 * (noise(c * 3 + 7, s * 6, sn * 3) > .72 ? 1 : 0);   // horizontal fissures
            rr *= 1 + sm(.72, .97, t) * (.14 * c * c - .3 * sn * sn);   // the crotch turns elliptical along the plane of the fork
          }
          rr += r * A * (ridge - .5);
          rr *= 1 + .1 * (noise(c * 1.3 + b.id, s * 1.2 + 5, sn * 1.3) - .5);   // bumps ±5%
          P.push(pt.x + off.x * rr, pt.y + off.y * rr, pt.z + off.z * rr);
          G.push(g); K.push(root ? 1 : 0); B.push(trunk ? lerp(furrow, .6, sm(.9, 1, t)) : F || A ? furrow : .5 + .3 * ridge); U.push(hue); Th.push(thin); Rd.push(rr);
        }
        if (i > 0) {
          const s0 = vi + (i - 1) * radial, s1 = vi + i * radial;
          for (let j = 0; j < radial; j++) {
            const j2 = (j + 1) % radial;
            I.push(s0 + j, s1 + j2, s1 + j, s0 + j, s0 + j2, s1 + j2);   // outward-facing winding
          }
        }
      }
      // close the tip with a small dome so no cut-off ends show
      const last = vi + rings * radial, cap = last + radial;
      const dome = trunk ? .15 : .6;
      P.push(pt.x + tg.x * r * dome, pt.y + tg.y * r * dome, pt.z + tg.z * r * dome);
      G.push(b.g1 / norm); K.push(root ? 1 : 0); B.push(.6); U.push(b.hue * sm(T.forkY - .15, T.forkY + 1.1, pt.y)); Th.push(sm(.075, .014, r)); Rd.push(0);
      if (b.parent) {   // and plug the base, which sits inside the parent
        b.curve.getPointAt(0, off); b.curve.getTangentAt(0, bin);
        P.push(off.x - bin.x * b.r0 * .5, off.y - bin.y * b.r0 * .5, off.z - bin.z * b.r0 * .5);
        G.push(b.g0 / norm + .002); K.push(root ? 1 : 0); B.push(.6); U.push(0); Th.push(0); Rd.push(0);
      }
      for (let j = 0; j < radial; j++) I.push(last + j, last + (j + 1) % radial, cap);
      if (b.parent) for (let j = 0; j < radial; j++) I.push(vi + j, cap + 1, vi + (j + 1) % radial);
      vi = cap + 1 + (b.parent ? 1 : 0);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute('aGrow', new THREE.Float32BufferAttribute(G, 1));
    geo.setAttribute('aKind', new THREE.Float32BufferAttribute(K, 1));
    geo.setAttribute('aBark', new THREE.Float32BufferAttribute(B, 1));
    geo.setAttribute('aHue', new THREE.Float32BufferAttribute(U, 1));
    geo.setAttribute('aThin', new THREE.Float32BufferAttribute(Th, 1));
    geo.setAttribute('aRad', new THREE.Float32BufferAttribute(Rd, 1));
    geo.setIndex(I);
    geo.computeVertexNormals();
    return geo;
  }

  function treeMaterial(u) {
    return new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: `${SWAY}
        uniform float uGrow, uRoot;
        attribute float aGrow, aKind, aBark, aHue, aThin, aRad;
        varying float vGrow, vKind, vH, vX, vB, vHue, vThin; varying vec3 vN, vV;
        void main(){
          // while a limb grows, its last stretch closes into a point instead of ending as a cut pipe
          float lim = aKind > .5 ? uRoot : uGrow;
          float k = smoothstep(0., .05, lim - aGrow);
          vec3 p0 = position - normal * aRad * (1. - k);
          vec3 p = aKind > .5 ? p0 : sway(p0);
          vX = position.x;
          vec4 wp = modelMatrix * vec4(p, 1.);
          vN = normalize(mat3(modelMatrix) * normal);
          vV = normalize(cameraPosition - wp.xyz);
          vGrow = aGrow; vKind = aKind; vH = position.y; vB = aBark; vHue = aHue; vThin = aThin;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: `
        uniform float uGrow, uRoot, uBark, uTime, uFade, uGlow;
        uniform vec3 cRoot, cBark, cLeaf;
        varying float vGrow, vKind, vH, vX, vB, vHue, vThin; varying vec3 vN, vV;
        void main(){
          float lim = vKind > .5 ? uRoot : uGrow;
          if (vGrow > lim + .0001) discard;
          vec3 N = normalize(vN), V = normalize(vV);
          if (!gl_FrontFacing) N = -N;
          float fres = pow(1. - abs(dot(N, V)), 2.4);
          // moonlit wood: dark in the furrows, pale on the ridges
          float lit = clamp((dot(N, normalize(vec3(-6.,10.,6.))) + .35) / 1.35, 0., 1.);
          float ao = mix(.45, 1., smoothstep(0., .5, vH));
          vec3 wood = mix(vec3(.018,.014,.022), vec3(.13,.10,.12), vB);
          vec3 base = wood * (.25 + lit * 1.05) * vec3(.92,.95,1.1) * ao;
          // logo gradient carried by each arm of the Y: blue on the left, violet trunk, amber on the right
          vec3 logo = vHue < 0. ? mix(cBark, cLeaf, -vHue) : mix(cBark, cRoot, vHue);
          vec3 tint = vKind > .5 ? cRoot : logo;
          float groove = pow(1. - vB, 3.);
          // light running up the furrows like sap
          float sap = .35 + .35 * sin(vH * 3. - uTime * .8 + vX);
          float glow = groove * sap * (vKind > .5 ? 1.7 : 1.2) + (vKind > .5 ? .18 : .04);
          // twigs become filaments of light where the wood is too thin to read as bark
          glow += vThin * (.4 + .25 * sap) * (vKind > .5 ? .5 : 1.);
          float rim = fres * (vKind > .5 ? 1.5 : .7) * (.25 + .75 * vB);
          // bark "layers": slow bands of light climbing the trunk during the security plate
          float bands = vKind < .5 ? pow(.5 + .5*sin(vH*4.2 - uTime*1.2), 24.) * uBark * (1. - smoothstep(2., 3.4, vH)) * (.35 + 1.2 * (1. - vB)) : 0.;
          // growth front: a bright tip where the tree is currently growing
          float front = (1. - smoothstep(0., .018, lim - vGrow)) * (1. - step(.999, lim));
          vec3 col = base + tint * (rim + glow + bands) * uGlow + vec3(1.,.9,.75) * front * .2;
          gl_FragColor = vec4(col * uFade, 1.);
        }`
    });
  }

  function leaves(T, count, seed, u) {
    const R = rng(seed);
    const maxD = Math.max(...T.branches.map(b => b.d));
    const tips = T.branches.filter(b => !b.isRoot && !b.surf && b.d >= maxD - 2);
    const n = tips.length * count;
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), gr = new Float32Array(n), rd = new Float32Array(n);
    let xmin = 1e9, xmax = -1e9;
    tips.forEach(t => { const e = t.pts[SEG]; xmin = Math.min(xmin, e.x - e.z * .3); xmax = Math.max(xmax, e.x - e.z * .3); });
    const c = new THREE.Color();
    let i = 0;
    for (const t of tips) {
      const e = t.pts[SEG];
      const k = ((e.x - e.z * .3) - xmin) / (xmax - xmin || 1);
      for (let j = 0; j < count; j++, i++) {
        const r = Math.cbrt(R()) * .36, th = R() * Math.PI * 2, ph = Math.acos(2 * R() - 1);
        pos.set([e.x + r * Math.sin(ph) * Math.cos(th), e.y + r * Math.cos(ph) * .8 + .08, e.z + r * Math.sin(ph) * Math.sin(th)], i * 3);
        const kk = clamp(k + (R() - .5) * .25);
        // logo gradient across the crown: blue → violet → amber
        if (kk < .5) c.copy(C.leaf).lerp(C.bark, kk * 2); else c.copy(C.bark).lerp(C.root, (kk - .5) * 2);
        col.set([c.r, c.g, c.b], i * 3);
        gr[i] = t.g1 / T.gMax; rd[i] = R();
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aGrow', new THREE.BufferAttribute(gr, 1));
    g.setAttribute('aR', new THREE.BufferAttribute(rd, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `${SWAY}
        uniform float uGrow, uLeaf, uPR, uSize;
        attribute vec3 aColor; attribute float aGrow, aR;
        varying vec3 vC; varying float vA;
        void main(){
          vec3 p = sway(position);
          p.y += sin(uTime*1.2 + aR*20.) * .02;
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          float on = smoothstep(aGrow, aGrow + .04, uGrow) * uLeaf;
          vA = on * (.55 + .45*sin(uTime*2. + aR*50.));
          vC = aColor;
          gl_PointSize = uSize * (.5 + aR) * uPR * on * clamp(length(modelMatrix[0].xyz) * 2.2, 0., 1.) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `varying vec3 vC; varying float vA;
        void main(){
          float d = length(gl_PointCoord - .5);
          float a = smoothstep(.5, .0, d), core = smoothstep(.16, .0, d);
          gl_FragColor = vec4((vC * a * .95 * .6 + vec3(1.) * core * .08) * vA, 1.);
        }`
    });
    return new THREE.Points(g, m);
  }

  function neural(T, u) {
    const tips = T.branches.filter(b => !b.isRoot && !b.surf && !b.kids.length).map(b => b.pts[SEG]);
    const P = [], A = [], Rr = [];
    const R = rng(9);
    tips.forEach((a, i) => {
      const near = tips.map((b, j) => [j, a.distanceToSquared(b)]).filter(([j, d]) => j !== i && d < 1.2).sort((x, y) => x[1] - y[1]).slice(0, 2);
      for (const [j] of near) { if (j < i) continue; const b = tips[j]; const r = R(); P.push(a.x, a.y, a.z, b.x, b.y, b.z); A.push(0, 1); Rr.push(r, r); }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    g.setAttribute('aT', new THREE.Float32BufferAttribute(A, 1));
    g.setAttribute('aR', new THREE.Float32BufferAttribute(Rr, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `${SWAY} attribute float aT, aR; varying float vT, vR;
        void main(){ vT = aT; vR = aR; gl_Position = projectionMatrix * modelViewMatrix * vec4(sway(position), 1.); }`,
      fragmentShader: `uniform float uNeural, uTime; uniform vec3 cLeaf; varying float vT, vR;
        void main(){
          float pulse = smoothstep(.09, 0., abs(fract(uTime*.35 + vR) - vT));
          gl_FragColor = vec4((cLeaf * .5 + vec3(.9,.92,1.) * pulse * 1.6) * uNeural * (.22 + pulse), 1.);
        }`
    });
    return new THREE.LineSegments(g, m);
  }

  function motes(T, u) {
    // light rising from the void into the hanging roots: data feeding the tree
    const tips = T.branches.filter(b => b.isRoot && !b.kids.length).map(b => b.pts[SEG]);
    const R = rng(5), n = tips.length * 5;
    const pos = new Float32Array(n * 3), rd = new Float32Array(n);
    let i = 0;
    for (const t of tips) for (let j = 0; j < 5; j++, i++) { pos.set([t.x + (R() - .5) * .3, t.y, t.z + (R() - .5) * .3], i * 3); rd[i] = R(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aR', new THREE.BufferAttribute(rd, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uTime, uRoot, uPR; attribute float aR; varying float vA;
        void main(){
          float ph = fract(uTime * (.06 + aR*.06) + aR);
          vec3 p = position; p.y -= (1. - ph) * 3.2; p.x += sin(ph*6. + aR*9.) * .12;
          vA = sin(ph * 3.1416) * uRoot;
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_PointSize = (18. + aR*14.) * uPR / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `uniform vec3 cRoot; varying float vA;
        void main(){ float d = length(gl_PointCoord-.5); gl_FragColor = vec4(cRoot * smoothstep(.5,0.,d) * vA * 1.4, 1.); }`
    });
    return new THREE.Points(g, m);
  }

  /* ---------- floating island ---------- */
  const grassU = {uTime: {value: 0}, cCyan: {value: null}, uGlow: {value: 1.05}};
  function island(seed, R0 = 3.3, H0 = 2.4) {
    // a lathe-like grid: domed mossy top, an overhanging moss lip, then a stratified rock cone
    const cols = 96, prof = [];
    const TOP = 14, SIDE = 46;
    for (let k = 0; k <= TOP; k++) prof.push([R0 * k / TOP, null, 0]);
    prof.push([R0 * 1.04, -.035, 1]);           // moss lip, slightly proud of the edge
    prof.push([R0 * .975, -.14, 2]);            // tucked under the lip
    for (let m = 1; m <= SIDE; m++) { const t = m / SIDE; prof.push([lerp(R0 * .95, .3, Math.pow(t, .9)), -.14 - t * (H0 - .14), 3]); }
    prof.push([0, -H0 - .15, 3]);
    const angN = a => noise(Math.cos(a) * 2 + seed, 0, Math.sin(a) * 2);
    const topH = (a, r) => (1 - (r / R0) ** 2) * .22 + (noise(Math.cos(a) * 5 + seed, 0, Math.sin(a) * 5) - .5) * .08 * (r / R0)
      + (noise(Math.cos(a) * r * 1.6 + seed, 3, Math.sin(a) * r * 1.6) - .5) * .05 * (r / R0);
    const P = [], col = [], I = [];
    const moss = new THREE.Color('#123a2c'), mossHi = new THREE.Color('#1f5a41'), lip = new THREE.Color('#2b7454'), tuck = new THREE.Color('#0d231b');
    const stone = new THREE.Color('#2e2640'), band = new THREE.Color('#4a3b5e'), deep = new THREE.Color('#150f22');
    const c = new THREE.Color();
    for (let i = 0; i < prof.length; i++) {
      const [r0, y0, kind] = prof[i];
      for (let j = 0; j < cols; j++) {
        const a = j / cols * Math.PI * 2, na = angN(a);
        let rr, y;
        if (kind === 0) {
          const k = r0 / R0;
          rr = r0 * (1 + (na - .5) * .3 * k * k); y = topH(a, r0);
          c.copy(moss).lerp(mossHi, noise(Math.cos(a) * 5 + seed, 0, Math.sin(a) * 5));
        } else if (kind === 1 || kind === 2) {
          rr = r0 * (1 + (na - .5) * .3); y = topH(a, R0) + y0;
          if (kind === 1) c.copy(lip).lerp(mossHi, noise(Math.cos(a) * 9, 1, Math.sin(a) * 9)); else c.copy(tuck);
        } else {
          const t = clamp(-y0 / H0);
          const n1 = noise(Math.cos(a) * 2 + seed, y0 * .9, Math.sin(a) * 2);
          const n2 = noise(Math.cos(a) * 5 + seed, y0 * 2.2, Math.sin(a) * 5);
          const n3 = noise(Math.cos(a) * 9 + seed, y0 * 14, Math.sin(a) * 9);
          const strata = Math.sin(y0 * 26 + n1 * 6 + n3 * 5);
          rr = r0 * (1 + (na - .5) * .3 * (1 - t) + (n1 - .5) * .35 * t + (n2 - .5) * .2) * (1 - t * .1);
          rr *= 1 + .012 * strata + .03 * (n3 - .5);   // horizontal rock strata
          y = y0 - Math.pow(n2, 3) * .8 * t;           // stalactite-like drips underneath
          c.copy(stone).lerp(band, .35 * clamp(strata * .5 + .5) ** 3).lerp(deep, clamp(t * 1.2 + (n1 - .5) * .4));
        }
        P.push(Math.cos(a) * rr, y, Math.sin(a) * rr);
        col.push(c.r, c.g, c.b);
        if (i > 0) {
          const s0 = (i - 1) * cols, s1 = i * cols, j2 = (j + 1) % cols;
          I.push(s0 + j, s1 + j2, s1 + j, s0 + j, s0 + j2, s1 + j2);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(I); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({vertexColors: true, roughness: .92, metalness: 0}));
    const grp = new THREE.Group(); grp.add(mesh);

    // grass: short blades in clumps; a quarter of them carry the cyan glow
    const R = rng(seed * 7 + 1), n = Math.round(R0 * R0 * 150);
    const blade = new THREE.ConeGeometry(.011, .09, 3); blade.translate(0, .045, 0);
    const glowA = new Float32Array(n);
    const gm = new THREE.ShaderMaterial({
      uniforms: grassU,
      vertexShader: `uniform float uTime; attribute float aG; varying float vH, vG;
        void main(){
          vH = clamp(position.y / .09, 0., 1.); vG = aG;
          vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.);
          float w = sin(uTime*1.4 + wp.x*1.7 + wp.z*1.3) + .5*sin(uTime*2.3 + wp.x*3.1);
          wp.x += w * vH * vH * .03; wp.z += w * vH * vH * .02;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: `uniform vec3 cCyan; uniform float uGlow; varying float vH, vG;
        void main(){
          vec3 c = mix(vec3(.015,.05,.035), vec3(.05,.19,.12), vH);
          c += cCyan * pow(vH, 4.) * uGlow * vG;
          gl_FragColor = vec4(c, 1.);
        }`
    });
    const inst = new THREE.InstancedMesh(blade, gm, n);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), v = new THREE.Vector3();
    let placed = 0;
    for (let tries = 0; placed < n && tries < n * 12; tries++) {
      const rr = Math.sqrt(R()) * R0 * .9, a = R() * Math.PI * 2;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      if (rr < .5 || rr > R0 * .88) continue;
      const clump = noise(x * 1.2 + seed, 7, z * 1.2);
      if (R() > Math.pow(clump, 2.2) * 2.2) continue;
      q.setFromEuler(new THREE.Euler((R() - .5) * .6, R() * 6, (R() - .5) * .6));
      const k = .7 + R() * .9; s.set(k, k * (.6 + R() * .9) * (.7 + clump * .6), k);
      m4.compose(v.set(x, topH(a, rr) - .01, z), q, s); inst.setMatrixAt(placed, m4);
      glowA[placed] = R() < .25 ? .8 + R() * .7 : 0;
      placed++;
    }
    inst.count = placed;
    blade.setAttribute('aG', new THREE.InstancedBufferAttribute(glowA, 1));
    grp.add(inst);
    return grp;
  }

  function makeTree(seed, o, leafCount) {
    const u = {
      uTime: {value: 0}, uWind: {value: reduce ? 0 : 1}, uGrow: {value: 1}, uRoot: {value: 1}, uBark: {value: 0},
      uLeaf: {value: 1}, uNeural: {value: 0}, uFade: {value: 1}, uGlow: {value: 1}, uPR: {value: renderer.getPixelRatio()}, uSize: {value: 120},
      cRoot: {value: C.root}, cBark: {value: C.bark}, cLeaf: {value: C.leaf}
    };
    const T = buildTree(seed, o);
    const grp = new THREE.Group();
    const radial = b => b.isRoot ? (b.d === 0 ? 12 : b.d === 1 ? 10 : b.d <= 3 ? 7 : 5)
      : b.surf ? 16 : b.d === 0 ? 48 : b.d === 1 ? 32 : b.d <= 3 ? 16 : b.d <= 5 ? 7 : 5;
    grp.add(new THREE.Mesh(tubeGeometry(T, radial), treeMaterial(u)));
    grp.add(leaves(T, leafCount, seed + 1, u));
    grp.add(neural(T, u));
    return {T, u, grp};
  }

  grassU.cCyan.value = C.cyan;

  /* ---------- main island ---------- */
  const world = new THREE.Group(); scene.add(world);
  const mainIsland = island(1.7);
  world.add(mainIsland);
  const main = makeTree(11, {len: 2.1, r: .27, arm: .8, crown: .85, open: 3, depth: mobile() ? 6 : 7, roots: 6, rootLen: 1.9, rootDepth: mobile() ? 4 : 5,
    surf: 5, surfLen: .7, hang: mobile() ? 5 : 7, hangLen: 1.6, hangY: -1.6, hangDepth: 4}, mobile() ? 7 : 6);
  world.add(main.grp);
  const rootMotes = motes(main.T, main.u); world.add(rootMotes);

  // security: thin rings of light hugging the trunk, like the growth layers of the bark itself
  const rings = new THREE.Group();
  [[.62, .55, .06], [.58, 1.1, -.05], [.54, 1.62, .04]].forEach(([r, y, tilt]) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, .007, 6, 120), new THREE.MeshBasicMaterial({color: C.bark, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false}));
    t.rotation.x = Math.PI / 2 + tilt; t.position.set(-.06 * y / 2.1, y, .025 * y / 2.1); rings.add(t);
  });
  world.add(rings);

  // sparks spiralling around the sprout: the hero's living moment
  const heroU = {uTime: main.u.uTime, uPR: main.u.uPR, uHero: {value: 1}, cA: {value: C.cyan}, cB: {value: C.root}, cC: {value: C.bark}};
  const sparks = (() => {
    const n = 260, R = rng(31), rd = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) rd.set([R(), R(), R()], i * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aR', new THREE.BufferAttribute(rd, 3));
    const m = new THREE.ShaderMaterial({
      uniforms: heroU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uTime, uPR, uHero; attribute vec3 aR; varying float vA; varying float vK;
        void main(){
          float ph = fract(uTime * (.05 + aR.y*.07) + aR.x);
          float ang = aR.x * 6.2832 + uTime * (.25 + aR.z * .35);
          float rad = .35 + ph * (1.2 + aR.z * 1.4);
          vec3 p = vec3(cos(ang) * rad, .1 + ph * (3.2 + aR.y), sin(ang) * rad);
          vA = sin(ph * 3.1416) * uHero; vK = aR.z;
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_PointSize = (10. + aR.y * 16.) * uPR / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `uniform vec3 cA, cB, cC; varying float vA, vK;
        void main(){ float d = length(gl_PointCoord - .5);
          vec3 c = vK < .33 ? cA : vK < .66 ? cB : cC;
          gl_FragColor = vec4(c * smoothstep(.5, 0., d) * vA * 1.5, 1.); }`
    });
    return new THREE.Points(g, m);
  })();
  sparks.frustumCulled = false;
  world.add(sparks);

  // fireflies drifting around the island
  const ff = (() => {
    const n = 220, R = rng(77), pos = new Float32Array(n * 3), rd = new Float32Array(n);
    for (let i = 0; i < n; i++) { const a = R() * Math.PI * 2, r = 2 + R() * 7; pos.set([Math.cos(a) * r, -3 + R() * 11, Math.sin(a) * r], i * 3); rd[i] = R(); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aR', new THREE.BufferAttribute(rd, 1));
    const m = new THREE.ShaderMaterial({
      uniforms: {uTime: main.u.uTime, uPR: main.u.uPR, uA: {value: .6}}, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uTime, uPR; attribute float aR; varying float vA, vR;
        void main(){ vec3 p = position; p.x += sin(uTime*.2 + aR*30.)*.6; p.y += sin(uTime*.15 + aR*12.)*.5; p.z += cos(uTime*.18 + aR*20.)*.6;
          vA = pow(.5 + .5*sin(uTime*(.6+aR) + aR*40.), 3.); vR = aR;
          vec4 mv = modelViewMatrix*vec4(p,1.); gl_PointSize = (14. + aR*10.)*uPR / -mv.z; gl_Position = projectionMatrix*mv; }`,
      fragmentShader: `uniform float uA; varying float vA, vR; void main(){ float d = length(gl_PointCoord-.5);
        vec3 c = vR < .33 ? vec3(1.,.62,.15) : vR < .66 ? vec3(.3,.5,1.) : vec3(.2,1.,.85); gl_FragColor = vec4(c*smoothstep(.5,0.,d)*vA*uA, 1.); }`
    });
    return new THREE.Points(g, m);
  })();
  world.add(ff);

  /* ---------- the forest: Aira, CDI, ReservaYá ---------- */
  const FOREST = [
    {name: 'Aira', seed: 21, pos: [-10, 1.5, 3], s: .55},
    {name: 'CDI', seed: 33, pos: [-2.8, 1, 15], s: .62},
    {name: 'ReservaYá', seed: 48, pos: [3.5, -3, 8], s: .45}
  ].map(f => {
    const grp = new THREE.Group();
    grp.add(island(f.seed * .37, 3, 2.2));
    const t = makeTree(f.seed, {len: 1.9, r: .22, arm: .8, crown: .7, open: 2, depth: 6, roots: 4, rootLen: 1.2, rootDepth: 4,
      surf: 4, surfLen: .6, hang: 3, hangLen: 1.1, hangY: -1.4, hangDepth: 3}, 6);
    t.u.uNeural.value = .5; t.u.uSize.value = 110;
    grp.add(t.grp);
    grp.position.set(...f.pos); grp.scale.setScalar(.0001); grp.visible = false;
    scene.add(grp);
    const el = document.createElement('div'); el.className = 'tag3d mono'; el.textContent = f.name; labelsEl.appendChild(el);
    return {...f, grp, t, el};
  });
  const mainTag = document.createElement('div'); mainTag.className = 'tag3d mono'; mainTag.textContent = 'El próximo: el tuyo'; labelsEl.appendChild(mainTag);

  /* ---------- post ---------- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), .65, .55, .45);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------- camera path, one key per plate ---------- */
  const KEYS = [
    {p: 0,    r: 9.8,  th: .15, y: 2.4,  ty: 1.5},
    {p: .25,  r: 11,   th: .75, y: -5.2, ty: -4.6},
    {p: .47,  r: 8.5,  th: .35, y: 2.2, ty: 1.4},
    {p: .68,  r: 13.5, th: 2.05, y: 5.4, ty: 3.6},
    {p: .9,   r: 27,   th: 2.55, y: 7.5, ty: 1.2},
    {p: 1,    r: 28,   th: 2.65, y: 7.5, ty: 1.2}
  ];
  function camAt(p) {
    let i = 0; while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
    const a = KEYS[i], b = KEYS[i + 1], t = ss(a.p, b.p, p);
    const o = {}; for (const k of ['r', 'th', 'y', 'ty']) o[k] = lerp(a[k], b[k], t);
    return o;
  }

  let W = 0, H = 0;
  // Adaptive quality: start modest and step down while the frame rate is poor.
  // Levels: [pixel ratio cap, bloom on]. Retina + full bloom was the main cost.
  const LEVELS = mobile() ? [[1, true], [.85, true], [.75, false]] : [[1.25, true], [1, true], [.85, true], [.75, false]];
  let level = 0;
  const pr = () => Math.min(devicePixelRatio || 1, LEVELS[level][0]);
  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    renderer.setPixelRatio(pr());
    renderer.setSize(W, H, false);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(W, H);
    camera.aspect = W / H;
    // push the scene off-centre so the text column stays clear
    if (mobile()) camera.setViewOffset(W, H, 0, H * .2, W, H);
    else camera.setViewOffset(W, H, -W * .2, 0, W, H);
    camera.updateProjectionMatrix();
    [main, ...FOREST.map(f => f.t)].forEach(t => { t.u.uPR.value = renderer.getPixelRatio(); t.u.uSize.value = (t === main ? 120 : 110) * (H / 900); });
  }
  resize();
  addEventListener('resize', resize);

  let visible = true;
  const perf = {t: 0, n: 0};
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(story);

  const clock = new THREE.Clock();
  let time = 0, intro = reduce ? 1 : 0, pS = 0;
  const v3 = new THREE.Vector3();
  // pointer parallax, eased
  const ptr = {x: 0, y: 0, sx: 0, sy: 0};
  addEventListener('pointermove', e => { ptr.x = e.clientX / innerWidth * 2 - 1; ptr.y = e.clientY / innerHeight * 2 - 1; }, {passive: true});

  // progreso de #story sin getBoundingClientRect por cuadro: posición y alto cacheados, se remiden al cambiar tamaño
  let sTop = 0, sH = 1;
  const measureStory = () => { sTop = story.getBoundingClientRect().top + scrollY; sH = story.offsetHeight; };
  measureStory();
  addEventListener('resize', measureStory); addEventListener('load', measureStory);
  if ('ResizeObserver' in window) new ResizeObserver(measureStory).observe(story);
  pS = progress();
  function progress() {
    const y = lenis ? lenis.scroll : scrollY;
    return clamp((y - sTop) / Math.max(1, sH - innerHeight));
  }
  // actividad: con la página quieta (sin scroll ni puntero) la escena baja a 30 fps
  let lastInput = 0;
  const poke = () => { lastInput = performance.now(); };
  ['scroll', 'pointermove', 'wheel', 'touchmove', 'keydown'].forEach(t => addEventListener(t, poke, {passive: true}));
  let renders = 0, sinceRender = 1, frozenAt = -1;
  window.__T3 = {setLevel: l => { level = l; resize(); }, get level() { return level; }, get visible() { return visible; }, get renders() { return renders; }};

  function place(el, obj, dy, a) {
    v3.setFromMatrixPosition(obj.matrixWorld); v3.y += dy; v3.project(camera);
    const x = (v3.x * .5 + .5) * W, y = (-v3.y * .5 + .5) * H;
    el.style.transform = `translate(${x}px,${y}px)`;
    el.style.opacity = a * (v3.z < 1 ? 1 : 0);
  }

  function frame() {
    const rawDt = clock.getDelta();
    const dt = Math.min(.05, rawDt);
    // measure ~1.5 s windows while the scene is on screen; step quality down if under ~50 fps
    if (visible && !document.hidden) {
      perf.t += rawDt; perf.n++;
      if (perf.t > 1.5) {
        const fps = perf.n / perf.t;
        if (!window.__noAQ && fps < 50 && level < LEVELS.length - 1) { level++; resize(); }
        perf.t = 0; perf.n = 0;
      }
    }
    if (!reduce) { time += dt; intro = Math.min(1, intro + dt / 2.6); }
    requestAnimationFrame(frame);
    sinceRender += rawDt;
    if (!visible || document.hidden) return;

    // the camera trails the scroll with a little weight instead of jumping
    const raw = progress();
    pS += (raw - pS) * (reduce ? 1 : 1 - Math.exp(-dt * 5.5));
    if (raw >= .999) pS = 1; // empieza el telón V → VI: último cuadro exacto y congelar ya, sin esperar el suavizado
    const p = pS;
    ptr.sx += (ptr.x - ptr.sx) * (1 - Math.exp(-dt * 3)); ptr.sy += (ptr.y - ptr.sy) * (1 - Math.exp(-dt * 3));
    const heroK = 1 - ss(0, .14, p);
    if (hero) hero.style.setProperty('--out', (1 - ss(0, .12, raw)).toFixed(3));
    const pII = ss(.12, .28, p), pIII = ss(.38, .56, p), pIV = ss(.58, .76, p), pV = ss(.8, .96, p);
    const idx = Math.min(4, Math.floor(p * 5 + .04));
    const lab = chaps[idx].dataset.plate; if (plateNo.textContent !== lab) plateNo.textContent = lab;

    const ie = 1 - Math.pow(1 - intro, 3);
    const u = main.u;
    u.uTime.value = time;
    u.uGrow.value = lerp(main.T.gY * ie, .42, pIII) + (1 - .42) * pIV;
    u.uRoot.value = pII;
    u.uBark.value = pIII * (1 - ss(0, .5, pIV));
    u.uLeaf.value = pIV;
    u.uNeural.value = pIV * (1 - pV * .3);
    rings.children.forEach((r, i) => { r.material.opacity = pIII * (1 - ss(0, .35, pIV)) * (.55 + .45 * Math.sin(time * 1.3 - i * 1.4)); r.rotation.z = time * (.15 + i * .07) * (i % 2 ? -1 : 1); });
    rings.visible = pIII > .01 && pIV < .99;
    rootMotes.visible = pII > .01;
    under.intensity = 40 * pII + 6;
    crown.intensity = 30 * pIV;
    scene.userData.stars.uniforms.uTime.value = time;
    grassU.uTime.value = time;
    heroU.uHero.value = heroK * ie;
    sparks.visible = heroK > .01;

    // gentle float of the whole island
    world.position.y = Math.sin(time * .5) * .12;
    world.rotation.y = Math.sin(time * .07) * .05;

    FOREST.forEach((f, i) => {
      const s = f.s * ss(i * .12, .7 + i * .1, pV);
      f.grp.visible = s > .002; f.grp.scale.setScalar(Math.max(.0001, s));
      f.grp.position.y = f.pos[1] + Math.sin(time * .45 + i * 2) * .18;
      f.t.u.uTime.value = time + i * 3;
      if (f.grp.visible) place(f.el, f.grp, -2.4 * f.s * 1.9, pV); else f.el.style.opacity = 0;
    });
    if (pV > .01) place(mainTag, world, -4.2, pV); else mainTag.style.opacity = 0;

    if (mobile()) {
      const oy = H * (.2 + .1 * ss(.78, .9, p));   // the forest rides higher, clear of the long text card
      if (Math.abs(oy - (camera.view ? camera.view.offsetY : 0)) > .5) { camera.setViewOffset(W, H, 0, oy, W, H); camera.updateProjectionMatrix(); }
    }
    const k = camAt(p);
    const th = k.th + Math.sin(time * .08) * .06;
    // narrow screens need a wider shot to fit the tree horizontally
    const rm = W / H < .8 ? 1.75 : W / H < 1.2 ? 1.3 : 1;
    const par = reduce ? 0 : .35 + heroK * .65;
    const th2 = th + ptr.sx * .12 * par;
    camera.position.set(Math.sin(th2) * k.r * rm, lerp(k.ty, k.y, rm > 1 ? .85 : 1) + (rm - 1) * 1.5 - ptr.sy * .5 * par, Math.cos(th2) * k.r * rm);
    // a slow push-in while the hero is on screen
    camera.position.multiplyScalar(1 - heroK * (1 - Math.exp(-time * .08)) * .12);
    camera.lookAt(0, k.ty, 0);

    // telón V → VI: la escena queda congelada en su último cuadro (se dibuja una vez al llegar)
    const settled = raw >= .999 && 1 - pS < .002;
    if (settled && frozenAt === W * H) return;
    frozenAt = settled ? W * H : -1;
    // quieta: 30 fps (el viento sigue, a medio ritmo)
    if (!settled && performance.now() - lastInput > 1200 && sinceRender < 1 / 30 - .004) return;
    sinceRender = 0; renders++;
    // bloom solo mientras el hero está en pantalla, en escritorio y si el nivel adaptativo lo permite;
    // sin bloom el brillo propio del árbol sube para que siga viéndose vivo
    const useBloom = !mobile() && LEVELS[level][1] && raw < .12;
    const g = useBloom ? 1 : 1.35;
    if (u.uGlow.value !== g) { u.uGlow.value = g; FOREST.forEach(f => { f.t.u.uGlow.value = g; }); renderer.toneMappingExposure = useBloom ? 1 : 1.08; }
    // siempre por el composer (render target sin MSAA): dibujar directo al canvas con antialias sale más caro
    if (bloom.enabled !== useBloom) bloom.enabled = useBloom;
    composer.render();
  }
  requestAnimationFrame(frame);
}
