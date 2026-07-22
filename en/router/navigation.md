---
title: Navigation
---

# Navigation

Use `<elf-link>` for ordinary navigation. It is an alias of `<elf-router-link>`, renders an accessible anchor, and intercepts ordinary left-clicks while preserving modifier-click and external browser behavior.

## Links in templates

```html
<nav>
  <elf-link to="/">Home</elf-link>
  <elf-link :to=${{ name: "user", params: { id: "42" } }}>Profile</elf-link>
  <elf-link :to=${{ name: "search", query: { q: "router", page: 2 } }}>
    Search
  </elf-link>
  <elf-link to="/login" replace>Sign in</elf-link>
</nav>
```

`replace` replaces the current history entry. `active-class` and `exact-active-class` override the router defaults, while `aria-current-value` controls the active link's `aria-current` value (default: `page`). A parent link is active on child routes; exact active also requires the same route record and params.

```html
<elf-link to="/settings" active-class="selected" exact-active-class="selected-exact"> Settings </elf-link>
```

## Navigate in component code

`push()` adds an entry, while `replace()` overwrites one. Both resolve a string path, a path object, or a named location and return either `undefined` or a navigation failure.

```ts{3}
import { useRouter } from "@elfui/router";

const router = useRouter();

async function saveUser(id: string) {
  await api.save();
  const result = await router?.push({
    name: "user",
    params: { id },
    query: { notice: "saved" },
    hash: "#activity",
    state: { source: "editor" }
  });
}

router?.replace({ path: "/login", query: { redirect: "/settings" } });
router?.back();
router?.forward();
router?.go(-2);
```

`state` is persisted with the browser history entry and can be read as `history.state`. It is not included in the URL. To deliberately rerun the current route's guards and lazy resolution, set `force: true`:

```ts
await router?.push({ path: "/reports", force: true });
```

## Resolve before navigating

`resolve()` does not change the current route. Use it to inspect a location, make a precomputed anchor, or resolve a relative string against the current route.

```ts
const preview = router?.resolve({ name: "user", params: { id: "7" } });
console.log(preview?.href); // /console/users/7 when the base is /console
console.log(preview?.fullPath); // /users/7

const sibling = router?.resolve("../settings");
```

## Handle cancelled navigation

::: warning
Guards can abort a navigation, and a second navigation can cancel a pending first one. Repeating the current URL without `force` is also a failure. These cases do not throw; inspect the returned value.
:::

```ts{5-7}
import { isNavigationFailure, NavigationFailureType } from "@elfui/router";

const result = await router?.push("/settings");

if (isNavigationFailure(result, NavigationFailureType.aborted)) {
  toast("Please save or discard your changes first.");
}
```

## Current route and query helpers

`useRoute()` returns a stable, read-only facade. Read its properties inside reactive code rather than replacing it after each navigation.

```ts
import { useRoute } from "@elfui/router";

const route = useRoute();
// route.params.id, route.query.tab, route.hash, route.meta, route.matched
```

Query values are strings, `null` (a key with no `=`), or arrays for repeated keys. `parseQuery()` and `stringifyQuery()` expose the same URL rules for non-router code.

```ts
import { parseQuery, stringifyQuery } from "@elfui/router";

parseQuery("?tag=elf&tag=router&draft");
// { tag: ["elf", "router"], draft: null }

stringifyQuery({ page: 2, tag: ["elf", "router"], draft: null });
// "?page=2&tag=elf&tag=router&draft"
```

## Build a custom link

For a design-system control, use the headless `useLink()` API or the default scoped slot of `<elf-link custom>`. Both expose `href`, active state, and `navigate()`.

```ts{3}
import { useLink } from "@elfui/router";

const link = useLink({ to: { name: "settings" }, replace: true });
// Bind link.href and call link.navigate() from your custom button.
```
