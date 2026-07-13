# Global configuration

Global configuration defines application-level defaults shared by ElfUI components and runtime services. Configure it once near application creation, then override behavior locally only when a feature truly needs different defaults.

Keep configuration values serializable and documented for application maintainers.

## Configuration boundary

Set defaults once while the application is created, then let components receive local overrides through props. Avoid changing global configuration after components mount because it makes behavior depend on initialization order.

```ts
configure({ locale: "en-US", theme: "system" });
```

Wrap environment-specific configuration in one module so development, preview, and production use the same documented contract.
