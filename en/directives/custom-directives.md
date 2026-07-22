# Custom instructions

Custom instructions are suitable for encapsulating DOM behaviors, such as automatic focusing, permission hiding, and third-party library mounting.

## global directive

```ts{4-8}
import { createApp } from "@elfui/core";

const app = createApp(App);
app.directive("focus", {
  mounted(el) {
    (el as HTMLElement).focus();
  }
});

app.mount("#app");
```

`app.directive()` is scoped to the current App. ElfUI deliberately has no public process-global directive registry, so directives cannot leak across independent applications.

Used in templates:

```html{1}
<input v-focus />
```

## local instructions

Use `defineDirective()` in macro component:

```ts{3-7}
import { defineDirective } from "@elfui/core";

const focus = defineDirective<unknown, HTMLInputElement>({
  mounted(el) {
    el.focus();
  }
});
```

`defineDirective()` must be assigned to a local variable. The variable becomes the template directive name; camelCase is normalized to kebab-case, so `const autoFocus` matches `v-auto-focus`. The component compiler resolves local definitions before the containing App's directive registry. Use it when the behavior belongs to one component implementation.

## life cycle

Command support:

| Hook            | Timing                             |
| --------------- | ---------------------------------- |
| `mounted`       | After the element is mounted       |
| `updated`       | After the binding value is updated |
| `beforeUnmount` | Before the element is unloaded     |
| `unmounted`     | When the element is unloaded       |

If the behavior involves component state, give priority to built-in composition functions; if the behavior only cares about a certain DOM element, directives are more appropriate.
