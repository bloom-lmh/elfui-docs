---
title: Events
---
# event

Components use events when notifying changes to the outside world. Use `defineEmits()` in the macro component to get the `emit` function.

```ts{13-16}
import { defineEmits, defineHtml, html } from "@elfui/core";

const emit = defineEmits<{
  change: [value: string];
  clear: [];
}>();

const onInput = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  emit("change", input.value);
};

export const SearchBox = defineHtml(html`
  <input @input=${onInput} />
  <button @click=${() => emit("clear")}>清空</button>
`);
```

## Listen for events

Listen to custom events in the parent component template:

```ts{5}
const update = (event: CustomEvent<string>): void => {
  keyword.set(event.detail);
};

export const Page = defineHtml(html` <search-box @change=${update}></search-box> `);
```

`detail` for single-parameter events is this parameter. Multi-parameter events are put into `detail` as an array.

## When to use events

Events are suitable for expressing "what has happened", such as `change`, `submit`, `close`. If the parent component needs to control the value directly, it is clearer to use `v-model`.
