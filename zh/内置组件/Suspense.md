---
title: Suspense
---

# Suspense

`Suspense` 用来承接异步 setup 或异步内容，提供 pending、resolved、error 三种状态。

```html
<Suspense>
  <template #default>
    <async-panel></async-panel>
  </template>
  <template #fallback> 加载中... </template>
  <template #error="{ error }"> 加载失败：{{ error.message }} </template>
</Suspense>
```

## 使用建议

把异步边界放在页面区域或复杂组件外层，不要给每个小节点都包 Suspense。
