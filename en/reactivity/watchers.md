---
title: Watchers
---
# listener

`watch()` is used to monitor specific data sources.

```ts
watch(search, (value, oldValue) => {
  console.log(value, oldValue);
});
```

The data source can be a ref, getter, or array:

```ts
watch(
  () => user.name,
  (name) => {
    console.log(name);
  },
);
```

`onWatcherCleanup()` can register cleanup during the synchronous execution of a `watch()` callback:

```ts
watch(search, () => {
  const timer = window.setTimeout(refresh, 300);
  onWatcherCleanup(() => window.clearTimeout(timer));
});
```

For automatically tracked effects, use `useEffect()`. It accepts the same `sync`, `pre`, and `post` flush modes and uses a returned function for cleanup.

## flush mode

```ts
watch(source, callback, { flush: "post" });
```

| Pattern | Meaning |
| ------ | -------------- |
| `pre` | Default dispatch queue |
| `post` | DOM updated queue |
| `sync` | Synchronous execution |

When you need to clean up asynchronous tasks, use the callback's `onCleanup` parameter or `onWatcherCleanup()`.
