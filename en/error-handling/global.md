# Global error handling

Global error handling is the last line of defense for uncaught application errors. Use it to report diagnostic details, show a safe user-facing message, and preserve enough context for investigation.

Do not expose internal stack traces or sensitive values in production UI.
