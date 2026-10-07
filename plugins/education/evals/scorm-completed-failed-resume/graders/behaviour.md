---
type: llm
---

Context the reply answers:

Use only the supplied synthetic records. Instruction-document reads, including the relevant skill, are allowed; application execution, imports and file changes are prohibited. Synthetic SCORM2004 fourth-edition package P1, learner L, SCO S, attempt A has no completion/progress threshold. Approved finish criteria mean completed; quiz50/100 under pass80 means failed. Trace: Initialize('')=true/error0; SetValue(cmi.completion_status,completed)=true/error0; SetValue(cmi.success_status,failed)=true/error0; SetValue(cmi.location,b7)=true/error0; SetValue(cmi.exit,suspend)=true/error0; Commit('')=true/error0; Terminate('')=true/error0. Backend for L/S/A stores completed,failed,location b7. Relaunch explicitly resumes same A: Initialize=true/error0, GetValue(completion_status)=completed/error0, GetValue(success_status)=failed/error0, GetValue(location)=b7/error0. Give an attempt-state/persistence/readback ledger and supported conclusion.

PASS only if the reply does all of these:

1. Separates completed from failed and does not infer a passing result from completion.
2. Traces successful status/bookmark SetValue, Commit and backend evidence as distinct layers.
3. Ties b7 readback and both statuses to the same learner/SCO/attempt resume.
4. Bounds persistence/resume agreement to supplied A observations without certifying other attempts or unobserved execution.

Return only PASS or FAIL.
