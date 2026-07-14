# Component exposed

`defineExpose()` exposes methods or properties to the component host, which can be called externally through DOM ref.

```ts{5-10}
import { defineExpose, defineHtml, html, useTemplateRef } from "@elfui/core";

const input = useTemplateRef<HTMLInputElement>("input");

defineExpose({
  focus: () => input.value?.focus(),
  clear: () => {
    if (input.value) input.value.value = "";
  }
});

export const SearchInput = defineHtml(html` <input ref="input" /> `);
```

External use:

```ts{1}
const el = document.querySelector("search-input") as HTMLElement & {
  focus(): void;
};

el.focus();
```

## What is appropriate to expose

Good for exposing imperative capabilities:

- `focus()`
- `blur()`
- `validate()`
- `reset()`
- `scrollToActive()`

Don't expose internal reactive state. State should be maintained via props, events, or v-model.
