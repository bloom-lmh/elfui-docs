<template>
  <main ref="root" class="elf-home">
    <HomeHero />
    <HomeFeatures />
    <HomeComparison />
    <HomePipeline />
    <HomeEcosystem />
  </main>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import HomeHero from "./home/HomeHero.vue";
import HomeComparison from "./home/HomeComparison.vue";
import HomeEcosystem from "./home/HomeEcosystem.vue";
import HomeFeatures from "./home/HomeFeatures.vue";
import HomePipeline from "./home/HomePipeline.vue";

const root = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | undefined;

onMounted(async () => {
  await nextTick();
  const targets = [...(root.value?.querySelectorAll<HTMLElement>("[data-home-reveal]") ?? [])];
  const reveal = (target: HTMLElement) => target.classList.add("is-visible");

  if (!("IntersectionObserver" in window)) {
    targets.forEach(reveal);
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  targets.forEach((target) => observer?.observe(target));
});

onBeforeUnmount(() => observer?.disconnect());
</script>
