---
title: KeepAlive
---

# KeepAlive

`KeepAlive` 缓存动态组件实例，切换时保留内部状态。

```html{2}
<KeepAlive>
  <component :is="current"></component>
</KeepAlive>
```

## include / exclude / max

```html{1-2}
<KeepAlive :include="['user-page']" :max="10">
  <component :is="current"></component>
</KeepAlive>
```

## 生命周期

缓存组件会触发 `onActivated()` 和 `onDeactivated()`。详见“生命周期 / KeepAlive 生命周期”。
