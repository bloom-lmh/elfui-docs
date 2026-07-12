<template>
  <section id="comparison" class="comparison">
    <div class="comparison-inner">
      <header class="comparison-heading" data-home-reveal>
        <p>ARCHITECTURE</p>
        <h2>{{ isZh ? "集百家所长" : "Learn from the best ideas" }}</h2>
        <span>
          {{
            isZh
              ? "借鉴成熟的开发体验，同时把边界收敛到带模板体验的原生 Web Components。"
              : "Learn from mature authoring models while keeping the boundary focused on native Web Components with templates."
          }}
        </span>
      </header>

      <div class="table-scroll" data-home-reveal>
        <table>
          <thead>
            <tr>
              <th>{{ isZh ? "维度" : "Concern" }}</th>
              <th class="elf-column">ElfUI</th>
              <th>Vue</th>
              <th>React</th>
              <th>Lit</th>
              <th>Solid</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.label">
              <th>{{ row.label }}</th>
              <td class="elf-column">{{ row.elfui }}</td>
              <td>{{ row.vue }}</td>
              <td>{{ row.react }}</td>
              <td>{{ row.lit }}</td>
              <td>{{ row.solid }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="comparison-data">
        <article class="size-snapshot" data-home-reveal>
          <div class="data-heading">
            <p>SIZE SNAPSHOT</p>
            <h3>{{ isZh ? "按需选择入口" : "Choose only the entry you need" }}</h3>
          </div>
          <div class="size-grid">
            <div v-for="item in sizes" :key="item.label">
              <b>{{ item.value }}</b>
              <span>{{ item.label }}</span>
              <small>{{ item.note }}</small>
            </div>
          </div>
        </article>

        <article class="benchmark-snapshot" data-home-reveal style="--reveal-delay: 100ms">
          <div class="data-heading">
            <p>BROWSER BENCHMARK</p>
            <h3>{{ isZh ? "真实浏览器中位数" : "Median time in a real browser" }}</h3>
          </div>
          <div class="benchmark-grid">
            <div v-for="item in benchmarks" :key="item.label">
              <b>{{ item.value }}</b>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </article>
      </div>

      <p class="comparison-note" data-home-reveal>
        {{
          isZh
            ? "体积来自 2026-07-11 的发布前 size report；基准来自同日真实浏览器 smoke。它们用于追踪 ElfUI 自身回归，不是跨框架性能排名。"
            : "Size data is from the 2026-07-11 release-readiness report. Browser figures are same-day smoke medians for ElfUI regression tracking, not a cross-framework ranking."
        }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));

const rows = computed(() =>
  isZh.value
    ? [
        { label: "更新模型", elfui: "编译期细粒度 DOM 更新", vue: "响应式 + VDOM", react: "VDOM 协调", lit: "模板 part 更新", solid: "细粒度 DOM 更新" },
        { label: "主要写法", elfui: "TS + HTML 模板宏", vue: "SFC 模板", react: "JSX", lit: "模板字面量", solid: "JSX" },
        { label: "运行时", elfui: "无 VNode / 无 patch", vue: "组件运行时", react: "协调器运行时", lit: "轻量模板运行时", solid: "细粒度运行时" },
        { label: "输出形式", elfui: "标准 Custom Elements", vue: "Vue 组件", react: "React 组件", lit: "Web Components", solid: "JSX 组件" },
        { label: "组件边界", elfui: "浏览器原生标签", vue: "框架组件", react: "框架组件", lit: "浏览器原生标签", solid: "框架组件" }
      ]
    : [
        { label: "Update model", elfui: "Compile-time fine-grained DOM", vue: "Reactivity + VDOM", react: "VDOM reconciliation", lit: "Template parts", solid: "Fine-grained DOM" },
        { label: "Primary authoring", elfui: "TS + HTML macro", vue: "SFC templates", react: "JSX", lit: "Tagged templates", solid: "JSX" },
        { label: "Runtime work", elfui: "No VNodes or patch", vue: "Component runtime", react: "Reconciler runtime", lit: "Small template runtime", solid: "Fine-grained runtime" },
        { label: "Output", elfui: "Standard Custom Elements", vue: "Vue components", react: "React components", lit: "Web Components", solid: "JSX components" },
        { label: "Component boundary", elfui: "Browser-native tags", vue: "Framework component", react: "Framework component", lit: "Browser-native tags", solid: "Framework component" }
      ]
);

const sizes = computed(() =>
  isZh.value
    ? [
        { value: "10.52 KB", label: "@elfui/core", note: "gzip，不含 runtime compiler" },
        { value: "15.00 KB", label: "core + router", note: "gzip，包含路由入口" },
        { value: "21.19 KB", label: "@elfui/chain", note: "gzip，包含 runtime compiler" }
      ]
    : [
        { value: "10.52 KB", label: "@elfui/core", note: "gzip, no runtime compiler" },
        { value: "15.00 KB", label: "core + router", note: "gzip, including router" },
        { value: "21.19 KB", label: "@elfui/chain", note: "gzip, runtime compiler included" }
      ]
);

const benchmarks = computed(() =>
  isZh.value
    ? [
        { value: "1.10 ms", label: "挂载 300 个组件" },
        { value: "1.50 ms", label: "创建 1k 列表" },
        { value: "0 KB", label: "内存释放 smoke 留存" }
      ]
    : [
        { value: "1.10 ms", label: "mount 300 components" },
        { value: "1.50 ms", label: "create a 1k list" },
        { value: "0 KB", label: "memory smoke retained" }
      ]
);
</script>

<style scoped src="./HomeComparison.css"></style>
