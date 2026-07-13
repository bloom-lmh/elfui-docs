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
</script>

<template>
  <a class="elf-language-switcher" :href="alternateHref">{{ label }}</a>
</template>
