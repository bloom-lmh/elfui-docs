---
title: TransitionGroup
---

# TransitionGroup

`TransitionGroup` 用于列表 enter/leave 和 keyed 重排动画。

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</TransitionGroup>
```

## move class

列表重排时会应用 move class：

```css
.list-move {
  transition: transform 0.2s ease;
}
```

## 使用建议

::: warning
列表项必须有稳定 key。没有 key 的列表无法可靠计算移动动画。
:::
