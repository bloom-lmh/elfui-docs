# observer

ElfUI provides life cycle encapsulation of ResizeObserver and IntersectionObserver.

## useResizeObserver

```ts{2}
const host = useHost();
const width = useRef(0);

useResizeObserver(host, (entry) => {
  width.set(entry.width);
});
```

Suitable for layout, elastic layer positioning, and responsive component size calculation.

## useIntersectionObserver

```ts{1}
const root = useTemplateRef<HTMLElement>("root");

useIntersectionObserver(root.value, (entry) => {
  if (entry.isIntersecting) {
    visible.set(true);
  }
});
```

Suitable for lazy loading, scroll triggering, and Tour guide positioning.
