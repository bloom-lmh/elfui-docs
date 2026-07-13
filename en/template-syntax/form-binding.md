# form binding

Form controls can use `v-model`.

```ts{1,3-4}
const text = useRef("");

export const SearchForm = defineHtml(html`
  <input v-model=${text} />
  <p>${text}</p>
`);
```

## checkbox

```ts{1,3}
const checked = useRef(false);

defineHtml(html`<input type="checkbox" v-model=${checked} />`);
```

## select

```ts{1,3-4}
const value = useRef("a");

defineHtml(html`
  <select v-model=${value}>
    <option value="a">A</option>
    <option value="b">B</option>
  </select>
`);
```

## Custom component

When the custom component supports `v-model`, use `defineModel()` in the subcomponent:

```ts{1}
const value = defineModel<string>({ default: "" });
```

For more component-level two-way binding, see "component/v-model".
