---
title: v-model
---

# v-model

`v-model` 用来表达父子之间的双向状态。宏组件内部使用 `defineModel()`。

```ts{3}
import { defineHtml, defineModel, html } from "@elfui/core";

const value = defineModel<string>({ default: "" });

const onInput = (event: Event): void => {
  value.set((event.target as HTMLInputElement).value);
};

export const TextField = defineHtml(html` <input .value=${value} @input=${onInput} /> `);
```

父组件使用：

```ts{3-6}
const name = useRef("");

export const Page = defineHtml(html`
  <text-field v-model=${name}></text-field>
  <p>${name}</p>
`);
```

## 命名 model

```ts{1}
const open = defineModel<boolean>("open", { default: false });
```

父组件：

```html{1}
<elf-dialog v-model:open="visible"></elf-dialog>
```

## 和事件的关系

默认 model 使用 `modelValue` prop 和 `update:modelValue` 事件。命名 model 会使用对应的 prop 和更新事件。

如果只是通知一次动作，用事件；如果父组件需要持有当前值，用 `v-model`。
