---
name: scorm-attempt-state-persistence-check
description: Trace SCORM completion/success, API returns, persisted state and relaunch observations for a specific SCO and attempt. Use when final slides or scores disagree with LMS status or resume state. Not for grading learners, forging completion or inferring edition-specific behavior without a supplied contract.
metadata:
  tier: open
  level: L3
  domain: education
  install: optional
  keywords: [SCORM, SCO, attempt, completion, Commit, resume]
  verified-runtimes: [codex-cli]
---

# SCORM attempt state and persistence check

Identify exact package/LMS and runtime versions, SCORM edition, SCO, anonymized learner and attempt, approved completion/pass criteria, thresholds and initialization/exit behavior. Obtain chronological sanitized calls with arguments, returns and GetLastError, backend state and relaunch GetValue observations tied to the same attempt. A screenshot, score or final slide alone does not establish accepted or persisted state.

## Trace separate state layers

1. Separate content events, runtime data-model values, API acceptance, backend persistence and LMS display or aggregation. SCORM1.2 combines status concepts;2004 separates completion from success. Completed and failed can coexist under approved criteria.
2. Apply the supplied edition-specific completion contract. For a declared fourth-edition completion-threshold rule, progress below threshold can yield incomplete even if content requests completed; score is not progress. Without the threshold/model contract, request it rather than infer status from a familiar edition label.
3. Record Initialize, relevant SetValue/GetValue, Commit and Terminate returns and errors chronologically. A true SetValue is not itself a persisted backend observation. Successful Commit supports the declared persistence contract; false/error391 does not certify new state was stored.
4. Crosswalk persisted completion/success, bookmark or suspend data against the content trace and same learner/SCO/attempt relaunch. Distinguish a new attempt or reset from a failure to resume the old attempt. A bookmark supports resume only when its source and readback are evidenced. Display or rollup can differ from per-SCO runtime status.
5. If asked to propose correction, isolate the failing layer and request the minimum new trace/backend/relaunch evidence. Do not mark completion from score, the last slide or an exit heuristic; do not modify production learner state or submit sensitive learner data.

## Output and limits

Return an attempt-scoped ledger of intended status, model-derived status, API acceptance, persisted values and readback, with unresolved layers and bounded next evidence. Reuse authoring-import-fidelity-check for course content/quiz import fidelity. Do not claim actual LMS execution or conformance from supplied traces.

Bounded [ADL fourth-edition testing requirements](https://adlnet.gov/assets/uploads/SCORM_2004_4ED_v1_1_TR_20090814.pdf) cover Commit and completion threshold behavior; [runtime guidance](https://scorm.com/scorm-explained/technical-scorm/run-time/) separates status and attempt semantics. The [Open edX report](https://github.com/overhangio/openedx-scorm-xblock/issues/110) was open with installed version unstated; suggested heuristics are not normative fixes. Current cause and AI demand are unverified. Historical source evidence does not establish model effect; comparative results and limits are recorded in the plugin README.
