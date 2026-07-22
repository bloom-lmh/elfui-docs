# Plugin overview

The ElfUI plug-in is used to register global directives in batches, modify runtime configurations, or encapsulate project conventions.

```ts
import { createApp } from "@elfui/core";
import { AppRoot } from "./AppRoot";

createApp(AppRoot).use(myPlugin, options).mount("#app");
```

A plug-in can be a function or an object with `install()`.

## Suitable for what to do

- Register a set of global directives
- Install project-level default configuration
- Encapsulate monitoring, logging, and topic initialization

::: warning
Do not make the local dependencies of the component itself into plug-ins. Use `useComponents()` first.
:::
