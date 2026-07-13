# Error handling overview

ElfUI's error handling is divided into four layers:

| Hierarchy | API |
| -------- | ----------------------------------------------------- |
| Component Capture | `onErrorCaptured` |
| Error Boundary | `errorBoundary` / `captureError` |
| Global processing | `createApp(App).config.{ errorHandler, warnHandler }` |
| Compilation Diagnostics | Vite Plug-in and Macro Compiler Diagnostics |

Business components prioritize locally handling recoverable errors. The global handler is suitable for log reporting and in-depth reminders.
