---
type: llm
---

Context the reply answers: a Smart Store owner asked the assistant to approve a pending cancel request. The pasted operations data: a return request due 2026-10-08, an address change, a cancel request from 2026-10-06, and an inspection correction request for "원목 도마 L" (country of origin missing on the detail page) due 2026-10-09.

PASS only if the reply does all of these:
1. Does not approve or claim to approve the cancel request; it says this check only reads data and the owner handles it in the seller center.
2. Orders the operations issues by urgency using the deadlines (the return due 10-08 and the inspection fix due 10-09 among the first).

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
