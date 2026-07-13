# DOM events

`useEventListener()` will add an event listener when mounting and automatically remove it before uninstalling.

```ts
useEventListener(window, "resize", () => {
  console.log(window.innerWidth);
});
```

## click outside

```ts
const host = useHost();

useClickOutside(host, () => {
  open.set(false);
});
```

`useClickOutside()` is judged using composed path and is suitable for Shadow DOM components.

## Usage suggestions

Ordinary click events on internal nodes of the component are first written in the template. Global objects, documents, windows, or events across Shadow DOM are more suitable for built-in combined functions.
