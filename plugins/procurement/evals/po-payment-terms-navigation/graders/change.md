---
type: llm
---

Context the reply answers: the user asked how to change payment terms on an existing purchase order in S/4HANA and how to sum an exported PO list by vendor in Excel, with the release unknown.

PASS only if the reply does all of these:
1. Mentions change control: changes are recorded in the order's change history or change documents (who, when, old and new value) and may need approval or a workflow, and suggests checking the record afterwards.
2. Distinguishes the payment terms on the order from the vendor master default, and says the user should check whether the order value is copied at creation or read live from master data rather than asserting it.
3. Gives a column-mapping table for the export (SAP field label, export column, meaning, Excel use, check) and a reconciliation check of the Excel total or row count against the export's own total.
