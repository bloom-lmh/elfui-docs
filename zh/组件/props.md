---
title: Props
---

# Props

Props 是组件的外部输入。宏组件里用 `defineProps()` 声明。

```ts
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

## 常用写法

| 写法                             | 用途                |
| -------------------------------- | ------------------- |
| `defineProps<Props>()`           | 只声明类型          |
| `defineProps<Props>({ ... })`    | 类型 + runtime 选项 |
| `defineProps({ label: String })` | 从 options 推断类型 |

## Attribute 与 property

ElfUI 输出 Custom Element，所以外部既可以写 attribute，也可以写 property：

```html
<elf-button label="提交"></elf-button>
```

```ts
const el = document.querySelector("elf-button")!;
el.disabled = true;
```

`String`、`Number`、`Boolean`、`Array`、`Object` 会按 props 选项做基础转换。复杂对象建议通过 property 传递。

## 边界

Props 应该是只读输入。组件内部要改状态时，把 prop 拷到 `useRef()` 或使用 `defineModel()` 表达双向绑定。
