# Template syntax overview

ElfUI templates describe the DOM with declarative bindings. Expressions read state, directives control rendering behavior, and event bindings connect user input to component logic.

Keep template expressions simple; put non-trivial logic in component code or computed values.

## A small template

```ts
const count = useRef(0);

export const Counter = defineHtml(html`
  <button @click=${() => count.set(count.value + 1)}>
    Count: ${count}
  </button>
`);
```

Use text interpolation for display values, property bindings for DOM state, and event bindings for user actions. Conditional and list directives should always be driven by stable component state rather than direct DOM changes.
