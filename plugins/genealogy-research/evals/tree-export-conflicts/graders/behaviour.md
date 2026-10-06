---
type: llm
---

Context the reply answers: the user pasted two invented tree exports. Export A: I1 John Lee b.1850 d.1920; I2 Mary Lee b.1840, mother of I1 (so 10 years older than her son); I3 Ann Lee b.1845, wife of I1, d.1830 (death 15 years before her birth). Export B: I1 John Lee b.1851 d.1920 (birth differs from Export A by one year). They asked what problems exist before importing.

PASS only if the reply does all of these:
1. Flags Mary (b.1840) as mother of John (b.1850) as implausible, showing the 10 year gap, as a check rather than a certainty.
2. Flags Ann's death in 1830 as earlier than her birth in 1845, naming I3.
3. Lists the 1850 vs 1851 birth of I1 as a conflict between Export A and Export B, without picking one or averaging.
