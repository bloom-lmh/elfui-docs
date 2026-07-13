# v-model

`v-model` is used to express the bidirectional status between father and son. The macro component uses `defineModel()` internally.

```ts
import { defineHtml, defineModel, html } from "@elfui/core";

const value = defineModel<string>({ default: "" });

const onInput = (event: Event): void => {
  value.set((event.target as HTMLInputElement).value);
};

export const TextField = defineHtml(html` <input .value=${value} @input=${onInput} /> `);
```

Parent component uses:

```ts
const name = useRef("");

export const Page = defineHtml(html`
  <text-field v-model=${name}></text-field>
  <p>${name}</p>
`);
```

## Name model

```ts
const open = defineModel<boolean>("open", { default: false });
```

Parent component:

```html
<elf-dialog v-model:open="visible"></elf-dialog>
```

## relationship with events

The default model uses the `modelValue` prop and `update:modelValue` event. Named models will use corresponding props and update events.

If you only notify an action once, use an event; if the parent component needs to hold the current value, use `v-model`.
