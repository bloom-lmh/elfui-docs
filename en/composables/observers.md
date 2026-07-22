# Observers

ElfUI provides component-scoped wrappers around `ResizeObserver` and `IntersectionObserver`. A target can be an `Element`, a `useRef()` / `useTemplateRef()` result, or a reactive getter. Observation starts after mount, follows target replacement, ignores stale callbacks, and disconnects automatically during teardown.

## useResizeObserver

```ts
const panel = useTemplateRef<HTMLElement>("panel");
const width = useRef(0);

useResizeObserver(panel, (entry) => {
  width.set(entry.width);
});
```

This is suitable for layout, overlay positioning, Canvas/WebGL resizing, and responsive component measurements. Passing the ref itself is important: passing `panel.value` during setup would capture its initial `undefined` value.

## useIntersectionObserver

```ts
const root = useTemplateRef<HTMLElement>("root");

useIntersectionObserver(root, (entry) => {
  if (entry.isIntersecting) {
    visible.set(true);
  }
});
```

This is suitable for lazy loading, scroll-triggered work, and guided-tour positioning. If the browser does not provide the observer API, the helper remains inactive without breaking mount.
