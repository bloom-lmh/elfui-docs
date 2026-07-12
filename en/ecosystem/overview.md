---
title: Ecosystem
---

# Ecosystem

ElfUI keeps the framework core focused and gives larger concerns their own home. New Macro applications usually begin with the scaffold, then add only the pieces they need.

```bash
pnpm create elfui@beta my-app --install
```

| Project | Role | When to reach for it |
| --- | --- | --- |
| [ElfUI](https://github.com/bloom-lmh/elfui) | Framework core | Macro components, reactivity, runtime, compiler, and Vite integration. |
| [create-elfui](https://github.com/bloom-lmh/create-elfui) | Project scaffold | Starting a new Vite application with optional Router and quality tooling. |
| [ElfUI Router](https://github.com/bloom-lmh/elfui-router) | Routing | Adding client-side navigation without putting Router in the core package. |
| [ElfUI Kit](https://github.com/bloom-lmh/elfui-kit) | UI components | Building product interfaces from official components. |
| [ElfUI Extensions](https://github.com/bloom-lmh/elfui-extensions) | Optional extensions | Using Chain and future platform integrations. |
| [ElfUI Language Tools](https://github.com/bloom-lmh/elfui-language-tools) | Editor tooling | Working with the VS Code extension and language service. |
| [elfui-docs](https://github.com/bloom-lmh/elfui-docs) | Documentation | Reading the complete guide and API reference. |

Macro components and `@elfui/vite-plugin` are the default path for new projects. Chain is an extension for legacy pages, no-build usage, and its fluent builder model; it is not a second default.
