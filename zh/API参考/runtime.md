---
title: runtime API
---

# runtime API

`@elfui/runtime` 是高级组件作者入口。业务应用通常从 `@elfui/core` 导入即可。

## 组件定义

`defineComponent`、`defineCustomElement`、`ensureCustomElement`、`registerComponents`、`resolveComponentTag`

## 生命周期和协作

`onMount`、`onUnmount`、`onUpdated`、`onAttributeChanged`、`onErrorCaptured`、`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`

## 指令、配置、插件

`directive`、`resetDirectives`、`configure`、`getConfig`、`resetConfig`、`resolveAppConfig`、`warn`、`usePlugin`

## Host 和 DOM

`useHost`、`useShadowRoot`、`useRenderRoot`、`useAttrs`、`useAppConfig`、`useHostAttr`、`useHostFlag`、`useHostClass`、`useHostCssVar`、`useHostStyle`、`useTemplateRef`、`defineExpose`

## 内置 helper

`teleport`、`transition`、`transitionGroup`、`keepAlive`、`suspense`、`dynamicComponent`、`projectLightDom`

::: warning
编译产物 helper 在 `@elfui/runtime/internal`，业务代码不要依赖 internal 子入口。
:::
