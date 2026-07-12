import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { defineAsyncComponent } from "vue";
import { registerComponents } from "@elfui/core";

import HomePage from "./components/HomePage.vue";
import LanguageGateway from "./components/LanguageGateway.vue";

import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomePage", HomePage);
    app.component("LanguageGateway", LanguageGateway);
    app.component("CaseGallery", defineAsyncComponent(() => import("./components/cases/CaseGallery.vue")));
    app.component("PlaygroundPage", defineAsyncComponent(() => import("./components/playground/PlaygroundPage.vue")));
    app.component(
      "PlaygroundPreviewHost",
      defineAsyncComponent(() => import("./components/playground/PlaygroundPreviewHost.vue"))
    );
    if (!import.meta.env.SSR) {
      void Promise.all([import("./examples/DemoCounter.elf"), import("./examples/DemoToggle.elf")]).then(
        ([{ DemoCounter }, { DemoToggle }]) => {
          registerComponents(DemoCounter, DemoToggle);
        }
      );
    }
  }
} satisfies Theme;
