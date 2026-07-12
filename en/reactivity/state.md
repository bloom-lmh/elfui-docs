---
title: Reactive State
---

# Reactive State

Use `useRef()` for primitive values and `useReactive()` for objects and arrays.

```ts
const count = useRef(0);
count.set(count.peek() + 1);

const user = useReactive({ name: "Elf", age: 1 });
user.name = "ElfUI";
```

Use `.value` when a reactive read should be tracked and `peek()` when it should not. Templates can consume refs directly.
