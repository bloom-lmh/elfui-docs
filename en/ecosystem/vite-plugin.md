---
title: Vite Plugin
---
# Vite plugin

::: tip
`@elfui/vite-plugin` is responsible for compiling the ordinary `.ts/.tsx` macro component into a runtime render function. It is recommended for new projects to always install and enable it.
:::

```ts{1-2,4}
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

## tagPrefix

::: warning
The tag name of the macro component is determined at compile time, so `tagPrefix` can only be configured in the Vite plug-in and cannot be modified through `configure()` at runtime.
:::

```ts{1-2,4}
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [
    elfuiMacroPlugin({
      tagPrefix: "acme"
    })
  ]
});
```

```ts{1,3}
import { defineHtml, html } from "@elfui/core";

export const UserCard = defineHtml(html`<article><slot></slot></article>`);
```

::: tip
The above component will compile to `acme-user-card`. `tagPrefix: "acme-"` will also be normalized to the same result, but it is recommended to write `"acme"` without the trailing dash.
:::

## automatic recognition

The plugin will recognize the exported `defineHtml(...)` component:

```ts{1}
export const Button = defineHtml(html`<button><slot></slot></button>`);
```

```ts{1,3}
const Button = defineHtml(html`<button><slot></slot></button>`);

export { Button };
```

```ts{1}
export default defineHtml(html`<button><slot></slot></button>`);
```

::: tip
`.elf.ts` is still compatible with the file header pragma, but ordinary `.ts/.tsx` is already the recommended writing method.
:::

## Diagnostic options

```ts{1}
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true
});
```

::: tip
It is recommended to enable the component library; ordinary applications can use the default configuration first.
:::
