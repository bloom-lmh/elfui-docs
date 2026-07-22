# Mounting and unmounting

`onMounted` runs after the component's final DOM and template refs are available. This is the safe point for Canvas charts, editors, WebGL renderers, overlays, observers, and other DOM-owning tools.

```ts
const canvas = useTemplateRef<HTMLCanvasElement>("canvas");
let chart: { destroy(): void } | undefined;

onMounted(() => {
  chart = createChart(canvas.value!);
});
```

Use `onUnmounted` to release every resource created by the integration:

```ts
onUnmounted(() => {
  chart?.destroy();
  chart = undefined;
});
```

Do not initialize a DOM-owning tool at module or setup time: the element may not exist yet, and an asynchronous component has not committed its resolved DOM. See [External tools](/en/integration/external-tools) for cancellation and remount patterns.

## before hooks

```ts
onBeforeMount(() => {
  // Before the first render is committed.
});

onBeforeUnmount(() => {
  // Before DOM and component-owned scopes are released.
});
```

Prefer `useEventListener()` and the observer composables when they fit: they automatically bind cleanup to the owning component scope. A same-turn DOM move does not create a second component instance, while a real detach followed by a later reconnect creates a fresh mounted instance.
