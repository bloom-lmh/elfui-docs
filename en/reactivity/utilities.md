# Reactivity utilities

Reactivity utilities help adapt values at API boundaries, derive readonly views, and work with individual properties while preserving reactive connections. Use them when a composable must accept either a value or a reactive source.

Avoid unwrapping reactive state too early, because doing so loses its connection to updates.
