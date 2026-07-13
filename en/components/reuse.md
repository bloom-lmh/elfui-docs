# Component reuse

The macro component main package provides `useExtend()` and `useVariant()`, which are used to derive new components based on existing components.

## useExtend

```ts
import { useExtend } from "@elfui/core";
import { Button } from "./Button";

export const PrimaryButton = useExtend(Button)
  .name("primary-button")
  .style(`:host { --button-color: var(--elf-color-primary); }`)
  .build();
```

`useExtend()` will copy the original component definition, then allow you to change tags, add styles, and build or register.

## useVariant

```ts
import { useVariant } from "@elfui/core";
import { Button } from "./Button";

export const DangerButton = useVariant(Button, "danger-button", (builder) => {
  builder.style(`:host { --button-color: var(--elf-color-danger); }`);
}).build();
```

## when to use

Suitable for variant components in design systems, such as `PrimaryButton`, `DangerButton`, and `CompactTable`. If just passing a prop can solve the problem, don't derive a new component.
