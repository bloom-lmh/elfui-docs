# Responsive tools

Reactive tools are used to handle read-only, shallow responsiveness, primitive objects, and effect scopes.

## readonly

```ts{1}
const state = readonly(useReactive({ count: 0 }));
```

A warning will be given in the development environment when read-only objects are written.

## shallow

```ts{1}
const value = useShallowRef({ nested: { count: 0 } });
const state = useShallowReactive({ nested: { count: 0 } });
```

Shallow response only tracks the top level, suitable for large objects or third-party instance packaging.

## markRaw / toRaw

```ts{1}
const editor = markRaw(createEditor());
```

`markRaw()` marks the object not to be proxied, `toRaw()` retrieves the original object.

## effectScope

```ts{4-6}
const scope = effectScope();

scope.run(() => {
  useEffect(() => {
    // ...
  });
});

scope.stop();
```

Scope is suitable for batch management of effects in plug-ins, elastic layers, and temporary modules.
