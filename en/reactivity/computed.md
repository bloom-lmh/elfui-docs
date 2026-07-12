---
title: Computed Values
---

# Computed Values

`useComputed()` creates a lazy derived value and tracks every reactive read in its getter.

```ts
const first = useRef("Elf");
const last = useRef("UI");
const fullName = useComputed(() => `${first.value}${last.value}`);
```

`computed` is an alias for teams migrating from Vue. Choose one naming style and use it consistently.
