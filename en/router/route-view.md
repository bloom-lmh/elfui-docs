---
title: Route View
---

# Route View

`<elf-router-view>` renders the matched page component.

```html
<elf-router-view></elf-router-view>
```

Use `depth` for nested routes and `name` for a named view.

```html
<elf-router-view depth="1"></elf-router-view>
<elf-router-view name="aside"></elf-router-view>
```

Route props can come from params, a static object, or a route-to-props function. For named views, pass a props map keyed by view name.

The default scoped slot receives `Component`, `route`, `record`, `props`, `depth`, and `name`. Use it to implement a custom page shell or error presentation.

Lazy page modules are cached across RouterViews. They can default-export a page component or export exactly one recognizable component. `transition="fade" duration="200"` adds enter and leave classes when the rendered page changes.
