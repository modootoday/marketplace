---
type: llm
---

Context the reply answers: a recipe serves 8 and uses 1 kg onion (weight after peeling and trimming, edible portion) and 200 g butter. Trim loss is 12% of the onion as bought. Onions cost 1,800 KRW/kg. Butter is 450 g blocks at 5,400 KRW each, bought whole. Target 120 portions, so the scale factor is 15. Correct figures: onion edible 15 kg; as purchased 15 / 0.88 = 17.05 kg (not 15 x 1.12 = 16.8 kg); onion cost about 30,682 KRW (17.05 x 1,800). Butter 3,000 g = 3 kg = 6.67 blocks, so 7 whole blocks, 37,800 KRW (usage cost 36,000 KRW at 12 KRW per g). Total about 68,482 KRW with whole blocks (66,682 on usage), about 571 KRW per portion with whole blocks (about 556 on usage).

PASS only if the reply does all of these:
1. States the scale factor 15 and applies the 12% loss by dividing (as purchased about 17.05 kg of onion), not by multiplying 15 kg by 1.12.
2. Shows the unit conversions explicitly (g to kg for the butter, 3,000 g to blocks of 450 g) and rounds the butter up to 7 whole blocks.
3. Gives the onion cost of about 30,700 KRW and the butter cost of 37,800 KRW (or 36,000 on usage, labelled as such), and a cost per portion of about 570 KRW (or about 556 on usage, labelled).
