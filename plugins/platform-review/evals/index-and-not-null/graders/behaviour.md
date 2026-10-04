---
type: llm
---

PASS only if it says CREATE INDEX blocks writes and should be CONCURRENTLY outside a transaction, that SET NOT NULL scans under a strong lock and should go through a NOT VALID check constraint then VALIDATE, and recommends a lock_timeout. FAIL if either statement's risk is missed.
