---
title: Runtime API
---

# runtime API

`@elfui/runtime` is the entrance for advanced component authors. Business applications can usually be imported from `@elfui/core`.

## Component definition

`defineComponent`、`defineCustomElement`、`ensureCustomElement`、`registerComponents`、`resolveComponentTag`

## Lifecycle and collaboration

`onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted`, `onActivated`, `onDeactivated`, `onAttributeChanged`, `onErrorCaptured`, `provide`, `inject`, `hasInjectionContext`, `createInjectionKey`

`onMount` and `onUnmount` remain compatibility aliases.

## Instructions, configurations, plug-ins

`directive`、`resetDirectives`、`configure`、`getConfig`、`resetConfig`、`resolveAppConfig`、`warn`、`usePlugin`

## Host and DOM

`useHost`、`useShadowRoot`、`useRenderRoot`、`useAttrs`、`useAppConfig`、`useHostAttr`、`useHostFlag`、`useHostClass`、`useHostCssVar`、`useHostStyle`、`useTemplateRef`、`defineExpose`

## Built-in helpers

`teleport`、`transition`、`transitionGroup`、`keepAlive`、`suspense`、`dynamicComponent`、`projectLightDom`

::: warning
The compiled product helper is in `@elfui/runtime/internal`, and the business code should not rely on the internal sub-entry.
:::
