<template>
  <section id="features" class="features">
    <div class="features-inner">
      <header class="section-heading" data-home-reveal>
        <p>COMPONENT FIRST</p>
        <h2>{{ isZh ? "为组件而生" : "Built for components" }}</h2>
        <span>
          {{
            isZh
              ? "从定义、通信到复用，组件始终是 ElfUI 的主线。"
              : "Definition, communication, and reuse all begin with the component boundary."
          }}
        </span>
      </header>

      <div class="feature-grid">
        <article
          v-for="(feature, index) in features"
          :key="feature.index"
          class="feature"
          data-home-reveal
          :style="{ '--reveal-delay': `${index * 55}ms` }"
        >
          <span class="feature-index">{{ feature.index }}</span>
          <div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </article>
      </div>

      <section class="inheritance" aria-label="Component inheritance" data-home-reveal>
        <header class="inheritance-heading">
          <div>
            <p>COMPONENT INHERITANCE</p>
            <h3>{{ isZh ? "一份 Button 定义，派生两种组件风格" : "One Button definition, two component styles" }}</h3>
          </div>
          <span>
            {{
              isZh
                ? "复用模板、交互和基础样式，只针对新组件补充语义或设计令牌。"
                : "Reuse template, interaction, and base styles; change only the semantic role or design tokens."
            }}
          </span>
        </header>

        <div class="inheritance-layout">
          <article class="inheritance-code" aria-label="Component inheritance code">
            <div class="inheritance-bar">
              <span></span><span></span><span></span>
              <b>Button.variants.ts</b>
            </div>
            <pre><code><span class="keyword">import</span> { useExtend, useVariant } <span class="keyword">from</span> <span class="string">"@elfui/core"</span>;

<span class="keyword">export const</span> PrimaryButton = useExtend(Button)
  .name(<span class="string">"primary-button"</span>)
  .build();

<span class="keyword">export const</span> DangerButton = useVariant(
  Button, <span class="string">"danger-button"</span>, setDangerTone
).build();</code></pre>
          </article>

          <div class="inheritance-map" aria-label="Button inheritance map">
            <article class="base-component">
              <span class="component-tag">&lt;elf-button&gt;</span>
              <button type="button" class="base-preview">Button</button>
              <p>{{ isZh ? "共享 props、事件与基础样式" : "Shared props, events, and base styles" }}</p>
            </article>

            <div class="inheritance-branch" aria-hidden="true">
              <span>{{ isZh ? "派生" : "derive" }}</span>
            </div>

            <div class="derived-components">
              <article v-for="variant in variants" :key="variant.api" class="derived-card">
                <span class="variant-api">{{ variant.api }}</span>
                <span class="component-tag">{{ variant.tag }}</span>
                <button type="button" :class="['variant-preview', variant.tone]">{{ variant.component }}</button>
                <h4>{{ variant.title }}</h4>
                <p>{{ variant.description }}</p>
              </article>
            </div>
          </div>
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

const features = computed(() =>
  isZh.value
    ? [
        { index: "01", title: "类 Vue 模板语法", description: "v-if、v-for、v-model 与事件绑定保持直觉，不引入 VNode。" },
        { index: "02", title: "TS 单文件组件", description: "逻辑、模板与样式在一个 TypeScript 文件里定义，构建时完成编译。" },
        { index: "03", title: "链式编程扩展", description: "需要 builder 或运行时字符串模板时，再引入 @elfui/chain。" },
        { index: "04", title: "无虚拟 DOM", description: "静态结构在构建阶段确定，运行时不做整棵树 diff 或 patch。" },
        { index: "05", title: "组件继承", description: "从基础组件派生设计系统变体，复用定义而非复制实现。" },
        { index: "06", title: "原生 Web Components", description: "输出标准 Custom Elements，可在任何前端栈中注册与使用。" }
      ]
    : [
        { index: "01", title: "Vue-style templates", description: "Use v-if, v-for, v-model, and event bindings without introducing VNodes." },
        { index: "02", title: "TypeScript file components", description: "Keep logic, template, and styles in one TypeScript file; compile at build time." },
        { index: "03", title: "Chain as an extension", description: "Bring in @elfui/chain only when a builder or runtime string template is useful." },
        { index: "04", title: "No virtual DOM", description: "Static structure is known at build time. Runtime never diffs or patches a component tree." },
        { index: "05", title: "Component inheritance", description: "Derive design-system variants from a base component instead of duplicating an implementation." },
        { index: "06", title: "Native Web Components", description: "Ship standard Custom Elements that can register and run in any frontend stack." }
      ]
);

const variants = computed(() =>
  isZh.value
    ? [
        { api: "useExtend()", tag: "<primary-button>", component: "PrimaryButton", title: "语义组件", description: "改名并补充局部样式，得到职责明确的按钮。", tone: "primary" },
        { api: "useVariant()", tag: "<danger-button>", component: "DangerButton", title: "设计系统变体", description: "沿用 Button 能力，只改颜色令牌与视觉语义。", tone: "danger" }
      ]
    : [
        { api: "useExtend()", tag: "<primary-button>", component: "PrimaryButton", title: "Semantic component", description: "Name the derived tag and append focused local styles.", tone: "primary" },
        { api: "useVariant()", tag: "<danger-button>", component: "DangerButton", title: "Design-system variant", description: "Keep Button behavior and adjust only tone and visual semantics.", tone: "danger" }
      ]
);
</script>

<style scoped src="./HomeFeatures.css"></style>
