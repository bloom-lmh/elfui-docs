# event binding

Event binding uses `@event=${handler}`.

```ts{5}
const submit = (event: Event): void => {
  event.preventDefault();
};

export const FormButton = defineHtml(html` <button @click=${submit}>提交</button> `);
```

The framework will pass in the native event as the first parameter of the handler. The custom component event is `CustomEvent`, and the business data is in `event.detail`:

```ts{5}
const select = (event: CustomEvent<{ id: string }>): void => {
  save(event.detail.id);
};

defineHtml(html`<user-picker @select=${select}></user-picker>`);
```

## Passing on parameters

```ts{5}
const remove = (id: string): void => {
  items.set(items.peek().filter((item) => item.id !== id));
};

defineHtml(html` <button @click=${(event) => remove(item.id, event)}>删除</button> `);
```

## modifier

Common event modifiers are placed in "Instructions/Event Modifiers":

```html{1}
<form @submit.prevent="submit"></form>
<button @click.stop="select"></button>
```

::: warning
It is recommended to write TypeScript handlers first in macro components, and do not stuff complex logic into templates.
:::
