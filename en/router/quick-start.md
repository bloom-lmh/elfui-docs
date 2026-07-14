---
title: Route Quick Start
---

# Route quick start

`@elfui/router` is a client-side router for ElfUI Custom Elements. It owns the URL, chooses the matching page component, and renders it through `<elf-router-view>`.

## Install

```bash{1}
pnpm add @elfui/router
```

The project generator can also add it for a new application:

```bash{1}
pnpm create elfui@beta my-app --router --install
```

## Build a small application

::: tip
Create `src/router/index.ts`. Route components can be element tag names, Custom Element constructors, or lazy import functions. Lazy functions are recommended for pages because they create a separate bundle.
:::

```ts{4-16}
// src/router/index.ts
import { createRouter, createWebHistory } from "@elfui/router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: () => import("../pages/home-page") },
    {
      path: "/users/:id",
      name: "user",
      component: () => import("../pages/user-page"),
      props: true
    },
    { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("../pages/not-found-page") }
  ]
});
```

Import that module before mounting the application. `createRouter()` registers the router elements and makes this router available to `useRouter()` and `useRoute()`.

```ts{6}
// src/main.ts
import "./router";
import { createApp } from "@elfui/core";
import App from "./app";

createApp(App).mount("#app");
```

Place links and one route outlet in the app shell:

```html{2}
<!-- src/app.ts -->
<header>
  <elf-link to="/">Home</elf-link>
  <elf-link :to=${{ name: "user", params: { id: "42" } }}>My profile</elf-link>
</header>

<main>
  <elf-router-view></elf-router-view>
</main>
```

When `/users/42` is visited, the router loads `user-page` and renders it in the route view. With `props: true`, the route parameter is passed to the page as an `id` property.

```ts{2}
// src/pages/user-page.ts
import { defineComponent } from "@elfui/core";

export default defineComponent({
  props: { id: String },
  template: `<h1>User ${this.id}</h1>`
});
```

## Wait for the first navigation

The router starts the initial navigation when it is created. If bootstrap code depends on the first matched page and its guards/lazy module being finished, await `isReady()`:

```ts{6}
import { createApp } from "@elfui/core";
import App from "./app";
import { router } from "./router";

await router.isReady();
createApp(App).mount("#app");
```

## Pick a history mode

`createWebHistory()` creates normal URLs such as `/users/42`; the server must return `index.html` for unknown application paths. `createWebHashHistory()` creates `/#/users/42` and works on static hosts without a rewrite rule. `createMemoryHistory()` never touches the browser URL and is useful for tests, SSR-like hosts, and embedded applications.

See [Route Configuration](./configuration) for bases, matching rules, nested routes, and dynamic route registration.
