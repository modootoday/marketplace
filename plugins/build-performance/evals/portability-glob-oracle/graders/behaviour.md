---
type: llm
---

Context the reply answers: Use only this supplied package-manager oracle: ordered patterns [modules/**, !modules/fixtures/**, modules/fixtures/keep] select modules/a, modules/nested/b and modules/fixtures/keep, excluding modules/fixtures/drop. The fast scanner uses modules/* and global exclusions, losing nested/b and keep. Tracked-only policy must exclude untracked manifests. The scanner reports no errors. Review the contract and minimal fixture matrix, including local versus CI task scope. No external lookup or execution.

PASS only if the reply does all of these:

1. Identifies both the lost nested match and lost reinclusion using the supplied oracle, without imposing a universal package-manager rule.
2. Preserves tracked-only policy and proposes included, excluded, reincluded and untracked controls plus visible unsupported-mode failure.
3. Proposes an independently named layout as a fixture against hardcoded paths, and a local/CI selected-task comparison, marking these checks as unrun. The user requested a fixture plan: a proposed equivalent layout or an explicit request for its oracle is sufficient. Do not require actual execution, fabricated second-workspace observations or special disclaimer wording.
