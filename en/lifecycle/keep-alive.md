# KeepAlive life cycle

Dynamic components cached by `<KeepAlive>` are not destroyed on switch, but switch between activation and deactivation.

```ts{1}
onActivated(() => {
  console.log("active again");
});

onDeactivated(() => {
  console.log("cached but hidden");
});
```

## The difference between mount/unmount

| Scene | Trigger |
| -------------- | ------------------------- |
| First creation | `onMount` + `onActivated` |
| Restore from cache | `onActivated` |
| Cut away but keep cache | `onDeactivated` |
| Really remove cache | `onUnmount` |

Suitable for caching routing pages, tab panels, complex forms or editor instances.
