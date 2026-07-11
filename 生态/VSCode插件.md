---
title: VS Code 插件
---

# VS Code 插件

VS Code 插件围绕宏组件主线提供三类能力：

- 识别普通 `.ts/.tsx` 中导出的 `defineHtml()` 组件。
- 提供宏组件 snippet。
- 展示模板和宏 API 诊断。

## 目标体验

```ts
import { defineHtml, html } from "@elfui/core";

export const UserCard = defineHtml(html`
  <article>
    <slot></slot>
  </article>
`);
```

编辑器应该能围绕这个文件直接理解组件边界，而不是要求用户改成特殊文件格式。

## 兼容路径

`.elf.ts` 和 pragma 文件会保留兼容，但 snippet 和官方文档以普通 `.ts/.tsx` 为主。
