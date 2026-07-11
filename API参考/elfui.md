---
title: @elfui/core API
---

# @elfui/core API

`@elfui/core` 是新项目主入口，面向宏组件和应用启动。

## 宏组件

`defineHtml`、`html`、`css`、`defineProps`、`defineEmits`、`defineModel`、`defineSlots`、`defineStyle`、`defineOptions`、`defineDirective`、`defineName`、`useComponents`

## 响应式

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`、`useComputed`、`computed`、`useEffect`、`watch`、`watchEffect`、`watchPostEffect`、`watchSyncEffect`、`onWatcherCleanup`、`nextTick`

## 生命周期

`onBeforeMount`、`onMount`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmount`、`onActivated`、`onDeactivated`、`onAttributeChanged`、`onErrorCaptured`

## 应用与 Runtime 用户 API

`createApp`、`registerComponents`、`defineComponent`、`defineCustomElement`、`ensureCustomElement`

应用级插件、指令、配置使用：

```ts
createApp(App).directive("focus", focusDirective).use(plugin).mount("#app");
```

`app.directive()` 按 App 隔离；`app.component(Component)` 只接受组件构造器，并按其既定 tag 注册浏览器全局 Custom Element。

## 内置组合式函数

`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`、`useScopedSlot`、`useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs`、`useAppConfig`、`useTemplateRef`、`defineExpose`、`useEventListener`、`useClickOutside`、`useEscapeKey`、`useScrollLock`、`useFocusTrap`、`useResizeObserver`、`useIntersectionObserver`、`useFormControlContext`

链式 builder 不在 `@elfui/core` 中导出。需要链式 API 时使用 `@elfui/chain`。
