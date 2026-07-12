# Conditions and lists

Conditional rendering adds or removes UI based on a boolean condition. List rendering creates repeated UI from an iterable; give every item a stable key so the renderer can retain the correct DOM and component state.

Avoid using an array index as the key when items can move, be inserted, or be removed.
