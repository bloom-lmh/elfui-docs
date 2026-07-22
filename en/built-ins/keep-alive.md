# KeepAlive

`KeepAlive` caches dynamic component instances and retains internal state when switching.

```html
<KeepAlive>
  <component :is="current"></component>
</KeepAlive>
```

## include / exclude / max

```html
<KeepAlive :include="['user-page']" :max="10">
  <component :is="current"></component>
</KeepAlive>
```

## life cycle

The caching component triggers `onActivated()` and `onDeactivated()`. See "Life Cycle/KeepAlive Life Cycle" for details.
