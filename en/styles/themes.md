# theme

::: tip
Themes are recommended to be expressed using CSS variables. Variables are read inside the component and injected by the application layer through `theme()`.
:::

```ts
import { theme } from "@elfui/core";
import { ElfButton } from "./Button";

theme(
  ElfButton,
  `
  --elf-button-bg: #14d8a6;
  --elf-button-color: #04110d;
`,
  { id: "button-theme" },
);
```

`theme()` is the single public theme-registration API. It injects component theme CSS and is not a setup-context state getter.

## suggestion

The default value is defined inside the component:

```css
button {
  background: var(--elf-button-bg, #111);
  color: var(--elf-button-color, #fff);
}
```

The theme layer only covers variables and does not directly penetrate the internal selectors of components.
