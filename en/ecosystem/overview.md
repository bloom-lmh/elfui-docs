---
title: Ecosystem
---
# Ecological Overview

ElfUI keeps the core of the framework focused and puts larger capabilities with different iteration rhythms into independent projects. New Macro applications often start with scaffolding, with additional parts added as needed.

```bash
pnpm create elfui@beta my-app --install
```

| Projects | Responsibilities | When to use |
| --- | --- | --- |
| [ElfUI](https://github.com/bloom-lmh/elfui) | Framework core | Macro components, reactivity, runtime, compiler and Vite integration. |
| [create-elfui](https://github.com/bloom-lmh/create-elfui) | Project scaffolding | Create a Vite application and add Router and quality tools as needed. |
| [ElfUI Router](https://github.com/bloom-lmh/elfui-router) | Routing | Need client navigation, but don't want Router to go into the core package. |
| [ElfUI Kit](https://github.com/bloom-lmh/elfui-kit) | UI component library | Use official components to build product interfaces. |
| [ElfUI Extensions](https://github.com/bloom-lmh/elfui-extensions) | Optional extensions | Use Chain to integrate with future platforms. |
| [ElfUI Language Tools](https://github.com/bloom-lmh/elfui-language-tools) | Editor Tools | Use VS Code plug-ins and language services. |
| [elfui-docs](https://github.com/bloom-lmh/elfui-docs) | Documentation Site | Check out the complete guide and API reference. |

The default route for new projects is the Macro component plus `@elfui/vite-plugin`. Chain is an extension prepared for old pages, no-build scenarios and chain builder models. It is not the second default main line.
