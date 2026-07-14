---
title: Effects
---
# side effect

`useEffect()` is used to run logic that produces side effects and automatically track dependencies.

```ts{1}
const count = useRef(0);

useEffect(() => {
  document.title = `Count ${count.value}`;
});
```

When `count` changes, the effect will be re-executed.

## cleanup

Effects can return cleanup functions:

```ts{1-4}
useEffect(() => {
  const id = window.setInterval(tick, 1000);
  return () => window.clearInterval(id);
});
```

The cleanup function will be executed before the next rerun, and will also be executed when the scope is destroyed.

## The difference between watchEffect and watchEffect

Both `useEffect()` and `watchEffect()` automatically track the dependencies read in the function, execute them immediately, and support `flush`. New projects take precedence over `useEffect()`; `watchEffect()` retains Vue-style `onCleanup` parameters and `onWatcherCleanup()`.

```ts{1-5}
watchEffect((onCleanup) => {
  const controller = new AbortController();
  void loadData(controller.signal);
  onCleanup(() => controller.abort());
});
```

The two are not two updated models. Use `watch()` when old and new values ​​are required, `deep`, or when specifying a data source.

## The difference between watch

`useEffect()` is suitable for the side effect of "subscribe what you read". When you need to clarify the old and new values ​​and control immediate/deep/flush, use `watch()`.
