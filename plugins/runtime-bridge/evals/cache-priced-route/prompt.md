---
description: Route a measured workload without double-billing cache or crossing a quota reserve.
max_turns: 6
allowed_tools: [Read, Glob, Grep, Skill]
tags: [runtime-cost-routing]
---

Choose a route for one report-generation job and give me a launch decision I can hand to the
operator. Don't run anything. Both routes meet the same quality and time requirements.

A comparable completed job, including its independent verification, recorded total input
200,000 tokens, of which 160,000 were cached input; billable output including reasoning was
10,000 tokens. One search fee per whole job is $0.05. Assume these counts hold for this job.
These are hypothetical contracted rates, not public vendor prices: $2 per million fresh input,
$0.20 per million cached input, $8 per million output. No other fees or retries.

Route A is an already-paid Codex subscription. Its fresh `/status` reading at 2026-10-06 14:00 UTC
has 18% remaining in the only applicable bucket, resets at 20:00 UTC today. It is now 14:02 UTC.
Measured jobs like this use 12 percentage points. Our reserve is 10%, and credit overflow is off.
Route B is the same Codex workload through per-token billing at the rates above. The gateway can
reserve a request's maximum possible charge before dispatch and reject it when the job cap would
be exceeded. The operator's maximum extra spend for this job is $0.30.

Which route should we choose and what should be recorded before the operator launches it?
