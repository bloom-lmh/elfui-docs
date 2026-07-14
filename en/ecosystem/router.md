---
title: Router
---
# Router

Router is a standalone package. Install only if your application requires client routing:

```bash{1}
pnpm add @elfui/router
```

It can also be added by scaffolding when creating the project:

```bash{1}
pnpm create elfui@beta my-app --router --install
```

Create the route in a standalone module and import it before mounting the application:

```ts{4-10}
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

```ts{6}
// src/main.ts
import "./router";
import { createApp } from "@elfui/core";
import App from "./App";

createApp(App).mount("#app");
```

```html{1}
<elf-link to="/">首页</elf-link>
<elf-router-view></elf-router-view>
```

`createRouter()` will activate routing and register routing elements, support hash, history, memory mode, nested routing, guard, redirection, alias and asynchronous components.
