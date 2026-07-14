---
title: KeepAlive 生命周期
---

# KeepAlive 生命周期

被 `<KeepAlive>` 缓存的动态组件不会在切换时销毁，而是在激活和失活之间切换。

```ts{1-3}
onActivated(() => {
  console.log("active again");
});

onDeactivated(() => {
  console.log("cached but hidden");
});
```

## 和 mount/unmount 的区别

| 场景           | 触发                      |
| -------------- | ------------------------- |
| 首次创建       | `onMount` + `onActivated` |
| 从缓存恢复     | `onActivated`             |
| 切走但保留缓存 | `onDeactivated`           |
| 真正移除缓存   | `onUnmount`               |

适合缓存路由页、tab 面板、复杂表单或编辑器实例。
