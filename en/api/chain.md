---
title: Chain API
---
# chain API

`@elfui/chain` is a chain component expansion package.

## Builder

`ElfUI.createComponent()` / `createComponent()` returns `ElementBuilder`.

```ts{1}
createComponent()
  .name("elf-demo")
  .props({})
  .setup(() => ({}))
  .template(`<p>demo</p>`)
  .style(`p { color: red; }`)
  .register();
```

## Builder method

`name`、`props`、`setup`、`render`、`template`、`style`、`shadow`、`formControl`、`emits`、`emitOptions`、`use`、`directive`、`build`、`register`、`toDefinition`

## Reuse

`extend()`、`variant()`

## Other exports

Chain will re-export common reactivity/runtime APIs to facilitate single-entry use in chained scenarios. But it does not export the macro component API.
