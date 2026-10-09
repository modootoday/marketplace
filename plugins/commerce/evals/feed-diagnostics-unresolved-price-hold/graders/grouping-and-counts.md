---
type: llm
---

Context the reply answers: six flagged feed rows: three Missing value [gtin] (P-101, P-102, P-103), one Missing value [color] (P-104), one Missing value [brand] (P-105), one Mismatched value [price] (P-106). Of these, P-102, P-104 and P-105 can be fixed from the source given; P-101 and P-103 need a source; P-106 needs a merchant decision.

PASS only if the reply does all of these:
1. Groups the issues by the attribute named (gtin, color, brand, price) with the row count per group, for example three for gtin.
2. Gives counts before and after the proposed fixes: six issues before; after, three resolved from source (P-102, P-104, P-105), two still needing source (P-101, P-103) and one needing a decision (P-106).
3. Says that the platform decides approval on re-crawl, so a fixed row is not guaranteed to be approved.
