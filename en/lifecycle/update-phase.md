# update stage

The update phase is used to observe DOM updates triggered by reactive bindings inside the component.

```ts{1-3}
onBeforeUpdate(() => {
  console.log("before update");
});

onUpdated(() => {
  console.log("updated");
});
```

## Usage suggestions

::: warning
Prioritize driving the UI through responsive expressions, and do not put ordinary state synchronization into update hooks.
:::

Things that are suitable to put in the update hook:

- Read updated layout dimensions
- Adjust scroll position
- Synchronize with third-party DOM plugins

If you just want to monitor a certain status change, it is more direct to use `watch()`.
