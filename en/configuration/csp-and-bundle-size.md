# CSP and volume

The macro component mainline compiles the template during the build period, and does not require `new Function` when the browser is running, which is more suitable for strict CSP.

```ts
import { defineHtml, html } from "@elfui/core";
```

The main entry of `@elfui/core` does not include the runtime compiler, and the current gzip size is about 10.52 KB.

## Chain boundaries

`@elfui/chain` supports:

```ts
ElfUI.createComponent().template(`<button>{{ count }}</button>`);
```

This requires a runtime compiler, is approximately 21.19 KB in size, and may also hit tighter CSP limits. It is suitable for progressive embedding of old sites, small demos or low build constraint environments, and is not the main line of new projects.

## suggestion

Production applications are preferred:

1. Use the `@elfui/core` main entry.
2. Compile the macro component using `@elfui/vite-plugin`.
3. Limit chained components to ecosystem expansion or migration code.
