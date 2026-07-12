# KeepAlive

`KeepAlive` caches component instances that are switched out of the view. Use it for expensive or stateful views that should resume where the user left them.

Choose cache boundaries carefully: caching every view can retain more memory than intended.
