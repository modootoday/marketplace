---
type: llm
---

Context the reply answers:

Compare two theme codings for six anonymized synthetic responses. R1/R2 ask faster search; R3 asks preserved search filters; R4/R5 ask clearer billing; R6 says 'fine'. Human coding:Search R1,R2,R3;Billing R4,R5;Unclear R6. AI coding:Speed R1,R2;Filter R3;Billing R4,R5;General praise R6. Use only these snippets, quote supporting IDs, show split/mapping and exact count reconciliation, explain whether R6's specificity supports a substantive product theme, and suggest review without declaring either method best or manufacturing unseen text.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Reconciles humanSearch3 with AI speed2+filter1, billing2both, R6one, all6IDsaccounted.
2. Traces themes to supplied ID content/quotes and distinguishes granularity splits from disagreement in membership.
3. Treats fine as vague/non-actionable or uncertain rather than invented detailed praise, requests review for its label.
4. Does not pronounce human/AI generally superior, invent hidden responses or confuse theme assignments with extra participants.

Return only PASS or FAIL.
