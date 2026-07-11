---
title: Host 与根节点
---

# Host 与根节点

Custom Element 的外层元素是 host。组件内部使用 `useHost()` 获取它；`useRenderRoot()` 在启用 Shadow DOM 时返回 `ShadowRoot`，否则返回 host；`useShadowRoot()` 在 `shadow: false` 时返回 `null`。

```ts
const host = useHost<HTMLElement>();
const root = useRenderRoot();
const shadow = useShadowRoot();
```

## Host attribute

`useHostAttr(name, getter)` 把状态同步为 attribute。返回 `null`、`undefined` 或 `false` 时会移除 attribute；`true` 写为空 attribute，适合 ARIA：

```ts
useHostAttr("aria-expanded", () => open.value);
```

## Host flag

`useHostFlag()` 只表达 attribute 是否存在，适合 CSS 状态选择器：

```ts
useHostFlag("data-open", () => open.value);
// elf-menu[data-open] { ... }
```

## CSS 变量与内联样式

```ts
useHostCssVar("--panel-width", () => width.value);
useHostStyle("maxWidth", () => `${width.value}px`);
```

getter 返回 `null`/`undefined` 时，CSS 变量会移除；`useHostStyle()` 会把对应内联 style 清空。

## Host class

`useHostClass()` 接受字符串、对象或数组，并只管理自己上一次写入的 class：

```ts
useHostClass(() => ({
  "is-open": open.value,
  disabled: props.disabled
}));
```

## Attribute 与内部根节点

未知 attribute 天然留在 Custom Element host 上，不会像 Vue 一样自动转发到 Shadow DOM 内的首个元素。`useAttrs()` 可以拿到 host attribute 的响应式快照；需要转发时由组件作者显式绑定到内部元素。
