---
title: Vite 插件
---

# Vite 插件

::: tip
`@elfui/vite-plugin` 负责把普通 `.ts/.tsx` 宏组件编译为运行时 render 函数。新项目推荐始终安装并启用它。
:::

```ts{5-6}
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

## tagPrefix

::: warning
宏组件的 tag 名称在编译期确定，因此 `tagPrefix` 只能配置在 Vite 插件里，不能通过运行时 `configure()` 修改。
:::

```ts{6-10}
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [
    elfuiMacroPlugin({
      tagPrefix: "acme"
    })
  ]
});
```

```ts{3}
import { defineHtml } from "@elfui/core";

export const UserCard = defineHtml(`<article><slot></slot></article>`);
```

::: tip
上面的组件会编译为 `acme-user-card`。`tagPrefix: "acme-"` 也会被规整为同样的结果，但推荐写不带结尾横杠的 `"acme"`。
:::

## 自动识别

插件会识别导出的 `defineHtml(...)` 组件：

```ts{1}
export const Button = defineHtml(`<button><slot></slot></button>`);
```

```ts{1}
const Button = defineHtml(`<button><slot></slot></button>`);

export { Button };
```

```ts{1}
export default defineHtml(`<button><slot></slot></button>`);
```

::: tip
`.elf.ts` 和文件头 pragma 仍然兼容，但普通 `.ts/.tsx` 已经是推荐写法。
:::

## 诊断选项

```ts{1-4}
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true
});
```

::: tip
组件库建议开启；普通应用可以先使用默认配置。
:::
