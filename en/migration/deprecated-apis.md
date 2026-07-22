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
| `defineHtml(html\`...\`)`            | `defineHtml(\`...\`)`                 |
| `defineStyle(css\`...\`)`            | `defineStyle(\`...\`)`                |
| legacy `ElfUI.createComponent`       | `@elfui/chain`                         |

## Setter return values

Starting with `v0.1.0-beta.6`, `Ref.set()`, writable computed `set()`, and `ModelRef.set()` consistently return `void`. Normal calls do not change; split the old `state.set(a).set(b)` chain into two calls.

::: warning
Beta.7 removes these entries from public types and the compiler. Migrate source code when Core and the Vite plug-in are upgraded; importing an old API now produces a TypeScript or bundler error.
:::
