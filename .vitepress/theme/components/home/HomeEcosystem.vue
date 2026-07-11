<template>
<section ref="viewport" id="eco" class="home-ecosystem">
  <main ref="content" class="ecosystem-content" aria-label="ElfUI crystal feature network">
    <canvas ref="networkCanvas" class="network-canvas" width="3072" height="1728"></canvas>

    <div class="center-aura"></div>
    <div class="snowflake-wrap">
      <img class="snowflake" src="/home/snowflake.png" alt="" draggable="false" />
    </div>

    <section class="cards" aria-label="Features">
      <article class="ice-card card-components">
        <span class="ice-rim"></span><span class="card-surface"></span>
        <div class="card-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 5 38 13v17L24 38 10 30V13Z"/><path d="m10 13 14 8 14-8M24 21v17"/></svg></div>
        <h2>Components</h2>
        <p>Build powerful UI<br />with crystal clarity.</p>
        <span class="card-diamond"></span>
      </article>
      <article class="ice-card card-reactivity">
        <span class="ice-rim"></span><span class="card-surface"></span>
        <div class="card-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M27 4 13 27h12l-4 17 15-24H24Z"/></svg></div>
        <h2>Reactivity</h2>
        <p>Fine-grained updates<br />that just flow.</p>
        <span class="card-diamond"></span>
      </article>
      <article class="ice-card card-vscode">
        <span class="ice-rim"></span><span class="card-surface"></span>
        <div class="card-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="m16 12-9 12 9 12M32 12l9 12-9 12M28 7l-8 34"/></svg></div>
        <h2>VS Code Plugin</h2>
        <p>Intelligent tooling,<br />right where you code.</p>
        <span class="card-diamond"></span>
      </article>
      <article class="ice-card card-runtime">
        <span class="ice-rim"></span><span class="card-surface"></span>
        <div class="card-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17"/><path d="M24 13v12l8 5"/></svg></div>
        <h2>Runtime</h2>
        <p>Small, fast, and<br />always ready.</p>
        <span class="card-diamond"></span>
      </article>
      <article class="ice-card card-vite">
        <span class="ice-rim"></span><span class="card-surface"></span>
        <div class="card-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M20 5h8v8a5 5 0 0 1 7 7h8v8h-8a5 5 0 0 1-7 7v8h-8v-8a5 5 0 0 1-7-7H5v-8h8a5 5 0 0 1 7-7Z"/></svg></div>
        <h2>Vite Plugin</h2>
        <p>Supercharge your build<br />with ease.</p>
        <span class="card-diamond"></span>
      </article>
      <article class="ice-card card-chain">
        <span class="ice-rim"></span><span class="card-surface"></span>
        <div class="card-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="m20 29-4 4a8 8 0 0 1-11-11l8-8a8 8 0 0 1 11 0"/><path d="m28 19 4-4a8 8 0 0 1 11 11l-8 8a8 8 0 0 1-11 0"/><path d="m17 31 14-14"/></svg></div>
        <h2>Chain</h2>
        <p>Connect and scale<br />without limits.</p>
        <span class="card-diamond"></span>
      </article>
    </section>

    <div class="bottom-glint"></div>
    <canvas ref="snowCanvas" class="ecosystem-snow" width="3072" height="1728"></canvas>
  </main>
</section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const viewport = ref(null);
const content = ref(null);
const networkCanvas = ref(null);
const snowCanvas = ref(null);
let cleanup = () => {};

