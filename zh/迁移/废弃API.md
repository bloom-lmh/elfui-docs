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

::: warning
如果编译器发现旧宏别名，会给出迁移诊断。新代码不要继续使用这些入口。
:::
