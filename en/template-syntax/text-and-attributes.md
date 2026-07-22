# Text and attributes

::: tip
Text interpolation can use `${...}` or `&#123;&#123; ... &#125;&#125;`. It is recommended for new projects to use `${...}` in macro components because it directly references the current TypeScript scope.
:::

```ts
const name = useRef("Elf");
export const Hello = defineHtml(` <p>Hello ${name}</p> `);
```

## Property binding

```ts
defineHtml(`<button :disabled=${disabled}>保存</button>`);
```

Boolean properties are removed with values ​​`false`, `null`, `undefined`.

## Property binding

Use `.prop` when you need to set DOM properties:

```ts
defineHtml(`<input .value=${value} />`);
```

::: tip
For complex objects, it is recommended to use property instead of attribute.
:::

::: tip Attribute and Property

`:title=${title}` writes HTML attributes, and the browser sees strings; `.value=${value}` writes DOM properties directly, retaining the true types of objects, arrays, functions, and Boolean values. Ordinary strings, ARIA attributes, and `data-*` attributes take precedence; form current values, complex props, and object data take precedence over properties.

:::

## text safe

A normal text binding would write `textContent`. Use `v-html` when you need to insert HTML, and ensure that the content is credible.
