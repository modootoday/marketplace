---
type: llm
---

Context the reply answers:

Compare synthetic attendee lists under trim-only, case-sensitive normalization. Old:'Lee, Ana','Ana Lee','Kai',' Kai '. New:'Ana Lee','LEE, Ana','Kai','Jo'. Owner has not approved name-order or case equivalence; comma separators may be name content. Preserve originals, list all normalization changes/duplicates and exact bidirectional set differences/counts. Identify suspected aliases separately for owner decision rather than auto-merging them or claiming distinct human identities.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Trims only ' Kai '→'Kai', keeps Lee,Ana versus Ana Lee versus LEE,Ana as distinct strings under the supplied policy.
2. Old4rows/3unique, Kai duplicate; new4rows/4unique; commonAna Lee/Kai, old-onlyLee, Ana, new-onlyLEE, Ana/Jo.
3. Reconciles unique totals and lists changes/duplicates, preserving raw inputs.
4. Flags possible name-order/case aliases as unresolved for owner approval, not merged or asserted different people.

Return only PASS or FAIL.
