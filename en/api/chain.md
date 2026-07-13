---
title: Chain API
---

# Chain API

`@elfui/chain` is the optional chain-style component package.

```ts
createComponent()
  .name("elf-demo")
  .props({})
  .setup(() => ({}))
  .template(`<p>demo</p>`)
  .style(`p { color: red; }`)
  .register();
```

The builder supports `name`, `props`, `setup`, `render`, `template`, `style`, `shadow`, `formControl`, `emits`, `use`, `directive`, `build`, and `register`.

## Migration use

Use Chain at the edge of an incremental migration, then move shared behavior into components and composables. New application code is easier to maintain when it exposes props, events, and slots directly.
