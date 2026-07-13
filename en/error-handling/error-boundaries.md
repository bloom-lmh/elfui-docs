# error bounds

The runtime provides `errorBoundary()` and `captureError()` for building recoverable error regions.

```ts
import { captureError, useRef } from "@elfui/core";

const error = useRef<unknown>(null);

captureError((err) => {
  error.set(err);
});
```

When a child component throws an error, you can switch to the fallback state of this component.

## suggestion

Ordinary business pages can use state to control fallback. Only when hand-writing render or encapsulating framework-level components, you need to use the underlying `errorBoundary()` helper directly.
