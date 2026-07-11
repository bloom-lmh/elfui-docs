<template>
  <main class="elf-home-page">
    <section
      class="elf-hero-stage"
      aria-label="ElfUI 首页"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
    >
      <canvas ref="canvasRef" class="elf-tree-canvas" aria-hidden="true"></canvas>

      <div class="elf-hero-copy">
        <p class="elf-kicker">ElfUI 1.0 beta · macro components first</p>
        <h1 class="elf-brand-title">ElfUI</h1>
        <p class="elf-brand-map" aria-label="Element to Fine-grained to UI">
          <span>EL</span>
          <b>-></b>
          <span>F</span>
          <b>-></b>
          <span>UI</span>
        </p>
        <p class="elf-hero-line">小精灵把模板变成精准 DOM 更新</p>
        <p class="elf-hero-text">
          从零自研的 Web Components 框架。你写普通 TypeScript
          组件，编译器把模板里的每个动态点拆成独立 effect，运行时不需要 VNode，也不做 patch。
        </p>

        <div class="elf-actions" aria-label="快速入口">
          <a class="elf-button primary" href="/起步/快速开始">开始写组件</a>
          <a class="elf-button" href="/组件/定义组件">了解组件</a>
          <a class="elf-button ghost" href="/生态/Chain链式组件">链式扩展</a>
        </div>
      </div>

      <div class="elf-compiler-panel" aria-label="编译流程摘要">
        <div class="elf-window-bar">
          <span></span>
          <span></span>
          <span></span>
          <b>counter.html.ts</b>
        </div>
        <pre><code><span class="pink">import</span> { defineHtml, html, useRef } <span class="pink">from</span> "elfui";

<span class="blue">const</span> count = useRef(0);
<span class="blue">const</span> inc = () => count.set(count.peek() + 1);

<span class="pink">export const</span> Counter = defineHtml(html`
  &lt;button @click=inc&gt;点了 ${"{count}"} 次&lt;/button&gt;
`);</code></pre>
        <div class="elf-pipeline">
          <span>template</span>
          <span>dynamic point</span>
          <span>effect</span>
          <span>DOM</span>
        </div>
      </div>
    </section>

    <section class="elf-home-links" aria-label="文档入口">
      <a href="/起步/简介" class="elf-link-card">
        <span>01</span>
        <h2>起步</h2>
        <p>先理解 ElfUI 的定位、安装方式、包入口，以及最小组件写法。</p>
      </a>
      <a href="/组件/概览" class="elf-link-card">
        <span>02</span>
        <h2>组件</h2>
        <p>组件是主线。Props、事件、v-model、插槽、通信、暴露和复用都在这里。</p>
      </a>
      <a href="/响应式/响应式状态" class="elf-link-card">
        <span>03</span>
        <h2>响应式</h2>
        <p>useRef、useReactive、computed、watch、effect，各自独立，边界清楚。</p>
      </a>
      <a href="/生态/Vite插件" class="elf-link-card">
        <span>04</span>
        <h2>生态</h2>
        <p>Chain、Vite 插件、VS Code 插件各归其位，主线文档不再混杂链式 API。</p>
      </a>
    </section>

    <section class="elf-home-proof" aria-label="核心取向">
      <div>
        <p class="elf-section-label">compiler-first</p>
        <h2>每个动态点都有自己的更新路径</h2>
      </div>
      <div class="elf-proof-grid">
        <div>
          <b>0 VNode</b>
          <span>模板编译后直接定位 DOM。</span>
        </div>
        <div>
          <b>细粒度 effect</b>
          <span>文本、属性、事件、样式各自更新。</span>
        </div>
        <div>
          <b>Custom Elements</b>
          <span>标准输出，可跨框架使用。</span>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const pointer = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

let frame = 0;
let cleanup: (() => void) | undefined;

function handlePointerMove(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  pointer.targetX = (event.clientX - rect.left) / rect.width - 0.5;
  pointer.targetY = (event.clientY - rect.top) / rect.height - 0.5;
}

function handlePointerLeave() {
  pointer.targetX = 0;
  pointer.targetY = 0;
}

function hash(seed: number) {
  const value = Math.sin(seed * 91.17) * 10000;
  return value - Math.floor(value);
}

