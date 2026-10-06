---
type: llm
---

Context the reply answers: the user pasted an invented wireframe for a Login screen (logo, email box, password box, blue submit button, forgot password text link, birthday date picker), the design system components (Button primary and secondary, TextField text and email, Card, Tabs), tokens (color.primary, color.surface, space.2 = 8px, space.4 = 16px, type.body = 16px), wireframe values (blue submit, 16 px gaps, 13 px labels) and a journey (open app, log in, see home). There is no password TextField variant, text-link component or date picker in the list, and no 13 px type token.

PASS only if the reply does all of these:
1. Keeps the system tokens: blue to color.primary and 16 px gaps to space.4, and flags the 13 px label as having no token rather than writing a raw value as if it were a token.
2. Notes journey gaps such as missing error or loading states and says what was not verified because only pasted lists were seen.
