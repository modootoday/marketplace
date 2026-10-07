---
name: pdf-redaction-residual-content-check
description: Review applied PDF redaction and residual-content evidence in the final file, separating visible coverage from deletion and hidden-data checks. Use when checking a redacted PDF before sharing or assessing negative search results. Not for forensic recovery, reidentification or a guarantee of irrecoverability.
metadata:
  tier: open
  level: L3
  domain: security-ops
  install: optional
  keywords: [pdf, redaction, sanitization, residual content, canary]
  verified-runtimes: [codex-cli]
---

# Check the final PDF's residual content

Identify the exact final artifact and approved removal scope. A rectangle,
annotation or preview can cover text without deleting it; marking for redaction
is also distinct from applying and saving it. Keep applied-redaction evidence
separate from sanitization of metadata, attachments and other hidden content.

Work on authorized local copies with synthetic sentinel text such as
`CANARY-47`. For each negative detection claim, require the same tool/version
and inspection path to detect a corresponding sentinel in the source control.
An empty search or extraction result without that positive control may indicate
an ineffective detector, an image-only document or incomplete coverage. It does
not verify absence. Do not recover real removed data or upload private files.

Compare source controls and the saved final artifact across the relevant layers:
visible rendering, text extraction/search, metadata, annotations, embedded files
and other content within the stated scope. Record tested layers independently;
a clean text extraction does not cover attachments or pixels. Controls must
exercise the layer whose absence is claimed. Unchecked layers stay unverified.

Classify results as residual detected, not detected in the tested scope, or
unverified. A detected sentinel blocks the proposed sharing scope; report its
layer without reproducing private content. An overlay with recoverable text
does not prove an applied-redaction tool failed. Correct the workflow and
recheck the actual saved output before endorsing removal.

Report artifact identity, tool/version, apply/save evidence, source control and
final result per layer, missing coverage and next discriminating checks. Separate
supplied reports from your own execution. Ask for the final PDF, application log
and controls when missing; screenshots alone cannot establish deletion. Bounded
negative tests are not a forensic or legal guarantee of irreversible removal.

Sources: [Adobe's redaction versus sanitization scope](https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redacting-sanitizing.html)
and [a historical redaction-leakage study, abstract](https://arxiv.org/abs/2206.02285).
The study's historical results do not demonstrate a current product defect.
