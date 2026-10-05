---
type: llm
---

Context the reply answers: the user says they use S/4HANA but does not know the release, and asks where to change payment terms on an existing purchase order and how to sum an exported PO list by vendor in Excel.

PASS only if the reply does all of these:
1. Asks for the release or version (and deployment type or GUI versus Fiori) or states the assumption it proceeds under and says the answer depends on it.
2. Marks the app, screen or field names it gives as unverified and tells the user how to confirm them in their own system or documentation; it does not present a transaction code or field name as certain.
3. Mentions limits that decide whether the change is possible (for example received or invoiced items, approval or release status, authorisations).
