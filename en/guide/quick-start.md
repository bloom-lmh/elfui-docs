---
title: Quick Start
---
# quick start

This page assumes the project was created by `pnpm create elfui@beta my-app --install`. The scaffolding has been configured with the Vite plugin and generates `src/main.ts`, `src/App.ts` and `vite.config.ts`.

This page writes a counter component from scratch.

## Create component

```ts
// Counter.ts
import { defineHtml, html, useRef } from "@elfui/core";

const count = useRef(0);
const inc = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(html`
  <button class="counter" @click=${inc}>Count: ${count}</button>
`);
```

<elf-demo-counter></elf-demo-counter>

The top-level code is the component’s setup logic. `${count}` in the template will be compiled into responsive text binding, and `@click=${inc}` will become an event listener.

## Mount application

```ts
// main.ts
import { createApp } from "@elfui/core";
import { Counter } from "./Counter";

createApp(Counter).mount("#app");
```

`index.html` only needs an ordinary container and does not require handwritten component tags:

```html
<div id="app"></div>
```

`createApp(Counter).mount("#app")` will automatically register the root component, create an instance and replace the existing content in the container, and the return value is the real Custom Element. The export name `Counter` will still be inferred as `elf-counter`, but the application entry does not need to know this tag.

If the component needs to be written directly into existing HTML, or the component library needs to be globally registered in batches, you can continue to use `registerComponents()`:

```ts
import { registerComponents } from "@elfui/core";

registerComponents(Counter);
```

If you need to customize a single component name, you can use `defineName()`; if you need to unify the project prefix, please configure `tagPrefix` in the Vite plug-in.

## Add style

```ts
import { css, defineHtml, defineStyle, html, useRef } from "@elfui/core";

defineStyle(css`
  .counter {
    border: 0;
    border-radius: 8px;
    padding: 8px 12px;
  }
`);

const count = useRef(0);
const inc = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(html`
  <button class="counter" @click=${inc}>Count: ${count}</button>
`);
```

Component styles are injected into the Shadow DOM of the current Custom Element by default.

## Next step

- If you want to write a component API, see "Components".
- If you want to write template logic, see "Template Syntax" and "Directives".
- To access project diagnosis, see "Ecology/Vite Plug-in".
