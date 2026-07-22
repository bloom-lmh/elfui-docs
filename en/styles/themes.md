# theme

::: tip
Themes are recommended to be expressed using CSS variables. Variables are read inside the component and injected by the application layer through `theme()` or `useTheme()`.
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

Macro component reuse scenarios can also use `useTheme()`:

```ts
import { useTheme } from "@elfui/core";

useTheme(ElfButton, `--elf-button-radius: 8px;`);
```

## suggestion

The default value is defined inside the component:

```css
button {
  background: var(--elf-button-bg, #111);
  color: var(--elf-button-color, #fff);
}
```

The theme layer only covers variables and does not directly penetrate the internal selectors of components.
