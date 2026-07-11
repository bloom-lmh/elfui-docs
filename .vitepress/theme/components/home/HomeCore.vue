<template>
<section ref="root" id="core" class="home-core section" aria-label="ElfUI core mechanism">
    <div class="wrap">
      <div class="eyebrow">
        <svg class="snow-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2v20M4.2 6.2l15.6 11.6M19.8 6.2 4.2 17.8M7 3.8l5 3.1 5-3.1M7 20.2l5-3.1 5 3.1M2.8 10.2l4.8 3.3-.2 5.8M21.2 10.2l-4.8 3.3.2 5.8M21.2 13.8l-4.8-3.3.2-5.8M2.8 13.8l4.8-3.3-.2-5.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        CORE MECHANISM
      </div>

      <h1 class="hero-title">
        <span class="title-snow" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 2v20M4.2 6.2l15.6 11.6M19.8 6.2 4.2 17.8M7 3.8l5 3.1 5-3.1M7 20.2l5-3.1 5 3.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>从代码，到<span class="accent">原生组件</span></span>
      </h1>

      <p class="subtitle">
        在普通 .ts/.tsx 文件中编写组件，构建阶段完成模板编译，最终输出标准 Custom Elements。
      </p>

      <div class="stage">
        <article class="glass code-card" aria-label="Macro Component code card">
          <div class="window-bar">
            <div class="traffic" aria-hidden="true">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="tab"><span class="ts-badge">TS</span>Counter.ts</div>
          </div>

          <div class="code-body">
            <div class="card-title">
              <svg class="cube-icon ice-crystal" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2v20M4.2 6.2l15.6 11.6M19.8 6.2 4.2 17.8M7 3.8l5 3.1 5-3.1M7 20.2l5-3.1 5 3.1M2.8 10.2l4.8 3.3-.2 5.8M21.2 10.2l-4.8 3.3.2 5.8" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Macro Component
            </div>
<pre><code><span class="kw">import</span> { defineHtml, html, useRef } <span class="kw">from</span> <span class="str">"elfui"</span><span class="pun">;</span>

<span class="kw">const</span> count = useRef(0)<span class="pun">;</span>
<span class="kw">const</span> inc = () <span class="fn">=&gt;</span> count.<span class="fn">set</span>(count.<span class="fn">peek</span>() + 1)<span class="pun">;</span>

<span class="kw">export const</span> Counter = defineHtml(html<span class="pun">`</span>
  <span class="tag">&lt;button</span> <span class="prop">@click</span>=<span class="var">${inc}</span><span class="tag">&gt;</span>
    Count: <span class="var">${count}</span>
  <span class="tag">&lt;/button&gt;</span>
<span class="pun">`</span>)<span class="pun">;</span></code></pre>
          </div>
        </article>

        <div class="compile-flow" aria-label="Macro compile flow">
          <span class="flow-line" aria-hidden="true"></span>
          <div class="compile-badge" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="m11 9-7 7 7 7M21 9l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="m18 6-4 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="flow-line" aria-hidden="true"></span>
          <div class="flow-text">Macro<br />Compile</div>
          <svg class="flow-arrow" viewBox="0 0 38 26" aria-hidden="true">
            <path d="M1 13h27" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M24 3l11 10-11 10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <article class="glass preview-card" aria-label="Live Component preview card">
          <div class="card-title preview-title">
            <svg class="cube-icon ice-crystal" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2v20M4.2 6.2l15.6 11.6M19.8 6.2 4.2 17.8M7 3.8l5 3.1 5-3.1M7 20.2l5-3.1 5 3.1M2.8 10.2l4.8 3.3-.2 5.8M21.2 10.2l-4.8 3.3.2 5.8" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            Live Component
          </div>

          <div class="preview-stack">
            <div class="mini-card component-card is-active" data-component="counter" role="button" tabindex="0" aria-label="点击计数器组件增加 Count">
              <span class="mini-tag">&lt;elf-counter&gt;</span>
              <div class="counter-row">
                <div class="counter-label">Count:<span class="count-number" id="countNumber">12</span></div>
                <button class="plus-btn" type="button" aria-label="Count 加一">+1</button>
              </div>
            </div>

            <div class="mini-card component-card" data-component="toggle" role="switch" tabindex="0" aria-checked="true" aria-label="点击切换 Web Component 状态">
              <span class="mini-tag">&lt;elf-button&gt;</span>
              <div class="toggle-row">
                <div class="toggle-label">Web Component</div>
                <div class="switch" id="componentSwitch"><span class="switch-text">ON</span><span class="knob"></span></div>
              </div>
            </div>

            <div class="mini-card component-card" data-component="progress" role="button" tabindex="0" aria-label="点击推进编译进度">
              <span class="mini-tag">&lt;elf-card&gt;</span>
              <div class="progress-head">
                <span class="progress-title">Compile Progress</span>
                <span class="progress-percent" id="progressPercent">86%</span>
              </div>
              <div class="progress-track"><span class="progress-bar" id="progressBar"></span></div>
            </div>
          </div>
        </article>

        <div aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const root = ref<HTMLElement | null>(null);
let removeInteractions = () => {};

onMounted(() => {
  const section = root.value;
  if (!section) return;

  const cards = Array.from(section.querySelectorAll<HTMLElement>(".component-card"));
  const countNumber = section.querySelector<HTMLElement>("#countNumber");
  const componentSwitch = section.querySelector<HTMLElement>("#componentSwitch");
  const switchText = componentSwitch?.querySelector<HTMLElement>(".switch-text");
  const progressPercent = section.querySelector<HTMLElement>("#progressPercent");
  const progressBar = section.querySelector<HTMLElement>("#progressBar");
  let count = Number(countNumber?.textContent || 12);
  let enabled = true;
  let progress = 86;

  const runAction = (card: HTMLElement) => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active", "is-pulse");
    window.setTimeout(() => card.classList.remove("is-pulse"), 280);

    if (card.dataset.component === "counter" && countNumber) {
      count += 1;
      countNumber.textContent = String(count);
    }
    if (card.dataset.component === "toggle" && componentSwitch && switchText) {
      enabled = !enabled;
      switchText.textContent = enabled ? "ON" : "OFF";
      componentSwitch.classList.toggle("is-off", !enabled);
      card.setAttribute("aria-checked", String(enabled));
    }
    if (card.dataset.component === "progress" && progressPercent && progressBar) {
      progress = progress >= 100 ? 36 : Math.min(100, progress + 7);
      progressPercent.textContent = `${progress}%`;
      progressBar.style.width = `${progress}%`;
    }
  };

  const onClick = (event: Event) => {
    const card = (event.target as Element).closest<HTMLElement>(".component-card");
    if (card && section.contains(card)) runAction(card);
  };
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = (event.target as Element).closest<HTMLElement>(".component-card");
    if (!card || !section.contains(card)) return;
    event.preventDefault();
    runAction(card);
  };

  section.addEventListener("click", onClick);
  section.addEventListener("keydown", onKeydown);
  removeInteractions = () => {
    section.removeEventListener("click", onClick);
    section.removeEventListener("keydown", onKeydown);
  };
});

onBeforeUnmount(() => removeInteractions());
</script>

<style scoped src="./HomeCore.css"></style>
