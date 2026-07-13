---
title: 从 Vue 迁移
---

# 从 Vue 迁移

ElfUI 保留了很多 Vue 用户熟悉的模板心智，但组件模型和运行时不同。

| Vue             | ElfUI                           |
| --------------- | ------------------------------- |
| SFC             | 普通 `.ts/.tsx` 宏组件          |
| `ref()`         | `useRef()`                      |
| `reactive()`    | `useReactive()`                 |
| `computed()`    | `useComputed()` 或 `computed()` |
| `emit()`        | `defineEmits()`                 |
| `defineModel()` | `defineModel()`                 |
| Vue 组件        | Custom Element                  |

## 状态

```ts{1}
const count = useRef(0);
count.set(count.peek() + 1);
```

对象：

```ts{1}
const user = useReactive({ name: "Elf" });
user.name = "ElfUI";
```

## 组件输出

ElfUI 组件注册后是原生标签：

```html{1}
<elf-counter></elf-counter>
```

这让它可以被 Vue、React、Angular 或普通 HTML 使用。
