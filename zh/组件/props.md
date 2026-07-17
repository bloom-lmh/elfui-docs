---
title: Props
---

# Props

Props 是组件的外部输入。宏组件里用 `defineProps()` 声明。

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

## 常用写法

| 写法                             | 用途                |
| -------------------------------- | ------------------- |
| `defineProps<Props>()`           | 只声明类型          |
| `defineProps<Props>({ ... })`    | 类型 + runtime 选项 |
| `defineProps({ label: String })` | 从 options 推断类型 |

对于同文件、非泛型的 `Props` 声明，`defineProps<Props>()` 可以为 string、number、boolean、array、object、function 和同类字面量联合生成 runtime converter。需要默认值，或类型来自 import、泛型、混合联合时，应显式提供 runtime options；编译器无法安全推断时会给出诊断，而不会猜测。

## Attribute 与 property

ElfUI 输出 Custom Element，所以外部既可以写 attribute，也可以写 property：

```html{1}
<elf-button label="提交"></elf-button>
```

```ts{1}
const el = document.querySelector("elf-button")!;
el.disabled = true;
```

::: tip
object、array 和 function 应通过 property 传递。ElfUI 保留宿主拥有的原引用，不会把它包装成新的深层响应式 Proxy；整体替换 property 仍会触发响应式更新。
:::

Boolean attribute 缺失时使用默认值；空值、`"true"` 或与 attribute 同名的值转为 `true`，`"false"` 和其他字符串转为 `false`。动态布尔值优先使用 property，或在值为 false 时移除 attribute。

## 边界

Props 应该是只读输入。组件内部要改状态时，把 prop 拷到 `useRef()` 或使用 `defineModel()` 表达双向绑定。
