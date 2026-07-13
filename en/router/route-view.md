---
title: Route View
---

# Route view

`<elf-router-view>` renders the component selected by the active route. It supports default and named views, nested depths, props, scoped slots, and built-in page transition classes.

## Default and nested outlets

The root application normally contains the default view at depth `0`:

```html
<elf-router-view></elf-router-view>
```

For a nested route, place an outlet in the parent page. Set `depth="1"` explicitly when the layout itself is not rendered by the root outlet:

```html
<!-- settings-layout -->
<nav>...</nav>
<elf-router-view depth="1"></elf-router-view>
```

## Named views

A record with `components` can fill multiple outlets. The unnamed outlet reads `default`; an outlet with `name="aside"` reads `aside`.

```ts
{
  path: "/reports",
  components: {
    default: () => import("../pages/report-page"),
    aside: () => import("../pages/report-aside")
  }
}
```

```html
<main><elf-router-view></elf-router-view></main>
<aside><elf-router-view name="aside"></elf-router-view></aside>
```

## Inspect the rendered route with a slot

The default scoped slot receives `Component` (also available as `component`), `route`, `record`, `props`, `depth`, and `name`. This is useful when a shell needs to render a loading/error boundary or choose its own element wrapper.

```html
<elf-router-view>
  <template #default="{ Component, route, props }">
    <section class="page" :data-route=${route.name}>
      <Component ...${props}></Component>
    </section>
  </template>
</elf-router-view>
```

Use normal route `props` configuration to supply page properties; the same props are exposed in the slot. For named views, use a props map keyed by the view name.

## Page transitions

Set `transition` and an optional duration on the outlet. On replacement, the router adds enter/leave classes using the transition name.

```html
<elf-router-view transition="fade" duration="200"></elf-router-view>
```

```css
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
```

Lazy route modules are cached across route views. They may default-export a page component or export exactly one identifiable component.
