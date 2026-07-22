---
title: Router
---

# Router

Router 是独立包。只有应用需要客户端路由时才安装：

```bash
pnpm add @elfui/router
```

也可以在创建项目时由脚手架加入：

```bash
pnpm create elfui@beta my-app --router --install
```

在独立模块中创建路由，并在挂载应用前导入它：

```ts{4-10}
// src/router/index.ts
import { createRouter } from "@elfui/router";

export const router = createRouter({
  mode: "hash",
  routes: [
    { path: "/", component: () => import("../pages/Home") },
    { path: "/about", component: () => import("../pages/About") }
  ]
});
```

```ts
// src/main.ts
import "./router";
import { createApp } from "@elfui/core";
import App from "./App";

createApp(App).mount("#app");
```

```html
<elf-link to="/">首页</elf-link> <elf-router-view></elf-router-view>
```

`createRouter()` 会激活路由并注册路由元素，支持 hash、history、memory 模式，嵌套路由、守卫、重定向、别名与异步组件。
