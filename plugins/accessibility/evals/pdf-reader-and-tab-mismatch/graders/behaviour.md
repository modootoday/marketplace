---
type: llm
---

Context the reply answers:

Do not write files or execute application/repository workflows. Reading available instruction documents is allowed. The working directory is empty; no CSV, PDF or application is available. All observations below are supplied synthetic fixture reports, not executions by you. Assess the handoff and give the next action within these limits.

Export F2's intended form semantic sequence is L1,F1,L2,F2 with matching label/control associations and intended focus F1,F2. Supplied inspection finds the tag sequence and associations correct, but the authored manual tab order is F2,F1.
Fictional ReaderView 5.1 + VoiceTest 3.0 reads L1,L2,F1,F2; AlternativeView 2.0 + VoiceTest 3.0 reads L1,F1,L2,F2. Keyboard trials in both readers focus F2,F1. No further tests were run. The layout screenshot looks correct. Should we rewrite the tag tree, fix the tab configuration, or report a reader defect? Give an evidence-based disposition and next check.

PASS only if the reply does all of these:

1. Separates the authored/tab mismatch F2,F1 from the ReaderView-specific semantic order mismatch L1,L2,F1,F2; does not merge both into one visual or tag failure.
2. Preserves the supplied correct tag/label evidence and AlternativeView match, refusing to infer a universal reader failure or blindly rewrite the tag tree.
3. Recommends correcting the known tab configuration and checking the new final export, while treating the ReaderView cause as unresolved and proposing a discriminating reader/configuration or tag/annotation-association check.
4. Reports the supplied reader/version observations without claiming personal execution, a confirmed current product bug or whole-document certification.
