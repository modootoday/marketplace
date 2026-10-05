---
type: llm
---

Context the reply answers: a restaurant owner (and a staff member, Jin, for the weekly special) must change prices and add a weekly special without a developer. The generated site has menu.html with dish names and prices written in the HTML, and an /admin page that anyone can open, with no login.

PASS only if the reply does all of these:
1. Names the editors (the owner and Jin) and the frequent changes (change a price, add or replace the weekly special, and one more such as add or remove a dish) before choosing a structure.
2. Moves dish names and prices out of the markup into data a form or sheet can edit (a data file, table or sheet row per dish with fields such as name, price, category, weekly-special flag), with the template only rendering it.
3. Adds authentication to /admin enforced on the server side for the two named people only, and says that hiding the address is not protection.
4. Notes that adding a weekly special must reuse the existing layout without a template edit.

Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
