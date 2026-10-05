---
type: llm
---

Context the reply answers: the user is not a native German speaker and pasted an English paragraph with footnote markers [1] after the first sentence and [2] after the sentence about funding falling 12% over two years, and an AI German translation. The German drops marker [2]. It renders "bitten off more than they could chew" literally as "mehr abgebissen, als sie kauen könnten" (a calque; "sich übernommen" is natural).

PASS only if the reply does all of these:
1. Finds that footnote marker [2] is missing after the funding sentence in the German.
2. Flags the "mehr abgebissen, als sie kauen könnten" phrase as an unnatural literal rendering and offers a natural German alternative with a reason.
3. Lists term or wording decisions (a small glossary or term list).
4. Presents a corrected German text with [1] and [2] in the same order and positions as the source.
5. Marks idiom or register judgements as suggestions and lists spots for a native German reviewer, without claiming the result is native-quality or certain.
