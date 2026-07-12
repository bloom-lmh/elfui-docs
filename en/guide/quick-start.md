---
title: Quick Start
---

# Quick Start

This guide assumes you created the project with `pnpm create elfui@beta my-app --install`. The scaffold already adds the Vite plugin and creates `src/main.ts`, `src/App.ts`, and `vite.config.ts`.

Create a counter in a regular TypeScript file:

```ts
// Counter.ts
import { defineHtml, html, useRef } from "@elfui/core";

const count = useRef(0);
const increment = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(html`
  <button class="counter" @click=${increment}>Count: ${count}</button>
`);
```

<elf-demo-counter></elf-demo-counter>

Top-level code is the component setup. The compiler turns `${count}` into a reactive text binding and `@click` into a native event listener.

## Mount the application

```ts
import { createApp } from "@elfui/core";
import { Counter } from "./Counter";

createApp(Counter).mount("#app");
```

```html
<div id="app"></div>
```

`createApp()` registers the root Custom Element, mounts it into the target, and returns the actual element instance.
