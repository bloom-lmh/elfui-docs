<template>
<main ref="root" class="home-hero page">
    <header class="topnav">
      <div class="topnav-inner">
        <a class="logo" href="#">ElfUI</a>
        <ul class="nav-links">
          <li><a href="#core">核心机制</a></li>
          <li><a href="/组件/概览">ElfUI 组件</a></li>
          <li><a href="#compare">对比</a></li>
          <li><a href="#eco">生态</a></li>
          <li><a href="https://github.com/bloom-lmh/elfui" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </div>
    </header>

    <canvas ref="snowCanvas" class="hero-snow"></canvas>

    <section class="hero" aria-label="ElfUI hero">
      <div class="hero-copy">
        <div class="eyebrow">WEB COMPONENTS FRAMEWORK</div>

        <h1 class="title">
          <span class="line"><span class="white">原生</span><span class="mint">Web</span></span>
          <span class="line mint">Components</span>
          <span class="line mint">框架</span>
        </h1>

        <p class="sub">TS 单文件组件，Vue API，标准 Custom Elements 输出</p>

        <div class="actions">
          <a class="btn primary" href="/起步/快速开始"><span class="icon">⚡</span><span>开始使用</span></a>
          <a class="btn" href="/起步/简介"><span class="icon">📄</span><span>查看文档</span></a>
          <a class="btn" href="https://github.com/bloom-lmh/elfui" target="_blank" rel="noopener"><span>GitHub</span></a>
        </div>
      </div>

      <a class="scroll-more" href="#core">了解更多</a>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const root = ref<HTMLElement | null>(null);
const snowCanvas = ref<HTMLCanvasElement | null>(null);
let stopSnow = () => {};

onMounted(() => {
  const canvas = snowCanvas.value;
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let frame = 0;
  let flakes: Array<{
    x: number;
    y: number;
    r: number;
    alpha: number;
    speed: number;
    drift: number;
    blur: number;
  }> = [];

  const random = (min: number, max: number) => Math.random() * (max - min) + min;
  const resize = () => {
    const bounds = root.value?.getBoundingClientRect();
    width = bounds?.width ?? window.innerWidth;
    height = bounds?.height ?? window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.floor(Math.min(260, Math.max(120, (width * height) / 7800)));
    flakes = Array.from({ length: count }, () => ({
      x: random(0, width),
      y: random(-height, height),
      r: random(0.75, 3.1),
      alpha: random(0.22, 0.86),
      speed: random(0.28, 1.45),
      drift: random(-0.42, 0.52),
      blur: random(0, 2.6)
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    for (const flake of flakes) {
      context.save();
      context.globalAlpha = flake.alpha;
      context.shadowBlur = flake.blur;
      context.shadowColor = "rgba(220, 238, 255, .88)";
      context.fillStyle = "rgba(237, 247, 255, .9)";
      context.beginPath();
      context.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      context.fill();
      context.restore();

      flake.y += flake.speed;
      flake.x += flake.drift + Math.sin((flake.y + flake.r) * 0.012) * 0.18;
      if (flake.y > height + 12) {
        flake.y = random(-80, -10);
        flake.x = random(0, width);
      }
      if (flake.x < -20) flake.x = width + 20;
      if (flake.x > width + 20) flake.x = -20;
    }
    frame = requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
  stopSnow = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
  };
});

onBeforeUnmount(() => stopSnow());
</script>

<style scoped src="./HomeHero.css"></style>
