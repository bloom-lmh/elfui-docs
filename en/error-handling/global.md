# Global error handling

Errors and warnings are configured on the instance returned by `createApp()` and should be completed before `mount()`:

```ts
import { createApp } from "@elfui/core";

const app = createApp(App);

app.config.errorHandler = (error, info) => {
  reportError(error, { info });
};

app.config.warnHandler = (message, ...args) => {
  console.warn("[ElfUI]", message, ...args);
};

app.mount("#app");
```

`errorHandler` receives component setup/render errors; `warnHandler` receives framework warnings in the App component context, such as expose overwriting the original host property.

::: warning
Do not put business recovery logic into the global handler. Partially recoverable errors should be handled by `onErrorCaptured()` or `errorBoundary()`.
:::
