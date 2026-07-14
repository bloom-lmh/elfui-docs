# local component

`useComponents()` is used to use imported components in the current component template.

```ts{4}
import { defineHtml, html, useComponents } from "@elfui/core";
import { ElfButton } from "./Button";

useComponents(ElfButton);

export const Toolbar = defineHtml(html` <elf-button>保存</elf-button> `);
```

You can also set an alias:

```ts{1}
useComponents({ PrimaryAction: ElfButton });

export const Toolbar = defineHtml(html` <primary-action>保存</primary-action> `);
```

## Relationship with global registration

`createApp(App).mount("#app")` is used to register and mount the application root component; `app.component(Component)` or `registerComponents()` will only register the component to the browser global `customElements` according to its compile-time tag; `useComponents()` is a local dependency declaration within the component.

::: tip
Component libraries prefer partial components because dependencies are clear and template type checking can also know the props, events, and slots of subcomponents.
:::
