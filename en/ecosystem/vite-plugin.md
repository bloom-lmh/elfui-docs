---
title: Vite Plugin
---

# Vite Plugin

`@elfui/vite-plugin` compiles ElfUI macro components at build time. Add it before the rest of your application tooling.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin({ macroImport: "@elfui/core" })]
});
```

The plugin recognizes macro component files, precompiles templates, and reports compiler diagnostics through Vite.

## Install

```bash
pnpm add @elfui/core
pnpm add -D @elfui/vite-plugin
```
