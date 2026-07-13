# built-in commands

Built-in commands handle control flow, display switching, text, and forms in templates.

| Command | Purpose |
| ------------------------------- | ------------------ |
| `v-if` / `v-else-if` / `v-else` | Conditional rendering |
| `v-for` | List rendering |
| `v-show` | display switch |
| `v-model` | Two-way binding of forms and components |
| `v-text` | Set text |
| `v-html` | Set HTML |
| `v-once` | Render only once |
| `v-memo` | Skip updates by dependency |

## Example

```html
<p v-if="loading">加载中</p>

<li v-for="item in items" :key="item.id">{{ item.name }}</li>

<section v-show="open">内容</section>
```

It is recommended to put complex expressions into TypeScript variables or `useComputed()` in advance so that the template remains readable.
