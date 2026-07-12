---
title: Props
---

# Props

Props are readonly external inputs declared with `defineProps()`.

```ts
import { defineHtml, defineProps, html } from "@elfui/core";

const props = defineProps<{ label: string; disabled: boolean }>({
  label: { type: String, default: "Save" },
  disabled: { type: Boolean, default: false }
});

export const ElfButton = defineHtml(html`
  <button :disabled=${props.disabled}>${props.label}</button>
`);
```

Because ElfUI outputs Custom Elements, consumers may pass primitive values through attributes and complex values through DOM properties.
