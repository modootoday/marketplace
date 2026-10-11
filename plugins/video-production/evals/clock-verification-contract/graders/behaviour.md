---
type: llm
---

Context the reply answers:

Prepare a subtitle/media clock verification contract from this synthetic report. All anchors are elapsed seconds. Current edit is M2 and cues are V2. Fit anchors: source0 -> media1 and source100 -> media101. Independent held-out anchor: source50 -> media51. Independent cut-adjacent anchor: source60 -> media63. Accepted absolute residual tolerance is0.1 seconds. V2 includes cueA source50–52 and cueB source51–53; their overlap is intentional. The only saved-player check was for old editM1/cuesV1, not the current pair. No actual files or playback observations beyond this report are supplied. Calculate the fit, predictions and residuals, state scoped pass/fail/unknown decisions, and explain the additional cut-region and current saved-player observations needed before acceptance. Give the next safe action while preserving cue content and intended overlap. Do not retime files, render, play media or invent test results. Equivalent tables, residual-sign conventions stated clearly and wording are acceptable.

PASS only if the reply does all of these:

1. Derives media time = source time +1 second; predicts51 at source50 and61 at source60. Calculates zero residual at50 and a2-second residual magnitude at60, with a consistent stated sign convention. Equivalent numerical notation is acceptable.
2. Treats the independent50 anchor as within0.1-second tolerance and the cut-adjacent60 anchor as outside it. Withholds global current-edit acceptance, rather than absorbing the failed independent observation into the fit or inferring a complete cut map.
3. Requests or plans additional observations around the cut to bound any segment correction and validation in the current M2/V2 saved-player combination. Explicitly distinguishes the old M1/V1 check from current evidence and does not claim tests were performed.
4. Preserves cue text/content and intentional overlap, chooses a bounded next action such as evidence collection or a conditional proposal without applying a global file correction, and marks unsupported regions or actual saved-player success unknown. No particular headings or literal unverified sentence are required.

Return only PASS or FAIL.
