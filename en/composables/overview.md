# Overview of built-in combined functions

The built-in combined function is the official `useXxx()` capability provided by ElfUI. They are not reactive primitives, but DOM, Host, event, observer, and form wrappers for service component authors.

| Classification | API |
| -------- | ------------------------------------------------------- |
| Host     | `useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs` |
| Template reference | `useTemplateRef` |
| DOM events | `useEventListener`, `useClickOutside` |
| Observer | `useResizeObserver`, `useIntersectionObserver` |
| Interactive control | `useEscapeKey`, `useScrollLock`, `useFocusTrap` |
| Form controls | `useFormControlContext`, `createFormControlContext` |

These functions must be called during the component setup synchronization phase, which is the top level of the macro component.
