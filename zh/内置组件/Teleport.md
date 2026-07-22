---
title: Teleport
---

# Teleport

`Teleport` 把内容渲染到当前组件树之外的目标容器，常用于 Dialog、Drawer、Tooltip。

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

禁用时内容留在当前位置。

## 使用建议

::: tip
弹层类组件通常需要配合 `useScrollLock()`、`useEscapeKey()`、`useFocusTrap()` 和 `useClickOutside()`。
:::
