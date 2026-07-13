# Lifecycle overview

Lifecycle hooks let a component run code at well-defined points: setup, mount, update, and unmount. Register hooks during component setup so their ownership and cleanup are tied to that component.

Use lifecycle hooks for integration work; derive UI state declaratively whenever possible.

## Hook ownership

Register a hook in the same setup scope that creates the resource it manages. This makes the cleanup path obvious and prevents a callback from outliving its component.

```ts
onMount(() => map.connect(host.value));
onUnmount(() => map.disconnect());
```

For asynchronous work, also guard against a result arriving after the component has been removed.
