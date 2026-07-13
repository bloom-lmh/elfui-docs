# Component style

Component internal styles use `defineStyle()` and `css`.

```ts
import { css, defineHtml, defineStyle, html } from "@elfui/core";

defineStyle(css`
  button {
    border-radius: 8px;
    padding: 8px 12px;
  }
`);

export const ElfButton = defineHtml(html` <button><slot></slot></button> `);
```

The style will enter the Shadow DOM along with the component definition, without polluting the overall page.

## multi-paragraph style

`defineStyle()` can be called multiple times and is suitable for splitting basic styles and status styles.

```ts
defineStyle(baseStyle);
defineStyle(stateStyle);
```

## Dynamic styles

Component state changes are first mapped to class, attribute or CSS variables, and then processed by CSS.
