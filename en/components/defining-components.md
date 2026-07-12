---
title: Defining Components
---

# Defining Components

A macro component normally contains imports, top-level setup logic, and one exported component.

```ts
import { defineHtml, html, useRef } from "@elfui/core";

const active = useRef(false);
const toggle = (): void => active.set(!active.peek());

export const TogglePanel = defineHtml(html`
  <button @click=${toggle}>Toggle</button>
  <section v-show=${active}><slot></slot></section>
`);
```

Named exports infer a tag from their name: `UserCard` becomes `elf-user-card`. Configure a project-wide prefix through the Vite plugin. Component-level behavior such as Shadow DOM, form association, and automatic registration belongs in `defineOptions()`.
