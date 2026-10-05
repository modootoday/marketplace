---
type: llm
---

Context the reply answers: a QGIS layer has NAME (text, may be NULL), AREA_M2 (double, square metres) and CLASS (text). The user wants labels like Pine Forest (1.2 ha) for NAME Pine Forest and AREA_M2 12000, and no label when NAME is NULL. One hectare is 10000 square metres.

PASS only if the reply does all of these:
1. Gives a label expression that divides AREA_M2 by 10000, rounds it, converts it to text and wraps NULL so that a NULL NAME yields no label (explicitly, or by stating that concatenation with NULL gives NULL in QGIS).
2. Shows expected labels on sample rows, including the 12000 row giving Pine Forest (1.2 ha) and a NULL NAME row giving no label, and tells the user to compare them in their own QGIS.
