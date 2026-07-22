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
| `defineHtml(html\`...\`)`            | `defineHtml(\`...\`)`                 |
| `defineStyle(css\`...\`)`            | `defineStyle(\`...\`)`                |
| legacy `ElfUI.createComponent`       | `@elfui/chain`                         |

## Setter 返回值

从 `v0.1.0-beta.6` 起，`Ref.set()`、可写 computed 的 `set()` 和 `ModelRef.set()` 统一返回 `void`。普通调用无需修改；旧的 `state.set(a).set(b)` 链式写法应拆成两次调用。

::: warning
beta.7 已从公开类型和编译器中删除这些入口。升级 Core 与 Vite 插件后，应同步迁移源码；继续导入旧 API 会直接产生 TypeScript 或打包错误。
:::
