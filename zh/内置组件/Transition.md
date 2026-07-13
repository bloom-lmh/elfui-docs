---
title: Transition
---

# Transition

`Transition` 给单个子节点提供 enter/leave 过渡。

```html
<Transition name="fade">
  <div v-if="open">内容</div>
</Transition>
```

默认 class：

```css
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
```

## 自定义 name

`name` 就是 class 前缀，可写静态值或动态绑定：

```ts
import { defineHtml, html, useRef } from "elfui";

const open = useRef(true);
const transitionName = useRef("slide");

export const SlidingAside = defineHtml(html`
  <Transition :name=${transitionName} :duration=${{ enter: 180, leave: 260 }}>
    <aside v-if=${open}>内容</aside>
  </Transition>
`);
```

上例会使用 `slide-enter-from`、`slide-enter-active`、`slide-leave-to` 等 class。未提供 `name` 时前缀为 `v`。

## JavaScript hooks

`css=${false}` 可以关闭 class 管理，改用 `@enter`、`@leave` 等 hook，并在异步动画结束时调用 `done()`。

## appear

```html
<Transition name="fade" appear>
  <div>首次挂载也过渡</div>
</Transition>
```

复杂动画建议用 CSS 变量控制持续时间和 easing。
