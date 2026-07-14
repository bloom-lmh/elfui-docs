# Compile diagnostics

`@elfui/vite-plugin` will give build-time diagnostics for macro components.

Common diagnoses:

| Scene | Processing |
| ------------------------------------ | ------------------------------------------- |
| Import macro API but not export `defineHtml()` | Add component export or delete macro import |
| Use removed macro aliases | Change to new APIs such as `defineProps` / `defineEmits` |
| The pragma position is illegal | Move to the top of the file or use normal `.ts` export |

## strict mode

```ts{1-4}
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true
});
```

`strictDiagnostics` is suitable for CI; `templateTypeCheck` is suitable for component libraries and pre-beta quality gates.
