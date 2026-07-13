---
title: Runtime API
---

# Runtime API

`@elfui/runtime` is intended for advanced component authors and framework integrations.

- Component definition: `defineComponent`, `defineCustomElement`, `ensureCustomElement`, `registerComponents`
- Lifecycle and injection: `onMount`, `onUnmount`, `provide`, `inject`
- Host and DOM: `useHost`, `useShadowRoot`, `useRenderRoot`, `useTemplateRef`, `defineExpose`
- Built-in helpers: `teleport`, `transition`, `transitionGroup`, `keepAlive`, `suspense`, `dynamicComponent`

Compiler-generated helpers live under `@elfui/runtime/internal` and are not application APIs.

## Integration boundary

Use runtime APIs only when building a component abstraction, renderer integration, or testing harness. Application components should stay on `@elfui/core`, which provides the stable compiler-aware surface. Do not import `internal` helpers directly because their signatures can change with compiler output.
