---
title: Events
---

# Events

Use `defineEmits()` to publish component events.

```ts
import { defineEmits, defineHtml, html } from "@elfui/core";

const emit = defineEmits<{ change: [value: string]; clear: [] }>();

const onInput = (event: Event): void => {
  emit("change", (event.target as HTMLInputElement).value);
};

export const SearchBox = defineHtml(html`
  <input @input=${onInput} />
  <button @click=${() => emit("clear")}>Clear</button>
`);
```

A single event argument becomes `CustomEvent.detail`; multiple arguments are emitted as an array.
