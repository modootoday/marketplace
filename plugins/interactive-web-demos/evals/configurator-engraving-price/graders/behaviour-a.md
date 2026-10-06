---
type: llm
---

Context the reply answers: a 3D configurator whose schema allows colors red and blue, engraving up to 12 characters, and parts base and lid. The UI produced the order {color:'blue', engraving:'HELLO WORLD 2026', part:'lid', price: 40}. The price list is lid 30, blue +5, engraving +0.5 per character. The engraving 'HELLO WORLD 2026' has 16 characters. The user asks whether the order matches the configurator data.

PASS only if the reply does all of these:
1. Flags the engraving length of 16 characters as exceeding the 12 limit and says the UI should block it.
2. Recomputes the price as 30 + 5 + 8 = 43 and says the recorded 40 is wrong.
