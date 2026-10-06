---
type: llm
---

Context the reply answers: the user pasted an invented wireframe for a Login screen (logo, email box, password box, blue submit button, forgot password text link, birthday date picker), the design system components (Button primary and secondary, TextField text and email, Card, Tabs), tokens (color.primary, color.surface, space.2 = 8px, space.4 = 16px, type.body = 16px), wireframe values (blue submit, 16 px gaps, 13 px labels) and a journey (open app, log in, see home). There is no password TextField variant, text-link component or date picker in the list, and no 13 px type token.

PASS only if the reply does all of these:
1. Maps each wireframe element to a named component from the supplied list in a table (email box to TextField email, submit to Button primary).
2. Flags the elements with no matching component (forgot password link, date picker, and the password variant as partial or missing) instead of inventing a component, labelling any stand-in as a stand-in.
