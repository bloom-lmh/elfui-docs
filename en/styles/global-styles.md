# global style

Global styles are injected using `globalStyle()`.

```ts{1}
import { globalStyle } from "@elfui/core";

globalStyle(
  `
  :root {
    --elf-color-primary: #14d8a6;
  }
`,
  { id: "app-theme" }
);
```

When stable `id` is passed in, subsequent calls with the same id will overwrite the old style.

## clean up

```ts{1}
const dispose = globalStyle(`body { margin: 0; }`);

dispose();
```

Test or hot update scenarios can use:

```ts{1}
import { resetGlobalStyles } from "@elfui/core";

resetGlobalStyles();
```

::: tip
Global styles are suitable for token, reset and application-level themes. It is not recommended to write internal details of components.
:::
