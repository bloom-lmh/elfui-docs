---
title: Installation
---
# Install

## Create new project

::: tip
The official scaffolding is the recommended entrance. It creates a Vite application and automatically configures the Macro component mainline.
:::

```bash{1}
pnpm create elfui@beta my-app --install
cd my-app
pnpm dev
```

During interaction, you can choose TypeScript or JavaScript, Macro or Chain components, CSS/SCSS/Less, and optionally Router, Vitest, ESLint, and Prettier. Please select **Macro** for new projects.

Create a routed project directly without interaction:

```bash{1}
pnpm create elfui@beta my-app --router --install
```

This command will add `@elfui/router` and generate router module, page and navigation skeleton. Use `--bare` when a minimal empty project is required, it does not generate tutorial examples.

## Access existing Vite projects

Install the main package and Vite compilation plugin:

```bash{1}
pnpm add @elfui/core
pnpm add -D @elfui/vite-plugin
```

`@elfui/core` is the application's only direct runtime dependency. `@elfui/runtime`, `@elfui/reactivity`, and `@elfui/shared` are installed as framework internals and should not be repeated in a normal application's `dependencies`.

::: warning beta.5 compatibility
The single-entry contract starts with `v0.1.0-beta.6`. Generated code from beta.5 and earlier may still import `@elfui/runtime/internal` directly. pnpm projects must keep the matching `@elfui/runtime` dependency until Core and the Vite plugin are upgraded together to beta.6.
:::

```ts{6-7}
// vite.config.ts
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

As long as the ordinary TypeScript module exports `defineHtml(...)`, the plug-in will compile it into an ElfUI Macro component:

```ts{3}
import { defineHtml, html } from "@elfui/core";

export const Hello = defineHtml(html`<p>Hello ElfUI</p>`);
```

## Optional packages

| Packages | When to install |
| --- | --- |
| `@elfui/router` | The application requires client routing. It is independent of `@elfui/core`. |
| `@elfui/chain` | Old pages, small demos or no build environments require the Chain component. |
| `@elfui/reactivity` | Low-level libraries that use reactivity without the component runtime. Normal ElfUI applications import from Core. |
| `@elfui/runtime` | Framework integrations and low-level Custom Element runtime wrappers. Normal ElfUI applications import from Core. |

For the complete relationship between packages, warehouses and tools, see [Ecological Overview] (/en/ecosystem/overview).
