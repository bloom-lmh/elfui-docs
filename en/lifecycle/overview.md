# Lifecycle overview

Lifecycle hooks must be registered synchronously during component setup, which means at the top level of a Macro component.

```ts{11}
import { defineHtml, onMounted, onUnmounted } from "@elfui/core";

onMounted(() => {
  console.log("mounted");
});

onUnmounted(() => {
  console.log("unmounted");
});

export const Demo = defineHtml(`<p>Demo</p>`);
```

## Lifecycle hooks

| API                  | Timing                                         |
| -------------------- | ---------------------------------------------- |
| `onBeforeMount`      | Before the first render is committed           |
| `onMounted`          | After final DOM and template refs are ready    |
| `onBeforeUpdate`     | Before a reactive DOM update                   |
| `onUpdated`          | After a reactive DOM update                    |
| `onBeforeUnmount`    | Before resources and DOM are released          |
| `onUnmounted`        | After the component is fully detached          |
| `onActivated`        | When a KeepAlive component becomes active      |
| `onDeactivated`      | When a KeepAlive component becomes inactive    |
| `onAttributeChanged` | After an observed host attribute changes       |
| `onErrorCaptured`    | When a descendant or lifecycle operation fails |

`onMount` and `onUnmount` remain compatible aliases for `onMounted` and `onUnmounted`. New code should use the `-ed` names so the timing reads clearly.

A hook may return a Promise. ElfUI does not delay the mount or unmount sequence while waiting for it, but a rejection is routed through `onErrorCaptured` and the application `errorHandler`.

::: tip
`onAttributeChanged((name, oldValue, newValue) => {})` is intended for native attributes that are not declared as props. Prefer props and reactive bindings for the regular declared data flow.
:::
