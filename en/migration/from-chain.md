# Migrate from chain to components

Chained components are still available, but the new project thread is macro components.

## Counter comparison

Chain:

```ts{4}
ElfUI.createComponent()
  .name("elf-counter")
  .setup(() => {
    const count = useRef(0);
    return { count, inc: () => count.set(count.peek() + 1) };
  })
  .template(`<button @click="inc">{{ count }}</button>`)
  .register();
```

Macro components:

```ts{4}
const count = useRef(0);
const inc = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(` <button @click=${inc}>${count}</button> `);
```

## Migration rules

| Chain | Macro component |
| ---------------- | -------------------------------------- |
| `.name()` | Export name inference or `defineName()` |
| `.props()`       | `defineProps()`                        |
| `.emits()`       | `defineEmits()`                        |
| `.template()`    | `defineHtml(`...`)`                |
| `.style()`       | `defineStyle(`...`)`                |
| `.use()`         | `useComponents()`                      |
| `.formControl()` | `defineOptions({ formControl: true })` |

When migrating, first keep the template behavior unchanged, and then gradually change the type and style organization.
