# dynamic components

Dynamic components are used to switch the components to be rendered at runtime.

```ts{7}
import { defineHtml, useRef } from "@elfui/core";
import { UserCard } from "./UserCard";
import { TeamCard } from "./TeamCard";

const current = useRef<typeof UserCard | typeof TeamCard>(UserCard);

export const Dashboard = defineHtml(` <component :is=${current}></component> `);
```

`:is` can be a component constructor or a registered tag name.

```ts{1}
const current = useRef("elf-user-card");
```

## Cooperate with KeepAlive

When you need to cache the instance, use `<KeepAlive>` to wrap the dynamic component:

```html{1}
<KeepAlive>
  <component :is="current"></component>
</KeepAlive>
```

::: warning
It is suitable for scenarios such as tabs, routing pages, editor panels, etc. that switch frequently but do not want to rebuild the state.
:::
