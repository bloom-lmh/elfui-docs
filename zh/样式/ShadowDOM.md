---
title: Shadow DOM
---

# Shadow DOM

ElfUI 组件默认使用 Shadow DOM，让样式和 DOM 结构有明确边界。

```ts
defineOptions({
  shadow: "open"
});
```

## 模式

| 值         | 含义                               |
| ---------- | ---------------------------------- |
| `"open"`   | 默认，可通过 `el.shadowRoot` 访问  |
| `"closed"` | 外部不能直接访问 shadowRoot        |
| `false`    | 不创建 Shadow DOM，内容渲染到 host |

## 什么时候关闭 Shadow DOM

适合关闭 Shadow DOM 的场景：

- 需要完全继承页面全局样式
- 和旧页面渐进集成
- 需要第三方 CSS 框架直接命中内部节点

默认不建议关闭。Shadow DOM 是组件边界的一部分。
