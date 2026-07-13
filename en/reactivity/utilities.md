# Reactivity utilities

Reactivity utilities help adapt values at API boundaries, derive readonly views, and work with individual properties while preserving reactive connections. Use them when a composable must accept either a value or a reactive source.

Avoid unwrapping reactive state too early, because doing so loses its connection to updates.

## Preserve the reactive source

Composables should return refs or reactive objects when consumers need to observe future changes. Convert a value only at the boundary where a plain snapshot is required, such as an HTTP request payload.

```ts
const total = useComputed(() => price.value * quantity.value);
const readonlyTotal = readonly(total);
```

Derived values belong in computed state; effects are for work outside the reactive graph.
