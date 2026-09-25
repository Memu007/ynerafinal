// Ynera — escena 3D del árbol sobre una isla flotante.
// Se compila a v2/tree.js con esbuild (ver v2/src/README.md).
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass.js';

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
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 200);

  const C = {
    root: new THREE.Color('#FFB547'),
    bark: new THREE.Color('#9B6BFF'),
    leaf: new THREE.Color('#6F86FF'),
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
          vec3 top = vec3(.018,.022,.06), mid = vec3(.03,.028,.06), low = vec3(.012,.01,.014);
          vec3 c = mix(mid, top, smoothstep(0., .8, h));
          c = mix(c, low, smoothstep(0., -.6, h));
          // soft violet glow near the horizon behind the island
          c += vec3(.05,.03,.09) * exp(-abs(h - .05) * 7.);
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
  const SEG = 6;
  function buildTree(seed, o) {
    const R = rng(seed);
    const branches = [];
    const up = new THREE.Vector3(0, 1, 0);
    function basis(v) {
      const a = Math.abs(v.y) < .9 ? up : new THREE.Vector3(1, 0, 0);
      const u = new THREE.Vector3().crossVectors(v, a).normalize();
      const w = new THREE.Vector3().crossVectors(v, u).normalize();
      return [u, w];
    }
    function grow(start, dir, len, r0, d, max, isRoot, g0, parent, planar) {
      const pts = [start.clone()];
      const p = start.clone(), v = dir.clone();
      const wob = isRoot ? .9 : .26;
      for (let i = 1; i <= SEG; i++) {
        v.x += (R() - .5) * wob / SEG * 2; v.z += (R() - .5) * wob / SEG * 2; v.y += (R() - .5) * wob / SEG;
        if (isRoot) v.y -= .16; else if (d > 0) v.y += d < 4 ? .06 : -.012;
        v.normalize();
        p.addScaledVector(v, len / SEG);
        pts.push(p.clone());
      }
      const r1 = r0 * (isRoot ? .6 : d === 0 ? .7 : .64);
      const b = {pts, r0, r1, d, isRoot, g0, g1: g0 + len, parent, kids: []};
      branches.push(b); if (parent) parent.kids.push(b);
      if (d >= max) return b;
      let n = 2;
      if (!planar && d > 1 && R() < .28) n = 3;
      const [u, w] = basis(v);
      const az0 = R() * Math.PI * 2;
      for (let k = 0; k < n; k++) {
        // the trunk's first fork is kept planar so the sprout reads as a Y from the front
        const az = planar ? (k ? 0 : Math.PI) : az0 + k * (Math.PI * 2 / n) + (R() - .5) * .8;
        const tilt = (isRoot ? .6 : .38 + d * .07) + (R() - .5) * .3;
        const side = u.clone().multiplyScalar(Math.cos(az)).addScaledVector(w, Math.sin(az));
        const cd = v.clone().multiplyScalar(Math.cos(tilt)).addScaledVector(side, Math.sin(tilt)).normalize();
        grow(p, cd, len * (isRoot ? .72 + R() * .16 : .76 + R() * .1), r1 * (n === 2 ? .84 : .74), d + 1, max, isRoot, b.g1, b, false);
      }
      return b;
    }
    const trunk = grow(new THREE.Vector3(0, -.05, 0), new THREE.Vector3(0, 1, 0), o.len, o.r, 0, 0, false, 0, null, false);
    // rebuild from the trunk with a planar first fork, so the sprout reads as a Y from the front
    branches.length = 0;
    const t2 = (function () {
      const pts = trunk.pts, b = {pts, r0: trunk.r0, r1: trunk.r1, d: 0, isRoot: false, g0: 0, g1: trunk.g1, parent: null, kids: []};
      branches.push(b);
      const v = pts[SEG].clone().sub(pts[SEG - 1]).normalize();
      for (let k = 0; k < 2; k++) {
        const side = new THREE.Vector3(k ? 1 : -1, 0, .15);
        const cd = v.clone().multiplyScalar(Math.cos(.5)).addScaledVector(side.normalize(), Math.sin(.5)).normalize();
        grow(pts[SEG], cd, o.len * .8, b.r1 * .84, 1, o.depth, false, b.g1, b, false);
      }
      return b;
    })();
    for (let k = 0; k < o.roots; k++) {
      const az = k / o.roots * Math.PI * 2 + .4;
      grow(new THREE.Vector3(0, -.05, 0), new THREE.Vector3(Math.cos(az) * .7, -1, Math.sin(az) * .7).normalize(), o.rootLen, o.r * .6, 0, o.rootDepth, true, 0, null, false);
    }
    const gMax = Math.max(...branches.filter(b => !b.isRoot).map(b => b.g1));
    const rMax = Math.max(...branches.filter(b => b.isRoot).map(b => b.g1));
    const gY = Math.max(...branches.filter(b => !b.isRoot && b.d <= 1).map(b => b.g1)) / gMax;
    return {branches, gMax, rMax, gY, trunk: t2};
  }

  function tubeGeometry(T, radialFor) {
    const P = [], N = [], G = [], K = [], I = [];
    let vi = 0;
    const tmp = new THREE.Vector3();
    for (const b of T.branches) {
      const radial = radialFor(b);
      const pts = b.pts;
      let nrm = null;
      for (let i = 0; i <= SEG; i++) {
        const t = pts[Math.min(SEG, i + 1)].clone().sub(pts[Math.max(0, i - 1)]).normalize();
        if (!nrm) { nrm = Math.abs(t.y) < .9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0); }
        nrm = nrm.clone().sub(t.clone().multiplyScalar(nrm.dot(t))).normalize();  // parallel transport
        const bin = new THREE.Vector3().crossVectors(t, nrm).normalize();
        const r = lerp(b.r0, b.r1, i / SEG);
        const g = lerp(b.g0, b.g1, i / SEG) / (b.isRoot ? T.rMax : T.gMax);
        for (let j = 0; j < radial; j++) {
          const a = j / radial * Math.PI * 2;
          tmp.copy(nrm).multiplyScalar(Math.cos(a)).addScaledVector(bin, Math.sin(a));
          P.push(pts[i].x + tmp.x * r, pts[i].y + tmp.y * r, pts[i].z + tmp.z * r);
          N.push(tmp.x, tmp.y, tmp.z);
          G.push(g); K.push(b.isRoot ? 1 : 0);
        }
        if (i > 0) {
          const s0 = vi + (i - 1) * radial, s1 = vi + i * radial;
          for (let j = 0; j < radial; j++) {
            const j2 = (j + 1) % radial;
            I.push(s0 + j, s1 + j, s1 + j2, s0 + j, s1 + j2, s0 + j2);
          }
        }
      }
      vi += (SEG + 1) * radial;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3));
    geo.setAttribute('aGrow', new THREE.Float32BufferAttribute(G, 1));
    geo.setAttribute('aKind', new THREE.Float32BufferAttribute(K, 1));
    geo.setIndex(I);
    return geo;
  }

  function treeMaterial(u) {
    return new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: `${SWAY}
        attribute float aGrow, aKind;
        varying float vGrow, vKind, vH; varying vec3 vN, vV;
        void main(){
          vec3 p = aKind > .5 ? position : sway(position);
          vec4 wp = modelMatrix * vec4(p, 1.);
          vN = normalize(mat3(modelMatrix) * normal);
          vV = normalize(cameraPosition - wp.xyz);
          vGrow = aGrow; vKind = aKind; vH = position.y;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: `
        uniform float uGrow, uRoot, uBark, uTime, uFade;
        uniform vec3 cRoot, cBark, cLeaf;
        varying float vGrow, vKind, vH; varying vec3 vN, vV;
        void main(){
          float lim = vKind > .5 ? uRoot : uGrow;
          if (vGrow > lim + .0001) discard;
          vec3 N = normalize(vN), V = normalize(vV);
          float fres = pow(1. - abs(dot(N, V)), 2.4);
          float lit = max(dot(N, normalize(vec3(-.5,.9,.5))), 0.) * .55 + .2;
          vec3 base = vec3(.05,.042,.06) * lit;
          vec3 tint = vKind > .5 ? cRoot : mix(cBark, cLeaf, smoothstep(2.6, 5.6, vH));
          float rim = fres * (vKind > .5 ? 2.6 : 1.1 + uBark * .8);
          // bark "layers": slow bands of light climbing the trunk during the security plate
          float bands = vKind < .5 ? pow(.5 + .5*sin(vH*4.2 - uTime*1.2), 40.) * uBark * (1. - smoothstep(2., 3.4, vH)) * .9 : 0.;
          // growth front: a bright tip where the tree is currently growing
          float front = (1. - smoothstep(0., .018, lim - vGrow)) * (1. - step(.999, lim));
          vec3 col = base + tint * (rim + bands) + vec3(1.,.9,.75) * front * .9;
          gl_FragColor = vec4(col * uFade, 1.);
        }`
    });
  }

  function leaves(T, count, seed, u) {
    const R = rng(seed);
    const maxD = Math.max(...T.branches.map(b => b.d));
    const tips = T.branches.filter(b => !b.isRoot && b.d >= maxD - 3);
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
        const r = Math.cbrt(R()) * .62, th = R() * Math.PI * 2, ph = Math.acos(2 * R() - 1);
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
          gl_PointSize = uSize * (.5 + aR) * uPR * on / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `varying vec3 vC; varying float vA;
        void main(){
          float d = length(gl_PointCoord - .5);
          float a = smoothstep(.5, .0, d), core = smoothstep(.16, .0, d);
          gl_FragColor = vec4((vC * a * .95 + vec3(1.) * core * .18) * vA, 1.);
        }`
    });
    return new THREE.Points(g, m);
  }

  function neural(T, u) {
    const tips = T.branches.filter(b => !b.isRoot && !b.kids.length).map(b => b.pts[SEG]);
    const P = [], A = [], Rr = [];
    const R = rng(9);
    tips.forEach((a, i) => {
      const near = tips.map((b, j) => [j, a.distanceToSquared(b)]).filter(([j, d]) => j !== i && d < 2.4).sort((x, y) => x[1] - y[1]).slice(0, 2);
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
  function island(seed, R0 = 3.3, H0 = 2.4) {
    const geo = new THREE.CylinderGeometry(R0, .3, H0, 72, 18, false);
    geo.translate(0, -H0 / 2, 0);
    const p = geo.attributes.position, col = [];
    const moss = new THREE.Color('#1c3326'), mossHi = new THREE.Color('#2d4f37'), stone = new THREE.Color('#2a2531'), deep = new THREE.Color('#141019');
    const c = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const r = Math.hypot(x, z) || 1e-6, a = Math.atan2(z, x);
      const t = -y / H0;                                  // 0 top → 1 bottom
      const n1 = noise(Math.cos(a) * 2 + seed, y * .9, Math.sin(a) * 2);
      const n2 = noise(Math.cos(a) * 5 + seed, y * 2.2, Math.sin(a) * 5);
      let rr = r;
      if (y > -.01) {                                     // top: gentle dome with small bumps
        y = (1 - (r / R0) ** 2) * .22 + (n2 - .5) * .08 * (r / R0);
        rr = r * (1 + (n1 - .5) * .12);
      } else {
        rr = r * (1 + (n1 - .5) * .45 + (n2 - .5) * .2) * (1 - t * .1);
        y -= Math.pow(n2, 3) * .8 * t;                     // stalactite-like drips underneath
      }
      p.setXYZ(i, Math.cos(a) * rr, y, Math.sin(a) * rr);
      if (y > -.02) c.copy(moss).lerp(mossHi, n2);
      else c.copy(stone).lerp(deep, clamp(t * 1.2 + (n1 - .5) * .4));
      col.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    const g2 = geo.toNonIndexed(); g2.computeVertexNormals();
    const mesh = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({vertexColors: true, flatShading: true, roughness: .92, metalness: 0}));
    const grp = new THREE.Group(); grp.add(mesh);

    // grass blades on top
    const R = rng(seed * 7 + 1), n = Math.round(R0 * R0 * 70);
    const blade = new THREE.ConeGeometry(.014, .16, 3); blade.translate(0, .08, 0);
    const gm = new THREE.MeshStandardMaterial({color: '#3c7a52', emissive: '#0d2a1a', roughness: .8, flatShading: true});
    const inst = new THREE.InstancedMesh(blade, gm, n);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), v = new THREE.Vector3();
    for (let i = 0; i < n; i++) {
      const rr = Math.sqrt(.02 + R() * .95) * R0 * .92, a = R() * Math.PI * 2;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      const y = (1 - (rr / R0) ** 2) * .22;
      q.setFromEuler(new THREE.Euler((R() - .5) * .5, R() * 6, (R() - .5) * .5));
      const k = .6 + R() * 1.1; s.set(k, k * (.7 + R() * .8), k);
      m4.compose(v.set(x, y - .01, z), q, s); inst.setMatrixAt(i, m4);
    }
    grp.add(inst);
    return grp;
  }

  function makeTree(seed, o, leafCount) {
    const u = {
      uTime: {value: 0}, uWind: {value: reduce ? 0 : 1}, uGrow: {value: 1}, uRoot: {value: 1}, uBark: {value: 0},
      uLeaf: {value: 1}, uNeural: {value: 0}, uFade: {value: 1}, uPR: {value: renderer.getPixelRatio()}, uSize: {value: 150},
      cRoot: {value: C.root}, cBark: {value: C.bark}, cLeaf: {value: C.leaf}
    };
    const T = buildTree(seed, o);
    const grp = new THREE.Group();
    grp.add(new THREE.Mesh(tubeGeometry(T, b => b.d < 2 && !b.isRoot ? 12 : b.d < 4 ? 7 : 4), treeMaterial(u)));
    grp.add(leaves(T, leafCount, seed + 1, u));
    grp.add(neural(T, u));
    return {T, u, grp};
  }

  /* ---------- main island ---------- */
  const world = new THREE.Group(); scene.add(world);
  const mainIsland = island(1.7);
  world.add(mainIsland);
  const main = makeTree(11, {len: 2.1, r: .27, depth: 8, roots: 6, rootLen: 1.9, rootDepth: 5}, mobile() ? 6 : 8);
  world.add(main.grp);
  const rootMotes = motes(main.T, main.u); world.add(rootMotes);

  // security: rings of light around the trunk + a faint protective shell
  const secU = {uTime: main.u.uTime, uShield: {value: 0}, cBark: {value: C.bark}};
  const rings = new THREE.Group();
  [[1.05, .5, .15], [1.45, 1.2, -.12], [1.9, 1.9, .1]].forEach(([r, y, tilt]) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, .006, 6, 160), new THREE.MeshBasicMaterial({color: C.bark, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false}));
    t.rotation.x = Math.PI / 2 + tilt; t.position.y = y; rings.add(t);
  });
  world.add(rings);
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(4.2, 5), new THREE.ShaderMaterial({
    uniforms: secU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN, vV, vP; void main(){ vec4 wp = modelMatrix*vec4(position,1.); vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition-wp.xyz); vP = position; gl_Position = projectionMatrix*viewMatrix*wp; }',
    fragmentShader: `uniform float uShield, uTime; uniform vec3 cBark; varying vec3 vN, vV, vP;
      void main(){
        float f = pow(1. - abs(dot(normalize(vN), normalize(vV))), 3.);
        float scan = smoothstep(.06, 0., abs(fract(vP.y*.18 - uTime*.12) - .5));
        float grid = smoothstep(.97, 1., abs(sin(vP.y*9.))) * .25;
        gl_FragColor = vec4(cBark * (f * .45 + scan * .12 + grid * f * .5) * uShield, 1.);
      }`
  }));
  shell.scale.set(1, 1.12, 1); shell.position.y = 3.2;
  world.add(shell);

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
        vec3 c = mix(vec3(1.,.72,.3), vec3(.55,.6,1.), step(.5, vR)); gl_FragColor = vec4(c*smoothstep(.5,0.,d)*vA*uA, 1.); }`
    });
    return new THREE.Points(g, m);
  })();
  world.add(ff);

  /* ---------- the forest: Aira, CDI, ReservaYá ---------- */
  const FOREST = [
    {name: 'Aira', seed: 21, pos: [-10, 1.5, 3], s: .55},
    {name: 'CDI', seed: 33, pos: [-2.8, 1, 15], s: .62},
    {name: 'ReservaYá', seed: 48, pos: [-4, -2.5, 9], s: .45}
  ].map(f => {
    const grp = new THREE.Group();
    grp.add(island(f.seed * .37, 3, 2.2));
    const t = makeTree(f.seed, {len: 1.9, r: .18, depth: 6, roots: 4, rootLen: 1.2, rootDepth: 4}, 10);
    t.u.uNeural.value = .5; t.u.uSize.value = 170;
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
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), .7, .6, .2);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------- camera path, one key per plate ---------- */
  const KEYS = [
    {p: 0,    r: 9.8,  th: .15, y: 2.4,  ty: 1.5},
    {p: .25,  r: 11,   th: .75, y: -3.8, ty: -2.9},
    {p: .47,  r: 11,   th: 1.35, y: 2.8, ty: 2.1},
    {p: .68,  r: 15.5, th: 2.05, y: 5.8, ty: 3.8},
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
  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile() ? 1.5 : 2));
    renderer.setSize(W, H, false);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(W, H);
    camera.aspect = W / H;
    // push the scene off-centre so the text column stays clear
    if (mobile()) camera.setViewOffset(W, H, 0, H * .2, W, H);
    else camera.setViewOffset(W, H, -W * .2, 0, W, H);
    camera.updateProjectionMatrix();
    [main, ...FOREST.map(f => f.t)].forEach(t => { t.u.uPR.value = renderer.getPixelRatio(); t.u.uSize.value = (t === main ? 150 : 170) * (H / 900); });
  }
  resize();
  addEventListener('resize', resize);

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(story);

  const clock = new THREE.Clock();
  let time = 0, intro = reduce ? 1 : 0;
  const v3 = new THREE.Vector3();

  function progress() {
    const r = story.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - innerHeight));
  }

  function place(el, obj, dy, a) {
    v3.setFromMatrixPosition(obj.matrixWorld); v3.y += dy; v3.project(camera);
    const x = (v3.x * .5 + .5) * W, y = (-v3.y * .5 + .5) * H;
    el.style.transform = `translate(${x}px,${y}px)`;
    el.style.opacity = a * (v3.z < 1 ? 1 : 0);
  }

  function frame() {
    const dt = Math.min(.05, clock.getDelta());
    if (!reduce) { time += dt; intro = Math.min(1, intro + dt / 2.6); }
    requestAnimationFrame(frame);
    if (!visible) return;

    const p = progress();
    const pII = ss(.16, .36, p), pIII = ss(.38, .56, p), pIV = ss(.58, .76, p), pV = ss(.8, .96, p);
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
    secU.uShield.value = pIII * (1 - ss(0, .35, pIV));
    rings.children.forEach((r, i) => { r.material.opacity = pIII * (1 - ss(0, .35, pIV)) * .7; r.rotation.z = time * (.15 + i * .07) * (i % 2 ? -1 : 1); });
    rings.visible = shell.visible = pIII > .01 && pIV < .99;
    rootMotes.visible = pII > .01;
    under.intensity = 40 * pII + 6;
    crown.intensity = 30 * pIV;
    scene.userData.stars.uniforms.uTime.value = time;

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

    const k = camAt(p);
    const th = k.th + Math.sin(time * .08) * .06;
    // narrow screens need a wider shot to fit the tree horizontally
    const rm = W / H < .8 ? 1.75 : W / H < 1.2 ? 1.3 : 1;
    camera.position.set(Math.sin(th) * k.r * rm, lerp(k.ty, k.y, rm > 1 ? .85 : 1) + (rm - 1) * 1.5, Math.cos(th) * k.r * rm);
    camera.lookAt(0, k.ty, 0);

    composer.render();
  }
  requestAnimationFrame(frame);
}
