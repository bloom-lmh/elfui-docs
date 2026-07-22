---
title: Route Configuration
---

# Route configuration

A route record describes what URL to match and what to render. Use names for locations that are reused in code; use paths for a direct, one-off destination.

## A practical route table

```ts
import { createRouter, createWebHistory } from "@elfui/router";

export const router = createRouter({
  history: createWebHistory("/console"),
  linkActiveClass: "nav-active",
  linkExactActiveClass: "nav-exact",
  routes: [
    { path: "/", name: "home", component: () => import("../pages/home-page") },
    {
      path: "/users/:id(\\d+)",
      name: "user",
      component: () => import("../pages/user-page"),
      props: (route) => ({ id: Number(route.params.id) }),
      meta: { requiresAuth: true, title: "User" },
    },
    { path: "/member/:id", redirect: (to) => ({ name: "user", params: to.params }) },
    { path: "/me", alias: ["/profile", "/account"], component: () => import("../pages/profile-page") },
    { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("../pages/not-found-page") },
  ],
});
```

The configured base is included in browser-facing `href` values: `router.resolve({ name: "user", params: { id: 7 } }).href` becomes `/console/users/7`. It does not form part of a route record's `path`.

## Parameters and matching priority

Parameters are decoded into `route.params`. They support optional (`?`), zero-or-more (`*`), one-or-more (`+`), and custom regular-expression segments.

```ts
const routes = [
  { path: "/products/new", component: "product-editor" }, // static: matches first
  { path: "/products/:id(\\d+)", component: "product-page" },
  { path: "/docs/:sections+", component: "docs-page" }, // params.sections is string[]
  { path: "/search/:term?", component: "search-page" },
];
```

Static segments outrank dynamic segments, so `/products/new` is not treated as an `id`. Put a catch-all route last. By default matching is case-insensitive and ignores a trailing slash. Opt in when the distinction matters:

```ts
createRouter({
  history: createWebHistory(),
  sensitive: true, // /Users and /users differ
  strict: true, // /users and /users/ differ
  routes,
});
```

## Nested routes and metadata

Child paths are joined to the parent path, and matching a child produces a parent-to-child `route.matched` chain. Parent `meta` is merged into the child route; a child value wins for duplicate keys.

```ts
{
  path: "/settings",
  component: () => import("../pages/settings-layout"),
  meta: { requiresAuth: true },
  children: [
    { path: "", name: "settings", component: () => import("../pages/settings-general") },
    { path: "security", name: "settings-security", component: () => import("../pages/settings-security") }
  ]
}
```

The layout page renders the child outlet with `depth="1"`:

```html
<h1>Settings</h1>
<elf-router-view depth="1"></elf-router-view>
```

## Props and named views

Set `props: true` to forward route parameters. Use an object for fixed props, or a function when the page needs transformed params or query values.

```ts
{
  path: "/reports/:year",
  components: {
    default: () => import("../pages/report-page"),
    aside: () => import("../pages/report-filter")
  },
  props: {
    default: route => ({ year: Number(route.params.year), mode: route.query.mode ?? "summary" }),
    aside: { heading: "Report filters" }
  }
}
```

Render a named outlet next to the default outlet:

```html
<section><elf-router-view></elf-router-view></section>
<aside><elf-router-view name="aside"></elf-router-view></aside>
```

## Add routes after startup

Dynamic routes suit feature flags, plugins, or permissions. `addRoute()` returns a disposer; a newly added route with the same name replaces the old one.

```ts
const removeBilling = router.addRoute({
  path: "/billing",
  name: "billing",
  component: () => import("../pages/billing-page"),
  meta: { requiresAuth: true },
});

if (router.hasRoute("billing")) {
  await router.push({ name: "billing" });
}

// Disable the feature later.
removeBilling();
// Equivalent explicit API: router.removeRoute("billing")
```

Pass a parent name to add a nested record: `router.addRoute("settings", { path: "billing", name: "settings-billing", component: "billing-page" })`. `getRoutes()` returns the current top-level records; `clearRoutes()` removes all of them.

## Restore scrolling

`scrollBehavior(to, from, savedPosition)` runs after a successful navigation. Return `savedPosition` for back/forward restoration, a `{ top, left }` position for normal navigation, `{ el: "#id" }` for anchors, or `null` to leave scrolling unchanged. A promise is supported.

```ts
createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0, left: 0 };
  },
});
```
