# Error handling overview

Handle errors at the boundary where they can be explained and recovered from. Use local handling for expected failures and application-level reporting for unexpected failures.

Error boundaries provide a safe fallback when rendering a component subtree fails.

## Recovery flow

Classify an error before deciding how to present it. Validation and network failures normally have an inline recovery path; unknown rendering failures should be captured, reported, and replaced with a stable fallback.

```ts
reportError(error, { feature: "checkout", recoverable: false });
```

Include the route, feature, and release version in reports, but never include credentials or private user data.
