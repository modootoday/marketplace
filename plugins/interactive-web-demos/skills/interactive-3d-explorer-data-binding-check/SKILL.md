---
name: interactive-3d-explorer-data-binding-check
description: Check that a 3D explorer, configurator or guided tour matches its underlying data - define the schema of the selectable state, round-trip a selection to the order or data record, recompute price and check disallowed combinations and upload or input limits against the schema, verify that guide text and the highlighted object refer to the same data item, mark scale distortions, confirm user data stays local when claimed, and require a non-3D fallback. Use when a builder shows a configurator order, selection state or explorer data and asks whether the 3D view, the order and the numbers agree. Not for physics accuracy or frame time (interactive-simulation-reference-check) or for building the viewer.
metadata:
  tier: open
  level: L3
  domain: interactive-web-demos
  install: optional
  keywords: [3d configurator, order schema, price check, data binding, guided tour]
  verified-runtimes: [claude-code]
---

# Interactive 3D explorer data binding check

A 3D view can show one thing while the order, the price or the guide text says another. This skill
tests the binding between what the viewer shows and the data record behind it, from the schema,
payload and price list the builder pastes. For physics accuracy or frame time use
`interactive-simulation-reference-check`.

## Steps

1. Write the schema of the selectable state: each field, allowed values, limits (length, range,
   file type and size), which combinations are disallowed, and the price rule.
2. Round trip: take the selection and the record the UI produced, and compare field by field in
   both directions. List every field in one and not the other, and every value that differs in
   spelling or type.
3. Validate the record against the schema: values outside the allowed set, strings over the
   limit (count the characters, spaces included), disallowed combinations. A violating value
   should be blocked in the UI and rejected again on the server; say both.
4. Recompute the price from the price list with each term written out, using the character
   count from step 3 (for example base + option + 0.5 x characters), before stating any total,
   and compare with the record's price. Use the recorded values as given, even when they break a
   limit, and show the difference and which side to fix; never accept the UI's figure.
5. Explorer and tour data: check that the guide text, label and highlighted or selected object
   point at the same data item (same id), that the facts in the text match the data, and mark
   scale or position distortions (for example orbit sizes not to scale) so the view says so.
6. Privacy: always recommend a local-data check for text or files a user types or uploads:
   confirm from the code or a network log that nothing is sent to a server unless the product
   says it is. If no log or code was provided, mark it unverified and say what to capture.
7. Require a non-3D fallback (list or form view) with the same data and the same record, for
   accessibility and failed rendering.
8. Say which checks used pasted data and which tests were not run; do not report a test as
   passed unless it was run.

## Output

The schema, a round-trip table (field, UI, record, schema, result), the recomputed price, the
violations, the binding and privacy findings, the fallback requirement and the tests still to run.
