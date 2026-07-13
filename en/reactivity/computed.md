---
title: Computed Values
---
# Computed properties

`useComputed()` is used to declare derived values. It automatically tracks reactive dependencies read in getters.

```ts{1-2,4}
const first = useRef("Elf");
const last = useRef("UI");

const fullName = useComputed(() => `${first.value} ${last.value}`);
```

Used directly in the template:

```ts{1}
defineHtml(html`<p>${fullName}</p>`);
```

## Writable computed properties

```ts{1,3}
const count = useRef(0);

const doubled = useComputed({
  get: () => count.value * 2,
  set: (value: number) => count.set(value / 2)
});
```

## computed alias

`computed` is an alias of `useComputed`, which reduces migration costs for Vue users:

```ts{1}
import { computed } from "@elfui/core";
```

::: tip
It is recommended to unify a naming style in the project.
:::
