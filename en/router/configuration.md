---
title: Route Configuration
---

# Route Configuration

Route records support paths, names, metadata, redirects, aliases, children, route guards, props, and named views.

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

Child metadata is merged into `route.meta`; a child key overrides the same parent key. Matching prefers static paths over dynamic paths, independent of declaration order. Parameters support `?`, `*`, `+`, and custom regular expressions such as `:id(\\d+)`.

## History and base

Use Vue Router-style history factories for new applications. The legacy `mode` option remains available.

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

`history` uses the browser History API and needs an HTML fallback on the server. `hash` works on static hosts. `memory` is useful for tests and non-browser rendering. `router.resolve()` returns an `href` that includes the configured base.

Set `sensitive: true` for case-sensitive matching and `strict: true` to distinguish a trailing slash.

## Nested routes and props

```ts
{
  path: "/settings",
  component: SettingsLayout,
  children: [
    { path: "", component: SettingsHome },
    { path: "profile", component: ProfilePage }
  ]
}
```

Place `<elf-router-view depth="1">` in the parent page for the child outlet. `props: true` passes params to the page; an object provides static props and a function can derive props from the location.

```ts
{
  path: "/reports/:id",
  component: ReportPage,
  props: (route) => ({ id: route.params.id, compact: route.query.compact === "1" })
}
```

## Named views and dynamic routes

Use `components` for multiple outlets. A props map can provide props per view.

```ts
{
  path: "/workspace",
  components: { default: WorkspacePage, aside: WorkspaceAside },
  props: { default: { compact: false }, aside: { heading: "Tools" } }
}
```

```html
<elf-router-view></elf-router-view>
<elf-router-view name="aside"></elf-router-view>
```

`addRoute()` returns a removal callback. Use `removeRoute(name)`, `clearRoutes()`, `hasRoute(name)`, and `getRoutes()` to manage routes at runtime. Adding a route with an existing name replaces the old record.
