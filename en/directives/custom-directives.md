# Custom instructions

Custom instructions are suitable for encapsulating DOM behaviors, such as automatic focusing, permission hiding, and third-party library mounting.

## global directive

```ts{3}
import { createApp } from "@elfui/core";

const app = createApp(App);
app.directive("focus", {
  mounted(el) {
    (el as HTMLElement).focus();
  }
});

app.mount("#app");
```

`app.directive()` is scoped to the current App and is the preferred application API. Chain compatibility or process-wide cross-App scenarios can import global `directive()` from `@elfui/core`; value and element types are inferred from the concrete definition.

```ts
import { directive, type DirectiveBinding } from "@elfui/core";

directive("numeric", (element: HTMLElement, binding: DirectiveBinding<number>) => {
  element.dataset.value = binding.value.toFixed();
});
```

Used in templates:

```html{1}
<input v-focus />
```

## local instructions

Use `defineDirective()` in macro component:

```ts{3-7}
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
