# TransitionGroup

`TransitionGroup` is used for list enter/leave and keyed reflow animations.

```html{1}
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</TransitionGroup>
```

## move class

The move class is applied when the list is reordered:

```css{1}
.list-move {
  transition: transform 0.2s ease;
}
```

## Usage suggestions

::: warning
List items must have stable keys. Lists without keys cannot reliably calculate movement animations.
:::
