---
type: llm
---

Context the reply answers: an editor write sent with operationId ins-camping-01 timed out with no reply, and the user asks to put the text in again. The tool for checking an operation is editor_operation_status.

PASS only if the reply does all of these:
1. Does not resend the write first: it checks editor_operation_status with the same operationId before anything else.
2. Maps the answers correctly: succeeded means applied and not resent; not_applied means resending with the same operationId is safe; in_progress means check again; unverified means read the document with editor_read_document and report what is there; unknown means no record.
3. Keeps the same operationId and target for a safe resend, and states that the same id with different arguments is refused as an operation conflict.
4. Does not claim the text is in the post before a status or a document read shows it.

The reply may be in Korean. Wording does not matter, and extra correct advice is fine. FAIL if any item is missing.
