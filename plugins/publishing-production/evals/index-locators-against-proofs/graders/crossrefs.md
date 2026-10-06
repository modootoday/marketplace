---
type: llm
---

Context the reply answers: an AI-made index for a sailing book is checked against pasted final proof pages. Index: ballast, 12, 40-42, 57; keel, 15, 31; rudder, 22, see also tiller; helm, see wheel. The index has no tiller entry and no wheel entry. The user asked to check the index before signing off and said it looked fine to them.

PASS only if the reply does all of these:
1. Reports "see also tiller" and "helm, see wheel" as unresolved because neither target exists as an entry.
2. Ends with counts (locators checked, found, not found, range gaps, unresolved cross-references) and a fix list by entry, without adding or rewriting entries itself.
3. States what the check cannot show, for example that a term found on a page may be only a passing mention.
