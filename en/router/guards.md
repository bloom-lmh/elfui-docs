---
title: Route Guards
---

# Route guards

Guards run before the route becomes current. A guard may return nothing to continue, `false` to abort, or a string/named location to redirect. All guard forms can be asynchronous.

## Authentication example

Keep authorization policy in route metadata and enforce it in one global guard:

```ts
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return;
  if (auth.session.value) return;

  return {
    name: "login",
    query: { redirect: to.fullPath }
  };
});
```

Register a callback to remove a guard later:

```ts
const stopAuthGuard = router.beforeEach(checkSession);
stopAuthGuard();
```

## Global hooks

`beforeEach` is for policy and redirects. `beforeResolve` runs after the target's lazy page components have been loaded, making it appropriate for data that the page requires. `afterEach` observes both successful and failed attempts. `onError` receives thrown errors, including redirect loops.

```ts
router.beforeResolve(async (to) => {
  if (to.name === "dashboard") await dashboardStore.load();
});

router.afterEach((to, from, failure) => {
  if (!failure) analytics.page(to.fullPath, from.fullPath);
});

router.onError(error => reportError(error));
```

## Per-record guards

`beforeEnter` only belongs to the record being entered. It accepts one guard or an array, which is helpful for routing-local validation.

```ts
{
  path: "/admin",
  component: () => import("../pages/admin-page"),
  beforeEnter: [requireSession, requireAdmin]
}
```

## Protect unsaved changes

Call component guard composables while a route component is being set up. They automatically unregister when the element unmounts.

```ts
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "@elfui/router";

const route = useRoute();

onBeforeRouteLeave(() => {
  return form.isDirty.value ? window.confirm("Discard unsaved changes?") : true;
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    await loadUser(String(to.params.id));
  }
});
```

Component guards are for leave and update transitions. ElfUI page components are Custom Elements, so there is no Vue Options API-style `beforeRouteEnter` callback with an instance argument.

## Execution order

For a normal navigation, guards run in this order:

1. Leave guards for deactivated records, deepest first.
2. Global `beforeEach` guards.
3. Update guards for reused records.
4. `beforeEnter` guards for newly entered records.
5. Lazy target component loading.
6. Global `beforeResolve` guards.
7. Navigation confirmation, then `afterEach`.

Returning a redirect starts a new navigation. Avoid redirecting every destination back to itself; redirect loops are reported through `onError`.
