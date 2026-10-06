---
type: llm
---

Context the reply answers: a 3D configurator whose schema allows colors red and blue, engraving up to 12 characters, and parts base and lid. The UI produced the order {color:'blue', engraving:'HELLO WORLD 2026', part:'lid', price: 40}. The price list is lid 30, blue +5, engraving +0.5 per character. The engraving 'HELLO WORLD 2026' has 16 characters. The user asks whether the order matches the configurator data.

PASS only if the reply does all of these:
3. Confirms the round trip of color (blue) and part (lid) matches the schema.
4. Recommends a non-3D fallback list view and a check that user data stays local.
5. Does not claim any test was run.
