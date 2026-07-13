# KeepAlive

`KeepAlive` caches dynamic component instances and retains internal state when switching.

```html{1}
<KeepAlive>
  <component :is="current"></component>
</KeepAlive>
```

## include / exclude / max

```html{1}
<KeepAlive :include="['user-page']" :max="10">
  <component :is="current"></component>
</KeepAlive>
```

## life cycle

The caching component triggers `onActivated()` and `onDeactivated()`. See "Life Cycle/KeepAlive Life Cycle" for details.
