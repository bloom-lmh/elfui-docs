---
title: Router API
---

# Router API

`@elfui/router` provides Web Component routing with Vue Router 4-aligned navigation semantics.

## Creation and history

- `createRouter`
- `createWebHistory`, `createWebHashHistory`, `createMemoryHistory`
- `setActiveRouter`, `getActiveRouter`

`RouterOptions` accepts `history` (or the legacy `mode`), `routes`, `initialPath`, `scrollBehavior`, `sensitive`, `strict`, `linkActiveClass`, and `linkExactActiveClass`.

## Router instance

`current` and `currentRoute` are reactive refs. The instance also exposes `listening`, `push`, `replace`, `back`, `forward`, `go`, `resolve`, `beforeEach`, `beforeResolve`, `afterEach`, `onError`, `addRoute`, `removeRoute`, `clearRoutes`, `hasRoute`, `getRoutes`, and `isReady`.

`isReady()` waits for the first navigation, including lazy page loading and initial guards.

## Elements and composition

- `registerRouterElements`, `<elf-link>`, `<elf-router-link>`, `<elf-router-view>`
- `useRouter`, `useRoute`, `useLink`
- `onBeforeRouteLeave`, `onBeforeRouteUpdate`

## Utilities and types

- `parseQuery`, `stringifyQuery`
- `isNavigationFailure`, `NavigationFailureType`
- `Router`, `RouterOptions`, `RouterHistory`, `RouteRecord`, `RouteLocation`, `RouteLocationRaw`, `NavigationGuard`, `ScrollBehaviorFn`
