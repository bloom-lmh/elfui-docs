# Teleport

`Teleport` renders content to a target container outside the current component tree, commonly used in Dialog, Drawer, and Tooltip.

```html
<Teleport to="body">
  <div class="dialog">内容</div>
</Teleport>
```

## disabled

```html
<Teleport to="body" :disabled="inline">
  <div>内容</div>
</Teleport>
```

Content remains at the current location when disabled.

## Usage suggestions

Elastic layer components usually need to be matched with `useScrollLock()`, `useEscapeKey()`, `useFocusTrap()` and `useClickOutside()`.
