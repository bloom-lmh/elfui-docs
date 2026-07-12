---
title: Watchers
---

# Watchers

`watch()` observes an explicit ref, getter, or array of sources. `watchEffect()` tracks whatever its callback reads.

```ts
watch(search, (value, previous) => {
  console.log(value, previous);
});

watchEffect(() => {
  console.log(user.name, count.value);
});
```

Use `flush: "post"` for work that must run after DOM updates and `onWatcherCleanup()` to cancel stale asynchronous work.
