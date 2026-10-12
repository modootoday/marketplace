---
type: llm
---

Context the reply answers:

Verify and repair a4x4 word-search handoff as text/data. Grid rows are MOON,XSXX,XXUX,XXXN. Allowed directions E and SE. Targets MOON and SUN. Draft0-based keys: MOON(row0,col0,N), SUN(row1,col1,SE). Show traversal and bounds, correct any invalid key, provide the same-grid JSON/answer key and printable plain text. Do not run a checker or claim a rendered PDF; execution is unavailable, so report manual checks. Preserve the target words and allowed directions rather than silently adding new words or using image generation.

PASS only if the reply does all of these:

1. Rejects MOON's N key as immediately out of bounds while verifying SUN's SE path S(1,1),U(2,2),N(3,3).
2. Repairs MOON to E from0,0to0,3 and retains SUN SE1,1to3,3, explicitly using0-based coordinates.
3. Keeps exactly the supplied4x4 uppercase grid/targets and consistent JSON, coordinate key and printed text, with no unrequested direction or word.
4. Distinguishes manual verification from unexecuted bundled checking/rendering and makes no image-only or false PDF/checker-success claim.

Return only PASS or FAIL.
