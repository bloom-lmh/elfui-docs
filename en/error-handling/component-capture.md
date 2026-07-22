# Component error catching

`onErrorCaptured()` captures errors that bubble up from subcomponents.

```ts
onErrorCaptured((err) => {
  console.error(err);
  return false;
});
```

Returning `false` means preventing upward bubbling.

## Usage scenarios

- local error message
- Show fallback after subcomponent fails
- Prevent errors from polluting the entire page

If you need the full fallback/retry structure, error bounds can be used.
