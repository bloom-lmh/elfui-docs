# Host and root node

The outer element of Custom Element is host. The component internally uses `useHost()` to get it; `useRenderRoot()` returns `ShadowRoot` when Shadow DOM is enabled and host otherwise; `useShadowRoot()` returns `null` when `shadow: false` is used.

```ts{1}
const host = useHost<HTMLElement>();
const root = useRenderRoot();
const shadow = useShadowRoot();
```

## Host attribute

`useHostAttr(name, getter)` synchronizes status to attribute. The attribute will be removed when returning `null`, `undefined` or `false`; `true` is written as an empty attribute, suitable for ARIA:

```ts{1}
useHostAttr("aria-expanded", () => open.value);
```

## Host flag

`useHostFlag()` only expresses whether the attribute exists, suitable for CSS state selectors:

```ts{1}
useHostFlag("data-open", () => open.value);
// elf-menu[data-open] { ... }
```

## CSS variables and inline styles

```ts{1}
useHostCssVar("--panel-width", () => width.value);
useHostStyle("maxWidth", () => `${width.value}px`);
```

When the getter returns `null`/`undefined`, the CSS variable will be removed; `useHostStyle()` will clear the corresponding inline style.

## Host class

`useHostClass()` accepts strings, objects or arrays, and only manages the class it last wrote:

```ts{1}
useHostClass(() => ({
  "is-open": open.value,
  disabled: props.disabled
}));
```

## Attribute and internal root node

Unknown attributes naturally stay on the Custom Element host and will not be automatically forwarded to the first element in the Shadow DOM like Vue. `useAttrs()` can get a responsive snapshot of the host attribute; when forwarding is required, the component author explicitly binds it to the internal element.
