---
title: Chain 链式组件
---

# Chain 链式组件

`@elfui/chain` 是生态扩展包，面向旧站渐进嵌入、小 demo、低构建约束页面。它保留链式 builder，并内置 runtime compiler，因此支持 `.template()`。

```bash
pnpm add @elfui/chain
```

```ts
import { ElfUI, useRef } from "@elfui/chain";

ElfUI.createComponent()
  .name("elf-counter")
  .setup(() => {
    const count = useRef(0);
    const inc = (): void => count.set(count.peek() + 1);
    return { count, inc };
  })
  .template(`<button @click="inc">Count: {{ count }}</button>`)
  .register();
```

## 能力边界

| 能力             | Chain                    |
| ---------------- | ------------------------ |
| 链式 builder     | `createComponent()`      |
| 运行时模板       | `.template()`            |
| 局部组件         | `.use()`                 |
| 组件扩展         | `extend()` / `variant()` |
| runtime compiler | 包内携带                 |

## 不和主线混写

新项目文档和组件示例都使用 `@elfui/core` 宏组件。Chain 是独立扩展，不在组件主线里穿插介绍。

::: tip
如果项目已经有构建工具，优先迁移到宏组件；如果只是给旧 HTML 页面加几个 Web Components，Chain 会更轻松。
:::
