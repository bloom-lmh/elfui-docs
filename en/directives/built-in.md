# Built-in directives

Built-in directives express common template behavior such as conditional rendering, list rendering, binding, and event handling. They are compiled as part of the template, so use them for declarative UI rather than manual DOM updates.

Choose the directive that matches the DOM behavior you want to describe.

## Choosing a directive

Use bindings for values, event bindings for user input, and conditional or list directives for structure. Keep a directive expression side-effect free when it runs during rendering; update state from an event handler instead.

```ts
export const Status = defineHtml(html`
  <p ?hidden=${() => !ready.value}>Ready</p>
  <button @click=${reload}>Reload</button>
`);
```
