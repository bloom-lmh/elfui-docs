---
title: Vite Plugin
---
# Vite plugin

`@elfui/vite-plugin` is responsible for compiling the ordinary `.ts/.tsx` macro component into a runtime render function. It is recommended for new projects to always install and enable it.

```ts
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

## tagPrefix

The tag name of the macro component is determined at compile time, so `tagPrefix` can only be configured in the Vite plug-in and cannot be modified through `configure()` at runtime.

```ts
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

```ts
import { defineHtml, html } from "@elfui/core";

export const UserCard = defineHtml(html`<article><slot></slot></article>`);
```

The above component will compile to `acme-user-card`. `tagPrefix: "acme-"` will also be normalized to the same result, but it is recommended to write `"acme"` without the trailing dash.

## automatic recognition

The plugin will recognize the exported `defineHtml(...)` component:

```ts
export const Button = defineHtml(html`<button><slot></slot></button>`);
```

```ts
const Button = defineHtml(html`<button><slot></slot></button>`);

export { Button };
```

```ts
export default defineHtml(html`<button><slot></slot></button>`);
```

`.elf.ts` is still compatible with the file header pragma, but ordinary `.ts/.tsx` is already the recommended writing method.

## Diagnostic options

```ts
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true
});
```

It is recommended to enable the component library; ordinary applications can use the default configuration first.
