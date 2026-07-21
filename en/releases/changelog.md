---
title: Changelog
---

# Changelog

This page records user-visible changes in the synchronized ElfUI framework package group:
`@elfui/shared`, `@elfui/reactivity`, `@elfui/runtime`, `@elfui/compiler-template`, `@elfui/compiler`,
`@elfui/core`, and `@elfui/vite-plugin`.

ElfUI is still in beta. Keep `@elfui/core` and `@elfui/vite-plugin` on the same exact version. When a
release changes the compiler/runtime protocol, mixed versions are unsupported.

## v0.1.0-beta.6 — 2026-07-21

### Unified application entry

- `@elfui/core` is now the only direct runtime dependency for normal applications and component
  libraries.
- Stable runtime, reactivity, lifecycle, model, directive, plug-in, and built-in rendering APIs are
  available from Core.
- Compiler-generated helpers now use `@elfui/core/internal`. This subpath is a compiler protocol and
  must not be imported by application code.
- `@elfui/runtime`, `@elfui/reactivity`, and `@elfui/shared` remain independently published for
  low-level or standalone use, but normal applications do not declare them directly.

```bash
pnpm add @elfui/core@0.1.0-beta.6
pnpm add -D @elfui/vite-plugin@0.1.0-beta.6
```

### Public API and type corrections

- `directive()` and lifecycle APIs including `onMounted()` and `onUnmounted()` are exported by
  `@elfui/core`.
- Writable ref, computed, and model `set()` methods return `void`, so they can be used naturally in
  callbacks declared as returning `void`.
- `defineEmits<Interface>()` accepts finite event interfaces as well as readonly event-name arrays.
- `defineExpose<Interface>()` accepts ordinary finite-key interfaces without requiring a string index
  signature.
- Directive generics, primitive prop constructors, model values, and strict optional properties have
  more accurate inference.
- The runtime `useModel()` composable is no longer mistaken for a removed compiler macro alias.

### Compiler and integration stability

- Generated helpers and the public Core entry now share a versioned internal boundary.
- Template references, event contracts, list/control-flow values, and source diagnostics received
  stricter regression coverage.
- The release gate covers external canvas/SVG/WebGL tools, Floating UI-style overlays, observers,
  Worker/WASM resources, repeated mount/unmount cleanup, and multiple runtime copies.
- Native Custom Elements and React, Vue, Svelte, and Angular host integration contracts are exercised
  in a real browser.

### Upgrade notes

Upgrade Core and the Vite plug-in together, reinstall dependencies, and clear Vite's dependency cache:

```bash
pnpm up @elfui/core@0.1.0-beta.6 @elfui/vite-plugin@0.1.0-beta.6
pnpm install
```

Delete `node_modules/.vite` or restart Vite if an old prebundle remains. These messages usually mean the
project is mixing pre-beta.6 packages with beta.6 source:

- `does not provide an export named 'directive'`
- `Found ElfUI component pragma, but no import from "elfui"`

After both packages are on beta.6, macro components should import from `@elfui/core`; do not change them
back to the legacy `elfui` specifier to silence the old plug-in.

## v0.1.0-beta.5 — 2026-07-21

- Stabilized generated template integration and compiler/runtime code-generation parity.
- Improved template-ref portability and nested runtime-value unwrapping.
- Added regression coverage for generated macro components and development source metadata.

## v0.1.0-beta.4 — 2026-07-17

- Hardened mounted/unmounted lifecycle behavior and external-resource cleanup.
- Added browser integration matrices for external tools, React, Vue, Svelte, Angular, native Custom
  Elements, and multiple runtime copies.
- Expanded DevTools metadata for component trees, reactive effects, template bindings, model/control
  flow, and source locations.
- Added SSR, development-boundary, generated-code, size, package-artifact, and browser release gates.
- Improved prop inference, array effect tracking, event contracts, interpolation parsing, host
  properties, directives, and observer target handling.

## v0.1.0-beta.3 — 2026-07-14

- Corrected prerelease publishing so workspace dependencies resolve to published packages safely.
- Added dependency scanning and CodeQL automation.
- Refined README links and project branding assets.

## v0.1.0-beta.2 — 2026-07-12

- Established `@elfui/core` as the macro component package name.
- Completed public package metadata, package README files, exports, and publish-artifact validation.
- Changed releases to version-tag-triggered trusted publishing and fixed CI workspace linking and
  compiler global handling.

## v0.1.0-beta.1 — 2026-07-12

- Published the first public beta package group.
- Established the initial compiler-first macro component, reactivity, Custom Element runtime, and Vite
  plug-in baseline.

This historical entry is intentionally concise because it predates the tagged release-note workflow.
Starting with beta.6, every release should add its user-visible changes and migration requirements here
before publishing.
