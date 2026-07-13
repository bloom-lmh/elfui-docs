---
title: Navigation
---

# Navigation

Use `<elf-link>` in templates. It is an alias of `<elf-router-link>` and accepts the same route locations as `router.push()`.

```html
<elf-link to="/users/1">User</elf-link>
<elf-link :to=${{ name: "user", params: { id: 1 } }}>Profile</elf-link>
```

Links support `replace`, `active-class`, `exact-active-class`, `aria-current-value`, and `custom`. Router-wide defaults are configured with `linkActiveClass` and `linkExactActiveClass`.

## Programmatic navigation

```ts
const router = useRouter();

await router.push({ name: "user", params: { id: 1 } });
await router.push({ path: "/details", state: { tab: "activity" } });
await router.push({ path: "/refresh", force: true });
await router.replace("/");
router.back();
router.forward();
router.go(-2);

const target = router.resolve("../settings");
```

`replace: true` can also be included in a location passed to `push()`. `force: true` re-runs navigation for the current URL. Browser history state is preserved through `state`; it is available through the browser's `history.state`.

`push()` and `replace()` resolve to a `NavigationFailure` when navigation is aborted, cancelled, or duplicated. Check it with `isNavigationFailure()`; `afterEach()` receives the same failure as its third argument.

## Current route and query

```ts
const route = useRoute();
const id = useComputed(() => route.params.id);
```

`useRoute()` returns a stable, read-only reactive facade. It exposes `href`, `path`, `fullPath`, `params`, `query`, `hash`, `meta`, `matched`, and `redirectedFrom`.

Use `parseQuery()` and `stringifyQuery()` when a utility needs the same query normalization as the router. A key without `=` becomes `null`; repeated keys become arrays.

## Custom links

`useLink(to)` and `useLink({ to, replace })` return `href`, `isActive`, `isExactActive`, and `navigate()`. `<elf-link custom>` exposes the same values through its default scoped slot.
