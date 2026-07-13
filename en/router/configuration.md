---
title: Route Configuration
---
# Routing configuration

`RouteRecord` supports paths, names, metadata, redirects, aliases, subroutes, guards, props and named views.

```ts
const routes = [
  {
    path: "/users/:id",
    name: "user",
    component: () => import("../pages/User"),
    props: true,
    meta: { requiresAuth: true }
  },
  { path: "/member/:id", redirect: { name: "user" } },
  { path: "/me", alias: "/profile", component: ProfilePage }
];
```

The child route will merge with the parent `meta`, and the key with the same name shall be subject to the child. Static paths have higher priority than dynamic paths; parameters support custom regular patterns such as `?`, `*`, `+` and `:id(\\d+)`.

## History and base

It is recommended for new projects to use the history factory consistent with Vue Router:

```ts
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "@elfui/router";

createRouter({ history: createWebHistory("/app"), routes });
createRouter({ history: createWebHashHistory(), routes });
createRouter({ history: createMemoryHistory(), routes });
```

The original `mode: "history" | "hash" | "memory"` is still available. `history` mode requires the server to fallback unknown paths to `index.html`; `hash` is suitable for static deployment; `memory` is suitable for testing and non-browser environments. The `href` returned by `router.resolve()` will contain the configured base.

`sensitive: true` enables case-sensitive matching; `strict: true` allows trailing slashes to participate in matching.

## Nesting, props and named views

The parent page uses `<elf-router-view depth="1">` to place the child route exit. `props: true` passes params; you can also pass static objects or functions that calculate props based on route.

```ts
{
  path: "/workspace",
  components: { default: WorkspacePage, aside: WorkspaceAside },
  props: { default: { compact: false }, aside: { heading: "工具" } }
}
```

```html
<elf-router-view></elf-router-view>
<elf-router-view name="aside"></elf-router-view>
```

## Dynamic routing and scrolling

`addRoute()` returns the remove function; the route with the same name replaces the old record. Routing tables can also be managed using `removeRoute(name)`, `clearRoutes()`, `hasRoute(name)`, and `getRoutes()`. `scrollBehavior` can return `{ top, left }`, `{ el }` or Promise; the forward/backward movement of the browser and memory history will pass in the saved scroll position.
