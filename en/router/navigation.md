---
title: Navigation
---
# navigation

`<elf-link>` is used in the template; it is an alias for `<elf-router-link>`.

```html
<elf-link to="/users/1">用户</elf-link>
<elf-link :to=${{ name: "user", params: { id: 1 } }}>个人页</elf-link>
```

Supports `replace`, `active-class`, `exact-active-class`, `aria-current-value`, `custom`. The global default class can be configured through `linkActiveClass` and `linkExactActiveClass`.

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

The location passed to `push()` can also be written as `replace: true`. `force: true` will re-execute navigation for the current URL. `state` will be saved to the browser history entry and can be read from `history.state`.

`NavigationFailure` will be returned when navigation is canceled, competition is canceled or repeated; use `isNavigationFailure()` to judge. The third parameter of `afterEach(to, from, failure)` will also receive a failure message.

## Current route and query

`useRoute()` returns a stable, read-only, and responsive current routing facade, including `href`, `path`, `fullPath`, `params`, `query`, `hash`, `meta`, `matched`, and `redirectedFrom`.

`parseQuery()` and `stringifyQuery()` can be used in tool code that needs to keep the same rules as routers: query keys without `=` are resolved to `null`, and duplicate keys are resolved to arrays.

## Custom link

`useLink(to)` and `useLink({ to, replace })` both return `href`, `isActive`, `isExactActive` and `navigate()`. The default scope slot of `<elf-link custom>` also exposes these values.
