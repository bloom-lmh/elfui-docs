---
title: router API
---

# router API

`@elfui/router` 提供与 Vue Router 4 导航语义对齐的 Web Component 路由能力。

## 创建与 history

`createRouter`、`createWebHistory`、`createWebHashHistory`、`createMemoryHistory`、`setActiveRouter`、`getActiveRouter`

`RouterOptions` 支持 `history`（或兼容的 `mode`）、`routes`、`initialPath`、`scrollBehavior`、`sensitive`、`strict`、`linkActiveClass` 和 `linkExactActiveClass`。

## Router 实例

`current` 与 `currentRoute` 是响应式 ref。实例提供 `listening`、`push`、`replace`、`back`、`forward`、`go`、`resolve`、各类守卫注册方法、动态路由管理方法及 `isReady`。

`isReady()` 会等待首次导航，包括初始守卫和懒页面加载。

## 组件、组合式 API 与工具

`registerRouterElements`、`<elf-link>`、`<elf-router-link>`、`<elf-router-view>`、`useRouter`、`useRoute`、`useLink`、`onBeforeRouteLeave`、`onBeforeRouteUpdate`、`parseQuery`、`stringifyQuery`、`isNavigationFailure`、`NavigationFailureType`

常用类型：`Router`、`RouterOptions`、`RouterHistory`、`RouteRecord`、`RouteLocation`、`RouteLocationRaw`、`NavigationGuard`、`ScrollBehaviorFn`。
