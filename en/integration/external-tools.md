---
title: External Tools
---

# Integrating external tools

ElfUI does not need a framework-specific adapter for every chart, editor, renderer, overlay, observer, Worker, or WASM package. Treat the tool as an owner of an external resource and bind that ownership to the component lifecycle.

## The basic contract

1. Create template refs during setup.
2. Initialize the tool in `onMounted`, when final DOM and refs are ready.
3. Send reactive data changes through the tool's update API.
4. Stop observers, listeners, timers, workers, portals, and tool instances during unmount.
5. Invalidate asynchronous work so a stale completion cannot write into a detached component.

```ts
import {
  defineHtml,
  onMounted,
  useTemplateRef,
} from "@elfui/core";

const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

onMounted(async () => {
  const { createRenderer } = await import("some-dom-tool");

  if (!canvas.value?.isConnected) return;
  const instance = createRenderer(canvas.value);
  return () => instance.destroy();
});

export default defineHtml(`<canvas ref="canvas"></canvas>`);
```

The package name above is illustrative; ElfUI does not bundle it.

## Size and visibility tracking

Observer composables accept an element, a ref, or a reactive getter. Pass the ref itself so observation starts after mount and follows target replacement:

```ts
const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

useResizeObserver(canvas, ({ width, height }) => {
  renderer?.resize(width, height);
});

useIntersectionObserver(canvas, ({ isIntersecting }) => {
  isIntersecting ? renderer?.resume() : renderer?.pause();
});
```

Both helpers disconnect with the owning component and ignore callbacks from an old target. They safely remain inactive when the browser does not provide the corresponding Observer API.

## Ownership rules

| Resource                        | Create                        | Release                                           |
| ------------------------------- | ----------------------------- | ------------------------------------------------- |
| Chart/editor/renderer instance  | `onMounted`                   | Return tool-specific `destroy()` cleanup           |
| Global DOM listener             | `useEventListener` or mounted | Automatic helper cleanup or `removeEventListener` |
| Resize/intersection observer    | Observer composable           | Automatic                                         |
| Portal/overlay root             | `onMounted`                   | Remove listeners and the empty portal node        |
| Worker                          | `onMounted` or owned effect   | Ignore stale messages, then `terminate()`         |
| Timer/animation frame           | Mounted or owned effect       | `clearTimeout` / `cancelAnimationFrame`           |
| Async import/request/WASM setup | Mounted generation/token      | Invalidate or abort before teardown               |

A synchronous same-turn DOM move preserves the component instance. A real detach releases its resources; reconnecting later creates a fresh instance and runs `onMounted` again. If an asynchronous mounted hook resolves after unmount, ElfUI immediately runs its returned cleanup. KeepAlive deactivation is not the same as unmount: pause expensive work in `onDeactivated`, resume it in `onActivated`, and perform final destruction through mounted cleanup or `onUnmounted`.

## What the release gate covers

ElfUI's integration suite runs real Chromium scenarios for DOM ownership, Canvas charts, SVG/WebGL, Shadow DOM overlays and portals, native observers and global listeners, Worker/WASM cancellation, asynchronous races, branch and keyed-list disposal, KeepAlive eviction, application unmount, and 100 repeated mount/unmount cycles. These packages are test-only development dependencies and do not enter published ElfUI packages.

The suite proves framework lifecycle and platform boundaries. Applications should still test the exact versions and configuration of their chosen external tools.
