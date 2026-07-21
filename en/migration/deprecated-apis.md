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

## Setter return values

Starting with `v0.1.0-beta.6`, `Ref.set()`, writable computed `set()`, and `ModelRef.set()` consistently return `void`. Normal calls do not change; split the old `state.set(a).set(b)` chain into two calls.

::: warning
If the compiler finds an old macro alias, it will give a migration diagnostic. New code should not continue to use these entries.
:::
