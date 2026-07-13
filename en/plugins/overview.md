# Plugins overview

Plugins extend an ElfUI application with capabilities that should be installed once, such as global services, directives, or configuration. A plugin should have a clear installation contract and avoid surprising global side effects.

Install plugins near application creation so their order is explicit.

## Plugin responsibilities

A plugin may register components, directives, or a configured service. It should not silently mutate unrelated global state, and it should document the order in which it must be installed.

```ts
app.use(createAnalyticsPlugin({ endpoint, enabled: isProduction }));
```

Expose feature-level behavior as a composable instead when it does not need application-wide installation.
