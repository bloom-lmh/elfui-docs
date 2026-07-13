---
title: Router API
---

# Router API

`@elfui/router` provides routing for ElfUI applications.

- Creation: `createRouter`, `setActiveRouter`, `getActiveRouter`
- Elements: `registerRouterElements`, `<elf-link>`, `<elf-router-view>`
- Composition: `useRouter`, `useRoute`, `useLink`
- Guards: `onBeforeRouteLeave`, `onBeforeRouteUpdate`
- Failures: `isNavigationFailure`, `NavigationFailureType`

## Typical imports

Create one router instance at application startup, then use link and view elements in the application shell. Prefer named routes for programmatic navigation and typed parameters.

```ts
import { createRouter, useRoute, useRouter } from "@elfui/router";
```
