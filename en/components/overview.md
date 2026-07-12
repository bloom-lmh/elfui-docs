---
title: Components
---

# Components

An ElfUI component is a standard Custom Element. TypeScript defines behavior, while `defineHtml(html\`...\`)` declares the template and component boundary.

```ts
import { defineHtml, defineProps, html } from "@elfui/core";

const props = defineProps<{ label: string }>({
  label: { type: String, default: "Save" }
});

export const SaveButton = defineHtml(html`
  <button>${props.label}</button>
`);
```

Keep a component contract small: start with props and events, then add models, slots, injection, or exposed methods only when they solve a concrete communication need.
