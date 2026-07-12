---
title: Effects
---

# Effects

`useEffect()` runs side-effecting logic and automatically tracks its dependencies.

```ts
const count = useRef(0);

useEffect(() => {
  document.title = `Count ${count.value}`;
});
```

An effect may return a cleanup function. Cleanup runs before the next execution and when its scope is destroyed.
