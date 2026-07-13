# Application configuration

Configuration belongs to the application instance, not process-level global state. Create the app first, and then write the configuration before mounting:

```ts{1-2,4}
import { createApp } from "@elfui/core";
import { App } from "./App";

const app = createApp(App);

app.config.globalProperties.appName = "Console";
app.config.warnHandler = (message, ...args) => {
  console.warn("[Console]", message, ...args);
};
app.config.errorHandler = (error, info) => {
  reportError(error, { info });
};

app.mount("#app");
```

## Configuration items

| Options | Function |
| ------------------ | -------------------------------------------------------------------------------------- |
| `globalProperties` | Application-level read-only convention value; component setup reads from `ctx.config.globalProperties` and template reads from `$app` |
| `warnHandler` | Receive runtime warnings for this App component |
| `errorHandler` | Receive setup/render error for this App |

When you need to read the configuration in TypeScript logic in the macro component, use `useAppConfig()`:

```ts{1}
import { useAppConfig } from "@elfui/core";

const appName = useAppConfig().globalProperties.appName;
```

Template string expressions still respect TypeScript scoping; pure template expressions read `$app`:

```ts{1}
defineHtml(html`<p>{{ $app.appName }}</p>`);
```

`globalProperties` itself is not a reactive container. When runtime updates are required, put the return value of `useRef()` or `useReactive()` into it.

## boundary

`tagPrefix` does not belong to application configuration. The macro component tag is determined at compile time, and the unified prefix can only be set in `@elfui/vite-plugin`.

::: warning
`@elfui/runtime` still reserves `configure/getConfig/resetConfig` for low-level packaging and testing; business applications should not use them from the `@elfui/core` main entry.
:::
