---
type: llm
---

Context the reply answers: A review-only optimization enables global runInCI:false despite old CI build/test execution. The helper sizes a pool from host free24 GiB despite a shared process/container available3 GiB. Several concurrent parent jobs can each start a separate pool in that budget. CPU quotas are unknown. Discovery hardcodes apps/* despite modules/** followed by !modules/fixtures/**, and unsupported selectors silently succeed empty. The user wants findings, minimal repairs and independent validation, not execution.

PASS only if the reply does all of these:

1. Identifies CI-only task loss independently of local success and proposes an explicit local/CI scope control.
2. Uses the supplied tighter host/process memory budget and accounts for aggregate parent-job and pool fan-out without transplanting a universal lane count. May request other resource observations; must not invent CPU quotas. Mentioning unprovided CPU limits is not required to pass.
3. Preserves declared nested workspace/exclusion semantics, makes unsupported selections visible failures, and validates included/excluded targets with known-present controls.
