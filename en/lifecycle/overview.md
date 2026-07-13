# Life cycle overview

Lifecycle functions can only be called during the component setup synchronization phase, which is the top level of the macro component.

```ts
import { defineHtml, html, onMount, onUnmount } from "@elfui/core";

onMount(() => {
  console.log("mounted");
});

onUnmount(() => {
  console.log("unmounted");
});

export const Demo = defineHtml(html`<p>Demo</p>`);
```

## life cycle list

| API | Timing |
| -------------------- | --------------------- |
| `onBeforeMount` | Before first mount |
| `onMount` | After first mount |
| `onBeforeUpdate` | Before responsive update |
| `onUpdated` | After responsive update |
| `onBeforeUnmount` | Before uninstalling |
| `onUnmount` | After uninstallation |
| `onActivated` | KeepAlive Activation |
| `onDeactivated` | KeepAlive deactivated |
| `onAttributeChanged` | After host attribute change |

Error-related capabilities are placed in "error handling".

`onAttributeChanged((name, oldValue, newValue) => {})` is suitable for compatibility with native attributes that are not declared as props; regular data flows that have declared props preferentially use props and reactive binding.
