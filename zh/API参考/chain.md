---
title: chain API
---

# chain API

`@elfui/chain` 是链式组件扩展包。

## Builder

`ElfUI.createComponent()` / `createComponent()` 返回 `ElementBuilder`。

```ts{1}
createComponent()
  .name("elf-demo")
  .props({})
  .setup(() => ({}))
  .template(`<p>demo</p>`)
  .style(`p { color: red; }`)
  .register();
```

## Builder 方法

`name`、`props`、`setup`、`render`、`template`、`style`、`shadow`、`formControl`、`emits`、`emitOptions`、`use`、`directive`、`build`、`register`、`toDefinition`

## 复用

`extend()`、`variant()`

## 其它导出

Chain 会重导出常用 reactivity/runtime API，方便链式场景单入口使用。但它不导出宏组件 API。
