---
title: CSP 与体积
---

# CSP 与体积

宏组件主线在构建期编译模板，浏览器运行时不需要 `new Function`，更适合严格 CSP。

```ts
import { defineHtml } from "@elfui/core";
```

`@elfui/core` 主入口不包含 runtime compiler。仓库当前真实应用基线为 gzip 9.50 KB / Brotli 8.57 KB；实际结果会随导入 API 与 bundler 变化。

发布门禁会自动检查真实应用、轻量 consumer、runtime、reactivity 四组 gzip/Brotli 预算，同时验证生产 bundle 已裁掉 DEV 分支，发布 ESM 不会写入全局 `__DEV__` 标记。

## Chain 的边界

`@elfui/chain` 支持：

```ts
ElfUI.createComponent().template(`<button>{{ count }}</button>`);
```

这需要 runtime compiler，体积约 21.19 KB，也可能触及更严格的 CSP 限制。它适合旧站渐进嵌入、小 demo 或低构建约束环境，不是新项目主线。

## 建议

::: tip
生产应用优先：
:::

1. 使用 `@elfui/core` 主入口。
2. 使用 `@elfui/vite-plugin` 编译宏组件。
3. 把链式组件限制在生态扩展或迁移期代码里。
