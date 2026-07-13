---
title: Route Guards
---

# Route Guards

Guards may return `false` to cancel, a path or named location to redirect, or a Promise of either value.

```ts
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.loggedIn.value) return "/login";
});

router.beforeResolve((to) => preloadPageData(to));

router.afterEach((to, from, failure) => {
  if (!failure) analytics.page(to.fullPath, from.fullPath);
});

router.onError((error) => reportError(error));
```

Async route components finish loading before `beforeResolve`. Redirect loops are reported through `onError`.

## Record and component guards

```ts
{
  path: "/admin",
  component: AdminPage,
  beforeEnter: () => canEnterAdmin() || "/login"
}
```

```ts
onBeforeRouteLeave(() => !dirty.value || window.confirm("Discard changes?"));

onBeforeRouteUpdate((to) => {
  loadUser(to.params.id);
});
```

For a navigation, leave guards run from the deepest matched component outward, then global `beforeEach`, then component update guards, record `beforeEnter`, lazy component loading, and `beforeResolve`.

ElfUI provides leave and update component guards. It intentionally has no Vue Options API-style `beforeRouteEnter` instance callback because route pages are Custom Elements.
