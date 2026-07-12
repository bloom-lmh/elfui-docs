---
title: Language Tools
---

# Language Tools

ElfUI Language Tools bring macro-component awareness to ordinary `.ts` and `.tsx` files. They understand exported `defineHtml(...)` components and use the same compiler model as `@elfui/vite-plugin`.

## Install

After the Marketplace release, search for **ElfUI Language Tools** in VS Code, or run:

```bash
code --install-extension SWUST-WEBLAB-LMH.elfui-language-features
```

Every tagged release also carries an installable VSIX asset on the [Language Tools releases page](https://github.com/bloom-lmh/elfui-language-tools/releases). Until the Marketplace listing is available, build that asset from the repository with `pnpm package:vsix`.

## What it provides

- Completion for HTML tags, ElfUI component tags, props, events, directives, `${...}` expressions, and `v-for` locals.
- Compiler-aligned diagnostics for templates, props, emits, slots, models, and local component registration.
- HTML and CSS formatting, CSS completion, hover, and custom-property suggestions inside `html\`...\`` and `css\`...\``.
- Go to definition, references, rename, document links, snippets, component highlighting, and workspace component indexing.

Open an ElfUI project configured with `@elfui/vite-plugin`; the extension discovers the project configuration automatically.
