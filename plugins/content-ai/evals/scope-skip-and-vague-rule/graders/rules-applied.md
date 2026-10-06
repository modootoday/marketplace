---
type: llm
---

Context the reply answers: a caption check for client C only. C rulebook v2 has C-B1 banned "최고" and "1위", C-R1 a required closing disclaimer line, C-R2 a required "프로모션 기간: " label scoped to the 2025 FW season only (the run date is 2026-10-12), C-T1 a vague tone rule, C-F1 a 90-character limit for feed captions. Client D's banned word "혜택" is in the conversation only as background; the caption contains "혜택".

PASS only if the reply:
1. Starts with a header naming client C, the rulebook (v2) and the channel and run date.
2. Flags "최고" under C-B1, the missing closing disclaimer under C-R1, and the length over 90 characters under C-F1, each by rule id with the quoted text or counted length.
3. Does NOT flag "혜택" as a violation of any rule (D-B1 is another client's rule); it may mention that it deliberately did not apply D's rules.
FAIL if "혜택" is reported as a finding.
