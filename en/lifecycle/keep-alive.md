# KeepAlive life cycle

Dynamic components cached by `<KeepAlive>` are not destroyed on switch, but switch between activation and deactivation.

```ts
onActivated(() => {
  console.log("active again");
});

onDeactivated(() => {
  console.log("cached but hidden");
});
```

## The difference between mount/unmount

| Scene                   | Trigger                     |
| ----------------------- | --------------------------- |
| First creation          | `onMounted` + `onActivated` |
| Restore from cache      | `onActivated`               |
| Cut away but keep cache | `onDeactivated`             |
| Really remove cache     | `onUnmounted`               |

Suitable for caching routing pages, tab panels, complex forms or editor instances.
