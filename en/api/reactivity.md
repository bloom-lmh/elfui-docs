---
title: Reactivity API
---

# Reactivity API

`@elfui/reactivity` can be used independently from the component runtime.

- State: `useRef`, `useReactive`, `useShallowRef`, `useShallowReactive`
- Derived state: `useComputed`
- Effects: `useEffect`, `watch`, `watchEffect`, `watchPostEffect`, `watchSyncEffect`
- Scheduling: `nextTick`, `queueJob`, `queuePostFlushJob`, `flushSync`
- Scopes: `effectScope`, `getCurrentScope`, `onScopeDispose`
- Utilities: `readonly`, `markRaw`, `toRaw`, `unref`, `toValue`

Applications and macro components should normally import these APIs from `@elfui/core`.

## When to use it

Use the standalone package only when a library must share reactive state without depending on component macros. Keep that library free of DOM and lifecycle assumptions so it remains reusable.

```ts
import { useRef, useComputed } from "@elfui/reactivity";
```
