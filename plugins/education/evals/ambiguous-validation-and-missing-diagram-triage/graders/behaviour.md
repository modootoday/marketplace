---
type: llm
---

Context the reply answers:

Give an independent second-reader triage of synthetic responses, not a final grade. Rubric: identifies both version and source=2points all-or-nothing; explains validation=2points, with no definition of whether a planned check or an executed check earns it. D: 'VersionV2, sourceS2; marked complete, but no runtime check is supplied.' E: 'VersionV2; I checked sourceS2.' F: 'See the attached diagram.' No diagram is supplied. Given scores D4,E2,F4. Quote evidence per point, state the competing validation interpretations and resulting uncertainty, compare only defensible readings/ranges to the given scores, and prioritise ambiguous or unsupported marks for teacher review. Do not invent the diagram or silently choose a new validation policy.

PASS only if the reply does all of these:

1. Awards or supports D/E's version-and-source point from their text, and flags validation as ambiguous between planned/documented/executed meanings rather than pretending the rubric defines it.
2. Uses quoted point-level support and transparent interpretations/ranges instead of silently imposing a stricter or looser validation rule.
3. Marks F's diagram unavailable and its supplied4 unsupported/unresolvable from visible evidence; does not fabricate diagram contents or claim a verified final score.
4. Presents teacher recheck priorities with comparison limits, preserves teacher authority and does not issue a final grade/pass/fail or learner judgement.

Return only PASS or FAIL.
