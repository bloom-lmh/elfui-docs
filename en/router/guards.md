---
title: Route Guards
---
# route guard

The guard can return `false` to cancel navigation, return a path or named location redirect, or return a Promise.

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

The asynchronous routing component will be loaded before `beforeResolve`; the redirection loop will be handed over to `onError`.

```ts
onBeforeRouteLeave(() => !dirty.value || window.confirm("放弃修改？"));
onBeforeRouteUpdate((to) => loadUser(to.params.id));
```

The execution order is: deepest leave guard, global `beforeEach`, component update guard, routing record `beforeEnter`, asynchronous component loading, `beforeResolve`. The ElfUI page is a Custom Element, so it only provides leave/update component guards and does not provide Vue Options API style `beforeRouteEnter` instance callbacks.
