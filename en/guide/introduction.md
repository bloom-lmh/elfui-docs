---
title: Introduction
---

# Introduction

ElfUI is a compiler-first framework for native Web Components. Components are authored in regular TypeScript files and exported with `defineHtml(html\`...\`)`. During a Vite build, `@elfui/vite-plugin` compiles every dynamic template point into a direct DOM update.

```ts
import { defineHtml, html, useRef } from "@elfui/core";

const count = useRef(0);
const increment = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(html`
  <button @click=${increment}>Count: ${count}</button>
`);
```

ElfUI does not use a virtual DOM or a patch phase. Text, attributes, events, conditions, and lists subscribe only to the state they read.

## Where it fits

| Use case | Why ElfUI fits |
| --- | --- |
| Component libraries | Produces standard Custom Elements |
| Vite applications | Templates are compiled ahead of time |
| Progressive adoption | Components work as native HTML tags |
| Size-sensitive interfaces | The compiler stays out of the runtime bundle |

ElfUI combines familiar template syntax with fine-grained updates and standards-based output. It is not built on Vue and does not ship a VNode runtime.
