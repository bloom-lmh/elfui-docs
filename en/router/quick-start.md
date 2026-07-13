# Route quick start

Routing is independent of `@elfui/core`. Existing applications need to be installed separately:

```bash
pnpm add @elfui/router
```

New projects can also select Router in the scaffolding interaction, or execute directly:

```bash
pnpm create elfui@beta my-app --router --install
```

The scaffolding will automatically install the routing package and generate `src/router/index.ts`.

Create route:

```ts
import { createRouter } from "@elfui/router";

export const router = createRouter({
  mode: "hash",
  routes: [
    { path: "/", component: () => import("./pages/Home") },
    { path: "/users/:id", component: () => import("./pages/User") }
  ]
});
```

Used in the page:

```html
<elf-link to="/">首页</elf-link> <elf-router-view></elf-router-view>
```

`createRouter()` will set the active router and register the routing element.

First import the router module at the application entry, and then mount the root component:

```ts
// main.ts
import "./router";
import { createApp } from "@elfui/core";
import App from "./App";

createApp(App).mount("#app");
```
