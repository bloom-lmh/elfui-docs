<template>
  <main ref="root" class="home-hero page">
    <canvas ref="snowCanvas" class="hero-snow"></canvas>

    <section class="hero" aria-label="ElfUI hero">
      <div class="hero-copy" data-home-reveal>
        <div class="eyebrow">WEB COMPONENTS FRAMEWORK</div>

        <h1 v-if="isZh" class="title">
          <span class="line"><span class="white">原生</span><span class="mint">Web</span></span>
          <span class="line mint">Components</span>
          <span class="line mint">框架</span>
        </h1>
        <h1 v-else class="title title-en">
          <span class="line"><span class="white">Native</span><span class="mint">Web</span></span>
          <span class="line mint">Components</span>
          <span class="line mint">Framework</span>
        </h1>

        <p class="sub">
          {{
            isZh
              ? "TypeScript 单文件组件，熟悉的模板语法，输出标准 Custom Elements"
              : "TypeScript components. Familiar templates. Standard Custom Elements."
          }}
        </p>

        <div class="actions">
          <a class="btn primary" :href="isZh ? '/zh/起步/快速开始' : '/en/guide/quick-start'">
            {{ isZh ? "开始使用" : "Get Started" }}
          </a>
          <a class="btn" :href="isZh ? '/zh/起步/简介' : '/en/guide/introduction'">
            {{ isZh ? "查看文档" : "Read the Guide" }}
          </a>
          <a class="btn github-btn" href="https://github.com/bloom-lmh/elfui" target="_blank" rel="noopener">
            <svg class="github-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.2-3.37-1.2-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.54 1.05 1.54 1.05.9 1.55 2.35 1.1 2.92.84.09-.67.35-1.1.64-1.35-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.4-2.05 1.06-2.77-.1-.27-.46-1.32.1-2.75 0 0 .87-.29 2.75 1.06A9.37 9.37 0 0 1 12 6.83c.85 0 1.7.12 2.5.34 1.88-1.35 2.75-1.06 2.75-1.06.56 1.43.2 2.48.1 2.75.66.72 1.06 1.64 1.06 2.77 0 3.97-2.34 4.84-4.57 5.1.36.32.68.93.68 1.88 0 1.36-.01 2.46-.01 2.8 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <a class="scroll-more" href="#principles">{{ isZh ? "了解原理" : "How it works" }}</a>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));
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
