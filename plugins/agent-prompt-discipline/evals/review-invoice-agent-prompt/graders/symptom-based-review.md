---
type: llm
---

PASS only if the review makes at least three of these four points:
1. Editing "line 3" by position is fragile (items shift after inserts or deletes); line items
   should be addressed by a stable id the tools return.
2. generate_pdf should need the user's explicit request, with the free preview_invoice as the
   default, rather than "whenever it would help".
3. "Only cite what you retrieved" cannot be guaranteed by the prompt; it needs a check in code
   after generation (or the reply says the sentence alone does not enforce it).
4. The first line (helpful, accurate, friendly, polite) changes no behaviour and can be removed.

FAIL if fewer than three are made.
