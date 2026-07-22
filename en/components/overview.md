---
title: Components
---
# Component overview

ElfUI's components are standard Custom Elements. The main line of writing is macro components: the top-level TypeScript is responsible for logic, and `defineHtml(`...`)` is responsible for declaring templates and component boundaries.

```ts{7}
import { defineHtml, defineProps } from "@elfui/core";

const props = defineProps<{ label: string }>({
  label: { type: String, default: "保存" }
});

export const SaveButton = defineHtml(` <button>${props.label}</button> `);
```

## Component capabilities

| Capabilities | Documentation |
| ---------- | -------------------------------- |
| Define components | `defineHtml`, file export, tag inference |
| Input | Props |
| output | events, v-model |
| Content Distribution | Slots |
| Cross-layer sharing | Provide / Inject |
| Imperative access | Template reference, component exposure |
| Combination | Local components, dynamic components |
| Multiplexing | `useExtend` / `useVariant` |

## Recommended order

::: tip
Write props and events clearly first, then decide whether you need v-model, slots, provide/inject or expose. Don’t mix too many component communication methods. The fewer APIs, the more stable they are.
:::
