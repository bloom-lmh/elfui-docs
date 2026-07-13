# Component styles

Place component-specific styles beside the component they describe. Use clear class names and keep structural styling separate from theme values when possible.

Component boundaries make style ownership easier to reason about and maintain.

## Styling contract

Use CSS custom properties for values that a consumer may theme, and reserve internal class names for implementation details. This gives consumers a stable customization surface without relying on selectors that cross component boundaries.

```css
:host { --button-accent: #0ea5e9; }
.button { background: var(--button-accent); }
```
