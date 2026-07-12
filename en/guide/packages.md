---
title: Packages
---

# Packages and ecosystem

New applications start with `@elfui/core`. Chain-style components are an optional ecosystem package.

| Package | Responsibility |
| --- | --- |
| `@elfui/core` | Macro components, application mounting, common reactive and runtime APIs |
| `@elfui/vite-plugin` | Build-time macro component compiler |
| `@elfui/router` | Routing for Web Components |
| `@elfui/chain` | Chain builder and runtime string templates |
| `@elfui/reactivity` | Standalone reactive system |
| `@elfui/runtime` | Advanced Custom Element and runtime APIs |
| `create-elfui` | Official Vite project scaffold |

`@elfui/core` intentionally excludes the chain builder, runtime string compiler, and compiler internals.

`@elfui/router` is installed separately. The scaffold adds it only when Router is selected. The rest of the ecosystem is intentionally split into focused repositories: [Router](https://github.com/bloom-lmh/elfui-router), [Extensions](https://github.com/bloom-lmh/elfui-extensions), [UI Kit](https://github.com/bloom-lmh/elfui-kit), [Language Tools](https://github.com/bloom-lmh/elfui-language-tools), and [Create ElfUI](https://github.com/bloom-lmh/create-elfui).
