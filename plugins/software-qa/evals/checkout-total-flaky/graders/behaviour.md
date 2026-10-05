---
type: llm
---

Context the reply answers: the regression test checkout_total failed in 3 of 20 pipeline runs. In every failing run the test coupon_expiry ran immediately before it; in the 17 passing runs coupon_expiry ran later or in another job. The failing assertion shows an order total of 0 instead of 12,500 KRW. Nothing else changed and the test has not been rerun alone. The user asks whether this is flaky or a product defect and wants the investigation written up.

PASS only if the reply does all of these:
1. Points out that failures always following coupon_expiry indicate an order dependency or shared state, not random flakiness.
2. Proposes isolating reruns: checkout_total alone repeated many times, and checkout_total after coupon_expiry in both orders or in a fresh environment, with what each result would show.
3. Does not declare the cause as settled: it labels the shared-state explanation a hypothesis until reproduced, and does not simply call the test flaky and suggest rerunning until it passes.
4. Treats the total of 0 as the observed symptom and the expected 12,500 KRW as the required behavior, and does not accept 0 as normal.
5. Gives a note with separate sections for confirmed facts (3 of 20 runs, the preceding test, total 0) and suspected causes, plus a next step.
6. States the observed symptom, the required behavior and the current behavior of the product as three separate statements, and says what run result would confirm each suspected cause.
