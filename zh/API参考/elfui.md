---
title: "@elfui/core API"
---

# @elfui/core API

`@elfui/core` 是应用唯一标准运行时入口，覆盖宏组件、响应式、生命周期、模型、指令、插件和内置渲染能力。普通应用不需要直接依赖 `@elfui/runtime` 或 `@elfui/reactivity`。

## 宏组件

`defineHtml`、`html`、`css`、`defineProps`、`defineEmits`、`defineModel`、`defineSlots`、`defineStyle`、`defineOptions`、`defineDirective`、`defineName`、`useComponents`

推荐直接把内联模板字符串传给宏：

```ts
export default defineHtml(`<button>${label}</button>`);
defineStyle(`:host { display: block; }`);
```

`defineStyle(styleA, styleB)` 可以组合多个导入的 CSS 字符串。旧的 `defineHtml(html\`...\`)` 和 `defineStyle(css\`...\`)` 继续兼容。`defineHtml()` 不接受运行时生成的任意字符串；模板必须能被编译器静态分析。

## 响应式

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`、`useComputed`、`computed`、`useEffect`、`watch`、`watchEffect`、`watchPostEffect`、`watchSyncEffect`、`onWatcherCleanup`、`nextTick`

## 生命周期

`onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmounted`、`onActivated`、`onDeactivated`、`onAttributeChanged`、`onErrorCaptured`

`onMount`、`onUnmount` 作为兼容别名保留。

## 应用与 Runtime 用户 API

`createApp`、`registerComponents`、`resolveComponentTag`、`defineComponent`、`defineCustomElement`、`ensureCustomElement`、`useModel`

应用级插件、指令、配置使用：

```ts{1}
createApp(App).directive("focus", focusDirective).use(plugin).mount("#app");
```

`app.directive()` 按 App 隔离；`app.component(Component)` 只接受组件构造器，并按其既定 tag 注册浏览器全局 Custom Element。

需要进程级兼容行为时，Core 也导出 `directive`、`configure`、`getConfig` 和 `usePlugin`。应用代码优先使用隔离的 `app.directive()`、`app.config` 和 `app.use()`。

## 内置组合式函数

`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`、`useScopedSlot`、`useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs`、`useAppConfig`、`useTemplateRef`、`defineExpose`、`useEventListener`、`useClickOutside`、`useEscapeKey`、`useScrollLock`、`useFocusTrap`、`useResizeObserver`、`useIntersectionObserver`、`useFormControlContext`

## 内置渲染能力

`teleport`、`transition`、`transitionGroup`、`keepAlive`、`suspense`、`dynamicComponent`、`projectLightDom`

## Internal 子路径

`@elfui/core/internal` 只供编译器生成代码使用，不是业务代码 API。它可以随编译器版本同步变化，应用不要手写导入。

链式 builder 不在 `@elfui/core` 中导出。需要链式 API 时使用 `@elfui/chain`。
