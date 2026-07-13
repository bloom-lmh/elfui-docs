# Template syntax overview

The ElfUI template is declared through `defineHtml(html`...`)`, which will be compiled into a render function that directly operates the DOM during the build period.

```ts{1-2}
export const Counter = defineHtml(html`
  <button @click=${inc} :disabled=${disabled}>${count}</button>
`);
```

Template syntax is divided into two categories:

| Type | Example |
| --------------------- | ---------------------------------------------------- |
| JavaScript dynamic expressions | `${count}`, `:disabled=${disabled}`, `@click=${inc}` |
| Commands | `v-if`, `v-for`, `v-model`, `v-show` |

## Recommended writing method

::: tip
Ordinary dynamic binding uses `${...}` first:
:::

```ts{1}
defineHtml(html`<button @click=${submit} :disabled=${loading}>提交</button>`);
```

::: tip
Scenarios that require template local variables use string expressions, such as `v-for`:
:::

```html{1}
<li v-for="item in list" :key="item.id">{{ item.name }}</li>
```

## Compilation result

::: warning
Templates do not become VNodes. The compiler will split dynamic text, properties, events and control flow into independent bindings, and only update the corresponding DOM points when the state changes.
:::
