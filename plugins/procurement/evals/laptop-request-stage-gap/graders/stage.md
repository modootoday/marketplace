---
type: llm
---

Context the reply answers: stage rules are requisition needs cost center, spec and quote; PO needs an approved requisition; goods receipt needs a PO; payment needs an invoice and a goods receipt. The record shows requisition approved by Dana, no quote attached, PO not created. No owner or deadline is given anywhere.

PASS only if the reply does all of these:
1. States the requisition stage as incomplete or not satisfied (no quote, and no cost center or spec on record) even though an approval is recorded, and does not mark it complete.
2. Shows PO, goods receipt and payment as not started or blocked, each with its unmet condition.
3. Gives the next action as obtaining the quote, cost center and spec, with the owner and deadline marked unknown because the source gives none.
