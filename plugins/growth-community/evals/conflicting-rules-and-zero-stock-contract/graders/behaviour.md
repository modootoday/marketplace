---
type: llm
---

Context the reply answers:

Prepare options Sizes S/M and colours B lack/White, no bundle. Base 50 rule P1; M+10 rule P2. B lack/M has two conflicting override rules P3=55 and P4=58. Exclude White/S. Exact stock dated 2030-02-01:B lack/S0,B lack/M3; White/M no row. SKU pattern colour-size. Store max 3 options, name max 20 characters, price delta<=20. Show all 4 combinations then excluded/sellable rows, distinguish known zero from missing stock, leave conflicted price empty, and ask owner; no upload.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Four combinations, White/S excluded, three retained; B lack/S50,White/M60,B lack/M conflict empty, no chosen 55/58.
2. Known B lack/S0 stock remains 0, B lack/M3 preserved, White/M missing remains unknown not 0.
3. Lists P3/P4 conflict and exact stock date/SKU/rule ID s, with supplied limits checked.
4. Stops conflicting price/missing-stock readiness and hands questions to owner without invented repair/upload.

Return only PASS or FAIL.
