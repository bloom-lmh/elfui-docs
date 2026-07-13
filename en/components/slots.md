# slot

Slots allow parent components to pass content to child components. ElfUI exports Custom Elements, default slots and named slots using native Web Components semantics.

## Default slot

```ts{1-5}
export const Card = defineHtml(html`
  <article class="card">
    <slot></slot>
  </article>
`);
```

```html{1}
<elf-card>内容</elf-card>
```

## named slot

```ts{1-5}
export const Panel = defineHtml(html`
  <header><slot name="title"></slot></header>
  <main><slot></slot></main>
  <footer><slot name="actions"></slot></footer>
`);
```

```html{1}
<elf-panel>
  <h2 slot="title">标题</h2>
  正文
  <button slot="actions">确定</button>
</elf-panel>
```

## scope slot

::: warning
Web Components do not have native scope slots. ElfUI supports common writing methods through compile-time bridging, and sub-components use `useScopedSlot()` for consumption.
:::

```ts{5-9}
import { defineHtml, html, useScopedSlot } from "@elfui/core";

const itemSlot = useScopedSlot<{ item: string }>("item");

export const ListBox = defineHtml(html`
  <ul>
    <li>${itemSlot?.({ item: "A" })}</li>
  </ul>
`);
```

The parent component provides the rendering function with `<template #name="...">` with scope parameters:

```ts{1-8}
export const UserListPage = defineHtml(html`
  <user-list>
    <template #item="{ item, index }">
      <strong>{{ index + 1 }}</strong>
      <span>{{ item.name }}</span>
    </template>
  </user-list>
`);
```

`item` and `index` are slot local variables, so template expressions are used here instead of `${...}` in the outer TypeScript. The `useScopedSlot<{ item: User; index: number }>("item")` generic of the child component also constrains its outgoing scope.

Scope slots are suitable for scenarios such as Table cells and List items that require the internal data of child components to be handed over to parent components for rendering.
