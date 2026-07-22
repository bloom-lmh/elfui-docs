---
title: Reactive State
---
# Responsive state

ElfUI beta mainline uses `useRef()` and `useReactive()`. Use `useRef` for basic values ​​and `useReactive` for objects and arrays.

## useRef

```ts{1}
const count = useRef(0);

count.set(count.peek() + 1);
```

The template can be read directly:

```ts{1}
defineHtml(`<button>${count}</button>`);
```

Use `peek()` when traceless reading is required in the code; use `.value` when responsive reading is required.

`set()` performs the write and returns `void`; it is not chainable. Write consecutive updates as separate statements:

```ts
count.set(1);
count.set(2);
```

## useReactive

```ts{1-4}
const user = useReactive({
  name: "Elf",
  age: 1
});

user.name = "ElfUI";
```

Reads and writes to object fields are tracked. Array push, splice, rearrangement, etc. will also trigger related dependencies.

## Select rules

| Data | Recommendations |
| --------------------- | --------------- |
| number/string/boolean | `useRef()`      |
| Object | `useReactive()` |
| Array | `useReactive()` |
| Derived value | `useComputed()` |

`useState` is no longer in the beta public API mainline. For old code migration, see "Migration/Abandoned API".
