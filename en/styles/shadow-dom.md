# Shadow DOM

ElfUI components use Shadow DOM by default, allowing clear boundaries between styles and DOM structures.

```ts{1-3}
defineOptions({
  shadow: "open"
});
```

## model

| Value | Meaning |
| ---------- | ---------------------------------- |
| `"open"` | Default, accessible via `el.shadowRoot` |
| `"closed"` | ShadowRoot cannot be directly accessed from the outside |
| `false` | Does not create Shadow DOM, content is rendered to host |

## When to close Shadow DOM

Scenarios suitable for closing Shadow DOM:

- Need to fully inherit the global style of the page
- Progressive integration with old pages
- Requires third-party CSS framework to directly hit internal nodes

::: tip
It is not recommended to turn it off by default. Shadow DOM is part of the component boundary.
:::
