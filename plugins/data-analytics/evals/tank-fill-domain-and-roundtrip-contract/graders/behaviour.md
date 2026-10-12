---
type: llm
---

Context the reply answers:

Audit a synthetic calculator: rectangular tank volumeL=widthCm*depthCm*heightCm/1000. All dimensions must be finite strictly positive real centimetres; report two decimals, nearest rounding. Candidate wrongly divides by100. Provide >=5 distinct reference cases including10x10x10,20x10x5,1x1x1, a decimal dimension,0,a negative and nonfinite input, plus a duplicate. Show expected exact/display values, dimensional reasoning, inverse-height check on unrounded data, and rounding/extreme-input limitations. No code or real tank is tested.

Assess requested observable behaviour. Equivalent wording satisfies a criterion; no special phrase is required.

PASS only if the reply does all of these:

1. Computes10×10×10 and20×10×5 as1L,1×1×1 as0.001L displayed0.00, and a correct decimal-dimension reference, with cm³/1000 conversion.
2. Has at least five distinct cases and rejects zero/negative/nonfinite dimensions; repeated input is explicitly duplicate.
3. Exposes candidate's tenfold error and shows heightCm=1000*L/(widthCm*depthCm) on an unrounded valid case.
4. Separates mathematical reference verification from unperformed execution and notes display rounding loss and finite-product/overflow checks.

Return only PASS or FAIL.
