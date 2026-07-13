# Custom instructions

Custom instructions are suitable for encapsulating DOM behaviors, such as automatic focusing, permission hiding, and third-party library mounting.

## global directive

```ts
import { createApp } from "@elfui/core";

const app = createApp(App);
app.directive("focus", {
  mounted(el) {
    (el as HTMLElement).focus();
  }
});

app.mount("#app");
```

`app.directive()` is only effective for the current App. Use global `directive()` from `@elfui/runtime` only for chain-compatible or low-level runtime scenarios.

Used in templates:

```html
<input v-focus />
```

## local instructions

Use `defineDirective()` in macro component:

```ts
import { defineDirective } from "@elfui/core";

defineDirective("focus", {
  mounted(el) {
    (el as HTMLElement).focus();
  }
});
```

## life cycle

Command support:

| Hook | Timing |
| ----------- | ------------ |
| `mounted` | After the element is mounted |
| `updated` | After the binding value is updated |
| `unmounted` | When the element is unloaded |

If the behavior involves component state, give priority to built-in composition functions; if the behavior only cares about a certain DOM element, directives are more appropriate.
