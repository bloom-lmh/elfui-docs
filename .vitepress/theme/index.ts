import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { registerComponents } from "elfui";

import HomePage from "./components/HomePage.vue";

import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
    if (!import.meta.env.SSR) {
      void import("./examples/DemoCounter.elf").then(({ DemoCounter }) => {
        registerComponents(DemoCounter);
      });
    }
  }
} satisfies Theme;
