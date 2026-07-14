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

| Writing | Purpose |
| -------------------------------- | ------------------- |
| `defineProps<Props>()` | Only declare type |
| `defineProps<Props>({ ... })` | type + runtime options |
| `defineProps({ label: String })` | Infer type from options |

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
`String`, `Number`, `Boolean`, `Array`, `Object` will perform basic conversion according to props options. It is recommended to pass complex objects through properties.
:::

## boundary

Props should be read-only input. When you want to change the state inside the component, copy the prop to `useRef()` or use `defineModel()` to express two-way binding.
