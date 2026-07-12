<template>
  <main class="language-gateway">
    <a href="/en/">ElfUI documentation</a>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => window.location.replace("/en/"));
</script>

<style scoped>
.language-gateway {
  display: grid;
  min-height: 100vh;
  place-items: center;
  color: #dcecff;
  background: #07111f;
  font: 600 16px/1.4 Inter, ui-sans-serif, system-ui, sans-serif;
}

a { color: #38e1c1; text-decoration: none; }
</style>
