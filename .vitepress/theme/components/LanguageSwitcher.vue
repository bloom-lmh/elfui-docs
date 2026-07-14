<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
import { localePathMap } from "../locale-paths.generated";

const { page } = useData();

const currentPath = computed(() => {
  const path = `/${page.value.relativePath.replace(/index\.md$/, "").replace(/\.md$/, "")}`;
  return path.endsWith("/") ? path : path.replace(/\/$/, "");
});
const isChinese = computed(() => currentPath.value.startsWith("/zh/"));
const alternateHref = computed(
  () => localePathMap[currentPath.value as keyof typeof localePathMap] ?? (isChinese.value ? "/en/" : "/zh/")
);
const label = computed(() => (isChinese.value ? "English" : "简体中文"));
const playgroundLabel = computed(() => (isChinese.value ? "演练场" : "Playground"));
</script>

<template>
  <nav class="elf-nav-actions" aria-label="Quick links">
    <a
      class="elf-mobile-playground"
      href="https://stackblitz.com/fork/github/bloom-lmh/elfui-playground?startScript=dev&title=ElfUI%20Playground"
      target="_blank"
      rel="noreferrer"
    >
      {{ playgroundLabel }}
    </a>
    <a class="elf-language-switcher" :href="alternateHref">{{ label }}</a>
  </nav>
</template>
