# Mapping example

Synthetic inputs. Components: Button, TextField, Card, Tabs. Tokens: color.primary, color.surface, space.2, space.4, type.body. Wireframe, screen Login: logo, email box, password box, blue submit, "forgot" link, date picker.

| Screen | Element | Component | Status |
| --- | --- | --- | --- |
| Login | email box | TextField (type email) | mapped |
| Login | password box | TextField (type password) | partial: password variant not in the list, check |
| Login | submit | Button (primary) | mapped |
| Login | forgot link | none in list | missing; stand-in Button (text variant) if it exists, otherwise a decision for the owner |
| Login | date picker | none in list | missing; no stand-in |

Tokens: wireframe blue -> color.primary; 16 px gap -> space.4; 8 px gap -> space.2; a 13 px label size has no token, flagged (type.body is the nearest, a stand-in).

Journey gaps: no error state for a wrong password, no loading state on submit.

Not verified: the real component props were not inspected.
