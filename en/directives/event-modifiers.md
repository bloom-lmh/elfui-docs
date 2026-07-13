# event modifier

Event modifiers are used to express common DOM event options and interception behaviors.

```html{1}
<button @click.stop="select">选择</button>
<form @submit.prevent="submit"></form>
<button @click.once="init">初始化一次</button>
```

## Supported modifiers

| Modifier | Meaning |
| ---------- | ------------------------------ |
| `.stop` | Call `event.stopPropagation()` |
| `.prevent` | Call `event.preventDefault()` |
| `.self` | Only handle events whose target is itself |
| `.once` | `addEventListener` of `once` |
| `.capture` | Capture phase monitoring |
| `.passive` | passive monitoring |

## Select suggestions

Simple scenarios use modifiers, and complex logic is written in the handler. This makes TypeScript types clearer and easier to test.
