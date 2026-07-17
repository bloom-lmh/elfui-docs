---
title: Props
---

# Props

Props are external inputs to the component. Declared with `defineProps()` in the macro component.

```ts{3-9}
import { defineHtml, defineProps, html } from "@elfui/core";

const props = defineProps<{
  label: string;
  disabled: boolean;
}>({
  label: { type: String, default: "保存" },
  disabled: { type: Boolean, default: false }
});

export const ElfButton = defineHtml(html`
  <button :disabled=${props.disabled}>${props.label}</button>
`);
```

## Commonly used writing methods

| Writing                          | Purpose                 |
| -------------------------------- | ----------------------- |
| `defineProps<Props>()`           | Only declare type       |
| `defineProps<Props>({ ... })`    | type + runtime options  |
| `defineProps({ label: String })` | Infer type from options |

For local, non-generic `Props` declarations, `defineProps<Props>()` can generate runtime converters for strings, numbers, booleans, arrays, objects, functions, and same-kind literal unions. Use explicit runtime options when defaults are required or when the type is imported, generic, or a mixed union. The compiler reports a diagnostic instead of guessing an unsafe converter.

## Attribute and property

ElfUI outputs Custom Element, so you can write either attribute or property externally:

```html{1}
<elf-button label="提交"></elf-button>
```

```ts{1}
const el = document.querySelector("elf-button")!;
el.disabled = true;
```

::: tip
Pass objects, arrays, and functions through properties. ElfUI preserves the host-owned reference instead of wrapping it in a new deep reactive Proxy; replacing the whole property remains reactive.
:::

For Boolean attributes, an absent attribute uses the default. An empty value, `"true"`, or the attribute's own name maps to `true`; `"false"` and other strings map to `false`. Prefer property assignment for dynamic booleans, or remove the attribute when the value is false.

## boundary

Props should be read-only input. When you want to change the state inside the component, copy the prop to `useRef()` or use `defineModel()` to express two-way binding.
