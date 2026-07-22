# Component style

Inline component styles use `defineStyle()` with a template literal.

```ts{3-8}
import { defineHtml, defineStyle } from "@elfui/core";

defineStyle(`
  button {
    border-radius: 8px;
    padding: 8px 12px;
  }
`);

export const ElfButton = defineHtml(` <button><slot></slot></button> `);
```

The style will enter the Shadow DOM along with the component definition, without polluting the overall page.

## multi-paragraph style

`defineStyle()` can be called multiple times or receive multiple imported style strings in one call.

```ts{1}
defineStyle(baseStyle);
defineStyle(stateStyle);
// Equivalent: defineStyle(baseStyle, stateStyle);
```

Beta.7 removes the `css` tagged-template helper. Components use `defineStyle(\`...\`)` directly.

## Dynamic styles

Component state changes are first mapped to class, attribute or CSS variables, and then processed by CSS.
