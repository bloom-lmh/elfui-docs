# class and style

`class` and `style` support string, object and array forms.

## class

```ts{1}
defineHtml(html`<button :class=${{ active: open, disabled }}></button>`);
```

```ts{1}
defineHtml(html`<button :class=${["btn", open && "is-open"]}></button>`);
```

`defineHtml(html`...`)` uses TypeScript tagged template; the content without `${...}` is just an HTML string. Therefore, the following unquoted object/array writing method is not supported, and the attribute value will be truncated by HTML parsing at spaces:

```ts{1}
defineHtml(html`<button :class={ active: open, disabled }></button>`); // 不支持
```

::: tip
When compatible with the Vue style, you can write the quoted template expression `:class="{ active: open }"`, but the macro component recommends `${...}`: it has TypeScript type checking, jump and refactoring support.
:::

## style

```ts{1}
defineHtml(html` <div :style=${{ width: `${width}px`, display: visible ? "" : "none" }}></div> `);
```

Static classes will be merged with dynamic classes:

```ts{1}
defineHtml(html`<button class="btn" :class=${{ active }}></button>`);
```

## Component style

::: tip
The CSS inside the component is placed in "Styles/Component Styles". `class` and `style` in the template are only responsible for state mapping, and it is not recommended to stuff a large number of style strings.
:::
