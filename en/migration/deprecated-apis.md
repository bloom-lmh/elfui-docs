# Deprecated API

The 1.0 beta mainline has been closed, and the old API no longer enters the official website main path.

| Old API | Replacement |
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
If the compiler finds an old macro alias, it will give a migration diagnostic. New code should not continue to use these entries.
:::
