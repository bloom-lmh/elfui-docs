---
title: class 与 style
---

# class 与 style

`class` 和 `style` 支持字符串、对象和数组形式。

## class

```ts
defineHtml(html`<button :class=${{ active: open, disabled }}></button>`);
```

```ts
defineHtml(html`<button :class=${["btn", open && "is-open"]}></button>`);
```

`defineHtml(html`...`)` 使用 TypeScript tagged template；未加 `${...}` 的内容只是 HTML 字符串。因此下面这种无引号对象/数组写法不支持，属性值会在空格处被 HTML 解析截断：

```ts
defineHtml(html`<button :class={ active: open, disabled }></button>`); // 不支持
```

兼容 Vue 风格时可以写带引号的模板表达式 `:class="{ active: open }"`，但宏组件推荐 `${...}`：它有 TypeScript 类型检查、跳转和重构支持。

## style

```ts
defineHtml(html` <div :style=${{ width: `${width}px`, display: visible ? "" : "none" }}></div> `);
```

静态 class 会和动态 class 合并：

```ts
defineHtml(html`<button class="btn" :class=${{ active }}></button>`);
```

## 组件样式

组件内部 CSS 放在“样式 / 组件样式”。模板里的 `class` 和 `style` 只负责状态映射，不建议塞大量样式字符串。
