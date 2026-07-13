---
title: router API
---

# router API

本页索引 `@elfui/router` 的公开 API；完整案例请阅读路由指南。

## 创建与 history

```ts
createRouter(options): Router
createWebHistory(base?): RouterHistory
createWebHashHistory(base?): RouterHistory
createMemoryHistory(base?): RouterHistory
setActiveRouter(router | null): void
getActiveRouter(): Router | null
```

`RouterOptions` 支持 `routes`、推荐使用的 `history`（或兼容的 `mode`）、`initialPath`、`sensitive`、`strict`、`scrollBehavior`、`linkActiveClass` 与 `linkExactActiveClass`。

## Router 实例

| 成员 | 说明 |
| --- | --- |
| `current`、`currentRoute` | 包含当前 `RouteLocation` 的响应式 ref。 |
| `push(to)`、`replace(to)` | 导航；结果为 `void` 或 `NavigationFailure`。 |
| `back()`、`forward()`、`go(delta)` | 在 history 中移动。 |
| `resolve(to, currentLocation?)` | 只解析，不导航。 |
| `beforeEach`、`beforeResolve`、`afterEach`、`onError` | 注册钩子；每个都会返回注销函数。 |
| `addRoute`、`removeRoute`、`clearRoutes`、`hasRoute`、`getRoutes` | 修改或检查路由记录。 |
| `isReady()` | 在首次导航、守卫与懒页面加载完成后 resolve。 |
| `listening` | 是否监听浏览器 history 事件。 |

## 元素与组合式 API

`registerRouterElements()` 会注册 `<elf-router-view>`、`<elf-router-link>` 与 `<elf-link>` 别名。`useRouter()` 返回当前 `Router` 或 `null`；`useRoute()` 返回稳定的只读当前 location；`useLink()` 提供无头链接行为。`onBeforeRouteLeave()`、`onBeforeRouteUpdate()` 注册组件守卫。

## 工具与类型

导出的工具有 `parseQuery()`、`stringifyQuery()`、`isNavigationFailure()` 与 `NavigationFailureType`。主要类型包括 `Router`、`RouterOptions`、`RouterHistory`、`RouteRecord`、`RouteLocation`、`RouteLocationRaw`、`RouteQuery`、`NavigationGuard`、`NavigationFailure` 与 `ScrollBehaviorFn`。
