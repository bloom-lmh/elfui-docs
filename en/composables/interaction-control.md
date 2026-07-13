# interactive control

Interaction control functions are used in pop-ups, drawers, prompts, and accessibility scenarios.

## ESC close

```ts
useEscapeKey(() => {
  open.set(false);
});
```

## scroll lock

```ts
useScrollLock(() => open.value);
```

When `open` is true, `document.body` scrolling is locked and will be automatically restored when the component is unloaded.

## focus trap

```ts
const host = useHost();

useFocusTrap(host);
```

Suitable for scenarios such as Dialog, Drawer, and PopConfirm where the Tab focus needs to be limited to the interior of the component.
