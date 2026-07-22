---
title: Computed Values
---
# Computed properties

`useComputed()` is used to declare derived values. It automatically tracks reactive dependencies read in getters.

```ts
const first = useRef("Elf");
const last = useRef("UI");

const fullName = useComputed(() => `${first.value} ${last.value}`);
```

Used directly in the template:

```ts
defineHtml(`<p>${fullName}</p>`);
```

## Writable computed properties

```ts
const count = useRef(0);

const doubled = useComputed({
  get: () => count.value * 2,
  set: (value: number) => count.set(value / 2),
});
```

`useComputed` is the only public computed-value constructor, keeping ElfUI's composition APIs consistent and avoiding two names for the same behavior.
