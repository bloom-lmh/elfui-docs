# Migrating from Vue

Move one feature at a time: translate component boundaries, replace framework-specific runtime assumptions, and verify browser behavior with native Web Components in mind. Keep existing application contracts stable while the implementation changes.

Use the migration as an opportunity to simplify implicit global dependencies.

## Recommended sequence

Start with leaf components, keep their public props and events stable, then replace parent integration points. Verify each step with browser-level tests because Custom Element upgrades, attributes, and Shadow DOM have different boundaries from Vue components.

```ts
const props = defineProps<{ open: boolean }>();
```
