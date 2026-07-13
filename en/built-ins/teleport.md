# Teleport

`Teleport` renders its children into another DOM target while preserving their logical component ownership. It is useful for overlays, dialogs, notifications, and other UI that must escape local clipping or stacking contexts.

Ensure the target exists before the teleported content is rendered.

## Overlay pattern

Keep the trigger and overlay state in the same component, then teleport only the rendered overlay. This preserves event handling and reactive ownership while moving the DOM to a top-level target.

```html
<Teleport to="body">
  <dialog ?open=${isOpen}>...</dialog>
</Teleport>
```

Restore focus to the trigger when an interactive overlay closes.
