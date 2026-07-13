# Composables overview

Composables package reusable stateful logic into functions. They should accept clear inputs, return the state and operations a component needs, and clean up side effects with the component lifecycle.

Use composables to share behavior without forcing unrelated components into one inheritance hierarchy.

## Design a composable API

Return the smallest useful surface: reactive values for rendering and methods for intentional state changes. Accept callbacks or refs only when the composable needs to react to them over time.

```ts
export function useCounter(initial = 0) {
  const count = useRef(initial);
  return { count, increment: () => count.set(count.value + 1) };
}
```

Document ownership clearly when a composable creates listeners, observers, or other browser resources.
