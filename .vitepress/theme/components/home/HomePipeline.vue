<template>
  <section id="principles" class="pipeline">
    <div class="pipeline-inner">
      <header class="pipeline-heading" data-home-reveal>
        <p class="pipeline-kicker">CORE PRINCIPLES</p>
        <h2>{{ isZh ? "核心原理" : "Core principles" }}</h2>
        <p>
          {{
            isZh
              ? "构建时拆分动态点。运行时没有 VNode，也不需要整棵组件树 diff。"
              : "Dynamic points are split at build time. No VNodes and no component-tree diff at runtime."
          }}
        </p>
      </header>

      <div class="pipeline-workbench" data-home-reveal>
        <article class="source-panel" aria-label="ElfUI component source">
          <div class="window-bar">
            <span></span><span></span><span></span>
            <b>Counter.ts</b>
          </div>
          <pre><code><span class="pink">import</span> { defineHtml, useRef }
  <span class="pink">from</span> <span class="string">"@elfui/core"</span>;

<span class="blue">const</span> count = useRef(<span class="number">0</span>);
<span class="blue">const</span> increment = () =>
  count.set(count.peek() + <span class="number">1</span>);

<span class="pink">export const</span> Counter = defineHtml(<span class="string">`</span>
  &lt;button @click=${increment}&gt;
    Count: ${count}
  &lt;/button&gt;
<span class="string">`</span>);</code></pre>
        </article>

        <div class="pipeline-flow" aria-label="Compiler pipeline">
          <div v-for="(step, index) in steps" :key="step.title" class="flow-step">
            <span class="flow-index">0{{ index + 1 }}</span>
            <div>
              <b>{{ step.title }}</b>
              <p>{{ step.description }}</p>
            </div>
            <span v-if="index < steps.length - 1" class="flow-line" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div class="pipeline-proof" aria-label="ElfUI compiler properties" data-home-reveal>
        <div><b>0 VNode</b><span>{{ isZh ? "直接更新真实 DOM" : "Direct DOM writes" }}</span></div>
        <div><b>Fine-grained</b><span>{{ isZh ? "每个动态点独立订阅" : "One subscription per dynamic point" }}</span></div>
        <div><b>Custom Elements</b><span>{{ isZh ? "标准浏览器输出" : "Standards-based output" }}</span></div>
      </div>

      <footer class="home-footer">
        <span>ElfUI 1.0 beta</span>
        <nav>
          <a :href="isZh ? '/zh/起步/快速开始' : '/en/guide/quick-start'">{{ isZh ? "快速开始" : "Quick Start" }}</a>
          <a :href="isZh ? '/zh/API参考/elfui' : '/en/api/core'">API</a>
          <a href="https://github.com/bloom-lmh/elfui" target="_blank" rel="noopener">GitHub</a>
        </nav>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));

const steps = computed(() =>
  isZh.value
    ? [
        { title: "模板解析", description: "识别文本、属性、事件、条件与列表。" },
        { title: "动态点拆分", description: "为每个状态读取生成独立更新路径。" },
        { title: "Effect 绑定", description: "只订阅当前动态点真正读取的状态。" },
        { title: "原生输出", description: "写入真实 DOM，注册为 Custom Element。" }
      ]
    : [
        { title: "Parse template", description: "Find text, attributes, events, branches, and lists." },
        { title: "Split dynamic points", description: "Generate an isolated update path for every state read." },
        { title: "Bind effects", description: "Subscribe only to the state each dynamic point consumes." },
        { title: "Emit native output", description: "Write real DOM and register a standard Custom Element." }
      ]
);
</script>

<style scoped src="./HomePipeline.css"></style>
