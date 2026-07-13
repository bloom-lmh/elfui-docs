# Router quick start

Install the router package, create a router with your route records, and mount its view component in the application shell. Use route links for in-app navigation so navigation state remains in sync with the URL.

Start with a small route table and add nested routes as the application grows.

## Minimal route table

```ts
const router = createRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/settings", component: SettingsPage }
  ]
});
```

Use route metadata for page titles and access policies. Keep data loading close to the route component unless a guard must decide whether navigation is allowed.
