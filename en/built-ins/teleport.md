# Teleport

`Teleport` renders its children into another DOM target while preserving their logical component ownership. It is useful for overlays, dialogs, notifications, and other UI that must escape local clipping or stacking contexts.

Ensure the target exists before the teleported content is rendered.
