---
title: Events
---

# event

Components use events when notifying changes to the outside world. Use `defineEmits()` in the macro component to get the `emit` function.

```ts{3-8}
import { defineEmits, defineHtml, html } from "@elfui/core";

interface SearchBoxEmits {
  change: [value: string];
  clear: [];
}

const emit = defineEmits<SearchBoxEmits>(["change", "clear"]);

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

Component events are standard `CustomEvent` instances. `bubbles`, `composed`, and `cancelable` default to `false`; enable them only when the event intentionally participates in DOM propagation or crosses a Shadow DOM boundary:

```ts
defineOptions({
  emitOptions: {
    events: {
      submit: { bubbles: true, composed: true, cancelable: true },
    },
  },
});

const accepted = emit("submit", value);
```

`emit()` returns the boolean result of `dispatchEvent()`. It becomes `false` when a cancelable event is prevented by the host.

## Types and runtime event names

Finite-key interfaces and type aliases are both valid `defineEmits` generic arguments. The compiler can extract event names declared in the same file. When the event type is imported from another file, also provide the runtime event-name array:

```ts
import type { SearchBoxEmits } from "./types";

const emit = defineEmits<SearchBoxEmits>(["change", "clear"]);
```

The array is constrained by the generic keys, so an unknown event name is a TypeScript error.

## When to use events

Events are suitable for expressing "what has happened", such as `change`, `submit`, `close`. If the parent component needs to control the value directly, it is clearer to use `v-model`.
