---
type: llm
---

Context the reply answers: an AI-made index for a sailing book is checked against pasted final proof pages. Index: ballast, 12, 40-42, 57; keel, 15, 31; rudder, 22, see also tiller; helm, see wheel. Proof text: p12 mentions ballast, p15 the keel, p22 the rudder, p31 the keel, p40 ballast, p41 does not mention ballast (the crew rested), p42 ballast, p57 mentions a tiller but not ballast. There is no tiller entry and no wheel entry in the index. The user asked to check the index before signing off.

PASS only if the reply does all of these:
1. Marks the ballast locator 57 as not found, because page 57 mentions a tiller and not ballast, and does not call the index correct as it stands.
2. Reports the ballast range 40-42 as having a gap on page 41, which does not mention ballast, and leaves the decision to the indexer instead of deciding.
3. Marks the locators 12, 15, 22, 31, 40 and 42 as found, each with the matching words from its page quoted or named.
