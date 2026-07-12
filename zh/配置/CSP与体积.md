---
title: CSP 与体积
---

# CSP 与体积

宏组件主线在构建期编译模板，浏览器运行时不需要 `new Function`，更适合严格 CSP。

```ts
import { defineHtml, html } from "@elfui/core";
```

`@elfui/core` 主入口不包含 runtime compiler，当前 gzip 约 10.52 KB。

## Chain 的边界

`@elfui/chain` 支持：

```ts
ElfUI.createComponent().template(`<button>{{ count }}</button>`);
```

这需要 runtime compiler，体积约 21.19 KB，也可能触及更严格的 CSP 限制。它适合旧站渐进嵌入、小 demo 或低构建约束环境，不是新项目主线。

## 建议

生产应用优先：

1. 使用 `@elfui/core` 主入口。
2. 使用 `@elfui/vite-plugin` 编译宏组件。
3. 把链式组件限制在生态扩展或迁移期代码里。
