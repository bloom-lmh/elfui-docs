<template>
  <section id="ecosystem" class="ecosystem">
    <div class="ecosystem-inner">
      <header class="ecosystem-heading" data-home-reveal>
        <p>ECOSYSTEM</p>
        <h2>{{ isZh ? "生态链" : "Ecosystem" }}</h2>
      </header>

      <div class="ecosystem-grid">
        <a
          v-for="(item, index) in items"
          :key="item.title"
          :href="item.href"
          class="ecosystem-item"
          data-home-reveal
          :style="{ '--reveal-delay': `${index * 70}ms` }"
        >
          <span>{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <b aria-hidden="true">↗</b>
        </a>
      </div>

      <section class="explore" data-home-reveal>
        <div class="explore-copy">
          <p>START EXPLORING</p>
          <h3>{{ isZh ? "开始探索 ElfUI" : "Start exploring ElfUI" }}</h3>
          <span>
            {{
              isZh
                ? "安装主包和编译插件，写下第一个宏组件。"
                : "Install the core package and compiler, then write your first macro component."
            }}
          </span>
          <div class="explore-actions">
            <a :href="isZh ? '/zh/起步/快速开始' : '/en/guide/quick-start'">{{ isZh ? "快速开始" : "Quick Start" }}</a>
            <a href="https://github.com/bloom-lmh/elfui" target="_blank" rel="noopener">GitHub ↗</a>
          </div>
        </div>

        <div class="install-terminal" aria-label="Installation commands">
          <div class="terminal-bar"><span></span><span></span><span></span><b>terminal</b></div>
          <pre><code><span class="prompt">$</span> npm i @elfui/core
<span class="prompt">$</span> npm i -D @elfui/vite-plugin</code></pre>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));

const items = computed(() =>
  isZh.value
    ? [
        { index: "01", title: "@elfui/core", description: "宏组件、应用挂载与主线用户 API。", href: "/zh/API参考/elfui" },
        { index: "02", title: "Vite Plugin", description: "编译 TypeScript 宏组件并提供工程诊断。", href: "/zh/生态/Vite插件" },
        { index: "03", title: "Chain", description: "链式 builder 与运行时字符串模板扩展。", href: "/zh/生态/Chain链式组件" },
        { index: "04", title: "Language Tools", description: "VS Code 补全、诊断与宏组件开发体验。", href: "/zh/生态/VSCode插件" }
      ]
    : [
        { index: "01", title: "@elfui/core", description: "Macro components, app mounting, and the main user-facing APIs.", href: "/en/api/core" },
        { index: "02", title: "Vite Plugin", description: "Compiles TypeScript macro components and powers build diagnostics.", href: "/en/ecosystem/vite-plugin" },
        { index: "03", title: "Chain", description: "An optional chain builder and runtime string-template extension.", href: "/en/ecosystem/chain" },
        { index: "04", title: "Language Tools", description: "VS Code completion, diagnostics, and macro-component authoring support.", href: "/en/ecosystem/language-tools" }
      ]
);
</script>

<style scoped src="./HomeEcosystem.css"></style>
