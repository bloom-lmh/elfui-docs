---
title: "@elfui/core API"
---

# @elfui/core API

`@elfui/core` is the main entrance of the new project, which is for macro components and application startup.

## macro component

`defineHtml`、`html`、`css`、`defineProps`、`defineEmits`、`defineModel`、`defineSlots`、`defineStyle`、`defineOptions`、`defineDirective`、`defineName`、`useComponents`

## Responsive

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`、`useComputed`、`computed`、`useEffect`、`watch`、`watchEffect`、`watchPostEffect`、`watchSyncEffect`、`onWatcherCleanup`、`nextTick`

## Lifecycle

`onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted`, `onActivated`, `onDeactivated`, `onAttributeChanged`, `onErrorCaptured`

`onMount` and `onUnmount` are retained as compatibility aliases.

## Application and Runtime User API

`createApp`、`registerComponents`、`defineComponent`、`defineCustomElement`、`ensureCustomElement`

Application-level plug-ins, instructions, and configuration usage:

```ts{1}
createApp(App).directive("focus", focusDirective).use(plugin).mount("#app");
```

`app.directive()` is isolated by App; `app.component(Component)` only accepts the component constructor and registers the browser global Custom Element according to its established tag.

## Built-in combined functions

`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`、`useScopedSlot`、`useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs`、`useAppConfig`、`useTemplateRef`、`defineExpose`、`useEventListener`、`useClickOutside`、`useEscapeKey`、`useScrollLock`、`useFocusTrap`、`useResizeObserver`、`useIntersectionObserver`、`useFormControlContext`

Chained builders are not exported in `@elfui/core`. Use `@elfui/chain` when chained API is required.
