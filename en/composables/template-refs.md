# template reference

`useTemplateRef()` is used to get the DOM nodes in the template.

```ts{1}
const input = useTemplateRef<HTMLInputElement>("input");

const focus = (): void => {
  input.value?.focus();
};

export const SearchInput = defineHtml(`
  <input ref="input" />
  <button @click=${focus}>聚焦</button>
`);
```

## Works with component exposure

```ts{1-3}
defineExpose({
  focus
});
```

The parent component or external page can call `focus()` after getting the component host. See "Components/Component Exposure" for details.
