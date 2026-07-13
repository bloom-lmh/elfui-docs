---
title: Router API
---

# Router API

This page is an index of the public `@elfui/router` API. See the Router guide for full examples.

## Creation and history

```ts{1}
createRouter(options): Router
createWebHistory(base?): RouterHistory
createWebHashHistory(base?): RouterHistory
createMemoryHistory(base?): RouterHistory
setActiveRouter(router | null): void
getActiveRouter(): Router | null
```

::: tip
`RouterOptions` accepts `routes`, `history` (preferred) or `mode`, plus `initialPath`, `sensitive`, `strict`, `scrollBehavior`, `linkActiveClass`, and `linkExactActiveClass`.
:::

## Router instance

| Member | Description |
| --- | --- |
| `current`, `currentRoute` | Reactive refs containing the current `RouteLocation`. |
| `push(to)`, `replace(to)` | Navigate and resolve to `void` or `NavigationFailure`. |
| `back()`, `forward()`, `go(delta)` | Traverse history. |
| `resolve(to, currentLocation?)` | Resolve without navigating. |
| `beforeEach`, `beforeResolve`, `afterEach`, `onError` | Register hooks; each returns an unregister function. |
| `addRoute`, `removeRoute`, `clearRoutes`, `hasRoute`, `getRoutes` | Change or inspect route records. |
| `isReady()` | Resolve after initial navigation, guards, and lazy page loading. |
| `listening` | Whether browser history events are observed. |

## Elements and composables

`registerRouterElements()` registers `<elf-router-view>`, `<elf-router-link>`, and the `<elf-link>` alias. `useRouter()` returns the active `Router` or `null`; `useRoute()` returns a stable readonly current location; `useLink()` supplies headless link behavior. `onBeforeRouteLeave()` and `onBeforeRouteUpdate()` register component guards.

## Utilities and types

`parseQuery()`, `stringifyQuery()`, `isNavigationFailure()`, and `NavigationFailureType` are exported helpers. The main types are `Router`, `RouterOptions`, `RouterHistory`, `RouteRecord`, `RouteLocation`, `RouteLocationRaw`, `RouteQuery`, `NavigationGuard`, `NavigationFailure`, and `ScrollBehaviorFn`.
