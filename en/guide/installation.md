---
title: Installation
---

# Installation

## Create a new project

The official scaffold is the recommended starting point. It creates a Vite application and configures the Macro component path for you.

```bash
pnpm create elfui@beta my-app --install
cd my-app
pnpm dev
```

During the interactive flow, choose TypeScript or JavaScript, Macro or Chain components, CSS/SCSS/Less, and optional Router, Vitest, ESLint, and Prettier support. New applications should choose **Macro**.

To generate a routed application without the prompts:

```bash
pnpm create elfui@beta my-app --router --install
```

This adds `@elfui/router` and generates the router module, route pages, and navigation shell. Use `--bare` when you want the smallest project instead of the teaching example.

## Add ElfUI to an existing Vite project

Install the main package and the Vite compiler plugin:

```bash
pnpm add @elfui/core
pnpm add -D @elfui/vite-plugin
```

```ts
// vite.config.ts
import { elfuiMacroPlugin } from "@elfui/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

Any TypeScript module that exports `defineHtml(...)` can be compiled as an ElfUI Macro component.

```ts
import { defineHtml, html } from "@elfui/core";

export const Hello = defineHtml(html`<p>Hello ElfUI</p>`);
```

## Optional packages

| Package | Install it when |
| --- | --- |
| `@elfui/router` | The application needs client-side routing. It is independent from `@elfui/core`. |
| `@elfui/chain` | You need Chain components for legacy pages, small demos, or a no-build environment. |
| `@elfui/reactivity` | You only need the reactive system. |
| `@elfui/runtime` | You are building advanced Custom Element abstractions. |

For a full map of packages, repositories, and tooling, see [Ecosystem](/en/ecosystem/overview).
