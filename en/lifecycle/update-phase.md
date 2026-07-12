# Update phase

Component updates follow reactive state changes. Use an update hook only when integrating with code that must observe the committed DOM; do not use it to calculate values that can be computed from state.

Avoid changing the same state unconditionally from an update hook.
