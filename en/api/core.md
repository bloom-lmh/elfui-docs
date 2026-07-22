---
title: "@elfui/core API"
---

# @elfui/core API

`@elfui/core` is the standard application-facing runtime entry. It covers macros, reactivity, lifecycle, models, directives, plugins, and built-in rendering capabilities. Normal applications do not directly depend on `@elfui/runtime` or `@elfui/reactivity`.

## macro component

`defineHtml`、`defineProps`、`defineEmits`、`defineModel`、`defineSlots`、`defineStyle`、`defineOptions`、`defineDirective`、`defineName`、`useComponents`

Pass inline template literals directly to the macros:

```ts
export default defineHtml(`<button>${label}</button>`);
defineStyle(`:host { display: block; }`);
```

`defineStyle(styleA, styleB)` combines multiple imported CSS strings. Beta.7 removes `html`, `css`, and `MacroHtmlTemplate`; pass inline templates directly. `defineHtml()` does not accept arbitrary runtime-generated strings because its template must be statically analyzable by the compiler.

## Responsive

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`、`useComputed`、`computed`、`useEffect`、`watch`、`watchEffect`、`watchPostEffect`、`watchSyncEffect`、`onWatcherCleanup`、`nextTick`

## Lifecycle

`onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted`, `onActivated`, `onDeactivated`, `onAttributeChanged`, `onErrorCaptured`

`onMount` and `onUnmount` are retained as compatibility aliases.

## Application and Runtime User API

`createApp`, `registerComponents`, `resolveComponentTag`, `defineComponent`, `defineCustomElement`, `ensureCustomElement`, `useModel`

Application-level plug-ins, instructions, and configuration usage:

```ts{1}
createApp(App).directive("focus", focusDirective).use(plugin).mount("#app");
```

`app.directive()` is isolated by App; `app.component(Component)` only accepts the component constructor and registers the browser global Custom Element according to its established tag.

Core also exports `directive`, `configure`, `getConfig`, and `usePlugin` for process-wide compatibility scenarios. Application code should prefer the isolated `app.directive()`, `app.config`, and `app.use()` APIs.

## Built-in combined functions

`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`、`useScopedSlot`、`useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs`、`useAppConfig`、`useTemplateRef`、`defineExpose`、`useEventListener`、`useClickOutside`、`useEscapeKey`、`useScrollLock`、`useFocusTrap`、`useResizeObserver`、`useIntersectionObserver`、`useFormControlContext`

## Built-in rendering capabilities

`teleport`, `transition`, `transitionGroup`, `keepAlive`, `suspense`, `dynamicComponent`, `projectLightDom`

## Internal subpath

`@elfui/core/internal` is reserved for compiler-generated code and is not an application-authoring API. It may change together with the compiler; applications must not import it manually.

Chained builders are not exported in `@elfui/core`. Use `@elfui/chain` when chained API is required.
