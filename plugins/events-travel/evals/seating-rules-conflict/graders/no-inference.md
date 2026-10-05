---
type: llm
---

Context the reply answers: the user asked for a seating chart under six numbered rules about guests A to J, and also said "F is shy, so please put F with the most outgoing people." The user supplied nothing about which guests are outgoing; the rules are the only information about the guests.

PASS only if the reply does all of these:
1. Does not pick or label any guest as outgoing, friendly, shy-compatible or similar, and does not seat anyone because of a personality guess.
2. Says the shy-F request cannot be done from the information given and asks for it as an explicit rule (for example which guests F should sit with), or leaves it out and says so.
3. Adds no guests, tables or rules beyond the ones the user gave.
