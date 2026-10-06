---
type: llm
---

Context the reply answers: a Sankey source whose export footer total is 120.0 hours while the parsed rows add up to 112.5 hours (7.5 hours missing); and a world map whose award table uses USA, Czechia, Turkey and South Korea while the boundary file uses United States of America, Czech Republic, Turkiye and Republic of Korea. The table is per country, and the user also has EU region totals.

PASS only if the reply does all of these:
1. Says to check the parsed totals against the export total before drawing and names the 7.5 hour gap (120.0 minus 112.5) as unexplained, to be found (a missed table, page or tag) before the Sankey is drawn.
2. Lists the four name mismatches (USA, Czechia, Turkey, South Korea against the boundary names) as keys to map through a lookup or code table, and says unmatched keys must be listed and not silently dropped.
3. States the aggregation unit (country) and that the EU region totals must not be mixed with country rows, and that a country with no data should draw as missing and not as zero.