onMounted(() => {
  const DESIGN_W = 1536;
  const DESIGN_H = 864;
  const DPR = 2;
  const viewportEl = viewport.value;
  const contentEl = content.value;
  const networkCanvasEl = networkCanvas.value;
  const snowCanvasEl = snowCanvas.value;
  if (!viewportEl || !contentEl || !networkCanvasEl || !snowCanvasEl) return;
  const nctx = networkCanvasEl.getContext('2d');
  const sctx = snowCanvasEl.getContext('2d');
  if (!nctx || !sctx) return;
  nctx.scale(DPR, DPR);
  sctx.scale(DPR, DPR);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = { x: 768, y: 433 };
  const TAU = Math.PI * 2;

  function fitContent() {
    const scale = Math.min(viewportEl.clientWidth / DESIGN_W, viewportEl.clientHeight / DESIGN_H);
    contentEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  window.addEventListener('resize', fitContent, { passive: true });
  fitContent();

  const paths = [
    { cx: 768, cy: 438, rx: 500, ry: 282, dash: [5, 10], solidA: .18, alpha: .46, width: 1.55, speed: .18 },
    { cx: 768, cy: 438, rx: 444, ry: 234, dash: [4, 11], solidA: .13, alpha: .36, width: 1.25, speed: -.14 },
    { cx: 768, cy: 438, rx: 350, ry: 174, dash: [3, 11], solidA: .09, alpha: .24, width: 1.0, speed: .10 },
  ];

  const links = [
    { p0:[485,295], p1:[530,340], p2:[594,374], major:true },
    { p0:[1068,295], p1:[1018,337], p2:[943,373], major:true },
    { p0:[410,438], p1:[477,437], p2:[543,435], major:true },
    { p0:[1126,438], p1:[1063,438], p2:[993,436], major:true },
    { p0:[486,582], p1:[544,560], p2:[605,520], major:true },
    { p0:[1070,582], p1:[1009,556], p2:[930,517], major:true },
    { p0:[339,280], p1:[397,264], p2:[485,295], major:false },
    { p0:[1197,280], p1:[1137,262], p2:[1068,295], major:false },
    { p0:[410,438], p1:[374,389], p2:[339,280], major:false },
    { p0:[1126,438], p1:[1164,388], p2:[1197,280], major:false },
    { p0:[410,438], p1:[362,515], p2:[486,582], major:false },
    { p0:[1126,438], p1:[1174,515], p2:[1070,582], major:false },
    { p0:[486,792], p1:[438,742], p2:[486,582], major:false },
    { p0:[1070,792], p1:[1118,742], p2:[1070,582], major:false },
  ];

  const diamonds = [
    [339,280,7], [485,295,8], [1197,280,7], [1068,295,8],
    [410,438,8], [1126,438,8], [486,582,8], [1070,582,8],
    [486,792,8], [1070,792,8], [595,374,5], [942,373,5],
    [543,435,5], [993,436,5], [606,520,5], [930,517,5]
  ];

  const stars = [
    [597,195,1.0], [941,195,.82], [340,281,.78], [1197,280,.88],
    [525,344,.55], [1014,341,.48], [403,631,.42], [1131,632,.52],
    [768,724,.72], [768,433,1.0]
  ];

  function qPoint(p0, p1, p2, t) {
    const mt = 1 - t;
    return { x: mt*mt*p0[0] + 2*mt*t*p1[0] + t*t*p2[0], y: mt*mt*p0[1] + 2*mt*t*p1[1] + t*t*p2[1] };
  }

  function drawDiamond(ctx, x, y, size, alpha = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = 'rgba(248,252,255,.98)';
    ctx.lineWidth = 1.0;
    ctx.shadowColor = 'rgba(197,227,255,.95)';
    ctx.shadowBlur = 9;
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    if (size > 6) {
      ctx.globalAlpha = alpha * .72;
      ctx.strokeRect(-size / 5, -size / 5, size / 2.5, size / 2.5);
    }
    ctx.restore();
  }

  function drawStar(ctx, x, y, pulse, power = 1) {
    const a = (.60 + .40 * Math.sin(pulse)) * power;
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = a;
    ctx.strokeStyle = 'rgba(255,255,255,.98)';
    ctx.shadowColor = 'rgba(205,232,255,.95)';
    ctx.shadowBlur = 14;
    ctx.lineWidth = .95;
    ctx.beginPath();
    ctx.moveTo(-9,0); ctx.lineTo(9,0);
    ctx.moveTo(0,-9); ctx.lineTo(0,9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-4,-4); ctx.lineTo(4,4);
    ctx.moveTo(4,-4); ctx.lineTo(-4,4);
    ctx.stroke();
    ctx.restore();
  }

  function drawBezierWithGlow(link, t) {
    nctx.save();
    nctx.beginPath();
    nctx.moveTo(...link.p0);
    nctx.quadraticCurveTo(...link.p1, ...link.p2);
    nctx.lineCap = 'round';

    // base soft solid line to make connector visible
    nctx.strokeStyle = link.major ? 'rgba(210,232,255,.16)' : 'rgba(196,223,255,.10)';
    nctx.lineWidth = link.major ? 2.0 : 1.2;
    nctx.shadowColor = link.major ? 'rgba(180,220,255,.18)' : 'rgba(180,220,255,.10)';
    nctx.shadowBlur = link.major ? 9 : 5;
    nctx.stroke();

    // brighter animated dashed overlay
    nctx.beginPath();
    nctx.moveTo(...link.p0);
    nctx.quadraticCurveTo(...link.p1, ...link.p2);
    nctx.setLineDash(link.major ? [4, 8] : [2, 9]);
    nctx.lineDashOffset = -(t * (link.major ? 12 : 8));
    nctx.lineWidth = link.major ? 1.35 : .85;
    nctx.strokeStyle = link.major ? 'rgba(240,248,255,.58)' : 'rgba(230,242,255,.34)';
    nctx.shadowColor = link.major ? 'rgba(191,227,255,.42)' : 'rgba(191,227,255,.22)';
    nctx.shadowBlur = link.major ? 8 : 6;
    nctx.stroke();
    nctx.restore();

    if (!reducedMotion && link.major) {
      const phase = (t * .085 + (link.p0[0] + link.p0[1]) * .00035) % 1;
      const p = qPoint(link.p0, link.p1, link.p2, phase);
      const g = nctx.createRadialGradient(p.x,p.y,0,p.x,p.y,11);
      g.addColorStop(0,'rgba(255,255,255,.98)');
      g.addColorStop(.28,'rgba(215,239,255,.86)');
      g.addColorStop(1,'rgba(170,216,255,0)');
      nctx.fillStyle = g;
      nctx.beginPath(); nctx.arc(p.x,p.y,11,0,TAU); nctx.fill();
    }
  }

  function drawNetwork(ms) {
    const t = ms * .001;
    nctx.clearRect(0, 0, DESIGN_W, DESIGN_H);

    const halo = nctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, 300);
    halo.addColorStop(0, 'rgba(230,244,255,.12)');
    halo.addColorStop(.42, 'rgba(180,220,255,.05)');
    halo.addColorStop(1, 'rgba(180,220,255,0)');
    nctx.fillStyle = halo;
    nctx.beginPath(); nctx.arc(C.x, C.y, 300, 0, TAU); nctx.fill();

    paths.forEach((p) => {
      // subtle solid guide
      nctx.save();
      nctx.beginPath();
      nctx.ellipse(p.cx, p.cy, p.rx, p.ry, 0, 0, TAU);
      nctx.strokeStyle = `rgba(222,241,255,${p.solidA})`;
      nctx.lineWidth = p.width + .4;
      nctx.shadowColor = 'rgba(175,214,255,.10)';
      nctx.shadowBlur = 4;
      nctx.stroke();
      nctx.restore();

      // brighter dashed line
      nctx.save();
      nctx.beginPath();
      nctx.ellipse(p.cx, p.cy, p.rx, p.ry, 0, 0, TAU);
      nctx.setLineDash(p.dash);
      nctx.lineDashOffset = t * 13 * p.speed;
      nctx.lineWidth = p.width;
      nctx.strokeStyle = `rgba(236,247,255,${p.alpha})`;
      nctx.shadowColor = 'rgba(188,226,255,.34)';
      nctx.shadowBlur = 7;
      nctx.stroke();
      nctx.restore();
    });

    links.forEach((link) => drawBezierWithGlow(link, t));

    const spokeEnds = [[595,374],[942,373],[543,435],[993,436],[606,520],[930,517]];
    spokeEnds.forEach((e, i) => {
      const grad = nctx.createLinearGradient(C.x,C.y,e[0],e[1]);
      grad.addColorStop(0,'rgba(248,252,255,.42)');
      grad.addColorStop(1,'rgba(220,239,255,.08)');
      nctx.save();
      nctx.strokeStyle = grad;
      nctx.lineWidth = .9;
      nctx.setLineDash([2,7]);
      nctx.lineDashOffset = t * (i % 2 ? 4 : -4);
      nctx.beginPath(); nctx.moveTo(C.x,C.y); nctx.lineTo(e[0],e[1]); nctx.stroke();
      nctx.restore();
    });

    diamonds.forEach((d, i) => drawDiamond(nctx, d[0], d[1], d[2], .72 + .20*Math.sin(t*1.2+i)));
    stars.forEach((s, i) => drawStar(nctx, s[0], s[1], t*1.6+i*.73, s[2]));

    const lineGrad = nctx.createLinearGradient(768, 565, 768, 758);
    lineGrad.addColorStop(0, 'rgba(236,247,255,.28)');
    lineGrad.addColorStop(1, 'rgba(236,247,255,0)');
    nctx.strokeStyle = lineGrad;
    nctx.lineWidth = 1.0;
    nctx.setLineDash([3,9]);
    nctx.beginPath(); nctx.moveTo(768,565); nctx.lineTo(768,758); nctx.stroke();
  }

  const snow = Array.from({ length: 145 }, () => ({
    x: Math.random()*DESIGN_W,
    y: Math.random()*DESIGN_H,
    r: .45 + Math.random()*2.1,
    vy: .16 + Math.random()*.50,
    vx: -.11 + Math.random()*.22,
    a: .13 + Math.random()*.43,
    phase: Math.random()*TAU,
    blur: Math.random() < .18 ? 7 : 2.5
  }));

  function drawSnow(ms) {
    const t = ms*.001;
    sctx.clearRect(0,0,DESIGN_W,DESIGN_H);
    snow.forEach((f) => {
      const tw = .72 + .28*Math.sin(t*1.1 + f.phase);
      sctx.save();
      sctx.globalAlpha = f.a*tw;
      sctx.fillStyle = '#fff';
      sctx.shadowColor = 'rgba(207,232,255,.72)';
      sctx.shadowBlur = f.blur;
      sctx.beginPath();
      sctx.arc(f.x, f.y, f.r, 0, TAU);
      sctx.fill();
      sctx.restore();

      if (!reducedMotion) {
        f.y += f.vy;
        f.x += f.vx + Math.sin(t*.55 + f.phase)*.035;
        if (f.y > DESIGN_H + 10) { f.y = -10; f.x = Math.random()*DESIGN_W; }
        if (f.x > DESIGN_W + 10) f.x = -10;
        if (f.x < -10) f.x = DESIGN_W + 10;
      }
    });
  }

  let raf = 0;
  function frame(ms) {
    drawNetwork(ms);
    drawSnow(ms);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  const onVisibilityChange = () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', onVisibilityChange);
  cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', fitContent);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };

});

onBeforeUnmount(() => cleanup());
</script>

<style scoped src="./HomeEcosystem.css"></style>
