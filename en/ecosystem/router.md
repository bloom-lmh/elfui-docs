---
title: Router
---

# Router

Router is an independent package. Install it only when the application needs client-side navigation:

```bash
pnpm add @elfui/router
```

The scaffold can add it during project creation:

```bash
pnpm create elfui@beta my-app --router --install
```

Create the router in its own module, then import that module before mounting the application:

```ts
// src/router/index.ts
import { createRouter } from "@elfui/router";

export const router = createRouter({
  mode: "hash",
  routes: [
    { path: "/", component: () => import("../pages/Home") },
    { path: "/about", component: () => import("../pages/About") }
  ]
});
```

```ts
// src/main.ts
import "./router";
import { createApp } from "@elfui/core";
import App from "./App";

createApp(App).mount("#app");
```

```html
<elf-link to="/">Home</elf-link>
<elf-router-view></elf-router-view>
```

`createRouter()` activates the router and registers the router elements. It supports hash, history, and memory modes, nested routes, guards, redirects, aliases, and lazy components.