onMounted(() => {
  const canvas = canvasRef.value;
  const context = canvas?.getContext("2d");

  if (!canvas || !context) {
    return;
  }

  let width = 0;
  let height = 0;
  let dpr = 1;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const project = (x: number, y: number, z: number) => {
    const depth = 620;
    const scale = depth / (depth - z);

    return {
      x: width / 2 + (x - width / 2) * scale,
      y: height / 2 + (y - height / 2) * scale,
      scale
    };
  };

  const render = (time: number) => {
    const t = time * 0.001;
    pointer.x += (pointer.targetX - pointer.x) * 0.055;
    pointer.y += (pointer.targetY - pointer.y) * 0.055;

    context.clearRect(0, 0, width, height);

    const points = Array.from({ length: 92 }, (_, index) => {
      const u = index / 91;
      const x = -80 + u * (width + 160) + pointer.x * 54;
      const wave = Math.sin(u * 5.8 + t * 0.55) * height * 0.045;
      const slope = Math.cos(u * 2.4 - 0.7) * height * 0.08;
      const y = height * 0.59 + wave - slope + pointer.y * 40;
      const z = Math.sin(u * Math.PI * 2.2 + t * 0.62) * 92;
      const p = project(x, y, z);
      return { u, z, ...p };
    });

    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";

    for (let pass = 0; pass < 4; pass += 1) {
      context.beginPath();
      points.forEach((point, index) => {
        const jitter = Math.sin(index * 1.9 + pass * 2.1 + t) * 7;
        const x = point.x;
        const y = point.y + jitter;
        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      context.strokeStyle = [
        "rgba(30, 38, 34, 0.68)",
        "rgba(68, 76, 62, 0.42)",
        "rgba(124, 135, 108, 0.26)",
        "rgba(239, 229, 190, 0.16)"
      ][pass];
      context.lineWidth = [86, 58, 34, 10][pass] * Math.min(width / 1120, 1.1);
      context.stroke();
    }

    for (let index = 7; index < points.length - 10; index += 10) {
      const origin = points[index];
      const length = (84 + hash(index) * 76) * origin.scale;
      const angle = -0.7 + hash(index + 3) * 1.35;

      context.beginPath();
      context.moveTo(origin.x, origin.y);
      context.quadraticCurveTo(
        origin.x + Math.cos(angle) * length * 0.62,
        origin.y + Math.sin(angle) * length * 0.34,
        origin.x + Math.cos(angle) * length,
        origin.y + Math.sin(angle) * length
      );
      context.strokeStyle = "rgba(41, 57, 47, 0.44)";
      context.lineWidth = 22 * origin.scale;
      context.stroke();

      context.beginPath();
      context.moveTo(origin.x, origin.y - 3);
      context.lineTo(origin.x + Math.cos(angle) * length, origin.y + Math.sin(angle) * length - 4);
      context.strokeStyle = "rgba(185, 211, 161, 0.19)";
      context.lineWidth = 4 * origin.scale;
      context.stroke();
    }

    for (let index = 0; index < 260; index += 1) {
      const u = hash(index * 2 + 1);
      const base = points[Math.floor(u * (points.length - 1))];
      const side = hash(index * 3 + 2) > 0.5 ? 1 : -1;
      const lift = (18 + hash(index * 7) * 58) * side * base.scale;
      const x = base.x + (hash(index + 4) - 0.5) * 72;
      const y = base.y - Math.abs(lift) - hash(index + 5) * 18;
      const size = (2.6 + hash(index + 6) * 4.8) * base.scale;
      const hue = 110 + hash(index + 9) * 56;

      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fillStyle = `hsla(${hue}, 58%, ${44 + hash(index + 8) * 18}%, 0.72)`;
      context.fill();

      if (index % 5 === 0) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (hash(index + 11) - 0.5) * 8, y - 14 * base.scale);
        context.strokeStyle = "rgba(166, 232, 142, 0.34)";
        context.lineWidth = 1.2;
        context.stroke();
      }
    }

    for (let index = 0; index < 54; index += 1) {
      const x = hash(index + 21) * width;
      const y = (hash(index + 22) * height + t * (20 + hash(index + 23) * 46)) % height;
      const alpha = 0.12 + hash(index + 24) * 0.18;
      context.beginPath();
      context.moveTo(x + pointer.x * 12, y);
      context.lineTo(x + pointer.x * 12, y + 16 + hash(index + 25) * 28);
      context.strokeStyle = `rgba(218, 246, 205, ${alpha})`;
      context.lineWidth = 1;
      context.stroke();
    }

    context.restore();
    frame = requestAnimationFrame(render);
  };

  resize();
  window.addEventListener("resize", resize);
  frame = requestAnimationFrame(render);

  cleanup = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
  };
});

onBeforeUnmount(() => {
  cleanup?.();
});
</script>
