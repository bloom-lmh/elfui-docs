---
title: 废弃 API
---

# 废弃 API

1.0 beta 主线已经收口，旧 API 不再进入官网主路径。

| 旧 API                               | 替代                                   |
| ------------------------------------ | -------------------------------------- |
| `useState`                           | `useRef` / `useReactive`               |
| `useShallowState`                    | `useShallowRef` / `useShallowReactive` |
| `useName`                            | `defineName`                           |
| `useProps`                           | `defineProps`                          |
| `useEmit`                            | `defineEmits`                          |
| `useStyle`                           | `defineStyle`                          |
| `defineTyped`                        | `defineHtml<Props, Emits, Slots>`      |
| legacy `ElfUI.createComponent` | `@elfui/chain`                         |

## Setter 返回值

从 `v0.1.0-beta.6` 起，`Ref.set()`、可写 computed 的 `set()` 和 `ModelRef.set()` 统一返回 `void`。普通调用无需修改；旧的 `state.set(a).set(b)` 链式写法应拆成两次调用。

::: warning
如果编译器发现旧宏别名，会给出迁移诊断。新代码不要继续使用这些入口。
:::
