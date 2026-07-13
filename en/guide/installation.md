---
title: Installation
---
# Install

## Create new project

The official scaffolding is the recommended entrance. It creates a Vite application and automatically configures the Macro component mainline.

```bash
pnpm create elfui@beta my-app --install
cd my-app
pnpm dev
```

During interaction, you can choose TypeScript or JavaScript, Macro or Chain components, CSS/SCSS/Less, and optionally Router, Vitest, ESLint, and Prettier. Please select **Macro** for new projects.

Create a routed project directly without interaction:

```bash
pnpm create elfui@beta my-app --router --install
```

This command will add `@elfui/router` and generate router module, page and navigation skeleton. Use `--bare` when a minimal empty project is required, it does not generate tutorial examples.

## Access existing Vite projects

Install the main package and Vite compilation plugin:

```bash
pnpm add @elfui/core
pnpm add -D @elfui/vite-plugin
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

As long as the ordinary TypeScript module exports `defineHtml(...)`, the plug-in will compile it into an ElfUI Macro component:

```ts
import { defineHtml, html } from "@elfui/core";

export const Hello = defineHtml(html`<p>Hello ElfUI</p>`);
```

## Optional packages

| Packages | When to install |
| --- | --- |
| `@elfui/router` | The application requires client routing. It is independent of `@elfui/core`. |
| `@elfui/chain` | Old pages, small demos or no build environments require the Chain component. |
| `@elfui/reactivity` | Only a responsive system is required. |
| `@elfui/runtime` | To encapsulate advanced Custom Element runtime capabilities. |

For the complete relationship between packages, warehouses and tools, see [Ecological Overview] (/en/ecosystem/overview).
