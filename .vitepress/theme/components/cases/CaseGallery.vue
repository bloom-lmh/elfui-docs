<template>
  <main class="case-gallery">
    <header class="case-header">
      <p>ELFUI CASES</p>
      <h1>{{ isZh ? "案例" : "Cases" }}</h1>
      <span>
        {{
          isZh
            ? "每个案例都是真实编译后的 ElfUI Custom Element，不是 Vue 模拟组件。"
            : "Every case is a compiled ElfUI Custom Element, not a Vue simulation."
        }}
      </span>
    </header>

    <section v-for="demo in demos" :key="demo.id" class="case-card">
      <div class="case-preview">
        <elf-demo-counter v-if="demo.id === 'counter'"></elf-demo-counter>
        <elf-demo-toggle v-else></elf-demo-toggle>
      </div>
      <div class="case-copy">
        <p>{{ demo.kicker }}</p>
        <h2>{{ demo.title }}</h2>
        <span>{{ demo.description }}</span>
        <a :href="playgroundHref(demo)">{{ isZh ? "在演练场打开" : "Open in Playground" }} ↗</a>
      </div>
      <pre><code>{{ demo.source }}</code></pre>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

import { playgroundPresets } from "../playground/presets";
import { createPlaygroundHref } from "../playground/state";

interface PlaygroundDemo {
  description: string;
  id: string;
  kicker: string;
  source: string;
  title: string;
}

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));
const playgroundHref = (demo: PlaygroundDemo): string =>
  createPlaygroundHref(isZh.value ? "/zh/演练场" : "/en/playground", {
    presetId: demo.id,
    source: demo.source
  });

const demos = computed<PlaygroundDemo[]>(() => {
  const counter = playgroundPresets[0];
  const toggle = playgroundPresets[1];

  return isZh.value
    ? [
        { id: "counter", kicker: "REACTIVITY", title: "计数器", description: "一个状态读取，对应一个被编译出的 DOM 更新点。", source: counter.source },
        { id: "toggle", kicker: "EVENTS", title: "开关", description: "事件回调更新状态，原生 Custom Element 立即重渲染关联文本。", source: toggle.source }
      ]
    : [
        { id: "counter", kicker: "REACTIVITY", title: "Counter", description: "One state read maps to one compiled DOM update point.", source: counter.source },
        { id: "toggle", kicker: "EVENTS", title: "Toggle", description: "An event callback updates state and the native Custom Element refreshes its bound text.", source: toggle.source }
      ];
});
</script>

<style scoped src="./CaseGallery.css"></style>
