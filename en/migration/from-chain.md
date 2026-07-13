# Migrate from chain to components

Chained components are still available, but the new project thread is macro components.

## Counter comparison

Chain:

```ts
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

```ts
const count = useRef(0);
const inc = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(html` <button @click=${inc}>${count}</button> `);
```

## Migration rules

| Chain | Macro component |
| ---------------- | -------------------------------------- |
| `.name()` | Export name inference or `defineName()` |
| `.props()`       | `defineProps()`                        |
| `.emits()`       | `defineEmits()`                        |
| `.template()`    | `defineHtml(html`...`)`                |
| `.style()`       | `defineStyle(css`...`)`                |
| `.use()`         | `useComponents()`                      |
| `.formControl()` | `defineOptions({ formControl: true })` |

When migrating, first keep the template behavior unchanged, and then gradually change the type and style organization.
