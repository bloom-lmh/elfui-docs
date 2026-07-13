# Mount and unmount

The mounting phase is suitable for DOM initialization, third-party library mounting and global event monitoring.

```ts{1}
onMount(() => {
  console.log("host connected");
});
```

The unloading phase is used to release resources:

```ts{1}
onUnmount(() => {
  console.log("host removed");
});
```

## before hooks

```ts{1}
onBeforeMount(() => {
  // 首次渲染前
});

onBeforeUnmount(() => {
  // 移除前，适合取消事件监听
});
```

Most DOM events can be handled directly using `useEventListener()`, which will automatically clean up on uninstall.
