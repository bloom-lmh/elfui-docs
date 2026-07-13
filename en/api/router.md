---
title: Router API
---
# router API

`@elfui/router` provides Web Component routing capabilities aligned with Vue Router 4 navigation semantics.

## Create and history

`createRouter`、`createWebHistory`、`createWebHashHistory`、`createMemoryHistory`、`setActiveRouter`、`getActiveRouter`

`RouterOptions` supports `history` (or compatible `mode`), `routes`, `initialPath`, `scrollBehavior`, `sensitive`, `strict`, `linkActiveClass` and `linkExactActiveClass`.

## Router instance

`current` and `currentRoute` are responsive refs. Examples provide `listening`, `push`, `replace`, `back`, `forward`, `go`, `resolve`, various guard registration methods, dynamic routing management methods and `isReady`.

`isReady()` will wait for first navigation, including initial guarding and lazy page loading.

## Components, Composable APIs and Tools

`registerRouterElements`、`<elf-link>`、`<elf-router-link>`、`<elf-router-view>`、`useRouter`、`useRoute`、`useLink`、`onBeforeRouteLeave`、`onBeforeRouteUpdate`、`parseQuery`、`stringifyQuery`、`isNavigationFailure`、`NavigationFailureType`

Common types: `Router`, `RouterOptions`, `RouterHistory`, `RouteRecord`, `RouteLocation`, `RouteLocationRaw`, `NavigationGuard`, `ScrollBehaviorFn`.
