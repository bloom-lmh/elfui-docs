# Custom plugins

Create a custom plugin when several applications or features share the same application-level integration. Expose a small install function, validate options early, and document any global APIs it adds.

Make the plugin idempotent when repeated installation would otherwise cause duplicate registrations.
