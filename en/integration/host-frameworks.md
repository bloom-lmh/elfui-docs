---
title: Host Frameworks
---

# Using ElfUI from host frameworks

An ElfUI component is a standard Custom Element. Native DOM, React, Vue, Svelte, Angular, or another host should integrate through properties, attributes, `CustomEvent`, slots, CSS custom properties, `::part()`, focus methods, and native form behavior rather than an ElfUI-specific renderer adapter.

## Shared host contract

| Concern                | Contract                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------ |
| Primitive attributes   | Strings are converted according to declared prop options.                            |
| Object/array/function  | Assign as properties; ElfUI preserves the host-owned reference identity.             |
| Updates                | Replacing a declared property is reactive without replacing the Custom Element node. |
| Events                 | Listen to standard `CustomEvent`; `detail` carries payload data.                     |
| Shadow DOM propagation | Enable `bubbles` / `composed` only for events intended to cross the boundary.        |
| Children               | Pass light-DOM children through default or named `slot` attributes.                  |
| Styling                | Use CSS custom properties and exported `::part()` names.                             |
| Focus and methods      | Call methods exposed with `defineExpose()` on the element instance.                  |
| Forms                  | Form-associated components participate through native Custom Element internals.      |
| Teardown               | Removing the host releases component-owned effects and external resources.           |

Property accessors for declared props exist immediately after construction, before connection. This lets hosts choose property assignment and preserves object, array, and function identity. For a universal fallback, assign values directly after obtaining the DOM node:

```ts
const element = document.querySelector("elf-data-grid")!;
element.rows = rows;
element.formatter = formatter;
element.addEventListener("row-select", (event) => {
  const row = (event as CustomEvent<Row>).detail;
});
```

Host template syntax differs, but the underlying contract does not. When a host has special rules for unknown custom events, `addEventListener()` is always the platform-level escape hatch.

## Registration and multiple applications

Custom Element registration is page-global even when application config, plugins, directives, and dependency injection are isolated per ElfUI App. Give application and library components stable unique tag prefixes. Registering the same constructor twice is idempotent; registering a different constructor under an occupied tag throws `ELF_CUSTOM_ELEMENT_CONFLICT`.

If the host owns startup order, define components with `register: false` and call `registerComponents()` from the client entry. Avoid allowing two bundled ElfUI runtime copies to define different implementations under the same tag.

## SSR hosts

ElfUI packages and compiled component modules are safe to import without browser globals. A server gets a metadata-only placeholder constructor. DOM creation, explicit registration, and `createApp().mount()` remain client-only.

ElfUI currently supports a server-rendered Custom Element host shell, not server rendering of component Shadow DOM or hydration of component internals. SSR frameworks should treat ElfUI components as client-only islands and ensure the component module evaluates again in the browser.

## Tested compatibility baseline

The release gate currently runs the same property/update/remount, attribute/event, slot/style/focus/form, and keyed-list/resource-cleanup contracts against native DOM, React 19.2.7, Vue 3.5.40, Svelte 5.56.6, and Angular 22.0.7 in a real browser. It also validates multiple isolated Apps and multiple runtime copies.

This is a tested baseline rather than a promise that every host release or wrapper library is compatible. Keep a small host-owned integration test when upgrading either ElfUI or the host framework.
