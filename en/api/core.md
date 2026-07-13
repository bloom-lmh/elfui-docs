---
title: "@elfui/core API"
---

# @elfui/core API

`@elfui/core` is the recommended application entry point.

## Macro components

`defineHtml`, `html`, `css`, `defineProps`, `defineEmits`, `defineModel`, `defineSlots`, `defineStyle`, `defineOptions`, `defineDirective`, `defineName`, `useComponents`

## Reactivity

`useRef`, `useReactive`, `useShallowRef`, `useShallowReactive`, `useComputed`, `computed`, `useEffect`, `watch`, `watchEffect`, `watchPostEffect`, `watchSyncEffect`, `onWatcherCleanup`, `nextTick`

## Application and runtime

`createApp`, `registerComponents`, `defineComponent`, `defineCustomElement`, `ensureCustomElement`

## Lifecycle

`onBeforeMount`, `onMount`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmount`, `onActivated`, `onDeactivated`, `onAttributeChanged`, `onErrorCaptured`

Chain builder APIs live in `@elfui/chain`, not in the main entry.

## Import policy

Import application APIs from this package so the compiler and editor tooling can recognize them consistently. The API reference lists exports; guide pages explain the component patterns in which to use them.

```ts
import { defineHtml, defineProps, html, useRef } from "@elfui/core";
```
