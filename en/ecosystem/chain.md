---
title: Chain
---
# Chain chain component

`@elfui/chain` is an ecological expansion package, oriented to progressive embedding of old sites, small demos, and low construction constraint pages. It retains the chained builder and has a built-in runtime compiler, thus supporting `.template()`.

```bash{1}
pnpm add @elfui/chain
```

```ts{1,6,8,10}
import { ElfUI, useRef } from "@elfui/chain";

ElfUI.createComponent()
  .name("elf-counter")
  .setup(() => {
    const count = useRef(0);
    const inc = (): void => count.set(count.peek() + 1);
    return { count, inc };
  })
  .template(`<button @click="inc">Count: {{ count }}</button>`)
  .register();
```

## Capability boundary

| Ability | Chain |
| ---------------- | ------------------------ |
| chain builder | `createComponent()` |
| Runtime Template | `.template()` |
| Local components | `.use()` |
| Component extension | `extend()` / `variant()` |
| runtime compiler | carried in package |

## Do not mix it with the main plot

Both the new project documentation and the component examples use the `@elfui/core` macro component. Chain is an independent extension and is not introduced in the main component line.

If the project already has a build tool, migrate to macro components first; if you just add a few Web Components to the old HTML page, Chain will be easier.
