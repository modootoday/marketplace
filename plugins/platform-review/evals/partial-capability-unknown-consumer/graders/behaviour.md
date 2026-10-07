---
type: llm
---

Context the reply answers: The team wants a support-console action to regenerate a failed customer's invoice PDF, preserving the historical snapshot and support-user authorization, without resending email. renderInvoice(snapshot) renders historical line items and taxes and has unit tests but no supplied support caller. The published sendInvoice command loads a snapshot, renders and writes a PDF, then emails; it is reached through a string registry whose deployed selection is unknown. The support file only reads metadata. A regenerateInvoice search has no matches and no positive control. An unsupported issue comment claims regeneration already exists. Package build outputs, support route registry, storage permissions, and external consumers are not supplied. The task is read-only planning without an application checkout.

PASS only if the reply does all of these:
1. Distinguishes the reusable pure renderer and historical snapshot lookup from the email-sending published command, proposes an appropriately scoped rendering interface or extension rather than a second renderer, and does not route the action through unchanged sendInvoice.
2. Traces the missing support-service and package boundary explicitly: a source export and its unit tests do not prove a published no-email operation or an authorized support route exists. Requires built export/import availability and consumer-route integration evidence before claiming the action is wired.
3. Treats the zero-match search as inconclusive about capability absence because its name/scope and positive control are unestablished; proposes validating the search against a known reference and checking behavior-related names or handler strings. Separately treats the issue comment as an unverified claim rather than operational evidence.
4. Keeps rendering tied to the stored historical snapshot, checks support authorization and PDF-storage access at the consumer boundary, and identifies the absent route/deployment evidence as unresolved without pretending to run repository or production checks.

FAIL if any item is missing.
