---
title: Route View
---
# routing view

`<elf-router-view>` renders the currently matching page component.

```html
<elf-router-view></elf-router-view>
<elf-router-view depth="1"></elf-router-view>
<elf-router-view name="aside"></elf-router-view>
```

`depth` selects the nested routing level, `name` selects the named view. Page props can come from params, static objects, or route-to-props functions; named views can use a props map keyed by the view name.

Default scope slots are available `Component`, `route`, `record`, `props`, `depth` and `name`, suitable for encapsulating page shells, error displays or custom transitions.

Asynchronous page modules are cached across RouterViews and can export components by default or only export an identifiable component. `transition="fade" duration="200"` will append the enter/leave class when replacing the page.
