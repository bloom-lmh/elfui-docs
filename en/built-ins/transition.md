# Transition

`Transition` provides enter/leave transitions for individual child nodes.

```html{1}
<Transition name="fade">
  <div v-if="open">内容</div>
</Transition>
```

Default class:

```css{1}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
```

## Custom name

`name` is the class prefix, which can write static values ​​or dynamic binding:

```ts{6-10}
import { defineHtml, useRef } from "@elfui/core";

const open = useRef(true);
const transitionName = useRef("slide");

export const SlidingAside = defineHtml(`
  <Transition :name=${transitionName} :duration=${{ enter: 180, leave: 260 }}>
    <aside v-if=${open}>内容</aside>
  </Transition>
`);
```

The above example will use `slide-enter-from`, `slide-enter-active`, `slide-leave-to` and other classes. The prefix is ​​`v` when `name` is not provided.

## JavaScript hooks

`css=${false}` can turn off class management, use hooks such as `@enter` and `@leave` instead, and call `done()` when the asynchronous animation ends.

## appear

```html{1}
<Transition name="fade" appear>
  <div>首次挂载也过渡</div>
</Transition>
```

::: tip
For complex animations, it is recommended to use CSS variables to control duration and easing.
:::
