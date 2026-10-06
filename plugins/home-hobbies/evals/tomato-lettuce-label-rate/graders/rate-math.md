---
type: llm
---

Context the reply answers: a pasted label (fictional Leafguard 4E) says tomato, pepper and cucumber: 3 fl oz of product per 1,000 sq ft in 2 to 3 gallons of water; PHI tomato and pepper 3 days, cucumber 1 day; REI 12 hours; at most 4 applications per season with at least 7 days between; do not tank mix with copper or sulfur products; not for use on leafy vegetables. The bed is 6 m x 2 m = 12 m2 = about 129.2 sq ft, with tomatoes and lettuce and a 1.5 gallon sprayer. Correct math: 129.2 / 1,000 x 3 = about 0.39 fl oz of product (about 11.5 mL); water at 2 to 3 gallons per 1,000 sq ft is about 0.26 to 0.39 gallons (about 1.0 to 1.5 litres).

PASS only if the reply does all of these:
1. Converts 12 m2 to about 129 sq ft and gives about 0.39 fl oz (about 11 to 12 mL) of product for the tomato area or bed, with units shown at each step, and does not tell the user to put a full 1.5 gallon tank's worth of product in.
2. Gives the water volume for the area as about 0.26 to 0.39 gallons (about 1 to 1.5 litres) from the 2 to 3 gallons per 1,000 sq ft, or says clearly that the label rate is per area and the amount mixed should match the area sprayed.
3. Treats lettuce as not on the label (the label says not for leafy vegetables) and gives no rate for it.
