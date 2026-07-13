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
  }
);
```

## watchEffect

`watchEffect()` will automatically track the reactive dependencies read in the function:

```ts
watchEffect(() => {
  console.log(user.name, count.value);
});
```

`onWatcherCleanup()` can register the same round of cleaning tasks in the synchronization callback of `watch()` or `watchEffect()`:

```ts
watchEffect(() => {
  const timer = window.setTimeout(refresh, 300);
  onWatcherCleanup(() => window.clearTimeout(timer));
});
```

## flush mode

```ts
watch(source, callback, { flush: "post" });
```

| Pattern | Meaning |
| ------ | -------------- |
| `pre` | Default dispatch queue |
| `post` | DOM updated queue |
| `sync` | Synchronous execution |

When you need to clean up asynchronous tasks, use `onCleanup` in the callback.
