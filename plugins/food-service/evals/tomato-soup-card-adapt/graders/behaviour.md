---
type: llm
---

Context the reply answers: the user pasted a tomato soup recipe for 4 with 8 ingredient lines (2 tbsp butter, 1 yellow onion diced, 3 garlic cloves, 1 can 800 g whole peeled tomatoes, 500 ml vegetable stock, 120 ml heavy cream, 1 tsp sugar, 1 tsp salt) and steps: melt butter at medium heat, onion 8 minutes, garlic 1 minute, add tomatoes and stock, simmer 25 minutes, blend, stir in cream, sugar and salt. The user wants a card of this exact recipe and then an adaptation without heavy cream and for a slow cooker. The pasted text gives no pepper, herbs, oil or oven times. A separate note listing what the source leaves unstated is allowed and is not an added ingredient or step; an ingredient or step placed inside the base card that the source lacks is. The adapted version may differ from the source only through rows or steps that are marked as adaptations for the two requested changes.

PASS only if the reply does all of these:
1. Gives a base card that keeps all the listed ingredients with the stated quantities and the 8 minute, 1 minute and 25 minute steps unchanged.
2. Adds no ingredient, spice or step to the base card (no pepper, basil, olive oil, or similar) and keeps the base card separate from the adapted version.
3. Lists the cream replacement as its own marked change with the original (120 ml heavy cream), the new item, the function the cream served (richness, body) and how the result will differ.
4. Gives the slow cooker version with a setting and time, says whether to cook the onion and garlic first, and says when the dairy or dairy substitute goes in (at the end).
5. Labels numbers from the source separately from estimated numbers, and says the adapted version is untested or needs a test batch or doneness check.
