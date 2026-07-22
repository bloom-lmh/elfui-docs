---
title: Effects
---
# side effect

`useEffect()` is used to run logic that produces side effects and automatically track dependencies.

```ts
const count = useRef(0);

useEffect(() => {
  document.title = `Count ${count.value}`;
});
```

When `count` changes, the effect will be re-executed.

## cleanup

Effects can return cleanup functions:

```ts
useEffect(() => {
  const id = window.setInterval(tick, 1000);
  return () => window.clearInterval(id);
});
```

The cleanup function will be executed before the next rerun, and will also be executed when the scope is destroyed.

## Scheduling

```ts
useEffect(updateImmediately); // default: sync
useEffect(updateBeforePatch, { flush: "pre" });
useEffect(readUpdatedDom, { flush: "post" });
```

`useEffect()` is the single automatically tracked effect API. Beta.8 removes `watchEffect`, `watchPostEffect`, and `watchSyncEffect`; their scheduling behavior is available through the explicit `flush` option.

## The difference between watch

`useEffect()` is suitable for the side effect of "subscribe to what is read". When you need explicit sources, old and new values, `immediate`, or `deep`, use `watch()`.
