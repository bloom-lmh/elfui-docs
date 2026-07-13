---
title: Packages
---
# Packages and entrances

::: warning
ElfUI separates mainline capabilities and expansion capabilities. New projects start with `@elfui/core`, and chained components only use `@elfui/chain` when needed.
:::

## Entrance selection

| Scenario | Installation | Import |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| New Project / Component Library | `@elfui/core` + `@elfui/vite-plugin` | `import { defineHtml, createApp } from "@elfui/core"` |
| Routing | `@elfui/router` | `import { createRouter } from "@elfui/router"` |
| Old site embedded / small demo | `@elfui/chain` | `import { ElfUI } from "@elfui/chain"` |
| Only responsive | `@elfui/reactivity` | `import { useRef } from "@elfui/reactivity"` |
| Advanced runtime packaging | `@elfui/runtime` | `import { defineComponent } from "@elfui/runtime"` |
| Create Vite Project | `create-elfui` | `pnpm create elfui@beta my-app --install` |

## Package responsibilities

| Packages | Responsibilities |
| -------------------- | ------------------------------------------------ |
| `@elfui/core` | Macro component and root mount entry, aggregating commonly used reactive and runtime APIs |
| `@elfui/vite-plugin` | Vite macro component compilation plug-in |
| `@elfui/router` | Web Components Routing |
| `@elfui/chain` | Chained component expansion package, including runtime compiler |
| `@elfui/reactivity` | Complete entrance to responsive system |
| `@elfui/runtime` | Custom Element, lifecycle, built-in components and advanced helpers |
| `@elfui/compiler` | Compiler source code capabilities for tools and extensions |

## Volume caliber

Current beta volume baseline:

| Entry | gzip | Description |
| ----------------------- | -------: | --------------------------------------- |
| `@elfui/core` | 10.52 KB | Main entry, without runtime compiler |
| `@elfui/chain` | 21.19 KB | Chained `.template()` with runtime compiler |
| `@elfui/core + @elfui/router` | 15.00 KB | Main entrance plus routing |
| `@elfui/reactivity` | 4.17 KB | Reactive only |

## boundary

`@elfui/core` does not export the `createComponent()`, `ElementBuilder`, `compile()` or runtime string template capabilities. When you need a chained API, go to "Ecology/Chain Components".

::: warning
`@elfui/router` is a standalone package; only install it if routing is required. For the complete ecology, see [Ecosystem Overview] (/en/ecosystem/overview): Router, Extensions, UI Kit, Language Tools and Create ElfUI are all maintained independently in their respective warehouses.
:::
