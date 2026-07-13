# Migrate from Vue

ElfUI retains a lot of the template mentality familiar to Vue users, but the component model and runtime are different.

| Vue             | ElfUI                           |
| --------------- | ------------------------------- |
| SFC | Common `.ts/.tsx` macro component |
| `ref()`         | `useRef()`                      |
| `reactive()`    | `useReactive()`                 |
| `computed()` | `useComputed()` or `computed()` |
| `emit()`        | `defineEmits()`                 |
| `defineModel()` | `defineModel()`                 |
| Vue Component | Custom Element |

## state

```ts
const count = useRef(0);
count.set(count.peek() + 1);
```

Object:

```ts
const user = useReactive({ name: "Elf" });
user.name = "ElfUI";
```

## Component output

The ElfUI component is a native tag after registration:

```html
<elf-counter></elf-counter>
```

This allows it to be used by Vue, React, Angular or plain HTML.
