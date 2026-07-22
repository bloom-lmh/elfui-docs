---
title: DOM 事件
---

# DOM 事件

`useEventListener()` 会在挂载时添加事件监听，在卸载前自动移除。

```ts
useEventListener(window, "resize", () => {
  console.log(window.innerWidth);
});
```

## 点击外部

```ts
const host = useHost();

useClickOutside(host, () => {
  open.set(false);
});
```

`useClickOutside()` 使用 composed path 判断，适合 Shadow DOM 组件。

## 使用建议

::: tip
组件内部节点的普通点击事件优先写在模板里。全局对象、document、window 或跨 Shadow DOM 的事件，更适合内置组合式函数。
:::
