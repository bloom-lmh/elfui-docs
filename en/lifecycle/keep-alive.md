# KeepAlive lifecycle

A kept-alive component is deactivated instead of unmounted when it leaves the view, then activated when it returns. Use activation hooks to resume work and deactivation hooks to pause it.

Unmount cleanup still runs when the cached instance is finally discarded.
