import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { registerComponents } from "@elfui/core";

import HomePage from "./components/HomePage.vue";
import LanguageGateway from "./components/LanguageGateway.vue";

import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
    app.component("LanguageGateway", LanguageGateway);
    if (!import.meta.env.SSR) {
      void Promise.all([import("./examples/DemoCounter.elf"), import("./examples/DemoToggle.elf")]).then(
        ([{ DemoCounter }, { DemoToggle }]) => {
          registerComponents(DemoCounter, DemoToggle);
        }
      );
    }
  }
} satisfies Theme;
