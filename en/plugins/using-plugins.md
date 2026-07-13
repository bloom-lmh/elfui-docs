# Use plugins

Plugins are installed via application instances:

```ts
import { createApp } from "@elfui/core";
import { AppRoot } from "./AppRoot";
import { focusPlugin } from "./focus-plugin";

createApp(AppRoot).use(focusPlugin).mount("#app");
```

Incoming configuration:

```ts
createApp(AppRoot).use(focusPlugin, { autoSelect: true }).mount("#app");
```

In the same app instance, the same plug-in instance will only be installed once. Multiple apps can install their own plug-ins and configurations respectively.

## Installation order

Plugins are usually installed when the application starts and should be mounted earlier than the root component:

```ts
import { createApp } from "@elfui/core";

createApp(AppRoot).use(appPlugin).mount("#app");
```
